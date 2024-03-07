import React, { useState } from 'react'
import {
  useFieldArray,
  useFormContext,
  UseFieldArrayProps,
} from 'react-hook-form'

import {
  Button,
  Column,
  Container,
  FormTextError,
  Input,
  Label,
  Padding,
  Row,
  Select,
  Text,
} from '#/atoms'
import { styled } from '#/styled-system/jsx'
import {
  MenuItem,
  MenuItemsSelector_FormFieldsNameToFormFieldsState,
} from './types'
import { cn } from '#/utils'
import { formSelectStyles } from './styles'

type MenuItemsSelectorProps = {
  fieldTitle: string
  options: MenuItem[]
} & Pick<
  UseFieldArrayProps<MenuItemsSelector_FormFieldsNameToFormFieldsState>,
  'name' | 'rules'
>

type Rules = {
  required?: {
    value: boolean
    message: string
  }
}

type FieldState = {
  invalid: boolean
  isTouched: boolean
  error?: { message: string }
}

export function MenuItemsSelector({
  fieldTitle,
  name = 'menuItems',
  options,
  rules,
}: MenuItemsSelectorProps) {
  const { control, register } =
    useFormContext<MenuItemsSelector_FormFieldsNameToFormFieldsState>()
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules,
  })

  const [selectedItemId, setSelectedItemId] = useState('')
  const [fieldState, setFieldState] = useState<FieldState>({
    invalid: Boolean(rules?.required),
    isTouched: false,
    error: undefined,
  })

  const handleAddItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (selectedItemId) {
      const selectedMenuItem = options.find(
        (item) => item.id === selectedItemId,
      )

      if (selectedMenuItem) {
        // even if required, we are adding a field so it can't be invalid
        setFieldState({ isTouched: true, invalid: false, error: undefined })
        const { id, label } = selectedMenuItem
        append({ menuItemId: id, label, quantity: 1 })
        setSelectedItemId('')
      }
    }
  }

  const handleRemoveItem = (index: number) => {
    const errorMessage =
      (rules as Rules)?.required?.message || 'This field is required'
    if (fields.length === 1) {
      setFieldState({
        isTouched: true,
        invalid: true,
        error: { message: errorMessage },
      })
    }

    remove(index)
  }

  const availableMenuItems = options.filter(
    // filter out the menu items that have already been added
    (item) => !fields.some((field) => field.menuItemId === item.id),
  )

  return (
    <div>
      {fieldTitle && (
        <Label htmlFor={name} required={Boolean(rules?.required)}>
          {fieldTitle}
        </Label>
      )}
      <Padding px={20} pt={15}>
        <Column gap='15px'>
          <Row justifyContent='space-between' gap='20px'>
            <Select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className={cn(
                fieldState.isTouched && 'touched',
                fieldState.invalid ? 'invalid' : 'valid',
                formSelectStyles,
              )}
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
            <Row key={field.id} justifyContent='space-between' gap='20px'>
              <Text fontSize={22}>{field.label}</Text>
              <Row gap='20px'>
                <Input
                  type='number'
                  {...register(`${name}.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                  min={1}
                  defaultValue={1}
                  css={{ maxW: 60 }}
                />
                <Button
                  maxW={160}
                  onClick={() => handleRemoveItem(index)}
                  text='Remove'
                />
              </Row>
            </Row>
          ))}
        </Column>
        {fieldState.isTouched && fieldState.error?.message && (
          <FormTextError>{fieldState.error?.message}</FormTextError>
        )}
      </Padding>
    </div>
  )
}
