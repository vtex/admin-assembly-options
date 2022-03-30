import type { FormikProps } from 'formik'
import type { FC } from 'react'
import React, { useRef } from 'react'

import GroupFormContext from '../context/GroupFormContext'

const GroupFormProvider: FC = ({ children }) => {
  const formRefs = useRef<Array<React.RefObject<FormikProps<unknown>>>>([])

  const addFormRef = (ref: React.RefObject<FormikProps<any>>) => {
    formRefs.current.push(ref)
  }

  const removeFormRef = (ref: React.RefObject<FormikProps<any>>) => {
    const index = formRefs.current.indexOf(ref)

    formRefs.current.splice(index, 1)
  }

  const submitForms = async () => {
    await Promise.all(
      formRefs.current?.map(({ current }) => {
        return current?.submitForm()
      })
    )
  }

  const validateForms = () => {
    const isValid = formRefs.current.every(({ current }) => current?.isValid)

    return isValid
  }

  const submitAndValidateForms = async () => {
    await submitForms()

    return validateForms()
  }

  return (
    <GroupFormContext.Provider
      value={{
        formRefs,
        addFormRef,
        removeFormRef,
        submitForms,
        validateForms,
        submitAndValidateForms,
      }}
    >
      {children}
    </GroupFormContext.Provider>
  )
}

export default GroupFormProvider
