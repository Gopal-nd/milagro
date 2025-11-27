"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  Edge,
  Node,
  Connection,
  MarkerType,
  Handle,
  Position,
} from "reactflow"
import "reactflow/dist/style.css"
import { Plus, Trash2, Power, Zap, RotateCcw } from "lucide-react"

type ComponentType = "battery" | "resistor" | "led" | "switch" | "capacitor" | "ground"

interface CircuitData {
  type: ComponentType
  label: string
  resistance?: number
  voltage?: number
  capacitance?: number
  isClosed?: boolean
  powered?: boolean
  current?: number
}

const createNode = (id: string, x: number, y: number, type: ComponentType): Node<CircuitData> => {
  const defaults: Record<ComponentType, Partial<CircuitData>> = {
    battery: { voltage: 9, label: "Battery 9V", resistance: 1 },
    resistor: { resistance: 100, label: "Resistor 100Ω" },
    led: { resistance: 10, label: "LED" },
    switch: { isClosed: false, label: "Switch (Open)", resistance: 0.1 },
    capacitor: { capacitance: 0.0001, label: "Capacitor 100µF", resistance: 50 },
    ground: { resistance: 0.1, label: "Ground" },
  }

  return {
    id,
    position: { x, y },
    data: {
      type,
      powered: false,
      current: 0,
      ...defaults[type],
    } as CircuitData,
    type: "custom",
  }
}

const getComponentColor = (type: ComponentType, powered: boolean) => {
  if (powered) {
    switch (type) {
      case "led":
        return "#ff1744"
      case "battery":
        return "#ffa726"
      case "ground":
        return "#4caf50"
      default:
        return "#06b6d4"
    }
  }
  
  switch (type) {
    case "battery":
      return "#ff9800"
    case "led":
      return "#880e4f"
    case "resistor":
      return "#90a4ae"
    case "capacitor":
      return "#1976d2"
    case "switch":
      return "#fbc02d"
    case "ground":
      return "#2e7d32"
    default:
      return "#78909c"
  }
}

const getComponentIcon = (type: ComponentType) => {
  switch (type) {
    case "battery":
      return "⚡"
    case "led":
      return "💡"
    case "resistor":
      return "⊏⊐"
    case "switch":
      return "⏻"
    case "capacitor":
      return "⊢⊣"
    case "ground":
      return "⏚"
    default:
      return "●"
  }
}

function CircuitNode({ id, data, selected }: { id: string; data: CircuitData; selected: boolean }) {
  const color = getComponentColor(data.type, data.powered || false)
  const icon = getComponentIcon(data.type)
  
  return (
    <div className="relative">
      {/* Connection Handles - 4 sides */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{
          background: '#06b6d4',
          width: 12,
          height: 12,
          border: '2px solid #0e7490',
          left: -6,
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{
          background: '#06b6d4',
          width: 12,
          height: 12,
          border: '2px solid #0e7490',
          right: -6,
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{
          background: '#06b6d4',
          width: 12,
          height: 12,
          border: '2px solid #0e7490',
          top: -6,
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{
          background: '#06b6d4',
          width: 12,
          height: 12,
          border: '2px solid #0e7490',
          bottom: -6,
        }}
      />

      <div
        className="rounded-lg p-3 shadow-lg transition-all duration-200"
        style={{
          minWidth: 140,
          border: selected ? "2px solid #06b6d4" : "1px solid rgba(255,255,255,0.1)",
          background: data.powered 
            ? "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(0,0,0,0.8))"
            : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.8))",
          boxShadow: data.powered ? `0 0 20px ${color}40` : "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span style={{ fontSize: "1.2em" }}>{icon}</span>
              {data.label}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {data.type === "battery" && `${data.voltage}V`}
              {data.type === "resistor" && `${data.resistance}Ω`}
              {data.type === "capacitor" && `${(data.capacitance || 0) * 1000000}µF`}
              {data.type === "switch" && (data.isClosed ? "Closed ✓" : "Open ✗")}
              {data.type === "ground" && "Return Path"}
              {data.powered && data.current !== undefined && data.current > 0 && (
                <div className="text-cyan-400 mt-1">I: {data.current.toFixed(3)}A</div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-4 h-4 rounded-full transition-all duration-200"
              style={{
                background: color,
                boxShadow: data.powered ? `0 0 12px ${color}` : "none",
              }}
            />
            {data.type === "led" && data.powered && (
              <div className="text-xs text-red-400 animate-pulse">ON</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CircuitSimulator() {
  const initialNodes = useMemo<Node<CircuitData>[]>(
    () => [
      createNode("battery-1", 100, 200, "battery"),
      createNode("switch-1", 320, 200, "switch"),
      createNode("resistor-1", 540, 200, "resistor"),
      createNode("led-1", 760, 200, "led"),
      createNode("ground-1", 430, 350, "ground"),
    ],
    []
  )

  const initialEdges = useMemo<Edge[]>(
    () => [
      { 
        id: "e1", 
        source: "battery-1",
        sourceHandle: "right",
        target: "switch-1",
        targetHandle: "left",
        markerEnd: { type: MarkerType.ArrowClosed },
        type: "smoothstep",
        label: "+"
      },
      { 
        id: "e2", 
        source: "switch-1",
        sourceHandle: "right",
        target: "resistor-1",
        targetHandle: "left",
        markerEnd: { type: MarkerType.ArrowClosed },
        type: "smoothstep",
      },
      { 
        id: "e3", 
        source: "resistor-1",
        sourceHandle: "right",
        target: "led-1",
        targetHandle: "left",
        markerEnd: { type: MarkerType.ArrowClosed },
        type: "smoothstep",
      },
      { 
        id: "e4", 
        source: "led-1",
        sourceHandle: "bottom",
        target: "ground-1",
        targetHandle: "top",
        markerEnd: { type: MarkerType.ArrowClosed },
        type: "smoothstep",
        label: "Return"
      },
      { 
        id: "e5", 
        source: "ground-1",
        sourceHandle: "left",
        target: "battery-1",
        targetHandle: "bottom",
        markerEnd: { type: MarkerType.ArrowClosed },
        type: "smoothstep",
        label: "-"
      },
    ],
    []
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNodes, setSelectedNodes] = useState<string[]>([])
  const [simulationActive, setSimulationActive] = useState(true)
  
  const simulationResultsRef = useRef<Map<string, { powered: boolean; current: number }>>(new Map())
  const lastSimulationHashRef = useRef<string>("")

  const calculateCircuitState = useCallback((currentNodes: Node<CircuitData>[], currentEdges: Edge[]) => {
    const graph: Record<string, string[]> = {}
    
    currentEdges.forEach((edge) => {
      graph[edge.source] = graph[edge.source] || []
      graph[edge.source].push(edge.target)
      graph[edge.target] = graph[edge.target] || []
      graph[edge.target].push(edge.source)
    })

    const nodeMap = new Map(currentNodes.map((n) => [n.id, n]))
    const batteries = currentNodes.filter((n) => n.data.type === "battery")
    const grounds = new Set(currentNodes.filter((n) => n.data.type === "ground").map(n => n.id))
    
    const poweredNodes = new Set<string>()
    const nodeCurrents = new Map<string, number>()

    // Check for complete circuits (battery -> components -> ground -> back to battery)
    batteries.forEach((battery) => {
      const voltage = battery.data.voltage || 0
      
      // BFS to find paths from battery to ground
      const visited = new Set<string>()
      const queue: Array<{ nodeId: string; path: string[] }> = [
        { nodeId: battery.id, path: [battery.id] },
      ]

      while (queue.length > 0) {
        const { nodeId, path } = queue.shift()!
        
        if (visited.has(nodeId)) continue
        visited.add(nodeId)

        const currentNode = nodeMap.get(nodeId)
        if (!currentNode) continue

        // If switch is open, stop here
        if (currentNode.data.type === "switch" && !currentNode.data.isClosed) {
          continue
        }

        // Check if we reached ground and can return to battery
        if (grounds.has(nodeId)) {
          // Check if there's a path back to the battery
          const pathBackQueue: string[] = [nodeId]
          const visitedBack = new Set<string>([nodeId])
          let foundReturnPath = false

          while (pathBackQueue.length > 0) {
            const current = pathBackQueue.shift()!
            if (current === battery.id) {
              foundReturnPath = true
              break
            }

            const neighbors = graph[current] || []
            neighbors.forEach((neighbor) => {
              if (!visitedBack.has(neighbor)) {
                visitedBack.add(neighbor)
                pathBackQueue.push(neighbor)
              }
            })
          }

          // If complete circuit exists, mark all nodes in path as powered
          if (foundReturnPath) {
            path.forEach(id => poweredNodes.add(id))
            poweredNodes.add(nodeId) // Add ground too

            // Calculate current
            let totalResistance = 0
            path.forEach((id) => {
              const node = nodeMap.get(id)
              if (node) {
                totalResistance += node.data.resistance || 0
              }
            })

            const current = totalResistance > 0 ? voltage / totalResistance : 0
            path.forEach(id => {
              nodeCurrents.set(id, Math.max(nodeCurrents.get(id) || 0, current))
            })
          }
        }

        // Continue traversing
        const neighbors = graph[nodeId] || []
        neighbors.forEach((neighborId) => {
          if (!visited.has(neighborId)) {
            queue.push({ nodeId: neighborId, path: [...path, neighborId] })
          }
        })
      }
    })

    const results = new Map<string, { powered: boolean; current: number }>()
    currentNodes.forEach((n) => {
      results.set(n.id, {
        powered: poweredNodes.has(n.id),
        current: nodeCurrents.get(n.id) || 0,
      })
    })

    return results
  }, [])

  useEffect(() => {
    if (!simulationActive) return

    const switchStates = nodes
      .filter(n => n.data.type === "switch")
      .map(n => `${n.id}:${n.data.isClosed}`)
      .join("|")
    const circuitHash = `${nodes.length}-${edges.length}-${switchStates}`

    if (circuitHash === lastSimulationHashRef.current) {
      return
    }

    lastSimulationHashRef.current = circuitHash
    const results = calculateCircuitState(nodes, edges)
    simulationResultsRef.current = results

    setNodes((currentNodes) => {
      return currentNodes.map((n) => {
        const result = results.get(n.id)
        if (!result) return n

        if (n.data.powered !== result.powered || 
            Math.abs((n.data.current || 0) - result.current) > 0.001) {
          return {
            ...n,
            data: {
              ...n.data,
              powered: result.powered,
              current: result.current,
            },
          }
        }
        return n
      })
    })
  }, [nodes.length, edges.length, nodes.filter(n => n.data.type === "switch").map(n => `${n.id}-${n.data.isClosed}`).join(","), simulationActive, calculateCircuitState, setNodes])

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed },
            type: "smoothstep",
          },
          eds
        )
      )
    },
    [setEdges]
  )

  const addComponent = useCallback(
    (type: ComponentType) => {
      const id = `${type}-${Date.now()}`
      const node = createNode(id, 200 + Math.random() * 500, 150 + Math.random() * 300, type)
      setNodes((nds) => [...nds, node])
    },
    [setNodes]
  )

  const toggleSwitch = useCallback(
    (nodeId: string) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === nodeId && n.data.type === "switch") {
            const isClosed = !n.data.isClosed
            return {
              ...n,
              data: {
                ...n.data,
                isClosed,
                label: `Switch (${isClosed ? "Closed" : "Open"})`,
              },
            }
          }
          return n
        })
      )
    },
    [setNodes]
  )

  const deleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((n) => !selectedNodes.includes(n.id)))
    setEdges((eds) =>
      eds.filter((e) => !selectedNodes.includes(e.source) && !selectedNodes.includes(e.target))
    )
    setSelectedNodes([])
  }, [selectedNodes, setNodes, setEdges])

  const styledEdges = useMemo(() => {
    return edges.map((e) => {
      const sourceNode = nodes.find((n) => n.id === e.source)
      const targetNode = nodes.find((n) => n.id === e.target)
      const powered = sourceNode?.data.powered && targetNode?.data.powered
      
      return {
        ...e,
        animated: powered,
        style: {
          stroke: powered ? "#06b6d4" : "rgba(255,255,255,0.2)",
          strokeWidth: powered ? 3 : 2,
        },
        labelStyle: {
          fill: powered ? "#06b6d4" : "#94a3b8",
          fontSize: 12,
          fontWeight: 600,
        },
        labelBgStyle: {
          fill: "rgba(0,0,0,0.7)",
          fillOpacity: 0.8,
        },
      }
    })
  }, [edges, nodes])

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="h-full flex flex-col p-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 mb-4 border border-slate-700">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-cyan-400" />
                Electronic Circuit Simulator
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Drag handles to connect • Click switches to toggle • Complete circuit: Battery → Components → Ground → Battery
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimulationActive(!simulationActive)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  simulationActive
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-600 hover:bg-gray-700 text-white"
                }`}
              >
                <Power className="w-4 h-4" />
                {simulationActive ? "Simulation ON" : "Simulation OFF"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-sm text-gray-400 mr-2">Add Components:</span>
            <button
              onClick={() => addComponent("battery")}
              className="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Battery
            </button>
            <button
              onClick={() => addComponent("switch")}
              className="px-3 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Switch
            </button>
            <button
              onClick={() => addComponent("resistor")}
              className="px-3 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Resistor
            </button>
            <button
              onClick={() => addComponent("led")}
              className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> LED
            </button>
            <button
              onClick={() => addComponent("capacitor")}
              className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Capacitor
            </button>
            <button
              onClick={() => addComponent("ground")}
              className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Ground
            </button>

            <div className="h-8 w-px bg-gray-600 mx-2" />

            <button
              onClick={() => {
                setNodes(initialNodes)
                setEdges(initialEdges)
                setSelectedNodes([])
                lastSimulationHashRef.current = ""
              }}
              className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>

            {selectedNodes.length > 0 && (
              <button
                onClick={deleteSelected}
                className="px-3 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-sm font-medium transition-all flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 rounded-xl overflow-hidden border border-slate-700 bg-slate-900/50">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={styledEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={(_, node) => {
                if (node.data.type === "switch") {
                  toggleSwitch(node.id)
                }
              }}
              onSelectionChange={({ nodes: selNodes }) => {
                setSelectedNodes(selNodes.map((n) => n.id))
              }}
              nodeTypes={{
                custom: (props: any) => (
                  <CircuitNode
                    id={props.id}
                    data={props.data}
                    selected={props.selected}
                  />
                ),
              }}
              fitView
              attributionPosition="bottom-right"
            >
              <Background gap={20} size={1} color="rgba(255,255,255,0.05)" />
              <Controls className="bg-slate-800 border-slate-700" />
              <MiniMap
                nodeColor={(n) => getComponentColor(n.data.type, n.data.powered || false)}
                className="bg-slate-800 border-slate-700"
                maskColor="rgba(0,0,0,0.6)"
              />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  )
}