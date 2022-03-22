import React from 'react'
import { createSystem } from '@vtex/admin-ui'

import ListPage from './components/ListPage'

const AssemblyRegister = () => {
  const [ThemeProvider] = createSystem({
    key: 'assembly-register-page',
  })

  return (
    <ThemeProvider>
      <ListPage />
    </ThemeProvider>
  )
}

export default AssemblyRegister
