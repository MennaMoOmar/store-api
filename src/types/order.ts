export const enum status_type {
  active,
  complete,
}

type Order = {
  id?: string
  status: status_type
  user_id: string
}

export default Order
