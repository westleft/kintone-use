# kintone-use

⚠️ This is not an official package.

## usage

```
npm i kintone-use
```

### usePluginConfig

Configure the plugin config to store data in an object containing arrays format.

- setPluginConfig
- getPluginConfig
- hasPluginConfig

```javascript
import { usePluginConfig } from 'kintone-use'

const { setPluginConfig, getPluginConfig, hasPluginConfig } = usePluginConfig()
```

### useFormFieldsType

```javascript
import { useFormFieldsType } from 'kintone-use'

// async ...
await useFormFieldsType('SINGLE_LINE_TEXT')
```
