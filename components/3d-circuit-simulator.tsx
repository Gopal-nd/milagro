// components/CircuitBoardFlow.tsx
"use client"

import React, { JSX, useCallback, useEffect, useMemo, useState } from "react"
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  NodeToolbar,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  Edge,
  Node,
  Connection,
  EdgeChange,
  NodeChange,
  MarkerType,
  OnNodesChange,
  OnEdgesChange,
} from "reactflow"
import "reactflow/dist/style.css"
import { Plus } from "lucide-react"

type ComponentType = "battery" | "resistor" | "led" | "switch" | "capacitor"

interface CircuitData {
  type: ComponentType
  label?: string
  active?: boolean
  value?: string
}

const createNode = (id: string, x = 0, y = 0, type: ComponentType = "resistor", label?: string): Node => ({
  id,
  position: { x, y },
  data: {
    type,
    label: label ?? type.charAt(0).toUpperCase() + type.slice(1),
    active: type === "battery", // battery is active by default
  } as CircuitData,
  draggable: true,
  connectable: true,
  selectable: true,
  type: "default",
})

const nodeColor = (t?: ComponentType, powered?: boolean) => {
  if (powered) return "#06b6d4" // teal when powered
  switch (t) {
    case "battery":
      return "#ff9800"
    case "led":
      return "#ff1744"
    case "resistor":
      return "#cbd5e1"
    case "capacitor":
      return "#60a5fa"
    case "switch":
      return "#f59e0b"
    default:
      return "#cbd5e1"
  }
}

function CircuitNode({ id, data, selected }: { id: string; data: CircuitData; selected?: boolean }) {
  const powered = !!data.active && data.type !== "switch"
  return (
    <div
      className="rounded-lg p-3 shadow-md"
      style={{
        minWidth: 120,
        border: selected ? "2px solid rgba(6,182,212,0.9)" : "1px solid rgba(255,255,255,0.06)",
        background: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.04))`,
        color: "white",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold">{data.label}</div>
          <div className="text-xs opacity-70">{data.value ?? data.type}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: nodeColor(data.type, powered), boxShadow: powered ? "0 0 10px rgba(6,182,212,0.6)" : "none" }}
          />
        </div>
      </div>
    </div>
  )
}

export default function CircuitBoardFlow(): JSX.Element {
  // initial static nodes/edges (created once)
  const initialNodes = useMemo<Node[]>(
    () => [
      createNode("battery-1", 100, 200, "battery", "Battery"),
      createNode("switch-1", 300, 200, "switch", "Switch"),
      createNode("res-1", 500, 200, "resistor", "Resistor"),
      createNode("led-1", 700, 200, "led", "LED"),
    ],
    []
  )

  const initialEdges = useMemo<Edge[]>(
    () => [
      { id: "e1", source: "battery-1", target: "switch-1", markerEnd: { type: MarkerType.Arrow } },
      { id: "e2", source: "switch-1", target: "res-1", markerEnd: { type: MarkerType.Arrow } },
      { id: "e3", source: "res-1", target: "led-1", markerEnd: { type: MarkerType.Arrow } },
    ],
    []
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [poweredNodes, setPoweredNodes] = useState<Record<string, boolean>>({})

  // Run a lightweight simulation: BFS from batteries, respecting switch active state.
  const runSimulation = useCallback(() => {
    // build adjacency
    const adjacency: Record<string, string[]> = {}
    edges.forEach((e) => {
      adjacency[e.source] = adjacency[e.source] || []
      adjacency[e.source].push(e.target)
      adjacency[e.target] = adjacency[e.target] || []
      adjacency[e.target].push(e.source)
    })

    const batteryIds = nodes.filter((n) => (n.data as CircuitData).type === "battery").map((n) => n.id)
    const visited: Record<string, boolean> = {}
    const stack = [...batteryIds]

    while (stack.length) {
      const cur = stack.pop()!
      if (visited[cur]) continue
      visited[cur] = true

      const neighbors = adjacency[cur] || []
      neighbors.forEach((nbr) => {
        const nodeObj = nodes.find((n) => n.id === nbr)
        if (!nodeObj) return
        const data = nodeObj.data as CircuitData
        if (data.type === "switch") {
          // traverse only when switch is active
          if (data.active) stack.push(nbr)
          return
        }
        stack.push(nbr)
      })
    }

    // compute new powered map
    const newPowered: Record<string, boolean> = {}
    nodes.forEach((n) => (newPowered[n.id] = !!visited[n.id]))

    setPoweredNodes(newPowered)

    // update nodes' data.active for those node types that should reflect powered state (e.g., LED)
    // Only call setNodes if something actually changes (prevents re-render loop)
    let changed = false
    const updated = nodes.map((n) => {
      const prevActive = !!(n.data as CircuitData).active
      // We'll set active for anything except switches/battery (battery keeps its own active)
      let nextActive = prevActive
      const data = n.data as CircuitData
      if (data.type === "battery") {
        nextActive = true // battery always true
      } else if (data.type === "switch") {
        nextActive = !!data.active // keep switch own state (toggled manually)
      } else {
        nextActive = !!newPowered[n.id]
      }

      if (nextActive !== prevActive) {
        changed = true
        return { ...n, data: { ...(n.data as CircuitData), active: nextActive } }
      }
      return n
    })

    if (changed) {
      // applyNodeChanges would be fine, but setNodes replacement is clearer
      setNodes(updated)
    }
  }, [nodes, edges, setNodes])

  // Run simulation after nodes/edges change
  useEffect(() => {
    runSimulation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edges, /* nodes intentionally not in deps to avoid double-run when setNodes inside runSimulation updates nodes */])

  // Toggle switch/battery active state (battery toggling is allowed here)
  const toggleNodeActive = useCallback(
    (id: string) => {
      setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...(n.data as CircuitData), active: !(n.data as CircuitData).active } } : n)))
    },
    [setNodes]
  )

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.Arrow } }, eds)), [setEdges])

  // add node helper
  const addComponent = useCallback(
    (type: ComponentType) => {
      const id = `${type}-${Date.now()}`
      const posX = 200 + Math.random() * 400
      const posY = 100 + Math.random() * 300
      const node = createNode(id, posX, posY, type, type.charAt(0).toUpperCase() + type.slice(1))
      setNodes((nds) => nds.concat(node))
    },
    [setNodes]
  )

  // track selection correctly with the dedicated callback
  const onSelectionChange = useCallback(
    ({ nodes: selNodes }: { nodes: Node[]; edges: Edge[] }) => {
      setSelectedNodeId(selNodes && selNodes.length ? (selNodes[0].id as string) : null)
    },
    []
  )

  // track node/edge changes (use provided helpers)
  const wrappedOnNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes)
    },
    [onNodesChange]
  )
  const wrappedOnEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes)
    },
    [onEdgesChange]
  )

  // styled edges reflect power
  const styledEdges = edges.map((e) => ({
    ...e,
    style: { stroke: poweredNodes[e.source] && poweredNodes[e.target] ? "#06b6d4" : "rgba(255,255,255,0.12)", strokeWidth: 3 },
  }))

  return (
    <div className="w-full h-[720px] bg-slate-900/80 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-white">Digital Circuit Board — Interactive</h3>
          <div className="text-xs text-slate-300 opacity-70">(Drag nodes, connect with edges, toggle switches)</div>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => addComponent("battery")} className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-600 text-white text-sm">
            <Plus className="w-4 h-4" /> Add
          </button>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <button type="button" onClick={() => addComponent("resistor")} className="px-3 py-1 rounded bg-slate-700 text-white text-sm">
            Resistor
          </button>
          <button type="button" onClick={() => addComponent("led")} className="px-3 py-1 rounded bg-pink-600 text-white text-sm">
            LED
          </button>
          <button type="button" onClick={() => addComponent("switch")} className="px-3 py-1 rounded bg-yellow-500 text-black text-sm">
            Switch
          </button>
          <button type="button" onClick={() => addComponent("capacitor")} className="px-3 py-1 rounded bg-sky-500 text-white text-sm">
            Capacitor
          </button>

          <button
            type="button"
            onClick={() => {
              setNodes(initialNodes)
              setEdges(initialEdges)
              setSelectedNodeId(null)
            }}
            className="ml-3 px-3 py-1 rounded bg-red-600 text-white text-sm"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(JSON.stringify({ nodes, edges }))
            }}
            className="ml-2 px-3 py-1 rounded bg-slate-600 text-white text-sm"
          >
            Copy JSON
          </button>
        </div>
      </div>

      <ReactFlowProvider>
        <div className="h-[620px] rounded-lg overflow-hidden">
          <ReactFlow
            nodes={nodes.map((n) => ({ ...n, data: { ...(n.data as CircuitData), label: (n.data as CircuitData).label } }))}
            edges={styledEdges}
            onNodesChange={wrappedOnNodesChange}
            onEdgesChange={wrappedOnEdgesChange}
            onConnect={onConnect}
            onNodeClick={(e, node) => {
              // quick toggle if switch clicked
              if ((node.data as CircuitData).type === "switch") {
                toggleNodeActive(node.id)
                // run simulation after toggling switch
                setTimeout(() => runSimulation(), 10)
              }
            }}
            onNodeDoubleClick={(e, node) => setSelectedNodeId(node.id)}
            onSelectionChange={onSelectionChange}
            fitView
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            panOnScroll
            zoomOnScroll
            attributionPosition="bottom-left"
            nodeTypes={{ default: (props: any) => <CircuitNode id={props.id} data={props.data} selected={props.selected} /> }}
          >
            <Background gap={16} color="rgba(255,255,255,0.04)" />
            <Controls />
            <MiniMap nodeStrokeColor={() => "transparent"} nodeColor={(n) => nodeColor((n.data as CircuitData).type, poweredNodes[n.id])} />

            {selectedNodeId && (
              <NodeToolbar >
                <div className="bg-slate-800/90 rounded px-2 py-1 flex items-center gap-2 text-xs text-white">
                  <button
                    type="button"
                    onClick={() => {
                      toggleNodeActive(selectedNodeId)
                      setTimeout(() => runSimulation(), 10)
                    }}
                    className="px-2 py-1 rounded bg-slate-700"
                  >
                    Toggle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId))
                      setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId))
                      setSelectedNodeId(null)
                      setTimeout(() => runSimulation(), 10)
                    }}
                    className="px-2 py-1 rounded bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </NodeToolbar>
            )}
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}


