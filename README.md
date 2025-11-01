# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# AgentMail - AI-Powered Content Creation Platform

![React](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.24-0055FF)

A cutting-edge AI-powered platform that helps content creators brainstorm viral video ideas, analyze content, and generate optimized social media reels. Built with React, Vite, and modern UI components for a seamless user experience.

## 🚀 Features

### Core Functionality

- **🎬 Brainstorm Video Ideas**: Enter a topic or niche and get AI-generated content ideas with scripts, timelines, hashtags, and viral potential analysis
- **📤 Upload & Distribute**: Upload videos via URL or file upload to get optimized reels with captions, hashtags, and performance metrics
- **🤖 AI Agent System**: Three specialized AI agents working together:
  - **Reel Agent**: Creates and optimizes short-form video content
  - **Intelligence Agent**: Analyzes content performance and provides insights
  - **Automation Agent**: Handles distribution and scheduling

### UI/UX Features

- **✨ Smooth Animations**: Scroll-triggered animations using Framer Motion
- **🎨 Modern Design**: Beautiful gradient backgrounds, glassmorphism effects, and gold/pink theme
- **📱 Responsive**: Fully responsive design for all screen sizes
- **🎯 Interactive Components**: 
  - Expandable cards with detailed views
  - Animated beam diagrams for AI agent visualization
  - Multi-step loading indicators
  - Placeholder vanishing input fields
  - Side panels with detailed information

### Platform Support

- YouTube
- TikTok
- Instagram
- LinkedIn
- Pinterest
- Reddit
- Twitch

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Configuration](#configuration)
- [API Integration](#api-integration)
- [Components](#components)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aditya-N18/agentmail.git
   cd agentmail
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables** (if needed)
   ```bash
   # Create a .env file in the root directory
   # Add any required API endpoints or configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

## 💻 Usage

### Brainstorm Video Ideas

1. Click **"Get Started"** or **"🎬 Brainstorm Video Ideas"** button
2. Enter your topic, niche, or content idea in the input field
3. Submit the form (press Enter or click submit)
4. Wait for the AI to generate multiple content ideas
5. Browse through the generated ideas in card format
6. Click on any card to view detailed information including:
   - Summary and description
   - Script with timeline
   - Style, mood, and tone
   - Suggested hashtags
   - Viral potential metrics

### Upload & Distribute

1. Click **"📤 Upload & Distribute"** button
2. Choose input method:
   - **URL**: Paste a video URL from YouTube, TikTok, or Instagram
   - **File Upload**: Select a video file from your device
3. Submit for processing
4. View the generated reel with:
   - Optimized video
   - Caption and description
   - Hashtags and keywords
   - Performance metrics (CTR, Virality Score)

### Navigation

- Use the top navigation bar to access different sections
- Sections include: Features, Pricing, Use Cases, About
- Smooth scrolling animations trigger as you navigate

## 📁 Project Structure

```
frontend/
├── public/
│   └── vite.svg                 # Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg          # React logo
│   ├── components/
│   │   ├── images/            # Platform logos (YouTube, TikTok, etc.)
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── animated-beam.jsx
│   │   │   ├── background-gradient-animation.jsx
│   │   │   ├── dotted-glow-background.jsx
│   │   │   ├── multi-step-loader.jsx
│   │   │   ├── placeholders-and-vanish-input.jsx
│   │   │   ├── resizable-navbar.jsx
│   │   │   ├── side-panel.jsx
│   │   │   └── timeline.jsx
│   │   ├── expandable-card-demo-grid.jsx
│   │   └── expandable-card-demo-standard.jsx
│   ├── hooks/
│   │   └── use-outside-click.jsx    # Custom hook for outside click detection
│   ├── lib/
│   │   └── utils.js                  # Utility functions (cn helper)
│   ├── pages/
│   │   ├── BrainstormPage.jsx        # Brainstorm ideas page
│   │   └── UploadPage.jsx           # Upload & distribute page
│   ├── App.jsx                       # Main application component
│   ├── App.css                       # Application styles
│   ├── index.css                     # Global styles and Tailwind imports
│   └── main.jsx                      # Application entry point
├── .gitignore
├── components.json                   # ShadCN components configuration
├── eslint.config.js                  # ESLint configuration
├── index.html                        # HTML template
├── jsconfig.json                     # JavaScript configuration
├── package.json                      # Dependencies and scripts
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Tailwind CSS configuration
└── vite.config.js                    # Vite configuration
```

## 🛠️ Technologies Used

### Core Framework
- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server

### Styling
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **PostCSS** - CSS processing

### Animation & UI
- **Framer Motion 12.23.24** - Animation library
- **Lucide React** - Icon library
- **@tabler/icons-react** - Additional icons

### Utilities
- **clsx** - Conditional class names
- **tailwind-merge** - Merge Tailwind classes
- **class-variance-authority** - Component variants

### Development Tools
- **ESLint** - Code linting
- **TypeScript types** - Type definitions for React

## ⚙️ Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- Custom color palette (gold, pink, dark themes)
- Animation utilities
- Custom spacing and sizing

See `tailwind.config.js` for full configuration.

### API Endpoints

The application connects to backend services:

#### Brainstorm API
```javascript
POST https://submammary-correlatively-irma.ngrok-free.dev/webhook/trends-fetch232
Body: { topic: "user input" }
```

#### Upload & Analyze API
```javascript
POST https://submammary-correlatively-irma.ngrok-free.dev/webhook/reelcrafter/analyze
Body: FormData with either:
  - file: File object (for file upload)
  - url: string (for URL input)
```

### Custom Colors

The project uses a custom color scheme defined in Tailwind config:
- `gold-dark`, `gold-light` - Gold color variants
- `pink-bright`, `pink-dark` - Pink color variants
- `dark-000`, `dark-100`, `dark-200` - Dark theme variants

## 🧩 Components

### Core Pages

#### `BrainstormPage`
Main page for generating content ideas.
- Features: Input field, multi-step loader, expandable result cards
- API: Connects to trends-fetch232 endpoint
- Displays: Scripts, timelines, hashtags, viral metrics

#### `UploadPage`
Page for uploading and processing videos.
- Features: URL/file upload toggle, file picker, video display
- API: Connects to reelcrafter/analyze endpoint
- Displays: Generated videos, captions, performance metrics

### UI Components

#### `AnimatedBeam`
Draws animated SVG beams between React refs. Used in the "Powered by AI Agents" section to visualize agent connections.

#### `BackgroundGradientAnimation`
Creates animated gradient backgrounds with interactive particles.

#### `MultiStepLoader`
Displays a multi-step loading animation with customizable steps. Used during API calls.

#### `PlaceholdersAndVanishInput`
Input field with rotating placeholders that vanish on focus.

#### `SidePanel`
Resizable side panel component for displaying detailed information.

#### `Timeline`
Vertical timeline component with scroll-triggered animations.

#### `ResizableNavbar`
Responsive navigation bar with mobile menu support.

## 🚀 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Server

The development server runs on `http://localhost:5173` by default (Vite's default port).

### Hot Module Replacement (HMR)

The project uses Vite's HMR for instant updates during development. Changes to files will automatically reload in the browser.

### Code Style

The project uses ESLint for code quality. Run `npm run lint` to check for issues.

## 📦 Building for Production

### Build Command

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Build Output

- Optimized JavaScript bundles
- Minified CSS
- Optimized assets
- Production-ready HTML

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## 🔌 API Integration

### Request Format

#### Brainstorm Endpoint
```javascript
fetch('https://submammary-correlatively-irma.ngrok-free.dev/webhook/trends-fetch232', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ topic: 'user input' }),
})
```

#### Upload Endpoint
```javascript
const formData = new FormData()
formData.append('file', file) // or formData.append('url', urlString)

fetch('https://submammary-correlatively-irma.ngrok-free.dev/webhook/reelcrafter/analyze', {
  method: 'POST',
  body: formData,
})
```

### Response Handling

Both endpoints return JSON responses. Error handling includes:
- Connection errors
- Empty responses
- JSON parsing errors
- User-friendly error messages

## 🎨 Styling Guide

### Color Scheme

- **Primary Gold**: `#E3AA05`, `#FA9C2B`
- **Primary Pink**: `#8E1A54`, `#C22373`
- **Dark Theme**: `#000000`, `#0A0A0A`, `#141414`

### Typography

- Headings use bold weights
- Body text uses medium/regular weights
- Consistent spacing using Tailwind's spacing scale

### Animations

- Scroll-triggered: Sections animate in on scroll
- Smooth transitions: 0.6s duration with easing
- Loading animations: Continuous loop until completion

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill the process using port 5173 or change the port in vite.config.js
```

**Module not found**
```bash
# Delete node_modules and package-lock.json, then reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Follow ESLint rules
- Use meaningful variable names
- Comment complex logic
- Maintain consistent code style

## 📝 License

This project is private and proprietary.

## 👥 Authors

- **Aditya-N18** - Initial work

## 🙏 Acknowledgments

- Vite team for the excellent build tool
- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- ShadCN for UI component patterns

## 📞 Support

For support, please open an issue in the GitHub repository or contact the project maintainers.

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Saved projects and history
- [ ] Advanced analytics dashboard
- [ ] Batch processing for multiple videos
- [ ] Custom AI agent configurations
- [ ] Integration with more platforms
- [ ] Real-time collaboration features
- [ ] Export functionality for scripts and assets

---

**Built with ❤️ using React, Vite, and modern web technologies**

