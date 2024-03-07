'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { FormFieldSet } from '../FormFieldSet'
import { Button, Space, Text } from '#/atoms'
import { MenuItemsSelector } from './MenuItemsSelector'

// @todo check if this is correct
interface FieldNamesMapToFormState {
  menuItems: { menuItemId: string; label: string; quantity: number }[]
  specialInstructions: string
}

export const OrderFormContainer = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const methods = useForm<FieldNamesMapToFormState>({
    defaultValues: {
      menuItems: [],
      specialInstructions: '',
    },
  })

  const onSubmit: SubmitHandler<FieldNamesMapToFormState> = (data) => {
    console.log('ON SUBMIT CALLED')
    console.log(data)
  }

  console.log('1')

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormFieldSet title='Order details'>
          <MenuItemsSelector
            fieldTitle='Select an item'
            name='menuItems'
            options={[
              { label: 'espresso', id: 'espresso-id' },
              { label: 'latte', id: 'latte-id' },
              { label: 'toast', id: 'toast-id' },
              { label: 'omelet', id: 'omelet-id' },
            ]}
          />

          <div>
            <label htmlFor='specialInstructions'>Special Instructions</label>
            <input
              id='specialInstructions'
              {...methods.register('specialInstructions')}
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
    </FormProvider>
  )
}
