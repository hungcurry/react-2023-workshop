type TDrinks = {
  id: number,
  name: string,
  content: string,
  price: number,
  num?: number,
}
type sendObj = {
  data: TDrinks[],
  commit?: string,
  total: number,
  created: number,
}
type MenuType = {
  products: TDrinks[],
  cart: TDrinks[],
  setCart: (obj: TDrinks[]) => void,
}
type CartType = {
  cart: TDrinks[],
  setCart: (obj: TDrinks[]) => void,
  orderList: sendObj[],
  setOrderList: (obj: sendObj[]) => void,
}
type HistoryType = {
  order: sendObj,
  setCart: (obj: TDrinks[]) => void,
}

export type {
  TDrinks,
  sendObj,
  // ProductProps
  MenuType,
  CartType,
  HistoryType,
};
