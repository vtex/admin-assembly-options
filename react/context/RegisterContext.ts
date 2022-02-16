import React, { useContext } from 'react'

interface RegisterInterface {
  id: number
  name: string
  active: boolean
  required: boolean
  setAssemblyName: (name: React.SetStateAction<string>) => void
  setAssemblyActive: (active: React.SetStateAction<boolean>) => void
  setAssemblyRequired: (required: React.SetStateAction<boolean>) => void
}

const initialValue: RegisterInterface = {
  id: 0,
  name: '',
  active: false,
  required: false,
  setAssemblyName: () => {},
  setAssemblyActive: () => {},
  setAssemblyRequired: () => {},
}

const RegisterContext = React.createContext<RegisterInterface>(initialValue)

export function useRegisterContext() {
  return useContext(RegisterContext)
}

export default RegisterContext
