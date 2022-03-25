import React, { useContext } from 'react'

interface AssemblyGroupType {
  key: string
  name: string
  minItems: number
  maxItems: number
  items: SKUType[]
}

interface SKUType {
  skuId: string
  priceTable: string
  minValue: number
  maxValue: number
  defaultValue: number
}

interface RegisterInterface {
  id: number
  name: string
  active: boolean
  required: boolean
  group: AssemblyGroupType[]
  setAssemblyId: (id: React.SetStateAction<number>) => void
  setAssemblyName: (name: React.SetStateAction<string>) => void
  setAssemblyActive: (active: React.SetStateAction<boolean>) => void
  setAssemblyRequired: (required: React.SetStateAction<boolean>) => void
  setAssemblyGroup: (group: React.SetStateAction<AssemblyGroupType[]>) => void
}

const initialValue: RegisterInterface = {
  id: 0,
  name: '',
  active: false,
  required: false,
  group: [],
  setAssemblyId: () => {},
  setAssemblyName: () => {},
  setAssemblyActive: () => {},
  setAssemblyRequired: () => {},
  setAssemblyGroup: () => {},
}

const RegisterContext = React.createContext<RegisterInterface>(initialValue)

export function useRegisterContext() {
  return useContext(RegisterContext)
}

export default RegisterContext
export type { AssemblyGroupType, SKUType }
