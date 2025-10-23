'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface RedirectPageProps {
  isRedirecting?: boolean
  message?: string
  subMessage?: string
}

export default function RedirectPage({
  isRedirecting = true,
  message = 'Redirecting',
  subMessage = 'Please wait a moment...',
}: RedirectPageProps) {
  const [flipEffect, setFlipEffect] = useState(false)

  useEffect(() => {
    if (!isRedirecting) return

    const runRandomFlips = () => {
      const timer1 = setTimeout(() => {
        setFlipEffect(true)
        const timer2 = setTimeout(() => {
          setFlipEffect(false)
          runRandomFlips()
        }, 600)
        return () => clearTimeout(timer2)
      }, Math.random() * 2000 + 1000)

      return () => clearTimeout(timer1)
    }

    runRandomFlips()
  }, [isRedirecting])

  if (!isRedirecting) return null

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Logo with flip animation */}
        <div
          className="mx-auto mb-8 flex justify-center transition-transform duration-600 w-16 h-16"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipEffect ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transitionTimingFunction: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
          }}
        >
          <div className="w-16 h-16 relative">
            <Image
              src="/logo.svg"
              alt="IoTNet Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain"
              priority
              style={{
                filter: 'hue-rotate(0deg) saturate(0) brightness(0) invert(1)',
                color: 'var(--primary)',
              }}
            />
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'var(--primary)',
                mask: 'url(/logo.svg) center/contain no-repeat',
                WebkitMask: 'url(/logo.svg) center/contain no-repeat',
              }}
            />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-xl font-bold text-foreground mb-2 animate-fade-in">
          {message}
        </h2>
        <p
          className="text-sm text-muted-foreground animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          {subMessage}
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
