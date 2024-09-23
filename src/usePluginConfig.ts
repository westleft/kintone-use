type PluginConfig = Record<string, any>

type PluginResponse = {
  success: boolean
}

export const usePluginConfig = () => {
  const pluginId = kintone.$PLUGIN_ID

  const deserializeConfig = async (config: PluginConfig) => {
    return new Promise<PluginResponse>((resolve) => {
      try {
        kintone.plugin.app.setConfig(config, () => {
          resolve({
            success: true,
          })
        })
      } catch (error) {
        console.error('Error setting config:', error)
        resolve({
          success: false,
        })
      }
    })
  }

  const setPluginConfig = async (pluginConfig: PluginConfig) => {
    const configKeys = Object.keys(pluginConfig)

    configKeys.forEach((item: keyof typeof pluginConfig) => {
      pluginConfig[item] = JSON.stringify(pluginConfig[item])
    })

    return await deserializeConfig(pluginConfig)
  }

  const getPluginConfig = () => {
    try {
      const pluginConfig = kintone.plugin.app.getConfig(pluginId)
      const configKeys = Object.keys(pluginConfig)

      configKeys.forEach((item: keyof typeof pluginConfig) => {
        pluginConfig[item] = JSON.parse(pluginConfig[item])
      })

      return pluginConfig
    } catch (error) {
      console.error('Error parsing JSON:', error)
      return {}
    }
  }

  const hasPluginConfig = (): boolean => {
    const pluginConfig = kintone.plugin.app.getConfig(pluginId)
    const configKeys = Object.keys(pluginConfig)

    return configKeys.length > 0
  }

  return {
    setPluginConfig,
    getPluginConfig,
    hasPluginConfig,
  }
}
