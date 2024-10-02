type FormType = 'SINGLE_LINE_TEXT' | 'NUMBER' | 'CALC' | 'MULTI_LINE_TEXT' | 'RICH_TEXT' | 'CHECK_BOX' | 'RADIO_BUTTON' | 'DROP_DOWN' | 'MULTI_SELECT' | 'DATE' | 'TIME' | 'DATETIME' | 'LINK' | 'FILE' | 'USER_SELECT' | 'ORGANIZATION_SELECT' | 'GROUP_SELECT' | 'CATEGORY' | 'STATUS' | 'STATUS_ASSIGNEE' | 'RECORD_NUMBER' | 'CREATOR' | 'MODIFIER' | 'CREATED_TIME' | 'UPDATED_TIME'

export type FormField = {
  code: string
  label: string
  noLabel: boolean
  required: boolean
  type: FormType
  unique: boolean
  [key: string]: any
}

export async function useFormFieldsType(
  type: FormType,
  appId: number | null = kintone.app.getId(),
): Promise<FormField[]> {
  try {
    const response = await kintone.api('/k/v1/app/form/fields.json', 'GET', {
      app: appId,
    })

    return Object.keys(response.properties)
      .filter((key) => {
        const field = response!.properties[key]
        return field.type === type
      })
      .map(key => response.properties[key])
  } catch (e) {
    console.error(e)
    return []
  }
}
