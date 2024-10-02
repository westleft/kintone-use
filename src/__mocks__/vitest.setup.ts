import { vi } from 'vitest'

let pluginConfig: Record<string, any> = {}

vi.stubGlobal('kintone', {
  app: {
    getId: () => 20,
  },
  api: async (_pathOrUrl: string, _method: string, _params: any) => {
    return {
      properties: [
        {
          code: 'IP位置code',
          defaultValue: '',
          expression: '',
          hideExpression: false,
          label: 'IP位置',
          maxLength: '',
          minLength: '',
          noLabel: false,
          required: false,
          type: 'SINGLE_LINE_TEXT',
          unique: false,
        },
        {
          code: '文字編輯方塊',
          defaultValue: '',
          label: '文字編輯方塊',
          noLabel: false,
          required: false,
          type: 'RICH_TEXT',
        },
      ],
    }
  },
  plugin: {
    app: {
      setConfig: vi.fn((config: Record<string, any>) => {
        pluginConfig = config
      }),
      getConfig: vi.fn(() => pluginConfig),
    },
  },
})
