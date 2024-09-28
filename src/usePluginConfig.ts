type PluginConfig = Record<string, any>

type PluginResponse = {
  success: boolean
}

/**
 * Manages plugin configuration.
 * @returns {object} Methods for managing plugin configurations.
 * @property {function(PluginConfig): Promise<PluginResponse>} setPluginConfig - Sets plugin config.
 * @property {function(): PluginConfig} getPluginConfig - Gets current plugin config.
 * @property {function(): boolean} hasPluginConfig - Checks if plugin config exists.
 */
export const usePluginConfig = (pluginId: string = kintone.$PLUGIN_ID) => {
  /**
   * Sets the plugin configuration.
   * @param {PluginConfig} config - Configuration object.
   * @returns {Promise<PluginResponse>} Result of the operation.
   */
  const deserializeConfig = async (config: PluginConfig): Promise<PluginResponse> => {
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

  /**
   * Sets the plugin config.
   * @param {PluginConfig} pluginConfig - Configuration object.
   * @returns {Promise<PluginResponse>} Result of the operation.
   */
  const setPluginConfig = async (pluginConfig: PluginConfig): Promise<PluginResponse> => {
    const configKeys = Object.keys(pluginConfig)

    configKeys.forEach((item: keyof typeof pluginConfig) => {
      try {
        pluginConfig[item] = JSON.stringify(pluginConfig[item])
      } catch (error) {
        console.warn(`Failed to serialize ${item}, using original value instead:`, error)
      }
    })

    return await deserializeConfig(pluginConfig)
  }

  /**
   * Retrieves the current plugin configuration.
   * @returns {T} Parsed configuration or {} if an error occurs.
   */
  const getPluginConfig = <T = unknown>(): T => {
    try {
      const pluginConfig = kintone.plugin.app.getConfig(pluginId)
      const keys = Object.keys(pluginConfig)

      keys.forEach((item: keyof typeof pluginConfig) => {
        try {
          pluginConfig[item] = JSON.parse(pluginConfig[item])
        } catch (e) {
          console.warn(e)
        }
      })

      return pluginConfig as T
    } catch (error) {
      console.warn('Error parsing JSON:', error)
      return {} as T
    }
  }

  /**
   * Checks if the plugin config exists.
   * @returns {boolean} True if exists, otherwise false.
   */
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
