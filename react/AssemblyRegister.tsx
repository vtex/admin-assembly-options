import React from 'react'
import { createSystem, Page, PageHeader, PageTitle } from '@vtex/admin-ui'

const AssemblyRegister = () => {
  const [ThemeProvider] = createSystem({
    key: 'assembly-register-theme',
  })

  return (
    <ThemeProvider>
      {
        <Page>
          <PageHeader>
            <PageTitle>Assembly Options</PageTitle>
          </PageHeader>
        </Page>
      }
    </ThemeProvider>
  )
}

export default AssemblyRegister
