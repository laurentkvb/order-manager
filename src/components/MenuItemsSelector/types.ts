// our FormInputs names need to contain this name for our component
export type FormFieldsName = 'menuItems'

export type FormFieldState = {
  /* we can't use id as property here because useFieldArray appends 
    an id to each field and they class */
  menuItemId: string
  label: string
  quantity: number
}

export type MenuItemsSelector_FormFieldsNameToFormFieldsState = {
  [K in FormFieldsName]: FormFieldState[]
}

export type MenuItem = {
  label: string
  id: string
}
