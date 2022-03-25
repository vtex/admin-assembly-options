import type { FormikProps } from 'formik'
import React, { useContext } from 'react'

interface GroupFormInterface {
  formRefs: React.MutableRefObject<Array<React.RefObject<FormikProps<unknown>>>>
  addFormRef: <T>(formRef: React.RefObject<FormikProps<T>>) => void
  removeFormRef: <T>(formRef: React.RefObject<FormikProps<T>>) => void
  submitForms: () => void
  validateForms: () => boolean
  submitAndValidateForms: () => Promise<boolean>
}

const initialValue: GroupFormInterface = {
  formRefs: { current: [] },
  addFormRef: () => {},
  removeFormRef: () => {},
  submitForms: () => {},
  validateForms: () => true,
  submitAndValidateForms: async () => true,
}

const GroupFormContext = React.createContext<GroupFormInterface>(initialValue)

export function useGroupFormContext() {
  return useContext(GroupFormContext)
}

export default GroupFormContext
