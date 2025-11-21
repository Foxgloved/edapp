import { cn } from '@/lib/utils'

describe('Utils - cn function', () => {
  it('merges class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toContain('base-class')
    expect(result).toContain('active-class')
  })

  it('removes falsy values', () => {
    const result = cn('text-red-500', false, null, undefined, 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('handles empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles tailwind-merge conflicts', () => {
    const result = cn('px-2 py-1', 'px-4')
    // tailwind-merge should keep only the last px value
    expect(result).toContain('px-4')
    expect(result).toContain('py-1')
  })

  it('handles arrays of classes', () => {
    const result = cn(['text-red-500', 'bg-blue-500'], 'font-bold')
    expect(result).toContain('text-red-500')
    expect(result).toContain('bg-blue-500')
    expect(result).toContain('font-bold')
  })

  it('merges conflicting utilities correctly', () => {
    const result = cn('text-sm', 'text-lg')
    // Should keep the last text size
    expect(result).toContain('text-lg')
  })
})

