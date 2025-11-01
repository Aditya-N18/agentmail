import { useState, useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input'
import { MultiStepLoader } from '../components/ui/multi-step-loader'
import { useOutsideClick } from '../hooks/use-outside-click'
import { BackgroundGradientAnimation } from '../components/ui/background-gradient-animation'
import { Video, Hash, TrendingUp, Upload, FileVideo, Link2 } from 'lucide-react'

const loadingStates = [
  { text: "Creating reels..." },
  { text: "Preparing to upload..." },
  { text: "Gathering ideas..." },
  { text: "Crafting content..." },
  { text: "Formatting..." },
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

export default function UploadPage({ onBack }) {
  const [input, setInput] = useState('')
  const [file, setFile] = useState(null)
  const [inputType, setInputType] = useState('url') // 'url' or 'file'
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [active, setActive] = useState(null)
  const id = useId()
  const ref = useRef(null)
  const fileInputRef = useRef(null)

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setInput('')
      setInputType('file')
    }
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    
    if (inputType === 'url' && !input.trim()) return
    if (inputType === 'file' && !file) return

    setIsLoading(true)
    setResult(null)

    try {
      const formData = new FormData()
      
      if (inputType === 'file' && file) {
        // Append file with key "file" as shown in the API format (form-data)
        // The browser will automatically set Content-Type: multipart/form-data with boundary
        console.log('Appending file:', file.name, file.type, file.size, 'bytes')
        formData.append('file', file, file.name) // Include filename for better compatibility
      } else if (inputType === 'url' && input.trim()) {
        // For URL input, append as text field
        console.log('Appending URL:', input.trim())
        formData.append('url', input.trim())
      }

      // Log FormData contents (for debugging)
      console.log('FormData keys:', Array.from(formData.keys()))

      // No headers needed - browser sets Content-Type automatically for FormData
      console.log('Sending request to:', 'https://submammary-correlatively-irma.ngrok-free.dev/webhook/reelcrafter/analyze')
      const response = await fetch('https://submammary-correlatively-irma.ngrok-free.dev/webhook/reelcrafter/analyze', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type - browser handles it with multipart/form-data boundary
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      // Get response as text first (can only read body once)
      const responseText = await response.text()

      // Log the full response for debugging

      if (!response.ok) {
        console.error('Response error:', response.status, responseText)
        throw new Error(`Failed to process upload: ${response.status}`)
      }

      // Check if response is empty
      if (!responseText || responseText.trim() === '') {
        console.error('Empty response from server')
        throw new Error('Server returned empty response')
      }

      // Try to parse JSON
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        console.error('Response text:', responseText)
        console.error('Response headers:', response.headers)
        throw new Error('Failed to parse server response as JSON')
      }

      setResult(data)
    } catch (error) {
      console.error('Error processing upload:', error)
      alert('Failed to process upload. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const placeholders = [
    "Paste video URL or upload a file...",
    "Enter video link or choose file...",
    "Share your video URL or file...",
  ]

  // Transform result to card format
  const card = result ? {
    index: 1,
    title: result.content?.caption?.substring(0, 50) || 'Generated Content',
    description: result.content?.description || '',
    videoUrl: result.runway?.video?.url || '',
    thumbnailUrl: result.runway?.thumbnail_url || result.runway?.image?.url || '',
    content: result,
    cardGradient: 'bg-gradient-to-br from-gold-dark/60 via-gold-light/50 to-gold-dark/60',
    headerGradient: 'bg-gradient-to-br from-gold-dark/30 via-gold-light/20 to-gold-dark/30',
  } : null

  if (result && card) {
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
            <h1 className="text-4xl sm:text-5xl font-bold">Your Generated Content</h1>
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
                    className={`flex-shrink-0 w-full ${active.headerGradient} flex items-center justify-between px-8 py-6 border-b border-white/20`}
                  >
                    <div className="flex-1 pr-4">
                      <motion.h3
                        layoutId={`title-${active.index}-${id}`}
                        className="font-bold text-white text-2xl md:text-3xl leading-tight"
                      >
                        {active.title}
                      </motion.h3>
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
                        className="flex flex-col space-y-8"
                      >
                        {/* Video */}
                        {active.videoUrl && (
                          <div>
                            <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Generated Video</h4>
                            <div className="mt-5 rounded-lg overflow-hidden bg-dark-200 flex items-center justify-center">
                              <video
                                controls
                                className="w-full max-w-[95%]"
                                src={active.videoUrl}
                                poster={active.thumbnailUrl}
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        )}

                        {/* Caption */}
                        <div>
                          <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Caption</h4>
                          <p className="text-gray-200 text-lg leading-relaxed mt-4">{active.content?.content?.caption}</p>
                        </div>

                        {/* Description */}
                        <div>
                          <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Description</h4>
                          <p className="text-gray-200 text-lg leading-relaxed mt-4">{active.content?.content?.description}</p>
                        </div>

                        {/* Hashtags */}
                        {active.content?.content?.hashtags && active.content.content.hashtags.length > 0 && (
                          <div>
                            <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Hashtags</h4>
                            <div className="flex flex-wrap gap-3 mt-5">
                              {active.content.content.hashtags.map((tag, i) => (
                                <span key={i} className="px-4 py-2 bg-dark-200 text-gold-light rounded-full text-sm font-medium border border-gold-dark/30">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Mood */}
                        {active.content?.content?.mood && active.content.content.mood.length > 0 && (
                          <div>
                            <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Mood</h4>
                            <div className="flex flex-wrap gap-3 mt-5">
                              {active.content.content.mood.map((mood, i) => (
                                <span key={i} className="px-4 py-2 bg-dark-200/50 text-pink-bright rounded-full text-sm font-medium border border-pink-dark/30">
                                  {mood}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Keywords */}
                        {active.content?.content?.keywords && active.content.content.keywords.length > 0 && (
                          <div>
                            <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Keywords</h4>
                            <div className="flex flex-wrap gap-3 mt-5">
                              {active.content.content.keywords.map((keyword, i) => (
                                <span key={i} className="px-4 py-2 bg-dark-200/50 text-gray-300 rounded-full text-sm font-medium border border-dark-200">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Stats */}
                        <div>
                          <h4 className="text-2xl font-bold text-white mb-5 pb-3 border-b-2 border-gold-dark/40">Performance Metrics</h4>
                          <div className="grid grid-cols-2 gap-5 mt-5">
                            <div>
                              <span className="text-gray-400 block mb-2 text-sm uppercase tracking-wide">Expected CTR</span>
                              <span className="text-gold-light font-semibold text-lg">{active.content?.content?.expectedCTR || 'N/A'}%</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block mb-2 text-sm uppercase tracking-wide">Virality Score</span>
                              <span className="text-pink-bright font-semibold text-lg">{active.content?.content?.virality || 'N/A'}%</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>

          {/* Card Display */}
          <div className="max-w-7xl mx-auto w-full">
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
                <div className="absolute top-2 right-4 opacity-30">
                  <Video className="w-6 h-6 text-gold-light" />
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
                {/* Video Preview */}
                {card.videoUrl && (
                  <div className="mb-6 rounded-lg overflow-hidden bg-dark-200">
                    <video
                      className="w-full h-64 object-cover"
                      src={card.videoUrl}
                      poster={card.thumbnailUrl}
                      muted
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

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
                    <span className="text-white text-sm font-medium">Video Ready</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <Hash className="w-5 h-5 text-pink-bright" />
                    <span className="text-white text-sm font-medium">Hashtags</span>
                  </div>
                </div>

                {/* Tags Preview */}
                {card.content?.content?.hashtags && card.content.content.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {card.content.content.hashtags.slice(0, 3).map((tag, i) => (
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
                      <span className="text-gold-light text-sm">
                        Virality: {card.content?.content?.virality || 'N/A'}%
                      </span>
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
          Upload & Distribute
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Upload a video file or paste a video URL to generate optimized content
        </p>
        
        {/* Input Type Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setInputType('url')
              setFile(null)
              fileInputRef.current?.value && (fileInputRef.current.value = '')
            }}
            className={`px-6 py-2 rounded-lg transition-all ${
              inputType === 'url'
                ? 'bg-gold-dark text-black font-semibold'
                : 'bg-dark-100 border border-dark-200 text-white hover:border-gold-dark'
            }`}
          >
            <Link2 className="w-4 h-4 inline mr-2" />
            URL
          </button>
          <button
            onClick={() => {
              setInputType('file')
              setInput('')
              fileInputRef.current?.click()
            }}
            className={`px-6 py-2 rounded-lg transition-all ${
              inputType === 'file'
                ? 'bg-gold-dark text-black font-semibold'
                : 'bg-dark-100 border border-dark-200 text-white hover:border-gold-dark'
            }`}
          >
            <FileVideo className="w-4 h-4 inline mr-2" />
            Upload File
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* URL Input or File Display */}
        {inputType === 'url' ? (
          <div className="mb-8">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={(e) => {
                setInput(e.target.value)
              }}
              onSubmit={handleSubmit}
            />
          </div>
        ) : (
          <div className="mb-8">
            {file ? (
              <div className="bg-dark-100/30 backdrop-blur-sm border border-gold-dark/30 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileVideo className="w-8 h-8 text-gold-light" />
                    <div>
                      <p className="text-white font-medium">{file.name}</p>
                      <p className="text-gray-400 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null)
                      fileInputRef.current?.value && (fileInputRef.current.value = '')
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full mt-4 bg-gradient-to-r from-gold-dark to-gold-light text-black font-semibold px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-gold-dark/50 transition-all"
                >
                  Process Video
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gold-dark/30 rounded-lg p-12 cursor-pointer hover:border-gold-dark/50 transition-colors"
              >
                <Upload className="w-12 h-12 text-gold-light mx-auto mb-4" />
                <p className="text-white text-lg mb-2">Click to upload a video file</p>
                <p className="text-gray-400 text-sm">or use the URL option above</p>
              </div>
            )}
          </div>
        )}

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

