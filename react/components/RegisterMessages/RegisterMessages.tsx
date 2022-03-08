import { Alert } from '@vtex/admin-ui'
import React from 'react'
import type { AssemblyOption } from 'vtexbr.assembly-options-graphql'
import { FormattedMessage } from 'react-intl'

interface Props {
  data: AssemblyOption | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any | undefined
  loading: boolean | undefined
}

interface ErrorType {
  code: string
  message: string
  configName: string
  skuId: string
}

const RegisterMessages = (props: Props) => {
  const { data, error, loading } = props

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorMessages: any = {
    configIncreasingValueRange:
      'admin/assembly.register.error-config-value-range',
    skuDefaultValueRangeValidate:
      'admin/assembly.register.error-sku-value-range',
    skuDefaultValueValidate: 'admin/assembly.register.error-sku-value',
    skuIncreasingValueRange:
      'admin/assembly.register.error-sku-increasing-value',
    skuMaxQuantityValidate: 'admin/assembly.register.error-sku-max-value',
    skuQuantityOutOfAssemblyOptionRange:
      'admin/assembly.register.error-sku-range-assembly',
    skuSumDefaultValueValidate:
      'admin/assembly.register.error-sku-range-assembly-default',
    uniqueKeyValidate: 'admin/assembly.register.error-unique-key',
  }

  if (loading === true) {
    return (
      <Alert visible tone="warning">
        Loading
      </Alert>
    )
  }

  if (error) {
    const errorsGraphQL =
      error.graphQLErrors[0].extensions.exception.graphQLErrors

    return (
      <Alert visible tone="critical">
        <ul>
          {errorsGraphQL.map((value: ErrorType, index: number) => {
            const codeValue = value.code || ''
            const skuId = value.skuId || ''
            const configName = value.configName || ''

            return (
              <li key={index}>
                <FormattedMessage
                  id={errorMessages[codeValue]}
                  values={{
                    configName,
                    skuId,
                  }}
                />
              </li>
            )
          })}
        </ul>
      </Alert>
    )
  }

  if (data) {
    return (
      <Alert visible tone="positive">
        Data
      </Alert>
    )
  }

  return <> </>
}

export default RegisterMessages
