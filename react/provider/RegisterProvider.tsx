import type { FC } from 'react'
import React, { useState } from 'react'

import RegisterContext from '../context/RegisterContext'
import type { AssemblyGroupType } from '../context/RegisterContext'

const RegisterProvider: FC = ({ children }) => {
  const random = Math.floor(Math.random() * 10000)
  const [assemblyId, setAssemblyId] = useState<number>(random)
  const [assemblyName, setAssemblyName] = useState<string>('')
  const [assemblyActive, setAssemblyActive] = useState<boolean>(false)
  const [assemblyRequired, setAssemblyRequired] = useState<boolean>(false)
  const [assemblyGroup, setAssemblyGroup] = useState<AssemblyGroupType[]>([])

  return (
    <RegisterContext.Provider
      value={{
        id: assemblyId,
        name: assemblyName,
        active: assemblyActive,
        required: assemblyRequired,
        group: assemblyGroup,
        setAssemblyId,
        setAssemblyName,
        setAssemblyActive,
        setAssemblyRequired,
        setAssemblyGroup,
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}

export default RegisterProvider
