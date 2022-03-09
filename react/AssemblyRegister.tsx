import React from 'react'
import { createSystem } from '@vtex/admin-ui'

import RegisterProvider from './provider/RegisterProvider'
import RegisterPage from './components/RegisterPage/RegisterPage'

const AssemblyRegister = () => {
  const [ThemeProvider] = createSystem({
    key: 'assembly-register-page',
  })

  return (
    <ThemeProvider>
      <RegisterProvider>
        <RegisterPage />
      </RegisterProvider>
    </ThemeProvider>
  )
}

export default AssemblyRegister
