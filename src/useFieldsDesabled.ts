export const useFieldsDisabled = <T>(keys: (keyof T)[]) => {
  const record = kintone.app.record.get()
  keys.forEach(key => (record.record[key].disabled = true))

  kintone.app.record.set(record)
}
