'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZES = {
  sm: { width: 120, height: 26 },
  md: { width: 160, height: 35 },
  lg: { width: 180, height: 40 },
}

export function Logo({ href = '/', size = 'sm', className = '' }: LogoProps) {
  const { width, height } = SIZES[size]
  const logo = (
    <Image
      src="/logo_big.png"
      alt="Aurenix AI Logo"
      width={width}
      height={height}
      className={`h-auto w-auto ${className}`}
      priority
    />
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {logo}
      </Link>
    )
  }

  return logo
}
