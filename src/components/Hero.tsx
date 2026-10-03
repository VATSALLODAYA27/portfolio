import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'
import type { PointerEvent } from 'react'
import { asset, site } from '../data/resume'
import { useFinePointer } from '../hooks/useMedia'
import { scrollToId } from '../lib/scroll'
import { btnGhost, btnPrimary } from '../lib/styles'
import { DownloadIcon } from './Icons'
import { Magnetic } from './Magnetic'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const lineUp: Variants = {
  hidden: { y: '112%' },
  show: { y: 0, transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
}

export function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion()
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center px-6 pb-14 pt-24 md:px-10 md:pt-28 lg:pt-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div
          className="order-2 lg:order-1"
          variants={container}
          initial={reduced ? false : 'hidden'}
          animate={ready ? 'show' : 'hidden'}
        >
          <h1 className="display whitespace-nowrap text-[clamp(2.75rem,11vw,4.5rem)] leading-[0.96] lg:text-[clamp(3.5rem,6.4vw,6.25rem)]">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" variants={lineUp}>
                {site.firstLine}
              </motion.span>
            </span>{' '}
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" variants={lineUp}>
                {site.lastLine}
              </motion.span>
            </span>
          </h1>

          <motion.p variants={rise} className="mt-5 max-w-xl text-lg text-fog/90 md:mt-7 md:text-[1.6rem] md:leading-snug">
            {site.headline}
          </motion.p>
          <motion.p variants={rise} className="mt-4 max-w-lg text-[0.95rem] text-mute md:mt-5 md:text-base">
            {site.intro}
          </motion.p>

          <motion.div variants={rise} className="mt-7 flex flex-wrap items-center gap-3 md:mt-9 md:gap-4">
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('projects', reduced)
                }}
                className={btnPrimary}
              >
                View My Work
              </a>
            </Magnetic>
            <Magnetic>
              <a href={asset(site.resumeFile)} download className={btnGhost}>
                <DownloadIcon />
                Download Resume
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <PortraitStage ready={ready} />
      </div>
    </section>
  )
}

/** Portrait in a glass frame that tilts toward the cursor, with two chips floating at different depths. */
function PortraitStage({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 140, damping: 16 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 140, damping: 16 })
  const tilt = fine && !reduced

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!tilt) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      className="order-1 justify-self-center lg:order-2 lg:justify-self-end"
      initial={reduced ? false : { opacity: 0, scale: 0.94, y: 28 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 28 }}
      transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="relative isolate w-[min(64vw,17rem)] p-4 sm:w-[24rem] sm:p-5 lg:w-[28rem] lg:p-8"
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        <div aria-hidden className="pointer-events-none absolute inset-6 -z-10 rounded-full bg-ultra/25 blur-3xl" />
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
          className="relative"
        >
          <div className="glass rounded-[2rem] p-2.5">
            <picture>
              <source
                type="image/webp"
                srcSet={`${asset('images/portrait-640.webp')} 640w, ${asset('images/portrait-1024.webp')} 1024w`}
                sizes="(min-width: 1024px) 400px, 80vw"
              />
              <img
                src={asset('images/portrait-1024.jpg')}
                alt="Portrait of Vatsal Hitesh Lodaya in a grey three-piece suit and navy tie"
                width={1024}
                height={881}
                fetchPriority="high"
                decoding="async"
                className="aspect-square w-full rounded-[1.5rem] object-cover object-[52%_15%]"
              />
            </picture>
          </div>

          <div
            style={{ transform: 'translateZ(70px)' }}
            className="glass absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm sm:-left-6 sm:bottom-9 sm:translate-x-0 sm:py-3"
          >
            <p className="font-medium text-fog">Honours in Data Science</p>
            <p className="text-xs text-mute">B.Tech Computer Engineering</p>
          </div>
          <div
            style={{ transform: 'translateZ(48px)' }}
            className="glass absolute -right-5 top-10 hidden rounded-full px-4 py-2 text-sm text-fog sm:block"
          >
            MERN stack
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
