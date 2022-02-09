import React from 'react'
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

import SKUModal from '../SKUModal'
import SKUGrid from '../SKUGrid'

const RegisterKey = () => {
  const state = useCollapsibleState()

  return (
    <Collapsible csx={{ width: '100%', marginTop: '20px' }} state={state}>
      <CollapsibleHeader label="Key Example" />
      <CollapsibleContent>
        <Flex direction="row" justify="space-between">
          <Box csx={{ width: '80%' }}>
            <Flex direction="row" align="end">
              <Box csx={{ width: '38%', paddingRight: 3 }}>
                <FormikInput name="assembly.key.name" label="Key Name" />
              </Box>
              <Box csx={{ paddingRight: 3 }}>
                <Label>Minimum Items applicable</Label>
                <FormikNumericStepper
                  minValue={0}
                  name="assembly.key.minimum"
                  label="Minimum Items applicable"
                />
              </Box>
              <Box csx={{ paddingRight: 3 }}>
                <Label>Maximum Items applicable</Label>
                <FormikNumericStepper
                  minValue={0}
                  name="assembly.key.maximum"
                  label="Maximum Items applicable"
                />
              </Box>
            </Flex>
          </Box>
          <Box>
            <SKUModal />
          </Box>
        </Flex>
        <Flex>
          <SKUGrid />
        </Flex>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default RegisterKey
