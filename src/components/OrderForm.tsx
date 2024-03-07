'use client'
import React, { useState } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { FormFieldSet } from './FormFieldSet'
import { Button, Space, Text } from '#/atoms'

interface IFormInput {
  items: { menuItemId: string; quantity: number }[]
  specialInstructions: string
}

const OrderForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { control, handleSubmit, register } = useForm<IFormInput>({
    defaultValues: {
      items: [],
      specialInstructions: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const [selectedItem, setSelectedItem] = useState('')
  const menuItems = ['espresso', 'latte', 'toast', 'omelet']

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  const handleAddItem = () => {
    if (selectedItem) {
      append({ menuItem: selectedItem, quantity: 1 })
      setSelectedItem('')
    }
  }

  const availableMenuItems = menuItems.filter(
    // filter out the menu items that have already been added
    (item) => !fields.some((field) => field.menuItem === item),
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldSet title='Order details'>
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value=''>Select an item</option>
          {availableMenuItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button type='button' onClick={handleAddItem}>
          Add Item
        </button>

        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span style={{ marginRight: '10px' }}>{field.menuItem}</span>
            <input
              type='number'
              {...register(`items.${index}.quantity` as const, {
                valueAsNumber: true,
              })}
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

        <div>
          <label htmlFor='specialInstructions'>Special Instructions</label>
          <input
            id='specialInstructions'
            {...register('specialInstructions')}
          />
        </div>
      </FormFieldSet>
      <Space h={20} />
      <Button type='submit' text='Submit Order' />
      <Space h={20} />
      {errorMessage && (
        <Text color='red' textAlign='center' css={{ w: '100%' }}>
          {errorMessage}
        </Text>
      )}
    </form>
  )
}

export default OrderForm
