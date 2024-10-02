import { describe, expect, it } from 'vitest'
import { useFormFieldsType } from '../useFormFieldsType'

describe('useFormFieldsType', () => {
  it('returns fields of the correct type', async () => {
    const fieldType = 'SINGLE_LINE_TEXT'
    const response = await useFormFieldsType(fieldType)

    expect(response[0].type).toEqual(fieldType)
  })

  it('returns an empty array when no fields match the type', async () => {
    const fieldType = 'NUMBER'
    const response = await useFormFieldsType(fieldType)

    expect(response).toEqual([])
  })
})
