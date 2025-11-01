import { useState, useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input'
import { MultiStepLoader } from '../components/ui/multi-step-loader'
import { useOutsideClick } from '../hooks/use-outside-click'
import { BackgroundGradientAnimation } from '../components/ui/background-gradient-animation'
import { Sparkles, Video, Hash, Music, Clock, TrendingUp } from 'lucide-react'

const loadingStates = [
  { text: "Reading input..." },
  { text: "Brainstorming ideas..." },
  { text: "Gathering content..." },
  { text: "Writing script..." },
  { text: "Generating edits..." },
  { text: "Collecting everything..." },
  { text: "Ready!" },
]

function CloseIcon() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}

export default function BrainstormPage({ onBack }) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [active, setActive] = useState(null)
  const id = useId()
  const ref = useRef(null)

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setActive(null)
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  const handleSubmit = async (e) => {
    e?.preventDefault()
    // Get value from event target if available, otherwise use state
    const eventValue = e?.target?.querySelector('input')?.value || e?.target?.value
    const topicValue = (eventValue || input).trim()
    if (!topicValue) return

    setIsLoading(true)
    setResults([])

    try {
      const response = await fetch('https://submammary-correlatively-irma.ngrok-free.dev/webhook/trends-fetch232', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topicValue }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch ideas')
      }

      const data = await response.json()
      
      setResults(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching ideas:', error)
      
      // Check if it's a connection error
      if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
        alert('Cannot connect to the server. Please ensure the backend server is running on http://localhost:5678')
      } else if (error.message.includes('Failed to fetch ideas')) {
        alert('Server returned an error. Please check the backend logs.')
      } else {
        alert('Failed to generate ideas. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const placeholders = [
    "What's your niche?",
    "What interests you?",
    "What topic are you passionate about?",
    "Describe your content idea...",
  ]

  // Bright gradient colors for card backgrounds (full background)
  const cardGradients = [
    'bg-gradient-to-br from-gold-dark/60 via-gold-light/50 to-gold-dark/60',
    'bg-gradient-to-br from-pink-bright/60 via-pink-dark/50 to-pink-bright/60',
    'bg-gradient-to-br from-gold-light/60 via-gold-dark/50 to-gold-light/60',
    'bg-gradient-to-br from-pink-dark/60 via-pink-bright/50 to-pink-dark/60',
    'bg-gradient-to-br from-gold-dark/60 via-gold-light/50 to-gold-dark/60',
  ]

  // Header gradient colors (for header section)
  const headerGradients = [
    'from-gold-dark/30 via-gold-light/20 to-gold-dark/30',
    'from-pink-dark/30 via-pink-bright/20 to-pink-dark/30',
    'from-gold-dark/30 via-gold-light/20 to-gold-dark/30',
    'from-pink-dark/30 via-pink-bright/20 to-pink-dark/30',
    'from-gold-dark/30 via-gold-light/20 to-gold-dark/30',
  ]

  // Transform results to card format
  const cards = results.map((item, index) => ({
    index: item.index || index + 1,
    title: item.title || 'Untitled',
    description: item.summary || '',
    cardGradient: cardGradients[index % cardGradients.length],
    headerGradient: `bg-gradient-to-br ${headerGradients[index % headerGradients.length]}`,
    hashtags: item.hashtags || [],
    ctaText: 'View Details',
    ctaLink: '#',
    content: () => (
      <div className="space-y-10">
        <div>
          <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Summary</h4>
          <p className="text-gray-200 text-lg leading-relaxed mt-4">{item.summary}</p>
        </div>
        
        <div>
          <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Style & Mood</h4>
          <div className="grid grid-cols-2 gap-5 text-base mt-5">
            <div>
              <span className="text-gray-400 block mb-2 text-sm uppercase tracking-wide">Tone</span>
              <span className="text-gold-light font-semibold text-lg">{item.tone}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-2 text-sm uppercase tracking-wide">Mood</span>
              <span className="text-gold-light font-semibold text-lg">{item.mood}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-2 text-sm uppercase tracking-wide">Emotion</span>
              <span className="text-gold-light font-semibold text-lg">{item.emotion}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-2 text-sm uppercase tracking-wide">Style</span>
              <span className="text-gold-light font-semibold text-lg">{item.style}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Hooks</h4>
          <ul className="list-disc list-inside space-y-3 text-gray-200 text-lg mt-5">
            {item.hooks?.map((hook, i) => (
              <li key={i} className="leading-relaxed">{hook}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">New Idea</h4>
          <p className="text-gray-200 text-lg leading-relaxed mt-4">{item.new_idea}</p>
        </div>

        <div>
          <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Hashtags</h4>
          <div className="flex flex-wrap gap-3 mt-5">
            {item.hashtags?.map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-dark-200 text-gold-light rounded-full text-sm font-medium border border-gold-dark/30">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Song Suggestion</h4>
          <p className="text-gray-200 text-lg leading-relaxed font-medium mt-4">{item.song_suggestion}</p>
        </div>

        <div>
          <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Script</h4>
          <p className="text-gray-200 text-lg leading-relaxed mt-4">{item.script}</p>
        </div>

        {item.timeline && (
          <div>
            <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Timeline</h4>
            <div className="space-y-4 mt-5">
              {item.timeline.map((scene, i) => (
                <div key={i} className="bg-dark-200/50 border border-dark-200 p-5 rounded-lg">
                  <div className="text-gold-light font-bold text-base mb-2">{scene.time}</div>
                  <div className="text-white text-base mb-2 font-medium leading-relaxed">{scene.scene}</div>
                  <div className="text-gray-300 text-sm italic leading-relaxed">{scene.voiceover}</div>
                  {scene.text_overlay && (
                    <div className="text-gray-400 text-sm mt-2">Overlay: <span className="text-gold-light">{scene.text_overlay}</span></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
  }))

  if (results.length > 0) {
    return (
      <div className="relative min-h-screen bg-dark-000 text-white py-12 px-6 overflow-hidden">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(0, 0, 0)"
          gradientBackgroundEnd="rgb(10, 10, 10)"
          firstColor="59, 130, 246"
          secondColor="96, 165, 250"
          thirdColor="147, 197, 253"
          fourthColor="37, 99, 235"
          fifthColor="29, 78, 216"
          pointerColor="59, 130, 246"
          size="60%"
          blendingValue="normal"
          interactive={true}
          containerClassName="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full h-full">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl sm:text-5xl font-bold">Your Generated Ideas</h1>
            <button
              onClick={onBack}
              className="px-6 py-2 border border-dark-200 rounded-lg hover:border-gold-dark transition-colors"
            >
              Back
            </button>
          </div>

          <AnimatePresence>
            {active && typeof active === 'object' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 h-full w-full z-10"
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {active && typeof active === 'object' ? (
              <div className="fixed inset-0 grid place-items-center z-[100]">
                <motion.button
                  key={`button-${active.title}-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-dark-100 border border-dark-200 rounded-full h-8 w-8 hover:border-gold-dark transition-colors"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>
                <motion.div
                  layoutId={`card-${active.index}-${id}`}
                  ref={ref}
                  className="w-full max-w-[800px] h-[90vh] flex flex-col bg-dark-100 border border-gold-dark/30 sm:rounded-3xl overflow-hidden"
                >
                  {/* Gradient Header */}
                  <motion.div 
                    layoutId={`gradient-${active.index}-${id}`}
                    className={`flex-shrink-0 w-full ${active.headerGradient} flex items-center justify-between px-8 py-8 border-b border-white/20`}
                  >
                    <div className="flex-1 pr-4">
                      <motion.h3
                        layoutId={`title-${active.index}-${id}`}
                        className="font-bold text-white text-3xl md:text-4xl mb-4 leading-tight"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.index}-${id}`}
                        className="text-gray-100 text-lg leading-relaxed"
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    <motion.button
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setActive(null)}
                      className="flex-shrink-0 flex items-center justify-center bg-dark-100/80 backdrop-blur-sm border border-dark-200 rounded-full h-10 w-10 hover:border-gold-dark transition-colors"
                    >
                      <CloseIcon />
                    </motion.button>
                  </motion.div>

                  {/* Scrollable Content - Solid background */}
                  <div className="flex-1 overflow-y-auto bg-dark-100">
                    <div className="px-8 py-10">
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col"
                      >
                        {typeof active.content === 'function' ? active.content() : active.content}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
            {cards.map((card) => (
              <motion.div
                layoutId={`card-${card.index}-${id}`}
                key={card.index}
                onClick={() => setActive(card)}
                className={`min-h-[500px] flex flex-col ${card.cardGradient} border border-gold-dark/30 rounded-xl cursor-pointer transition-all hover:border-gold-light/50 hover:shadow-lg hover:shadow-gold-light/30 overflow-hidden backdrop-blur-sm`}
              >
                {/* Gradient Header */}
                <motion.div 
                  layoutId={`gradient-${card.index}-${id}`}
                  className={`h-36 w-full ${card.headerGradient} flex items-center justify-center border-b border-white/20 px-6 relative overflow-hidden`}
                >
                  {/* Decorative sparkles */}
                  <div className="absolute top-2 right-4 opacity-30">
                    <Sparkles className="w-6 h-6 text-gold-light" />
                  </div>
                  <div className="absolute bottom-2 left-4 opacity-20">
                    <Sparkles className="w-5 h-5 text-pink-bright" />
                  </div>
                  <div className="text-center relative z-10">
                    <motion.h3
                      layoutId={`title-${card.index}-${id}`}
                      className="font-bold text-white text-2xl md:text-3xl mb-2 leading-tight"
                    >
                      {card.title}
                    </motion.h3>
                  </div>
                </motion.div>
                
                {/* Content */}
                <div className="flex-1 p-8 flex flex-col bg-dark-100/30 backdrop-blur-sm">
                  <motion.p
                    layoutId={`description-${card.index}-${id}`}
                    className="text-white text-base leading-relaxed line-clamp-4 mb-6 font-medium"
                  >
                    {card.description}
                  </motion.p>
                  
                  {/* Visual Indicators */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <Video className="w-5 h-5 text-gold-light" />
                      <span className="text-white text-sm font-medium">Script Ready</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <Clock className="w-5 h-5 text-pink-bright" />
                      <span className="text-white text-sm font-medium">Timeline</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <Music className="w-5 h-5 text-gold-light" />
                      <span className="text-white text-sm font-medium">Music</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <Hash className="w-5 h-5 text-pink-bright" />
                      <span className="text-white text-sm font-medium">Hashtags</span>
                    </div>
                  </div>

                  {/* Tags Preview */}
                  {card.hashtags && card.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {card.hashtags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 text-gold-light rounded-full text-xs font-medium backdrop-blur-sm border border-gold-light/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-auto pt-6 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-gold-light" />
                        <span className="text-gold-light text-sm">Viral Potential</span>
                      </div>
                      <div className="flex items-center gap-2 text-gold-light text-base font-semibold">
                        <span>View Details</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-dark-000 text-white flex items-center justify-center overflow-hidden px-6">
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
      <div className="relative z-10 max-w-4xl w-full text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          What interests you?
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Tell us what you're passionate about, and we'll generate viral content ideas for you
        </p>
        
        <div className="mb-8">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            onSubmit={handleSubmit}
          />
        </div>

        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Back to home
        </button>
      </div>

      <MultiStepLoader
        loadingStates={loadingStates}
        loading={isLoading}
        duration={1500}
        loop={true}
      />
    </div>
  )
}

