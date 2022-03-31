import React from 'react'
import { createSystem } from '@vtex/admin-ui'

import RegisterProvider from './provider/RegisterProvider'
import EditPage from './components/EditPage'
import GroupFormProvider from './provider/GroupFormProvider'

const AssemblyRegister = () => {
  const [ThemeProvider] = createSystem({
    key: 'assembly-edit-page',
  })

  return (
    <ThemeProvider>
      <RegisterProvider>
        <GroupFormProvider>
          <EditPage />
        </GroupFormProvider>
      </RegisterProvider>
    </ThemeProvider>
  )
}

export default AssemblyRegister
