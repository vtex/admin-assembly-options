import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleContent,
  useCollapsibleState,
  Flex,
  Box,
  Label,
} from '@vtex/admin-ui'
import { FormikInput, FormikNumericStepper } from '@vtex/admin-formik'
import { useIntl } from 'react-intl'

import SKUModal from '../SKUModal'
import SKUGrid from '../SKUGrid'
import { messages } from '../../utils/messages'

const AssemblyKey = () => {
  const state = useCollapsibleState()
  const intl = useIntl()
  const [keyName, setKeyName] = useState<string>('')

  return (
    <Collapsible csx={{ width: '100%', marginTop: '20px' }} state={state}>
      <CollapsibleHeader
        csx={{ padding: '10px 0px' }}
        label={`${intl.formatMessage(messages.keyName)} ${keyName}`}
      />
      <CollapsibleContent>
        <Flex direction="column" justify="space-between">
          <Flex direction="column">
            <FormikInput
              name="assembly.key.name"
              label={`${intl.formatMessage(messages.keyNameLabel)}`}
              csx={{ margin: '0px' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setKeyName(e.target.value)
              }
            />
            <Flex csx={{ paddingRight: 3 }}>
              <Box csx={{ width: '1/2', paddingRight: 2, marginTop: 3 }}>
                <Label csx={{ width: '100%' }}>
                  {intl.formatMessage(messages.keyMinimumLabel)}
                </Label>
                <FormikNumericStepper
                  csx={{ width: '100%' }}
                  minValue={0}
                  name="assembly.key.minimum"
                  label={`${intl.formatMessage(messages.keyMinimumLabel)}`}
                />
              </Box>
              <Box csx={{ width: '1/2', marginTop: 3 }}>
                <Label csx={{ width: '100%' }}>
                  {intl.formatMessage(messages.keyMaximumLabel)}
                </Label>
                <Box csx={{ width: '100%' }}>
                  <FormikNumericStepper
                    csx={{ width: '100%' }}
                    minValue={0}
                    name="assembly.key.maximum"
                    label={`${intl.formatMessage(messages.keyMaximumLabel)}`}
                  />
                </Box>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Flex csx={{ marginTop: 5 }}>
          <SKUGrid />
        </Flex>
        <Flex>
          <Box>
            <SKUModal />
          </Box>
        </Flex>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default AssemblyKey
