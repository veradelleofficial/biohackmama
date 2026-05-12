'use client'

/**
 * ArticleAudioPlayer
 *
 * Two-mode audio player for blog articles:
 *
 *   Mode A (audioSrc provided):
 *     Plays an .mp3 file (e.g. pre-generated via ElevenLabs).
 *     Shows play/pause + progress bar + time display.
 *
 *   Mode B (no audioSrc, articleContentRef provided):
 *     Uses Web Speech API (SpeechSynthesis) to read the article text.
 *     Forces pl-PL language, prefers female voice.
 *     Shows play/pause + "reading..." indicator.
 *
 * Design: Coastal wellness — rounded-2xl card, gold accent, clean typography.
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Types ────────────────────────────────────────────────────────────────────

interface ArticleAudioPlayerProps {
  /** If provided, plays this audio file (Variant A) */
  audioSrc?: string
  /** Ref to the DOM element containing article text (Variant B fallback) */
  articleContentRef?: React.RefObject<HTMLElement>
}

// ── Icons (inline SVG — no extra deps) ───────────────────────────────────────

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}

function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

// ── Time formatting ──────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

// ── Component ────────────────────────────────────────────────────────────────

export function ArticleAudioPlayer({ audioSrc, articleContentRef }: ArticleAudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const rafRef = useRef<number>(0)

  const isFileMode = !!audioSrc

  // ── Variant A: Audio file ──────────────────────────────────────────────

  const updateAudioProgress = useCallback(() => {
    if (!audioRef.current) return
    const audio = audioRef.current
    if (audio.duration && !isNaN(audio.duration)) {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration)
      setProgress((audio.currentTime / audio.duration) * 100)
    }
    if (!audio.paused) {
      rafRef.current = requestAnimationFrame(updateAudioProgress)
    }
  }, [])

  const toggleAudioFile = useCallback(() => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      audioRef.current.play()
      setPlaying(true)
      rafRef.current = requestAnimationFrame(updateAudioProgress)
    } else {
      audioRef.current.pause()
      setPlaying(false)
      cancelAnimationFrame(rafRef.current)
    }
  }, [updateAudioProgress])

  const seekAudio = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audioRef.current.currentTime = ratio * audioRef.current.duration
    updateAudioProgress()
  }, [updateAudioProgress])

  // ── Variant B: Web Speech API ──────────────────────────────────────────

  const getArticleText = useCallback((): string => {
    if (articleContentRef?.current) {
      return articleContentRef.current.innerText || ''
    }
    // Fallback: try to find the article prose container
    const prose = document.querySelector('.prose') || document.querySelector('[data-article-content]')
    return prose?.textContent || ''
  }, [articleContentRef])

  // ── Preload voices + store them ──────────────────────────────────────

  const voicesRef = useRef<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    if (isFileMode || typeof window === 'undefined' || !window.speechSynthesis) return undefined
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices()
      if (v.length > 0) {
        voicesRef.current = v
      }
    }
    loadVoices()
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', loadVoices)
  }, [isFileMode])

  // ── Chrome bug: speech stops after ~15s. Fix: split into chunks ────────

  const speakChunks = useCallback((text: string) => {
    const synth = window.speechSynthesis
    // Split on sentence boundaries, max ~200 chars per chunk
    const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) || [text]
    const chunks: string[] = []
    let current = ''
    for (const s of sentences) {
      if ((current + s).length > 200 && current) {
        chunks.push(current.trim())
        current = s
      } else {
        current += s
      }
    }
    if (current.trim()) chunks.push(current.trim())

    let index = 0

    const pickVoice = (): SpeechSynthesisVoice | null => {
      const voices = voicesRef.current.length > 0 ? voicesRef.current : synth.getVoices()
      return (
        voices.find((v) => v.lang.startsWith('pl') && /female|kobieta|zosia|ewa|google.*polski/i.test(v.name)) ||
        voices.find((v) => v.lang.startsWith('pl')) ||
        null
      )
    }

    const speakNext = () => {
      if (index >= chunks.length) {
        setPlaying(false)
        return
      }
      const utterance = new SpeechSynthesisUtterance(chunks[index])
      utterance.lang = 'pl-PL'
      utterance.rate = 0.95
      utterance.pitch = 1.05
      const voice = pickVoice()
      if (voice) utterance.voice = voice
      utterance.onend = () => { index++; speakNext() }
      utterance.onerror = () => setPlaying(false)
      utteranceRef.current = utterance
      synth.speak(utterance)
    }

    speakNext()
  }, [])

  const toggleSpeech = useCallback(() => {
    const synth = window.speechSynthesis

    if (playing) {
      synth.cancel()
      setPlaying(false)
      return
    }

    const text = getArticleText()
    if (!text.trim()) return

    // Cancel any lingering speech
    synth.cancel()

    setPlaying(true)
    // Small delay to let cancel() finish
    setTimeout(() => speakChunks(text), 100)
  }, [playing, getArticleText, speakChunks])

  // ── Cleanup on unmount ─────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // ── Handle audio file ended ────────────────────────────────────────────

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => {
      setPlaying(false)
      setProgress(0)
      setCurrentTime(0)
      cancelAnimationFrame(rafRef.current)
    }
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [])

  // ── Toggle handler (picks mode automatically) ──────────────────────────

  const toggle = isFileMode ? toggleAudioFile : toggleSpeech

  return (
    <div className="my-8">
      {/* Hidden audio element for Variant A */}
      {audioSrc && (
        <audio ref={audioRef} src={audioSrc} preload="metadata" />
      )}

      <motion.div
        className="rounded-2xl border overflow-hidden"
        style={{
          borderColor: playing ? 'rgba(166,138,105,0.35)' : 'rgba(33,58,80,0.10)',
          background: playing
            ? 'linear-gradient(135deg, rgba(166,138,105,0.06) 0%, rgba(174,202,232,0.08) 100%)'
            : 'rgba(33,58,80,0.02)',
          boxShadow: playing ? '0 2px 12px rgba(166,138,105,0.10)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Main button row */}
        <button
          onClick={toggle}
          className="w-full flex items-center gap-3.5 px-5 py-4 text-left group"
          aria-label={playing ? 'Zatrzymaj odtwarzanie' : 'Posłuchaj artykułu'}
          role="switch"
          aria-checked={playing}
        >
          {/* Icon circle */}
          <motion.div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: playing
                ? 'linear-gradient(135deg, #A68A69, #8a7058)'
                : 'rgba(166,138,105,0.10)',
              color: playing ? '#FFFFFF' : '#A68A69',
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {playing ? (
                <motion.div key="pause" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
                  <PauseIcon />
                </motion.div>
              ) : (
                <motion.div key="play" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
                  <SpeakerIcon />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-body font-medium text-sm" style={{ color: '#213a50' }}>
              {playing ? 'Zatrzymaj odtwarzanie' : 'Posłuchaj tego artykułu'}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: 'rgba(72,89,107,0.55)' }}>
              {isFileMode
                ? (playing ? 'Odtwarzanie...' : 'Profesjonalne nagranie audio')
                : (playing ? 'Czytanie...' : 'Syntezator mowy w języku polskim')
              }
            </p>
          </div>

          {/* Time display (Variant A only) */}
          {isFileMode && duration > 0 && (
            <span className="flex-shrink-0 text-xs font-medium tabular-nums" style={{ color: 'rgba(33,58,80,0.45)' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          )}
        </button>

        {/* Progress bar (Variant A only, visible when playing or has progress) */}
        {isFileMode && (playing || progress > 0) && (
          <div
            className="px-5 pb-3"
          >
            <div
              className="relative h-1.5 rounded-full cursor-pointer overflow-hidden"
              style={{ background: 'rgba(33,58,80,0.08)' }}
              onClick={seekAudio}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Postęp odtwarzania"
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #A68A69 0%, #c4a882 100%)',
                }}
                layout
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        )}

        {/* Pulsing indicator for Speech mode */}
        {!isFileMode && playing && (
          <div className="px-5 pb-3 flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ background: '#A68A69' }}
                animate={{ height: ['4px', '14px', '4px'] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
