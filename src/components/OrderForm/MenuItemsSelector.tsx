import React, { useState } from 'react'
import {
  useFieldArray,
  useFormContext,
  FieldValues,
  ArrayPath,
} from 'react-hook-form'

import { Button, Row, Select } from '#/atoms'
import { styled } from '#/styled-system/jsx'

type MenuItem = {
  label: string
  id: string
}

// our FormInputs names need to contain this name for our component
type MultiFieldsName = 'menuItems'
type ItemFormState = {
  /* we can't use id as property here because useFieldArray appends an id to each field and they class */
  menuItemId: string
  label: string
  quantity: number
}
type MenuItemsSelector_MultiFieldsNameToFormState = {
  [K in MultiFieldsName]: ItemFormState[]
}

type SelectProps = {
  fieldTitle: string
  options: MenuItem[]
  name?: MultiFieldsName
}

export function MenuItemsSelector({
  fieldTitle,
  options,
  name = 'menuItems',
}: SelectProps) {
  const { control, register } =
    useFormContext<MenuItemsSelector_MultiFieldsNameToFormState>()
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  const [selectedItemId, setSelectedItemId] = useState('')

  const handleAddItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (selectedItemId) {
      const selectedMenuItem = options.find(
        (item) => item.id === selectedItemId,
      )

      if (selectedMenuItem) {
        const { id, label } = selectedMenuItem

        append({ menuItemId: id, label, quantity: 1 })
        setSelectedItemId('')
      }
    }
  }

  const availableMenuItems = options.filter(
    // filter out the menu items that have already been added
    (item) => !fields.some((field) => field.menuItemId === item.id),
  )

  return (
    <>
      <Row justifyContent='space-between' gap='20px'>
        <Select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
        >
          <styled.option display='none' value=''>
            Select an item
          </styled.option>
          {availableMenuItems.map((item) => (
            <styled.option
              key={item.id}
              value={item.id}
              color='#2b2e31'
              fontSize='1rem'
              fontFamily='mulish'
            >
              {item.label}
            </styled.option>
          ))}
        </Select>
        <Button onClick={handleAddItem} text='Add Item' maxW={160} />
      </Row>
      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <span style={{ marginRight: '10px' }}>{JSON.stringify(field)}</span>
          <input
            type='number'
            {...register(`${name}.${index}.quantity`, {
              valueAsNumber: true,
            })}
            min={1}
            defaultValue={1}
          />
          <button
            type='button'
            onClick={() => remove(index)}
            style={{ marginLeft: '10px' }}
          >
            Remove
          </button>
        </div>
      ))}
    </>
  )
}
