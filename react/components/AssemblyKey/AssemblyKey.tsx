/* eslint-disable prettier/prettier */
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
        label={`${intl.formatMessage(messages.keyName)} ${keyName}`}
      />
      <CollapsibleContent>
        <Flex direction="row" justify="space-between">
          <Box csx={{ width: '80%' }}>
            <Flex direction="row" align="end">
              <Box csx={{ width: '38%', paddingRight: 3 }}>
                <FormikInput
                  name="assembly.key.name"
                  label={`${intl.formatMessage(messages.keyNameLabel)}`}
                  csx={{ margin: '0px' }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setKeyName(e.target.value)
                  }
                />
              </Box>
              <Box csx={{ paddingRight: 3 }}>
                <Label>{intl.formatMessage(messages.keyMinimumLabel)}</Label>
                <FormikNumericStepper
                  minValue={0}
                  name="assembly.key.minimum"
                  label={`${intl.formatMessage(messages.keyMinimumLabel)}`}
                />
              </Box>
              <Box csx={{ paddingRight: 3 }}>
                <Label>{intl.formatMessage(messages.keyMaximumLabel)}</Label>
                <FormikNumericStepper
                  minValue={0}
                  name="assembly.key.maximum"
                  label={`${intl.formatMessage(messages.keyMaximumLabel)}`}
                />
              </Box>
            </Flex>
          </Box>
          <Box>
            <SKUModal />
          </Box>
        </Flex>
        <Flex csx={{ marginTop: 5 }}>
          <SKUGrid />
        </Flex>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default AssemblyKey
