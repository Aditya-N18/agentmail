import { Brain, FileText, Rocket, TrendingUp, PenTool, Scissors, Share2, Users, Building2, Network, Check, Zap, Sparkles } from 'lucide-react'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './App.css'
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation'
import YouTubeLogo from './components/images/youtube-svgrepo-com.svg'
import TikTokLogo from './components/images/Tiktok_icon.svg.png'
import InstagramLogo from './components/images/instagram-svgrepo-com.svg'
import LinkedInLogo from './components/images/linkedin-svgrepo-com.svg'
import PinterestLogo from './components/images/pinterest-svgrepo-com.svg'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from './components/ui/resizable-navbar'
import { Timeline } from './components/ui/timeline'
import { AnimatedBeam } from './components/ui/animated-beam'
import { SidePanel } from './components/ui/side-panel'
import { X } from 'lucide-react'
import BrainstormPage from './pages/BrainstormPage'
import UploadPage from './pages/UploadPage'

// Animated Section Component
function AnimatedSection({ children, className = '', delay = 0, id }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.section>
  )
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openPanel, setOpenPanel] = useState(null) // 'reel', 'intelligence', 'automation', or null
  const [showBrainstorm, setShowBrainstorm] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const containerRef = useRef(null)
  const userRef = useRef(null)
  const managerRef = useRef(null)
  const reelRef = useRef(null)
  const intelligenceRef = useRef(null)
  const automationRef = useRef(null)

  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Use Cases",
      link: "#use-cases",
    },
    {
      name: "About",
      link: "#about",
    },
  ]

  if (showBrainstorm) {
    return <BrainstormPage onBack={() => setShowBrainstorm(false)} />
  }

  if (showUpload) {
    return <UploadPage onBack={() => setShowUpload(false)} />
  }

  return (
    <div className="bg-dark-000 text-white min-h-screen">
      {/* Navigation Bar */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Sign In</NavbarButton>
            <NavbarButton variant="primary" onClick={() => setShowBrainstorm(true)}>Get Started</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-gray-300 hover:text-white"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                Sign In
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Get Started
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-000">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(0, 0, 0)"
          gradientBackgroundEnd="rgb(10, 10, 10)"
          firstColor="227, 170, 5"
          secondColor="142, 26, 84"
          thirdColor="250, 197, 43"
          fourthColor="194, 35, 115"
          fifthColor="227, 170, 5"
          pointerColor="142, 26, 84"
          size="60%"
          blendingValue="hard-light"
          interactive={true}
          containerClassName="absolute inset-0 w-full h-full pointer-events-none"
        />
        <div className="relative z-10 pt-24 pb-20 w-full">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <div className="mb-6">
              <span className="text-sm text-gray-400 tracking-wider uppercase">AI-POWERED CONTENT CREATION</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your <span className="bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent">AI-Powered</span> Social Media Empire Starts Here
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              From idea to viral content in minutes. Let AI handle brainstorming, scripting, editing, and multi-platform distribution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => setShowBrainstorm(true)}
                className="bg-gradient-to-r from-gold-dark to-gold-light text-black font-semibold px-8 py-4 rounded-lg text-lg hover:shadow-lg hover:shadow-gold-dark/50 transition-all">
                🎬 Brainstorm Video Ideas
              </button>
              <button 
                onClick={() => setShowUpload(true)}
                className="border-2 border-pink-dark text-white font-semibold px-8 py-4 rounded-lg text-lg hover:border-pink-bright hover:bg-pink-dark/10 transition-all">
                📤 Upload & Distribute
              </button>
            </div>
            <p className="text-gray-400 text-sm">Join 10,000+ creators already going viral</p>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <AnimatedSection className="py-12 bg-dark-010 border-y border-dark-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-center text-gray-400 text-4xl sm:text-4xl font-bold mb-12">Trusted by creators on</p>
          <div className="relative h-20 flex items-center justify-center">
            {/* Gradient masks for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-dark-010 via-dark-010 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-dark-010 via-dark-010 to-transparent z-10 pointer-events-none"></div>
            
            {/* Infinite carousel - container limits visible area to 4 logos */}
            <div className="overflow-hidden w-full max-w-[800px] mx-auto">
              <div className="flex items-center gap-16 md:gap-20 animate-scroll">
                {/* Multiple sets for seamless infinite loop */}
                <img src={YouTubeLogo} alt="YouTube" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={TikTokLogo} alt="TikTok" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={InstagramLogo} alt="Instagram" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={LinkedInLogo} alt="LinkedIn" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={PinterestLogo} alt="Pinterest" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                {/* Duplicate set for seamless loop */}
                <img src={YouTubeLogo} alt="YouTube" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={TikTokLogo} alt="TikTok" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={InstagramLogo} alt="Instagram" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={LinkedInLogo} alt="LinkedIn" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={PinterestLogo} alt="Pinterest" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                {/* Third set for extra smooth looping */}
                <img src={YouTubeLogo} alt="YouTube" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={TikTokLogo} alt="TikTok" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={InstagramLogo} alt="Instagram" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={LinkedInLogo} alt="LinkedIn" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
                <img src={PinterestLogo} alt="Pinterest" className="h-14 w-auto grayscale hover:grayscale-0 transition-all flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection id="how-it-works" className="py-24 bg-dark-000" delay={0.1}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-dark to-gold-light mx-auto"></div>
          </div>
          <Timeline
            data={[
              {
                title: "01 Ideate",
                content: (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gold-dark/20 rounded-full blur-lg"></div>
                        <div className="relative bg-gradient-to-br from-gold-dark/20 to-gold-light/10 p-4 rounded-full border border-gold-dark/30">
                          <Brain className="w-12 h-12 text-gold-light" />
                        </div>
                      </div>
                      <div className="text-gold-light text-3xl font-bold">01</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Ideate</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      AI analyzes trends across platforms and generates viral-worthy concepts tailored to your niche and audience.
                    </p>
                  </div>
                ),
              },
              {
                title: "02 Create",
                content: (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-pink-dark/20 rounded-full blur-lg"></div>
                        <div className="relative bg-gradient-to-br from-pink-dark/20 to-pink-bright/10 p-4 rounded-full border border-pink-dark/30">
                          <FileText className="w-12 h-12 text-pink-bright" />
                        </div>
                      </div>
                      <div className="text-pink-bright text-3xl font-bold">02</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Create</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Get full scripts with timestamps, scene-by-scene breakdowns, captions, hooks, and CTAs ready to shoot.
                    </p>
                  </div>
                ),
              },
              {
                title: "03 Distribute",
                content: (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gold-dark/20 rounded-full blur-lg"></div>
                        <div className="relative bg-gradient-to-br from-gold-dark/20 to-gold-light/10 p-4 rounded-full border border-gold-dark/30">
                          <Rocket className="w-12 h-12 text-gold-light" />
                        </div>
                      </div>
                      <div className="text-gold-light text-3xl font-bold">03</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Distribute</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      AI cuts clips for each platform, generates hashtags and descriptions, then publishes everywhere with one click.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection id="features" className="py-24 bg-dark-010" delay={0.2}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Powered by AI Agents</h2>
            <p className="text-xl text-gray-300">Three specialized agents working together to make you go viral</p>
          </div>
          
          {/* Animated Beam Diagram */}
          <div className="relative w-full h-[700px] flex items-center justify-center overflow-visible">
            {/* Container for beams */}
            <div className="relative w-full h-full" ref={containerRef} style={{ position: 'relative', width: '100%', height: '700px' }}>
              
              {/* User Node (Top) */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20" ref={userRef}>
                <div className="bg-dark-100 border-2 border-gold-dark rounded-full p-6 flex flex-col items-center gap-3 min-w-[160px] hover:border-gold-light transition-all group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gold-dark/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
                    <Users className="w-10 h-10 text-gold-light relative z-10" />
                  </div>
                  <h3 className="text-lg font-bold text-white">User</h3>
                </div>
              </div>

              {/* AI Manager Node (Middle) */}
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 z-20" ref={managerRef}>
                <div className="bg-dark-100 border-2 border-gold-light rounded-full p-6 flex flex-col items-center gap-3 min-w-[180px] hover:border-gold-dark transition-all group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gold-light/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
                    <Sparkles className="w-10 h-10 text-gold-light relative z-10" />
                  </div>
                  <h3 className="text-lg font-bold text-white">AI Manager</h3>
                </div>
              </div>

              {/* Reel Agent (Bottom Left) */}
              <div className="absolute bottom-20 left-[20%] z-20" ref={reelRef}>
                <div className="relative">
                  <button
                    onClick={() => setOpenPanel(openPanel === 'reel' ? null : 'reel')}
                    className="bg-dark-100 border-2 border-gold-dark rounded-lg p-6 flex flex-col items-center gap-3 min-w-[180px] hover:border-gold-light transition-all group cursor-pointer">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold-dark/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
                      <Scissors className="w-10 h-10 text-gold-light relative z-10" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Reel Agent</h3>
                    <p className="text-sm text-gray-400 text-center">Video editing & optimization</p>
                  </button>
                  {openPanel === 'reel' && (
                    <div className="absolute top-full left-0 mt-4 w-[320px] z-50">
                      <SidePanel
                        panelOpen={true}
                        handlePanelOpen={() => setOpenPanel(null)}
                        className="bg-dark-100 border border-dark-200 rounded-lg"
                        renderButton={(handleClose) => (
                          <button
                            onClick={handleClose}
                            className="text-white hover:text-gold-light transition-colors p-2">
                            <X className="w-6 h-6" />
                          </button>
                        )}>
                        <div className="px-6 pb-8 space-y-6">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gold-dark/20 rounded-full blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-gold-dark/20 to-gold-light/10 p-3 rounded-full border border-gold-dark/30">
                                <Scissors className="w-8 h-8 text-gold-light" />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white">Reel Agent</h3>
                              <p className="text-gray-400">Video editing & optimization</p>
                            </div>
                          </div>
                          <div className="space-y-4 text-gray-300">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-2">Features</h4>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                                  <span>Auto-clips for different platforms (9:16, 1:1, 16:9)</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                                  <span>Dynamic caption placement</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                                  <span>Trending music and sound suggestions</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                                  <span>Smart trimming and transitions</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SidePanel>
                    </div>
                  )}
                </div>
              </div>

              {/* Intelligence Agent (Bottom Middle) */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20" ref={intelligenceRef}>
                <div className="relative">
                  <button
                    onClick={() => setOpenPanel(openPanel === 'intelligence' ? null : 'intelligence')}
                    className="bg-dark-100 border-2 border-pink-bright rounded-lg p-6 flex flex-col items-center gap-3 min-w-[180px] hover:border-pink-dark transition-all group cursor-pointer">
                    <div className="relative">
                      <div className="absolute inset-0 bg-pink-bright/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
                      <Brain className="w-10 h-10 text-pink-bright relative z-10" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Intelligence Agent</h3>
                    <p className="text-sm text-gray-400 text-center">Trend analysis & insights</p>
                  </button>
                  {openPanel === 'intelligence' && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[320px] z-50">
                      <SidePanel
                        panelOpen={true}
                        handlePanelOpen={() => setOpenPanel(null)}
                        className="bg-dark-100 border border-dark-200 rounded-lg"
                        renderButton={(handleClose) => (
                          <button
                            onClick={handleClose}
                            className="text-white hover:text-pink-bright transition-colors p-2">
                            <X className="w-6 h-6" />
                          </button>
                        )}>
                        <div className="px-6 pb-8 space-y-6">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-pink-bright/20 rounded-full blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-pink-dark/20 to-pink-bright/10 p-3 rounded-full border border-pink-dark/30">
                                <Brain className="w-8 h-8 text-pink-bright" />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white">Intelligence Agent</h3>
                              <p className="text-gray-400">Trend analysis & insights</p>
                            </div>
                          </div>
                          <div className="space-y-4 text-gray-300">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-2">Features</h4>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-pink-bright mr-2 mt-0.5 flex-shrink-0" />
                                  <span>Real-time trend tracking across all platforms</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-pink-bright mr-2 mt-0.5 flex-shrink-0" />
                                  <span>Niche-specific recommendations</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-pink-bright mr-2 mt-0.5 flex-shrink-0" />
                                  <span>Competitive analysis and insights</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-pink-bright mr-2 mt-0.5 flex-shrink-0" />
                                  <span>Audience behavior predictions</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SidePanel>
                    </div>
                  )}
                </div>
              </div>

              {/* Automation Agent (Bottom Right) */}
              <div className="absolute bottom-20 right-[20%] z-20" ref={automationRef}>
                <div className="relative">
                  <button
                    onClick={() => setOpenPanel(openPanel === 'automation' ? null : 'automation')}
                    className="bg-dark-100 border-2 border-gold-dark rounded-lg p-6 flex flex-col items-center gap-3 min-w-[180px] hover:border-gold-light transition-all group cursor-pointer">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold-dark/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
                      <Zap className="w-10 h-10 text-gold-light relative z-10" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Automation Agent</h3>
                    <p className="text-sm text-gray-400 text-center">Multi-platform publishing</p>
                  </button>
                  {openPanel === 'automation' && (
                    <div className="absolute top-full right-0 mt-4 w-[320px] z-50">
                      <SidePanel
                        panelOpen={true}
                        handlePanelOpen={() => setOpenPanel(null)}
                        className="bg-dark-100 border border-dark-200 rounded-lg"
                        renderButton={(handleClose) => (
                          <button
                            onClick={handleClose}
                            className="text-white hover:text-gold-light transition-colors p-2">
                            <X className="w-6 h-6" />
                          </button>
                        )}>
                        <div className="px-6 pb-8 space-y-6">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gold-dark/20 rounded-full blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-gold-dark/20 to-gold-light/10 p-3 rounded-full border border-gold-dark/30">
                                <Zap className="w-8 h-8 text-gold-light" />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white">Automation Agent</h3>
                              <p className="text-gray-400">Multi-platform publishing</p>
                            </div>
                          </div>
                          <div className="space-y-4 text-gray-300">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-2">Features</h4>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                                  <span>Schedule across 6+ platforms simultaneously</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                                  <span>SEO-optimized descriptions</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                                  <span>Cross-platform analytics dashboard</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                                  <span>One-click publishing workflow</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SidePanel>
                    </div>
                  )}
                </div>
              </div>

              {/* Animated Beams - Always render, component handles refs internally */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={userRef}
                toRef={managerRef}
                curvature={-75}
                duration={3}
                delay={0}
                gradientStartColor="#E3AA05"
                gradientStopColor="#FAC52B"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={managerRef}
                toRef={reelRef}
                curvature={-50}
                duration={3}
                delay={0.5}
                gradientStartColor="#E3AA05"
                gradientStopColor="#E3AA05"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={managerRef}
                toRef={intelligenceRef}
                curvature={0}
                duration={3}
                delay={1}
                gradientStartColor="#C22373"
                gradientStopColor="#8E1A54"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={managerRef}
                toRef={automationRef}
                curvature={50}
                duration={3}
                delay={1.5}
                gradientStartColor="#E3AA05"
                gradientStopColor="#FAC52B"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Platform Support Section */}
      <AnimatedSection className="py-24 bg-dark-000" delay={0.3}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Distribute Everywhere</h2>
            <p className="text-xl text-gray-300">One video, unlimited reach across all major platforms</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {['YouTube Shorts', 'TikTok', 'Instagram Reels', 'LinkedIn', 'Pinterest', 'Twitter/X'].map((platform) => (
              <div key={platform} className="bg-dark-100 border border-dark-200 rounded-lg p-6 text-center hover:border-gold-dark/50 transition-all">
                <div className="mb-3">
                  <Check className="w-8 h-8 text-gold-light mx-auto" />
                </div>
                <div className="text-lg font-semibold">{platform}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Use Cases Section */}
      <AnimatedSection id="use-cases" className="py-24 bg-dark-010" delay={0.4}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Built for Creators, Brands, and Agencies</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-100 border border-dark-200 rounded-lg p-8 text-center">
              <div className="mb-4 flex justify-center">
                <Users className="w-12 h-12 text-gold-light" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Content Creators</h3>
              <p className="text-gray-300 mb-6">
                Go from 1 video per week to daily content without burnout. AI handles the research, scripting, and distribution while you focus on creating.
              </p>
              <div className="text-gold-light font-bold text-xl">10x your output</div>
            </div>
            <div className="bg-dark-100 border border-dark-200 rounded-lg p-8 text-center">
              <div className="mb-4 flex justify-center">
                <Building2 className="w-12 h-12 text-pink-bright" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Brands</h3>
              <p className="text-gray-300 mb-6">
                Maintain consistent presence across all platforms with one video. Automated optimization ensures maximum reach and engagement.
              </p>
              <div className="text-pink-bright font-bold text-xl">Save 20+ hours/week</div>
            </div>
            <div className="bg-dark-100 border border-dark-200 rounded-lg p-8 text-center">
              <div className="mb-4 flex justify-center">
                <Network className="w-12 h-12 text-gold-light" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Agencies</h3>
              <p className="text-gray-300 mb-6">
                Manage multiple clients' content calendars with AI efficiency. Scale your operations without scaling your team.
              </p>
              <div className="text-gold-light font-bold text-xl">Manage 5x more clients</div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Pricing Preview Section */}
      <AnimatedSection id="pricing" className="py-24 bg-dark-010" delay={0.5}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300">Start free, scale as you grow</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-dark-100 border border-dark-200 rounded-lg p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-bold mb-2">$0<span className="text-xl text-gray-400">/month</span></div>
                <p className="text-gray-400">Perfect for trying out AI content</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">5 AI-generated ideas per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">1 platform connection</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Basic script generation</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Manual upload only</span>
                </li>
              </ul>
              <button className="w-full border-2 border-dark-200 text-white font-semibold px-6 py-3 rounded-lg hover:border-gold-dark transition-all">
                Start Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-dark-100 border-2 border-gold-dark rounded-lg p-8 relative transform md:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-gold-dark to-gold-light text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-2">$49<span className="text-xl text-gray-400">/month</span></div>
                <p className="text-gray-400">For serious content creators</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Unlimited AI-generated ideas</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">5 platform connections</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Advanced script generation</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Auto-scheduling & publishing</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Analytics dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-gold-dark to-gold-light text-black font-semibold px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-gold-dark/50 transition-all">
                Start Pro Trial
              </button>
            </div>

            {/* Agency Plan */}
            <div className="bg-dark-100 border border-dark-200 rounded-lg p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">Agency</h3>
                  <span className="bg-pink-dark text-white px-3 py-1 rounded-full text-xs font-bold">
                    BEST VALUE
                  </span>
                </div>
                <div className="text-4xl font-bold mb-2">$199<span className="text-xl text-gray-400">/month</span></div>
                <p className="text-gray-400">For agencies & brands</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Unlimited platform connections</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">White-label options</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Team collaboration (up to 10)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold-light mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Custom integrations</span>
                </li>
              </ul>
              <button className="w-full border-2 border-pink-dark text-white font-semibold px-6 py-3 rounded-lg hover:border-pink-bright hover:bg-pink-dark/10 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA Section */}
      <AnimatedSection className="py-24 bg-dark-000" delay={0.6}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Go Viral?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of creators using AI to dominate social media
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button 
              onClick={() => setShowBrainstorm(true)}
              className="bg-gradient-to-r from-gold-dark to-gold-light text-black font-semibold px-8 py-4 rounded-lg text-lg hover:shadow-lg hover:shadow-gold-dark/50 transition-all">
              🎬 Brainstorm Video Ideas
            </button>
            <button 
              onClick={() => setShowUpload(true)}
              className="border-2 border-pink-dark text-white font-semibold px-8 py-4 rounded-lg text-lg hover:border-pink-bright hover:bg-pink-dark/10 transition-all">
              📤 Upload & Distribute
            </button>
          </div>
          <p className="text-gray-400 text-sm">No credit card required • Free forever starter plan</p>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-dark-010 border-t border-dark-200 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent">AI</span> Social Manager
              </h3>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 AI Social Manager. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-semibold" aria-label="Twitter">𝕏</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-semibold" aria-label="LinkedIn">in</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-semibold" aria-label="YouTube">▶</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
