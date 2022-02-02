import React from 'react'
import { PageHeader } from 'vtex.styleguide'

const AssemblyRegister = () => {
  return (
    <PageHeader
      title="Assembly Register"
      linkLabel="Assembly Options"
      onLinkClick={() => {
        alert('Voltar')
      }}
    />
  )
}

export default AssemblyRegister
