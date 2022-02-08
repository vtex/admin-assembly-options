import React from 'react'
import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleContent,
  useCollapsibleState,
} from '@vtex/admin-ui'
import { FormikInput } from '@vtex/admin-formik'

const KeyRegister = () => {
  const state = useCollapsibleState()

  return (
    <Collapsible csx={{ width: '100%' }} state={state}>
      <CollapsibleHeader label="Key Example" />
      <CollapsibleContent>
        <FormikInput name="" label="Key Name" />
      </CollapsibleContent>
    </Collapsible>
  )
}

export default KeyRegister
