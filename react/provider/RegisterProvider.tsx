import type { FC } from 'react'
import React, { useState } from 'react'

import RegisterContext from '../context/RegisterContext'

const RegisterProvider: FC = ({ children }) => {
  const [assemblyName, setAssemblyName] = useState<string>('')
  const [assemblyActive, setAssemblyActive] = useState<boolean>(false)
  const [assemblyRequired, setAssemblyRequired] = useState<boolean>(false)
  const random = Math.floor(Math.random() * 10000)

  return (
    <RegisterContext.Provider
      value={{
        id: random,
        name: assemblyName,
        active: assemblyActive,
        required: assemblyRequired,
        setAssemblyName,
        setAssemblyActive,
        setAssemblyRequired,
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}

export default RegisterProvider
