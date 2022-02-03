import React, { useState } from 'react'
import { Collapsible, Input } from 'vtex.styleguide'

const SKUConfig = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      header={
        <span className="c-action-primary hover-c-action-primary fw5">SKU</span>
      }
      onClick={() => setIsOpen(!isOpen)}
      isOpen={isOpen}
    >
      <div className="flex mv6 items-center mb2">
        <div className="mr3 w-50">
          <Input
            placeholder="SKU ID Example: 1122"
            label="SKU ID"
            type="number"
          />
        </div>
        <div className="w-50">
          <Input
            placeholder="Price Table Name that will be used for this SKU"
            label="Price Table Name"
          />
        </div>
      </div>
      <div className="flex mv6 items-center ">
        <div className="mr3 w-50">
          <Input
            placeholder="Minimum integer number for this SKU"
            label="Minimum items applied "
            type="number"
            min="0"
          />
        </div>
        <div className="w-50">
          <Input
            placeholder="Maximum integer number for this SKU"
            label="Maximum items applied "
            type="number"
            min="0"
          />
        </div>
      </div>
      <div className="flex mv6 items-center ">
        <div className="mr3 w-50">
          <Input
            placeholder="Default quantity for this SKU"
            label="Default Quantity"
            type="number"
            min="0"
          />
        </div>
        <div className="w-50" />
      </div>
    </Collapsible>
  )
}

export default SKUConfig
