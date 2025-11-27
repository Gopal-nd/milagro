# Electro - Interactive Electronics Lab

A stunning, fully-functional Next.js application for learning electronics with interactive 3D visualizations, simulations, and an AI-powered chatbot assistant.

## Features

### 🎯 Core Features
- **Interactive Learning**: Explore electronic components with detailed explanations and interactive simulations
- **Component Library**: Browse 6+ components (resistors, capacitors, transistors, diodes, inductors, ICs)
- **Component Detail Pages**: Each component has overview, technical specs, applications, and resources
- **Learning Resources**: Curated tutorials, downloadable PDFs, and external references
- **Applications Guide**: Explore real-world use cases (Power Systems, Embedded Systems, IoT, Robotics)
- **Chatbot Assistant**: Rule-based "Electro" chatbot that answers electronics questions in real-time
- **Dark Mode**: Beautiful futuristic dark theme with neon accents (electric blue, golden highlights, cyan)
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **Glassmorphism UI**: Modern glass panels with blur effects and smooth animations
- **LocalStorage Persistence**: Chat history and preferences saved automatically

### 🤖 Chatbot Features
- **Rule-Based AI**: Intelligent fuzzy matching for user queries
- **Quick Suggestions**: Context-aware follow-up suggestions
- **Typing Indicators**: Realistic thinking animation
- **Conversation History**: Persistent chat stored in browser
- **Clear History**: One-click conversation reset
- **15+ Q&A Pairs**: Pre-trained responses for common electronics questions

### 📚 Interactive Demos
- **Ohm's Law Simulator**: Real-time calculations with V, I, R, P sliders
- **Resistor Color Code**: Interactive color band selector with live resistance calculation
- **Visual Feedback**: Animated components respond to parameter changes

### 🎨 Design System
- **Neon Color Palette**: Primary (electric blue #00bcd4), Accent (gold #ffca28), Secondary (cyan)
- **Typography**: Geist Sans for body, Geist Mono for code
- **Animations**: Smooth Framer Motion transitions and micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, reduced-motion support

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom utilities
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui + Headless UI
- **Icons**: Lucide React
- **State Management**: React Hooks + LocalStorage
- **Data**: Seed data with component library, tutorials, applications

## Project Structure

\`\`\`
.
├── app/
│   ├── page.tsx                 # Landing page
│   ├── components/              # Components library pages
│   │   ├── page.tsx             # All components grid
│   │   └── [slug]/page.tsx      # Individual component detail
│   ├── resources/               # Learning resources page
│   ├── applications/            # Electronics applications page
│   ├── layout.tsx               # Root layout with metadata
│   └── globals.css              # Theme tokens and utilities
├── components/
│   ├── header.tsx               # Navigation header
│   ├── hero.tsx                 # Landing hero section
│   ├── footer.tsx               # Footer
│   ├── chat-widget.tsx          # Chatbot UI
│   ├── component-card.tsx       # Component preview card
│   ├── component-detail-content.tsx  # Component detail page
│   ├── providers.tsx            # App providers wrapper
│   ├── featured-section.tsx     # Featured components section
│   └── interactive-demos/       # Interactive simulators
│       ├── ohms-law-simulator.tsx
│       └── resistor-color-code.tsx
├── hooks/
│   └── use-chat.ts              # Chat logic hook
├── lib/
│   ├── seed-data.ts             # Component data, tutorials, Q&A rules
│   ├── chatbot-engine.ts        # Rule-based chatbot logic
│   └── utils.ts                 # Utility functions
└── public/                      # Static assets
\`\`\`

## Getting Started

### Installation

\`\`\`bash
# Clone or download the project
cd electro

# Install dependencies (if needed)
npm install

# Run development server
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

### Features to Try

1. **Landing Page**: Scroll through the hero section and featured components
2. **Components Library** (`/components`): Filter by category, explore component details
3. **Resistor Details** (`/components/resistor`): Try the interactive resistor color code simulator
4. **Resources Page** (`/resources`): Browse tutorials and downloadable materials
5. **Applications Page** (`/applications`): Discover real-world electronics applications
6. **Chatbot**: Click the floating button (bottom-right) to chat with Electro
   - Ask about resistors, Ohm's law, Arduino, transistors, etc.
   - Click quick suggestion chips for common questions

## Chatbot Examples

Try asking:
- "What is a resistor?"
- "Explain Ohm's law"
- "How to read resistor color code"
- "Beginner projects"
- "What is Arduino?"
- "AC vs DC"
- "How to solder"

## Customization

### Adding Components

Edit `lib/seed-data.ts` and add to the `COMPONENTS` array:

\`\`\`typescript
{
  id: 'new-component',
  slug: 'new-component',
  name: 'Component Name',
  category: 'Passive',
  symbol: 'C',
  unit: 'F',
  shortDescription: 'Brief description',
  description: 'Full description',
  overview: 'Detailed overview',
  typicalValues: '1µF to 10F',
  applications: ['Use case 1', 'Use case 2'],
}
\`\`\`

### Adding Chatbot Q&A

Edit `lib/seed-data.ts` and add to the `CHAT_RULES` array:

\`\`\`typescript
{
  keywords: ['question', 'keywords'],
  response: 'Your answer here',
  followUp: ['Follow-up suggestion 1', 'Follow-up suggestion 2'],
}
\`\`\`

### Theming

All colors are defined in `app/globals.css` using CSS custom properties:

\`\`\`css
--neon-blue: oklch(0.5 0.2 262);
--neon-cyan: oklch(0.45 0.15 175);
--neon-gold: oklch(0.75 0.2 48);
--dark-bg: oklch(0.08 0 0);
\`\`\`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Fast page loads with Next.js optimization
- Lazy-loaded component details
- Efficient animations with GPU acceleration
- LocalStorage caching for chat history
- Minimal bundle size with tree-shaking

## Accessibility

- ♿ ARIA labels on all interactive elements
- ⌨️ Full keyboard navigation support
- 🎨 High contrast neon theme for visibility
- 📱 Mobile-friendly touch targets
- ⚡ Respects `prefers-reduced-motion` setting

## Roadmap / Enhancement Ideas

- [ ] Add 3D component visualizations with Three.js/React Three Fiber
- [ ] OpenAI/Gemini integration for advanced chatbot responses
- [ ] Circuit builder/simulator with drag-and-drop components
- [ ] Video tutorials embedded on component pages
- [ ] User accounts for saved projects and progress tracking
- [ ] Interactive breadboard builder
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Export chat as PDF
- [ ] Advanced filter and search for components

## Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Deploy to Other Platforms

The app is fully static and can be deployed to any Next.js hosting:

\`\`\`bash
npm run build
npm run start
\`\`\`

## Environment Variables

No external API keys required for the default rule-based chatbot. All data is stored locally.

For optional OpenAI integration (future enhancement):
\`\`\`
NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
\`\`\`

## Development Notes

- Uses Next.js App Router (not Pages Router)
- TypeScript strict mode enabled
- Tailwind CSS v4 with custom theme tokens
- Framer Motion for smooth animations
- Component data is static (can be replaced with API calls)
- Chat is purely client-side (no backend required)
- Mobile-first responsive design

## License

MIT - Free to use and modify

## Support

For issues or suggestions, consider:
1. Checking the chatbot for electronics questions
2. Reviewing the components library for reference information
3. Checking the resources page for external documentation
4. Customizing the seed data for your needs

---

**Built with ❤️ for electronics enthusiasts and learners**

Questions? Ask Electro in the chat widget!
