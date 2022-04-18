import React from 'react'
import { createSystem, ToastProvider } from '@vtex/admin-ui'

import ListPage from './components/ListPage'

const AssemblyRegister = () => {
  const [ThemeProvider] = createSystem({
    key: 'assembly-register-page',
  })

  return (
    <ThemeProvider>
      <ToastProvider>
        <ListPage />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default AssemblyRegister
