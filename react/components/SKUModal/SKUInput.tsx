import React from 'react'
import { Input } from '@vtex/admin-ui'
import { useField } from 'formik'
import type { FormikInputProps } from '@vtex/admin-formik'

const SKUInput = (props: FormikInputProps) => {
  const { name, id = name, ...inputProps } = props

  const [field, meta, helpers] = useField(name)

  return (
    <Input
      id={id}
      value={field.value}
      tone={meta.error ? 'critical' : undefined}
      criticalText={meta.error ?? undefined}
      pattern="[0-9]*"
      onChange={(e) => {
        const value = e.target.validity.valid ? e.target.value : field.value

        helpers.setValue(value)
      }}
      {...inputProps}
    />
  )
}

export default SKUInput
