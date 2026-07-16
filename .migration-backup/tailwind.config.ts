import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          0: '#000000',
          1: '#0a0a0a',
          2: '#0d0d0d',
          3: '#111111',
        },
        border: {
          subtle: '#161616',
          default: '#1e1e1e',
          hover: '#2a2a2a',
          accent: 'rgba(99,102,241,0.2)',
        },
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
        'line-grid': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
        'line-grid': '40px 40px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(99,102,241,0.2)' },
          '50%': { borderColor: 'rgba(99,102,241,0.5)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
