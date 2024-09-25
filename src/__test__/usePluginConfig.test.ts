import { beforeEach, describe, expect, it, vi } from 'vitest'
import { usePluginConfig } from '../usePluginConfig'

let pluginConfig: Record<string, any> = {}

vi.stubGlobal('kintone', {
  plugin: {
    app: {
      setConfig: vi.fn((config: Record<string, any>) => {
        pluginConfig = config
      }),
      getConfig: vi.fn(() => pluginConfig),
    },
  },
})

const { getPluginConfig, setPluginConfig, hasPluginConfig } = usePluginConfig()

describe('usePluginConfig', () => {
  beforeEach(() => {
    pluginConfig = {}
  })

  it('should return plugin config', () => {
    const config = getPluginConfig()
    expect(config).toBeDefined()
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
