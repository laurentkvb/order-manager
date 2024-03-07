'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { FormFieldSet } from '../FormFieldSet'
import { Button, Space, Text } from '#/atoms'
import { MenuItemsSelector } from '../MenuItemsSelector/MenuItemsSelector'
import { MenuItemsSelector_FormFieldsNameToFormFieldsState } from '../MenuItemsSelector/types'

interface FormFieldNamesToFormFieldsState
  extends MenuItemsSelector_FormFieldsNameToFormFieldsState {
  specialInstructions: string
}

export const OrderFormContainer = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const methods = useForm<FormFieldNamesToFormFieldsState>({
    defaultValues: {
      menuItems: [],
      specialInstructions: '',
    },
  })

  const onSubmit: SubmitHandler<FormFieldNamesToFormFieldsState> = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormFieldSet title='Order details'>
          <MenuItemsSelector
            fieldTitle='Menu items'
            name='menuItems'
            options={[
              { label: 'espresso', id: 'espresso-id' },
              { label: 'latte', id: 'latte-id' },
              { label: 'toast', id: 'toast-id' },
              { label: 'omelet', id: 'omelet-id' },
            ]}
            rules={{
              required: {
                value: true,
                message: 'Please add at least one item from the menu',
              },
            }}
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
