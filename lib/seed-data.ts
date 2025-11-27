// import type { ChatRule } from "./path-to-chat-rule" // Assuming ChatRule is imported from another file

export interface Component {
  id: string
  slug: string
  name: string
  category: string
  symbol: string
  unit: string
  description: string
  image?: string
  shortDescription: string
  overview: string
  typicalValues?: string
  applications?: string[]
}

export interface Tutorial {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  image?: string
}

export interface LearningTopic {
  id: string
  slug: string
  title: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  description: string
  content: string
  keyPoints: string[]
  videoUrl?: string
  quiz: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export const LEARNING_TOPICS: LearningTopic[] = [
  {
    id: "1",
    slug: "ohms-law-fundamentals",
    title: "Ohm's Law Fundamentals",
    category: "Circuit Theory",
    difficulty: "beginner",
    duration: "45 minutes",
    description: "Learn the foundation of circuit analysis with Ohm's Law: V = I × R",
    content: `Ohm's Law is the fundamental equation in electronics: V = I × R

Where:
- V = Voltage (Volts)
- I = Current (Amperes)
- R = Resistance (Ohms)

This law describes the relationship between voltage, current, and resistance in a circuit. When voltage increases, current increases (with constant resistance). When resistance increases, current decreases (with constant voltage).

Power calculation: P = V × I = I² × R = V² / R`,
    keyPoints: [
      "V = I × R relationship",
      "Voltage, current, and resistance definitions",
      "Power calculations",
      "Series and parallel circuits",
      "Circuit analysis examples",
    ],
    videoUrl: "https://www.youtube.com/embed/f0IZkxDI16U",
    quiz: [
      {
        id: "1",
        question: "A 10Ω resistor has 5V across it. What is the current?",
        options: ["0.5A", "2A", "50A", "0.05A"],
        correctAnswer: 0,
        explanation: "Using Ohm's Law: I = V / R = 5V / 10Ω = 0.5A",
      },
      {
        id: "2",
        question: "What is the power dissipated by a 100Ω resistor with 2A of current?",
        options: ["50W", "100W", "200W", "400W"],
        correctAnswer: 3,
        explanation: "Using P = I² × R = (2A)² × 100Ω = 4 × 100 = 400W",
      },
    ],
  },
  {
    id: "2",
    slug: "resistor-color-codes",
    title: "Reading Resistor Color Codes",
    category: "Components",
    difficulty: "beginner",
    duration: "30 minutes",
    description: "Master the standard color bands used to identify resistor values",
    content: `Resistor color codes use colored bands to indicate the resistance value and tolerance.

Standard 4-Band Code:
- 1st band: First digit
- 2nd band: Second digit
- 3rd band: Multiplier (10^x)
- 4th band: Tolerance (accuracy)

Color Chart:
0-Black, 1-Brown, 2-Red, 3-Orange, 4-Yellow, 5-Green, 6-Blue, 7-Violet, 8-Grey, 9-White

Multiplier: Same colors = 10^(0-9)
Tolerance: Gold=5%, Silver=10%, Brown=1%, Red=2%`,
    keyPoints: [
      "Color digit association",
      "Multiplier calculation",
      "Tolerance meanings",
      "5-band and 6-band codes",
      "Common resistor values",
    ],
    videoUrl: "https://www.youtube.com/embed/px3L4FjPH44",
    quiz: [
      {
        id: "1",
        question: "What is the value of a resistor with Brown-Black-Red-Gold bands?",
        options: ["1000Ω", "1000Ω ±5%", "10000Ω", "100Ω"],
        correctAnswer: 1,
        explanation: "Brown(1)-Black(0)-Red(2 multiplier) = 10 × 100 = 1000Ω with 5% tolerance",
      },
    ],
  },
  {
    id: "3",
    slug: "capacitor-basics",
    title: "Understanding Capacitors",
    category: "Components",
    difficulty: "beginner",
    duration: "50 minutes",
    description: "Learn how capacitors store charge and their role in circuits",
    content: `A capacitor stores electrical energy in an electric field. The basic unit is the Farad (F), but practical values are in microfarads (µF), nanofarads (nF), or picofarads (pF).

Capacitance: C = Q / V (where Q is charge, V is voltage)

Main types:
- Ceramic: Small values, general purpose
- Electrolytic: Large capacitance, polarized
- Film: Good tolerance and stability
- Mica: High frequency applications

Key properties:
- Blocks DC, passes AC
- Energy storage: E = 0.5 × C × V²
- RC time constant: τ = R × C`,
    keyPoints: [
      "Capacitance definition and units",
      "Capacitor types and characteristics",
      "Charging and discharging",
      "RC time constant",
      "Applications in circuits",
    ],
    videoUrl: "https://www.youtube.com/embed/MBLCi91ZZNA",
    quiz: [
      {
        id: "1",
        question: "A 10µF capacitor charges through a 1kΩ resistor. What is the RC time constant?",
        options: ["10ms", "100ms", "1s", "10s"],
        correctAnswer: 1,
        explanation: "τ = R × C = 1000Ω × 10×10^-6F = 0.01s = 10ms",
      },
    ],
  },
  {
    id: "4",
    slug: "transistor-switching",
    title: "Transistors as Switches",
    category: "Components",
    difficulty: "intermediate",
    duration: "60 minutes",
    description: "Learn how to use transistors for switching applications",
    content: `Transistors can act as electronic switches, either fully ON or fully OFF. 

BJT (NPN) Switching:
- Base HIGH → Transistor ON → Low resistance between Collector and Emitter
- Base LOW → Transistor OFF → High resistance between Collector and Emitter

MOSFET Switching:
- Gate HIGH → Transistor ON
- Gate LOW → Transistor OFF

Key equations:
- Base current: I_B = (V_in - V_BE) / R_B
- Saturation condition: I_C_sat = (V_CC - V_CE_sat) / R_L
- Collector current: I_C = β × I_B (in linear region)`,
    keyPoints: [
      "BJT switching theory",
      "MOSFET switching theory",
      "Base current calculation",
      "Saturation conditions",
      "Drive circuit design",
    ],
    videoUrl: "https://www.youtube.com/embed/sRVvUaPzKXk",
    quiz: [
      {
        id: "1",
        question: "Which of these devices has the highest input impedance?",
        options: ["BJT", "MOSFET", "Diode", "Resistor"],
        correctAnswer: 1,
        explanation:
          "MOSFETs have extremely high input impedance (gigaohms) because they are voltage-controlled devices",
      },
    ],
  },
  {
    id: "5",
    slug: "led-circuits",
    title: "LED Circuits and Design",
    category: "Applications",
    difficulty: "beginner",
    duration: "40 minutes",
    description: "Design circuits with LEDs including proper current limiting",
    content: `LEDs (Light Emitting Diodes) convert electrical current into light. Proper design requires current limiting to prevent damage.

LED Specifications:
- Forward voltage (Vf): Red/Yellow ~2V, Green/Blue ~3V
- Maximum current (If): Typically 20-30mA
- Power dissipation: P = V × I

Current limiting resistor:
R = (V_supply - V_LED) / I_LED

Example: 5V supply, red LED (2V, 20mA)
R = (5V - 2V) / 20mA = 150Ω

Use next higher standard value: 150Ω or 220Ω`,
    keyPoints: [
      "LED forward voltage specifications",
      "Maximum current ratings",
      "Current limiting calculation",
      "Series and parallel LED arrays",
      "RGB LED control",
    ],
    videoUrl: "https://www.youtube.com/embed/HYjVrfFkGd8",
    quiz: [
      {
        id: "1",
        question: "What resistor value is needed to limit current to 20mA through a blue LED (3V) from a 5V supply?",
        options: ["100Ω", "150Ω", "100Ω", "220Ω"],
        correctAnswer: 0,
        explanation: "R = (5V - 3V) / 20mA = 2V / 0.02A = 100Ω",
      },
    ],
  },
  {
    id: "6",
    slug: "power-supplies",
    title: "Designing Linear Power Supplies",
    category: "Circuit Design",
    difficulty: "intermediate",
    duration: "75 minutes",
    description: "Learn to design regulated DC power supplies from AC mains",
    content: `A basic linear power supply consists of four stages:
1. Transformer: Steps down AC voltage
2. Rectifier: Converts AC to DC (full-wave or half-wave)
3. Filter: Smooths the DC voltage
4. Regulator: Stabilizes the output voltage

Key components:
- Transformer: Step-down ratio determines output voltage
- Rectifier diodes: Full-wave bridge preferred
- Filter capacitor: Large value removes ripple
- Voltage regulator: LM78XX series (fixed) or LM317 (adjustable)

Calculations:
- Peak DC voltage: V_peak = (√2 × V_RMS) - V_diode_drop
- Ripple voltage: V_ripple ≈ I_load / (f × C)
- Output voltage: V_out = V_in - V_dropout`,
    keyPoints: [
      "Transformer selection",
      "Full-wave rectification",
      "Filter design",
      "Voltage regulator operation",
      "Thermal considerations",
    ],
    videoUrl: "https://www.youtube.com/embed/qMj8VwIqq5Y",
    quiz: [
      {
        id: "1",
        question:
          "A transformer with 24V RMS secondary provides DC after rectification. Approximately what is the peak DC voltage?",
        options: ["24V", "34V", "31V", "48V"],
        correctAnswer: 2,
        explanation: "V_peak ≈ √2 × 24V - 1.4V (diode drops) ≈ 33.9V ≈ 31V after filtering",
      },
    ],
  },
  {
    id: "7",
    slug: "arduino-basics",
    title: "Arduino Microcontroller Basics",
    category: "Embedded Systems",
    difficulty: "beginner",
    duration: "90 minutes",
    description: "Introduction to Arduino programming and digital I/O",
    content: `Arduino is an open-source microcontroller platform perfect for beginners.

Arduino UNO Specifications:
- Processor: ATmega328P at 16MHz
- Digital I/O: 14 pins (6 PWM capable)
- Analog inputs: 6 pins (10-bit ADC)
- RAM: 2KB, Flash: 32KB
- Operating voltage: 5V

Basic Arduino Sketch Structure:
\`\`\`cpp
void setup() {
  Serial.begin(9600);  // Initialize serial communication
  pinMode(13, OUTPUT); // Set pin 13 as output
}

void loop() {
  digitalWrite(13, HIGH); // Turn on LED
  delay(1000);           // Wait 1 second
  digitalWrite(13, LOW);  // Turn off LED
  delay(1000);
}\`\`\`

Key functions:
- digitalWrite(pin, HIGH/LOW): Set digital output
- digitalRead(pin): Read digital input
- analogRead(pin): Read analog value (0-1023)
- analogWrite(pin, value): PWM output (0-255)`,
    keyPoints: [
      "Arduino board overview",
      "Sketch structure",
      "Digital I/O operations",
      "Analog input reading",
      "PWM basics",
    ],
    videoUrl: "https://www.youtube.com/embed/nL34zDTPkcs",
    quiz: [
      {
        id: "1",
        question: "What is the PWM resolution on Arduino UNO?",
        options: ["8-bit (0-255)", "10-bit (0-1023)", "12-bit (0-4095)", "16-bit (0-65535)"],
        correctAnswer: 0,
        explanation: "Arduino UNO uses 8-bit PWM, giving values from 0-255",
      },
    ],
  },
  {
    id: "8",
    slug: "pwm-control",
    title: "PWM and Motor Control",
    category: "Applications",
    difficulty: "intermediate",
    duration: "60 minutes",
    description: "Master Pulse Width Modulation for controlling motors and brightness",
    content: `PWM (Pulse Width Modulation) controls power delivery by varying the duty cycle.

PWM Basics:
- Duty cycle = (Pulse width / Period) × 100%
- Frequency: How many cycles per second (Hz)
- Duty cycle 50% = average voltage is 50%

Example:
- 5V supply with 75% duty cycle = average 3.75V
- 5V supply with 25% duty cycle = average 1.25V

Applications:
- LED brightness control (variable duty cycle)
- Motor speed control (0-100% speed)
- Power supplies (switching regulators)
- Audio amplifiers (Class D amplification)

Arduino PWM:
\`\`\`cpp
analogWrite(pin, value); // value: 0-255 (0-100%)
\`\`\``,
    keyPoints: [
      "Duty cycle concept",
      "Frequency effects",
      "Arduino PWM usage",
      "Motor speed control",
      "LED brightness control",
    ],
    videoUrl: "https://www.youtube.com/embed/pgEZeY6eFXU",
    quiz: [
      {
        id: "1",
        question: "What Arduino analogWrite value gives 50% duty cycle?",
        options: ["50", "128", "200", "255"],
        correctAnswer: 1,
        explanation: "128 out of 255 = 50.2% duty cycle (128/255 ≈ 0.502)",
      },
    ],
  },
  {
    id: "9",
    slug: "digital-logic",
    title: "Digital Logic and Gates",
    category: "Circuit Theory",
    difficulty: "intermediate",
    duration: "70 minutes",
    description: "Understand Boolean algebra and digital logic gates",
    content: `Digital circuits use binary (0 and 1) logic to process information.

Basic Logic Gates:
- AND: Output HIGH only if ALL inputs are HIGH
- OR: Output HIGH if ANY input is HIGH
- NOT: Inverts the input
- NAND: AND followed by NOT
- NOR: OR followed by NOT
- XOR: Output HIGH if inputs are different

Truth Table Example (2-input AND):
| A | B | Output |
|---|---|--------|
| 0 | 0 | 0      |
| 0 | 1 | 0      |
| 1 | 0 | 0      |
| 1 | 1 | 1      |

Boolean Algebra:
- AND: A · B or A AND B
- OR: A + B or A OR B
- NOT: Ā or NOT A
- De Morgan's Laws: (A·B)' = Ā + B̄`,
    keyPoints: [
      "Logic gate truth tables",
      "Boolean algebra",
      "De Morgan's laws",
      "Combinational circuits",
      "Circuit simplification",
    ],
    videoUrl: "https://www.youtube.com/embed/K2sH0cITJhE",
    quiz: [
      {
        id: "1",
        question: "What is the output of a 2-input OR gate with inputs A=0 and B=1?",
        options: ["0", "1", "Undefined", "Oscillates"],
        correctAnswer: 1,
        explanation: "An OR gate outputs 1 if ANY input is 1. Since B=1, output is 1",
      },
    ],
  },
  {
    id: "10",
    slug: "sensors-basics",
    title: "Introduction to Sensors",
    category: "Components",
    difficulty: "beginner",
    duration: "55 minutes",
    description: "Learn about common sensors and their interfacing",
    content: `Sensors convert physical phenomena into electrical signals.

Common Sensors:
1. Temperature Sensors:
   - Thermistor: Resistance changes with temperature
   - DS18B20: Digital output, excellent accuracy
   - LM35: Linear voltage output

2. Distance Sensors:
   - Ultrasonic (HC-SR04): Measures distance via sound waves
   - IR Sensor: Detects infrared light
   - LIDAR: Laser-based distance measurement

3. Motion Sensors:
   - PIR Sensor: Detects infrared radiation from motion
   - Accelerometer: Measures acceleration
   - Gyroscope: Measures rotation rate

4. Environmental Sensors:
   - DHT11/22: Temperature and humidity
   - BMP180: Pressure sensor
   - Light sensor (LDR): Light intensity

Interfacing:
- Analog sensors → Analog input (0-5V)
- Digital sensors → Digital input or serial (I2C, SPI, UART)`,
    keyPoints: [
      "Sensor types and applications",
      "Analog sensor conditioning",
      "Digital sensor protocols",
      "Calibration methods",
      "Noise reduction techniques",
    ],
    videoUrl: "https://www.youtube.com/embed/NnXHSqbmkP8",
    quiz: [
      {
        id: "1",
        question: "Which sensor is best for measuring room temperature continuously?",
        options: ["PIR", "Thermistor", "DS18B20", "Accelerometer"],
        correctAnswer: 2,
        explanation: "DS18B20 is ideal for temperature sensing with digital output and good accuracy",
      },
    ],
  },
  {
    id: "11",
    slug: "communication-protocols",
    title: "Serial Communication Protocols",
    category: "Embedded Systems",
    difficulty: "intermediate",
    duration: "65 minutes",
    description: "Master UART, I2C, and SPI communication protocols",
    content: `Digital communication protocols enable microcontrollers to talk to sensors and other devices.

1. UART (Serial):
   - Asynchronous communication
   - Baud rates: 9600, 115200 etc.
   - Two wires: TX and RX
   - Used for debugging and simple peripherals

2. I2C (Inter-Integrated Circuit):
   - Synchronous, two-wire protocol
   - Multiple devices on same bus
   - Addresses: 7-bit or 10-bit
   - Speed: 100kHz, 400kHz, or 1MHz

3. SPI (Serial Peripheral Interface):
   - Synchronous, high-speed protocol
   - Four wires: MOSI, MISO, SCK, CS
   - Multiple slaves per master
   - Speed: up to 10MHz+

I2C Example:
\`\`\`cpp
#include <Wire.h>
Wire.begin();
Wire.beginTransmission(0x68); // Address of sensor
Wire.write(0x00); // Register
Wire.endTransmission();
\`\`\``,
    keyPoints: [
      "UART protocol basics",
      "I2C communication",
      "SPI communication",
      "Protocol selection",
      "Debugging serial communication",
    ],
    videoUrl: "https://www.youtube.com/embed/IyGwvGzrqp8",
    quiz: [
      {
        id: "1",
        question: "Which protocol allows multiple sensors on the same two wires?",
        options: ["UART", "I2C", "SPI", "Ethernet"],
        correctAnswer: 1,
        explanation: "I2C uses a shared two-wire bus (SDA and SCL) with addressing to support multiple devices",
      },
    ],
  },
  {
    id: "12",
    slug: "power-consumption",
    title: "Power Consumption and Efficiency",
    category: "Circuit Design",
    difficulty: "intermediate",
    duration: "50 minutes",
    description: "Calculate and optimize power consumption in circuits",
    content: `Understanding power is crucial for battery-powered and efficient systems.

Power Calculations:
- P = V × I (Watts)
- P = I² × R
- P = V² / R
- Energy = Power × Time (Watt-hours)

Power Dissipation in Components:
- Resistors: All electrical energy becomes heat
- Conductors: P = I² × R_resistance
- Transistors: P = V_CE × I_C (in saturation region)
- Diodes: P = V_forward × I

Efficiency:
- η = (Output Power / Input Power) × 100%
- Linear regulators: Lower efficiency with high voltage drop
- Switching regulators: Higher efficiency (85-95%)
- LED efficiency depends on wavelength

Power Saving Techniques:
- Use switching regulators instead of linear
- Lower clock frequencies in microcontrollers
- Use sleep modes
- Minimize current draw in standby`,
    keyPoints: [
      "Power equation variations",
      "Component power dissipation",
      "Efficiency calculations",
      "Heat management",
      "Low-power design techniques",
    ],
    videoUrl: "https://www.youtube.com/embed/1B1WIXn0s3o",
    quiz: [
      {
        id: "1",
        question:
          "A device runs on battery for 10 hours with average power consumption of 500mW. How much energy was consumed?",
        options: ["50Wh", "5Wh", "500Wh", "5000Wh"],
        correctAnswer: 0,
        explanation: "Energy = Power × Time = 0.5W × 10h = 5Wh",
      },
    ],
  },
  {
    id: "13",
    slug: "pcb-design",
    title: "PCB Design Fundamentals",
    category: "Circuit Design",
    difficulty: "intermediate",
    duration: "80 minutes",
    description: "Learn the basics of designing printed circuit boards",
    content: `PCB (Printed Circuit Board) design is the final step before manufacturing.

Design Process:
1. Schematic: Circuit diagram with component connections
2. Footprint: Physical size and pin layout of components
3. Layout: Placement of components and routing of traces
4. Manufacturing: CAM files and production

Design Rules:
- Trace width: Minimum 8mil for signals, 12mil for power
- Via size: Minimum 8mil drill
- Clearance: Minimum 8mil between traces
- Isolation: Adequate spacing for high voltage
- Ground plane: Continuous ground layer for stability

Best Practices:
- Place decoupling capacitors close to ICs
- Use ground plane for current return
- Minimize trace lengths
- Separate analog and digital grounds
- Use differential pairs for high-speed signals

Tools:
- KiCad: Free, open-source
- EagleCAD: Professional design tool
- Altium Designer: High-end PCB design`,
    keyPoints: [
      "Schematic to PCB workflow",
      "PCB design rules",
      "Component placement strategies",
      "Trace routing",
      "Manufacturability considerations",
    ],
    videoUrl: "https://www.youtube.com/embed/PXvXpSZwXPs",
    quiz: [
      {
        id: "1",
        question: "What is the minimum recommended clearance between PCB traces?",
        options: ["5mil", "8mil", "10mil", "15mil"],
        correctAnswer: 1,
        explanation: "Industry standard minimum clearance is 8mil (0.2mm) for signal traces",
      },
    ],
  },
  {
    id: "14",
    slug: "mosfet-amplifiers",
    title: "MOSFET Amplifier Design",
    category: "Applications",
    difficulty: "advanced",
    duration: "90 minutes",
    description: "Design analog amplifiers using MOSFET transistors",
    content: `MOSFETs are excellent for both digital switching and analog amplification.

Common Source Amplifier:
- Input at gate, output at drain
- Voltage gain: Av = -g_m × R_D
- Where g_m = transconductance (gm = I_D / V_GS in saturation)

Biasing:
- Establish quiescent point (Q-point)
- Design for maximum output swing
- Fixed bias, voltage divider, or current source bias

Small Signal Analysis:
- Remove DC sources
- Replace capacitors with shorts
- Analyze using equivalent circuit
- Calculate gain, input/output impedance

Classes of Amplifiers:
- Class A: Continuous conduction, low efficiency
- Class B: Push-pull, 180° conduction
- Class AB: Improved Class B with biasing
- Class D: Switching amplifier with PWM

Design Steps:
1. Choose MOSFET based on required power
2. Select R_D and R_S for desired gain and Q-point
3. Calculate coupling and bypass capacitors
4. Verify frequency response and stability`,
    keyPoints: [
      "MOSFET biasing techniques",
      "Small signal models",
      "Gain calculation",
      "Frequency response",
      "Stability analysis",
    ],
    videoUrl: "https://www.youtube.com/embed/d_Md3K9qGq8",
    quiz: [
      {
        id: "1",
        question: "In a common source amplifier, what determines the voltage gain?",
        options: ["Supply voltage", "Transconductance and load resistance", "Gate voltage", "Frequency"],
        correctAnswer: 1,
        explanation: "Voltage gain Av = -g_m × R_D, where g_m is transconductance and R_D is drain resistance",
      },
    ],
  },
  {
    id: "15",
    slug: "frequency-response",
    title: "Frequency Response and Filters",
    category: "Circuit Theory",
    difficulty: "intermediate",
    duration: "75 minutes",
    description: "Analyze circuit behavior across different frequencies",
    content: `Frequency response describes how a circuit behaves at different frequencies.

Key Concepts:
- Bandwidth: Range of frequencies over which circuit operates
- Cutoff frequency (-3dB point): Where gain drops 3dB from peak
- Rolloff: Rate of gain decrease outside bandwidth

Filter Types:
1. Low-pass filter: Passes frequencies below cutoff
   - Cutoff frequency: f_c = 1 / (2πRC)
   - Application: Noise removal, anti-aliasing

2. High-pass filter: Passes frequencies above cutoff
   - Cutoff frequency: f_c = 1 / (2πRC)
   - Application: AC coupling, rumble removal

3. Band-pass filter: Passes specific frequency range
   - Uses combination of high-pass and low-pass
   - Quality factor Q = f_center / bandwidth

4. Band-stop (notch) filter: Blocks specific frequencies

Bode Plot:
- Magnitude plot: Gain vs frequency (log scale)
- Phase plot: Phase shift vs frequency
- Shows frequency response graphically

Resonance in RLC Circuits:
- Resonant frequency: f_r = 1 / (2π√LC)
- At resonance: impedance is minimum for series, maximum for parallel
- Quality factor Q = ωL / R = 1 / (ωRC)`,
    keyPoints: [
      "Frequency response basics",
      "Cutoff frequency calculation",
      "Filter design",
      "Bode plots",
      "Resonance phenomena",
    ],
    videoUrl: "https://www.youtube.com/embed/vr-3EJLWEVQ",
    quiz: [
      {
        id: "1",
        question: "What is the -3dB cutoff frequency for an RC low-pass filter with R=1kΩ and C=100nF?",
        options: ["1.59kHz", "15.9kHz", "159kHz", "159Hz"],
        correctAnswer: 0,
        explanation: "f_c = 1/(2π×1000×100×10^-9) = 1/(6.28×10^-4) ≈ 1.59kHz",
      },
    ],
  },
  {
    id: "16",
    slug: "battery-systems",
    title: "Battery Technologies and Management",
    category: "Power Systems",
    difficulty: "intermediate",
    duration: "60 minutes",
    description: "Understand different battery types and charging systems",
    content: `Batteries are essential for portable electronics. Different chemistries suit different applications.

Common Battery Types:
1. Alkaline (AA, AAA, 9V):
   - Voltage: 1.5V per cell
   - Not rechargeable
   - Good for low-drain devices

2. Lithium-Ion (Li-Po, 18650):
   - Voltage: 3.7V nominal
   - Rechargeable
   - High energy density
   - Requires protection circuit

3. Nickel-Metal Hydride (NiMH):
   - Voltage: 1.2V per cell
   - Rechargeable
   - Good for high-drain devices

4. Lead-Acid (automotive):
   - Voltage: 2V per cell (12V for 6 cells)
   - Rechargeable
   - Heavy but robust

Battery Management:
- BMS (Battery Management System): Monitors and protects cells
- Over-charge protection: Stops charging when full
- Over-discharge protection: Stops use when too low
- Temperature monitoring: Prevents thermal runaway
- Cell balancing: Ensures even charge distribution

Battery Life Calculation:
- Runtime = Capacity (mAh) / Current Draw (mA)
- Example: 2000mAh battery with 100mA draw = 20 hours

Charging:
- Constant current (CC) stage: Charges at constant current
- Constant voltage (CV) stage: Maintains voltage as current decreases`,
    keyPoints: [
      "Battery chemistry types",
      "Voltage and capacity ratings",
      "Battery management systems",
      "Charging algorithms",
      "Safety considerations",
    ],
    videoUrl: "https://www.youtube.com/embed/4K3-V_4-5d0",
    quiz: [
      {
        id: "1",
        question: "What is the nominal voltage of a Li-Po battery cell?",
        options: ["1.5V", "2V", "3.7V", "12V"],
        correctAnswer: 2,
        explanation: "Lithium-Polymer (Li-Po) cells have a nominal voltage of 3.7V when fully charged (4.2V max)",
      },
    ],
  },
  {
    id: "17",
    slug: "op-amp-circuits",
    title: "Operational Amplifier Circuits",
    category: "Applications",
    difficulty: "advanced",
    duration: "85 minutes",
    description: "Master operational amplifier design and applications",
    content: `Operational amplifiers (op-amps) are versatile building blocks for analog circuits.

Ideal Op-Amp Properties:
- Infinite gain
- Infinite input impedance
- Zero output impedance
- Zero input offset voltage
- Infinite bandwidth
- Perfect common-mode rejection

Real Op-Amps (e.g., LM358, TL071):
- Open-loop gain: 100,000-1,000,000 (100-120 dB)
- Gain-bandwidth product: 1MHz to 10MHz
- Slew rate: 0.5V/µs to 13V/µs
- Input offset voltage: 1mV to 6mV

Common Configurations:
1. Inverting Amplifier:
   - Gain = -R_f / R_in
   - Input at inverting terminal

2. Non-inverting Amplifier:
   - Gain = 1 + R_f / R_g
   - Better input impedance

3. Summing Amplifier:
   - Adds multiple input signals
   - Used in mixers

4. Integrator:
   - Output = integral of input
   - Used in analog computers

5. Comparator:
   - Compares two voltages
   - Output saturates HIGH or LOW

Feedback Stability:
- Negative feedback: Most stable
- Positive feedback: Can cause oscillation
- Compensation: Using capacitors to stabilize`,
    keyPoints: [
      "Op-amp characteristics",
      "Ideal vs real op-amps",
      "Gain calculations",
      "Common circuits",
      "Stability and compensation",
    ],
    videoUrl: "https://www.youtube.com/embed/I9QXZ0RkOo0",
    quiz: [
      {
        id: "1",
        question: "What is the gain of a non-inverting amplifier with R_f=10kΩ and R_g=1kΩ?",
        options: ["10", "11", "1", "0.1"],
        correctAnswer: 1,
        explanation: "Gain = 1 + R_f/R_g = 1 + 10k/1k = 1 + 10 = 11",
      },
    ],
  },
  {
    id: "18",
    slug: "voltage-regulators",
    title: "Linear and Switching Regulators",
    category: "Power Systems",
    difficulty: "intermediate",
    duration: "70 minutes",
    description: "Design precise voltage regulation for various applications",
    content: `Voltage regulators maintain constant output voltage despite input and load variations.

Linear Regulators (LM7805, LM317):
- Simple, low noise
- Dissipate excess power as heat
- Efficiency = V_out / V_in (poor with high V_drop)
- Dropout voltage: Minimum input > output + dropout

Fixed Output (LM78XX Series):
- Preset voltages: 5V, 12V, 15V, etc.
- Three terminals: Vin, GND, Vout
- Typical current: 500mA to 1A
- Requires input/output capacitors for stability

Adjustable Output (LM317):
- Output voltage: V_out = 1.25V × (1 + R2/R1)
- Reference voltage: 1.25V
- Maximum current: 1.5A
- More flexibility than fixed regulators

Switching Regulators (Buck, Boost, Buck-Boost):
- Higher efficiency (85-95%)
- Use PWM to control output
- Can step voltage up or down
- More complex, higher noise

Buck Converter:
- Steps down voltage
- Efficiency: η = V_out / V_in (with losses)
- Output voltage: V_out = V_in × D (D = duty cycle)

Applications:
- Microcontroller power: 3.3V, 5V
- Sensor power: 2.5V, 10V
- Motor drives: Variable voltage
- Battery charging: Constant current/voltage`,
    keyPoints: [
      "Linear regulator design",
      "Switching regulator topologies",
      "Dropout voltage effects",
      "Efficiency calculations",
      "Thermal management",
    ],
    videoUrl: "https://www.youtube.com/embed/gZwKLZTTxNs",
    quiz: [
      {
        id: "1",
        question: "What is the output voltage of an LM317 with R1=240Ω and R2=2.4kΩ?",
        options: ["1.25V", "2.5V", "13.75V", "12.5V"],
        correctAnswer: 2,
        explanation: "V_out = 1.25V × (1 + 2400/240) = 1.25V × 11 = 13.75V",
      },
    ],
  },
  {
    id: "19",
    slug: "motor-control",
    title: "Motor Control and Drivers",
    category: "Applications",
    difficulty: "intermediate",
    duration: "75 minutes",
    description: "Control DC, stepper, and servo motors with electronics",
    content: `Motors convert electrical energy to mechanical motion. Proper control is essential.

DC Motor Characteristics:
- Speed proportional to voltage
- Torque proportional to current
- Requires current limiting resistor or driver
- Back-EMF: Counter voltage when spinning

Speed Control:
- Fixed voltage: Simple but less efficient
- PWM control: Variable duty cycle for smooth speed control
- Voltage variation: Using series resistor or regulator

DC Motor Driver (L298N, L9110S):
- Can reverse direction
- PWM speed control
- Current limiting protection
- Typical current: 2-3A

Stepper Motors:
- Precise position control
- Step size: 0.9° or 1.8° per step
- NEMA sizes: 17, 23, 34 (frame size)
- Requires sequenced pulses

Stepper Driver:
\`\`\`
Step sequence for 4-coil stepper (full step):
Coil A | Coil B | Coil C | Coil D
  1   |  0    |  0    |  0
  1   |  1    |  0    |  0
  0   |  1    |  0    |  0
  0   |  1    |  1    |  0
\`\`\`

Servo Motors:
- Built-in position feedback
- Controlled by pulse width (1-2ms)
- Typical range: 0-180°
- Precise positioning

Control Circuit:
- Arduino PWM pin for PWM signal
- Motor driver for current amplification
- Protection diodes for back-EMF`,
    keyPoints: [
      "DC motor characteristics",
      "Speed and direction control",
      "Motor driver selection",
      "Stepper motor control",
      "Servo positioning",
    ],
    videoUrl: "https://www.youtube.com/embed/H5bAGGPV6xg",
    quiz: [
      {
        id: "1",
        question: "What is the purpose of the diode across a DC motor in a driver circuit?",
        options: ["Protect against back-EMF", "Limit current", "Smooth power", "Regulate voltage"],
        correctAnswer: 0,
        explanation:
          "The diode (flyback diode) protects the driver from damaging back-EMF spikes when the motor turns off",
      },
    ],
  },
  {
    id: "20",
    slug: "iot-fundamentals",
    title: "IoT Systems and Wireless Communication",
    category: "Embedded Systems",
    difficulty: "intermediate",
    duration: "80 minutes",
    description: "Build connected IoT systems with wireless protocols",
    content: `IoT (Internet of Things) connects physical devices to the internet for remote monitoring and control.

Popular Wireless Protocols:
1. WiFi (IEEE 802.11):
   - Range: 50-100m
   - Speed: 11-867Mbps
   - Power consumption: High (mW range)
   - Modules: ESP8266, ESP32

2. Bluetooth Low Energy (BLE):
   - Range: 10-100m
   - Speed: 1-2Mbps
   - Power consumption: Low (µW range)
   - Modules: HM-10, nRF52832

3. LoRaWAN:
   - Range: 2-10km
   - Speed: 0.3-50kbps
   - Power consumption: Ultra-low
   - Ideal for wide-area networks

4. Cellular (LTE-M, NB-IoT):
   - Range: Coverage dependent
   - Speed: 250kbps-1Mbps
   - Power consumption: Low-moderate
   - Modules: Quectel, u-blox

5. Zigbee:
   - Range: 10-100m
   - Speed: 250kbps
   - Power consumption: Low
   - Mesh networking capability

IoT Architecture:
- Sensor/Device → Gateway → Cloud → Application

Security Considerations:
- Encryption: AES-256 for data
- Authentication: SSL/TLS certificates
- Firmware updates: Secure OTA updates
- Access control: Token-based authentication

Popular Platforms:
- Arduino with WiFi shield
- Raspberry Pi for gateway
- ESP32 for autonomous nodes
- MQTT for message broker`,
    keyPoints: [
      "WiFi and Bluetooth protocols",
      "LoRa and Cellular technologies",
      "Network architecture",
      "Security implementation",
      "Cloud integration",
    ],
    videoUrl: "https://www.youtube.com/embed/8m1Nv2wXW3I",
    quiz: [
      {
        id: "1",
        question: "Which wireless protocol is best for long-range, low-power IoT applications?",
        options: ["WiFi", "Bluetooth", "LoRaWAN", "Zigbee"],
        correctAnswer: 2,
        explanation: "LoRaWAN offers the best combination of range (2-10km) and low power consumption for IoT",
      },
    ],
  },
]

export const COMPONENTS: Component[] = [
  {
    id: "resistor",
    slug: "resistor",
    name: "Resistor",
    category: "Passive",
    symbol: "R",
    unit: "Ω (Ohm)",
    shortDescription: "Limits electric current flow",
    description: "A resistor is a passive electrical component that opposes the flow of electric current.",
    overview:
      "Resistors are fundamental components in circuit design. They limit current flow and divide voltage. Common types include carbon film, metal film, and wire-wound resistors. Color bands indicate resistance values and tolerance.",
    typicalValues: "1Ω to 10MΩ",
    applications: ["Current Limiting", "Voltage Division", "Pull-up/Pull-down Networks", "Timing Circuits"],
  },
  {
    id: "capacitor",
    slug: "capacitor",
    name: "Capacitor",
    category: "Passive",
    symbol: "C",
    unit: "F (Farad)",
    shortDescription: "Stores electrical energy",
    description: "A capacitor is a passive electrical component that stores electrical energy in an electric field.",
    overview:
      "Capacitors store charge and release it when needed. Types include ceramic, electrolytic, and film capacitors. They are used for filtering, timing, and energy storage applications.",
    typicalValues: "1pF to 10F",
    applications: ["Power Supply Filtering", "AC Coupling", "Timing Circuits", "Energy Storage"],
  },
  {
    id: "transistor-npn",
    slug: "transistor-npn",
    name: "NPN Transistor",
    category: "Active",
    symbol: "Q",
    unit: "N/A",
    shortDescription: "Amplifies or switches current",
    description:
      "An NPN bipolar junction transistor (BJT) is an active semiconductor device used for amplification and switching.",
    overview:
      "Transistors are the building blocks of modern electronics. NPN transistors conduct when the base is high. Common types include 2N2222, 2N3904, and 2N7000. Used in amplifiers, switches, and logic circuits.",
    applications: ["Signal Amplification", "Switching Applications", "Logic Gates", "Oscillators"],
  },
  {
    id: "diode",
    slug: "diode",
    name: "Diode",
    category: "Passive",
    symbol: "D",
    unit: "N/A",
    shortDescription: "Allows current in one direction",
    description: "A diode is a semiconductor component that allows current to flow in one direction only.",
    overview:
      "Diodes are fundamental rectifiers. Types include general-purpose, Schottky, and Zener diodes. Forward bias conducts, reverse bias blocks. Commonly used in power supplies and protection circuits.",
    applications: ["Rectification", "Reverse Polarity Protection", "Clipping Circuits", "Voltage Regulation"],
  },
  {
    id: "inductor",
    slug: "inductor",
    name: "Inductor",
    category: "Passive",
    symbol: "L",
    unit: "H (Henry)",
    shortDescription: "Stores energy in magnetic field",
    description:
      "An inductor is a passive component that stores energy in a magnetic field when current flows through it.",
    overview:
      "Inductors oppose changes in current flow. They are used in filtering and tuning circuits. Composed of wire wound around a core. Common types include air-core and ferrite-core inductors.",
    typicalValues: "1µH to 10H",
    applications: ["Power Supply Filtering", "RF Tuning", "Energy Storage", "Signal Filtering"],
  },
  {
    id: "ic-555",
    slug: "ic-555",
    name: "IC 555 Timer",
    category: "Integrated Circuit",
    symbol: "U",
    unit: "N/A",
    shortDescription: "Versatile timing and oscillation IC",
    description:
      "The NE555 is a versatile integrated circuit that can operate as a timer, oscillator, or pulse generator.",
    overview:
      "The 555 timer is one of the most popular ICs. Can be configured in astable or monostable mode. Used for timing delays, pulse generation, and frequency control in countless applications.",
    applications: ["Timers", "Oscillators", "Pulse Generators", "LED Flashers"],
  },
]

export const TUTORIALS: Tutorial[] = [
  {
    id: "led-blinker",
    title: "Build a LED Blinker with Arduino",
    description: "Learn how to make an LED blink on and off using an Arduino microcontroller.",
    difficulty: "beginner",
    duration: "30 minutes",
  },
  {
    id: "power-supply",
    title: "Designing a Basic Power Supply",
    description: "Understand how to design a regulated power supply from transformer to output.",
    difficulty: "intermediate",
    duration: "2 hours",
  },
  {
    id: "mosfet-intro",
    title: "Introduction to MOSFETs",
    description: "Learn about Metal-Oxide-Semiconductor Field-Effect Transistors and their applications.",
    difficulty: "intermediate",
    duration: "1.5 hours",
  },
  {
    id: "audio-amplifier",
    title: "Design and Build an Audio Amplifier",
    description: "Create a simple audio amplifier using op-amps or transistors.",
    difficulty: "advanced",
    duration: "3 hours",
  },
]

export const CHAT_RULES: any = [
  {
    keywords: ["resistor", "resistance", "ohm"],
    response:
      "A resistor is a passive component that limits electric current flow in a circuit. It's measured in ohms (Ω). Resistors are used for current limiting, voltage division, and setting circuit biasing. The resistance value is often indicated by color bands: black=0, brown=1, red=2, orange=3, yellow=4, green=5, blue=6, violet=7, grey=8, white=9.",
    followUp: ["Show resistor color code", "Explain Ohm's law", "How to read a datasheet"],
  },
  {
    keywords: ["ohm", "law", "voltage", "current", "resistance"],
    response:
      "Ohm's Law states that V = I × R, where:\n• V = Voltage (volts)\n• I = Current (amperes)\n• R = Resistance (ohms)\n\nExample: If you have a 10Ω resistor with 5V across it, the current = 5V ÷ 10Ω = 0.5A",
    followUp: ["More examples", "Power calculations", "Circuit analysis"],
  },
  {
    keywords: ["capacitor", "capacitance", "farads", "filter"],
    response:
      "A capacitor is a component that stores electrical energy in an electric field. Measured in Farads (F), with common values in microfarads (µF) and nanofarads (nF). Capacitors are used in power supply filters, signal coupling, and timing circuits. They allow AC signals to pass while blocking DC.",
    followUp: ["Types of capacitors", "RC time constant", "Filter design"],
  },
  {
    keywords: ["transistor", "bjt", "mosfet", "amplify", "switch"],
    response:
      "Transistors are active semiconductor devices used for amplification and switching. Two main types:\n• BJTs (Bipolar Junction Transistors): NPN and PNP types\n• MOSFETs (Metal-Oxide-Semiconductor FETs): N-channel and P-channel types\n\nThey form the basis of all modern electronics, from microprocessors to power amplifiers.",
    followUp: ["BJT vs MOSFET", "Transistor biasing", "Common configurations"],
  },
  {
    keywords: ["diode", "rectify", "forward", "reverse", "led"],
    response:
      "A diode is a semiconductor with two terminals (anode and cathode) that conducts when forward-biased and blocks when reverse-biased. Uses include:\n• Rectification (converting AC to DC)\n• Reverse polarity protection\n• Clipping and clamping circuits\n• LEDs for light emission\n\nForward voltage drop is typically 0.7V for silicon diodes.",
    followUp: ["Rectifier circuits", "LED specifications", "Protection diodes"],
  },
  {
    keywords: ["arduino", "microcontroller", "program", "code"],
    response:
      "Arduino is an open-source microcontroller platform perfect for beginners and professionals. The Arduino UNO is the most popular board with:\n• 14 digital I/O pins\n• 6 analog input pins\n• 16 MHz processor\n• 32KB flash memory\n\nGreat for learning electronics and building IoT projects!",
    followUp: ["Arduino basics", "Digital I/O", "Analog input/output"],
  },
  {
    keywords: ["beginner", "start", "learn", "project", "simple"],
    response:
      "Here are 3 great beginner projects:\n\n1. **LED Blinker** - Blink an LED using Arduino (30 mins)\n2. **Button Counter** - Press a button to count on a display (1 hour)\n3. **Temperature Monitor** - Read a sensor and display readings (1.5 hours)\n\nEach teaches fundamental concepts. Start with the LED blinker!",
    followUp: ["Show LED circuit", "Button wiring", "Sensor setup"],
  },
  {
    keywords: ["color", "code", "band", "resistor"],
    response:
      "Resistor color code bands (left to right):\n• **1st band** = First digit\n• **2nd band** = Second digit\n• **3rd band** = Multiplier (power of 10)\n• **4th band** = Tolerance (usually gold=5% or silver=10%)\n\nExample: Brown-Black-Red-Gold = 10×100 Ω = 1000Ω (5% tolerance)",
    followUp: ["More examples", "Tolerance explanation", "Practice problems"],
  },
]

export const APPLICATIONS = [
  {
    name: "Power Systems",
    description: "AC and DC power supplies, voltage regulation, and power distribution",
    topics: ["Linear Regulators", "Switching Power Supplies", "UPS Systems"],
  },
  {
    name: "Embedded Systems",
    description: "Microcontroller-based systems and IoT applications",
    topics: ["Arduino Development", "Sensor Integration", "Communication Protocols"],
  },
  {
    name: "IoT & Connectivity",
    description: "Internet-connected devices and wireless communication",
    topics: ["WiFi Modules", "Bluetooth Devices", "MQTT Networks"],
  },
  {
    name: "Robotics",
    description: "Motor control and robotic systems",
    topics: ["DC Motor Control", "Servo Motors", "Sensor Integration"],
  },
]
