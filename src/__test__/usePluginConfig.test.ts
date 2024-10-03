import { beforeEach, describe, expect, it, vi } from 'vitest'
import { usePluginConfig } from '../usePluginConfig'

vi.spyOn(console, 'warn').mockImplementation(() => undefined)

const { getPluginConfig, setPluginConfig, hasPluginConfig } = usePluginConfig()

describe('usePluginConfig', () => {
  beforeEach(() => {
    setPluginConfig({})
  })

  it('should return plugin config', () => {
    const config = getPluginConfig()

    expect(config).toBeDefined()
  })

  it('if config is invaild Json', () => {
    setPluginConfig({ key: 'value' })
    const config = getPluginConfig()

    expect(config).toEqual({
      key: 'value',
    })
  })

  it('should set plugin config', () => {
    const value = {
      isVaild: true,
    }

    setPluginConfig(value)
    const config = getPluginConfig()

    expect(config).toEqual(value)
  })

  it('should return true if plugin config exists', () => {
    const value = {
      isVaild: true,
    }

    setPluginConfig(value)
    const result = hasPluginConfig()

    expect(result).toBe(true)
  })

  it('should return false if plugin config does not exist', () => {
    const result = hasPluginConfig()

    expect(result).toBe(false)
  })
})
