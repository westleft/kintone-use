import { describe, expect, it, vi } from 'vitest'
import { useSubdomain } from '../index'

describe('useSubdomain', () => {
  it('getDomain should return the subdomain', () => {
    vi.stubGlobal('window', {
      location: { hostname: 'https://test.cybozu.com/k' },
    })

    const subdoamin = useSubdomain()
    expect(subdoamin, 'test')
  })
})
