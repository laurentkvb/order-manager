export type OrderItem = {
  itemId: string
  name: string
  price: number
  quantity: number
  specialRequests?: string
}

// export type Order = {
//   orderId: string
//   tableNumber?: string
//   status: 'Pending' | 'In Preparation' | 'Ready to Serve' | 'Closed'
//   paid: boolean
//   items: OrderItem[]
//   totalAmount: number
//   orderDateTime: Date
//   specialInstructions?: string
// }

export type OrderItemId = string

export type NewOrderInputFormState = {
  tableNumber?: string
  items: OrderItemId[]
  specialInstructions?: string
}
