'use client'

/**
 * VideoMorphModal
 *
 * A course trailer thumbnail that morphs into a full video player modal
 * using Framer Motion's `layoutId` shared element transition.
 *
 * How it works:
 *   1. Thumbnail: motion.div with layoutId="video-{id}"
 *   2. On click: state opens the modal overlay
 *   3. Modal: motion.div with SAME layoutId="video-{id}" + AnimatePresence
 *   4. Framer Motion interpolates position + size between the two — seamless morph
 *   5. A separate opacity overlay fades in behind the modal
 *
 * The video embed is only rendered when the modal opens (performance win).
 * Click outside or press ESC to close.
 *
 * Usage:
 *   <VideoMorphModal
 *     id="course-hormony"
 *     thumbnailSrc="/images/course-thumb.webp"
 *     thumbnailAlt="Podgląd kursu"
 *     videoUrl="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
 *     title="Hormony w równowadze — trailer"
 *   />
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Play } from 'lucide-react'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

interface VideoMorphModalProps {
  /** Unique id — used as layoutId suffix to prevent collisions */
  id: string
  thumbnailSrc: string
  thumbnailAlt: string
  /** Full YouTube/Vimeo embed URL (with ?autoplay=1 if desired) */
  videoUrl: string
  title?: string
  /** Aspect ratio of the player (default 16/9) */
  aspectRatio?: `${number}/${number}`
}

export function VideoMorphModal({
  id,
  thumbnailSrc,
  thumbnailAlt,
  videoUrl,
  title,
  aspectRatio = '16/9',
}: VideoMorphModalProps) {
  const [open, setOpen] = useState(false)
  const layoutId = `video-morph-${id}`

  const close = useCallback(() => setOpen(false), [])

  // Close on ESC key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, close])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── THUMBNAIL ─────────────────────────────────────────────────── */}
      <motion.div
        layoutId={layoutId}
        onClick={() => setOpen(true)}
        className="group relative cursor-pointer rounded-2xl overflow-hidden"
        style={{ boxShadow: 'var(--shadow-rest)' }}
        whileHover={{ boxShadow: 'var(--shadow-lift)' }}
        transition={{ duration: 0.25 }}
      >
        {/* Thumbnail image */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-secondary/20 to-primary/10">
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ filter: 'sepia(8%) saturate(88%)' }}
          />
          {/* Dark veil */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.20 }}
          >
            <Play size={22} fill="#213a50" stroke="none" style={{ marginLeft: '3px' }} />
          </motion.div>
        </div>

        {/* Title badge */}
        {title && (
          <div className="absolute bottom-3 left-3 right-3">
            <span
              className="inline-block text-xs text-white/90 font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm"
              style={{ background: 'rgba(33,58,80,0.65)' }}
            >
              {title}
            </span>
          </div>
        )}
      </motion.div>

      {/* ── MODAL ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              aria-label="Zamknij"
            />

            {/* Video container — shares layoutId with thumbnail */}
            <div className="fixed inset-0 z-[61] flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                layoutId={layoutId}
                className="relative w-full max-w-4xl rounded-2xl overflow-hidden pointer-events-auto"
                style={{ boxShadow: 'var(--shadow-float)' }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              >
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.25 }}
                  onClick={close}
                  className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors duration-200"
                  aria-label="Zamknij"
                >
                  <X size={16} color="white" />
                </motion.button>

                {/* iframe — rendered only when modal is open */}
                <div style={{ aspectRatio: aspectRatio.replace('/', ' / ') }}>
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={title ?? 'Trailer kursu'}
                  />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
