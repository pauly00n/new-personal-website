
'use client'

import GlassButton from './glassbutton'
import { ArrowRight } from 'lucide-react'

export default function GlassButtonClient() {
  return (
    <GlassButton
      width={200}
      height={200}
      onClick={() => console.log('clicked')}
      contentClassName="flex flex-col items-center justify-center gap-2 text-white"
      aria-label="Liquid glass button"
    >
      <span className="text-lg font-semibold">open</span>
      <ArrowRight className="h-5 w-5" />
    </GlassButton>
  )
}
