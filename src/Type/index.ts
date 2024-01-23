type obj = { 
  id: number,
  name: string,
  content: string,
  price: number,
  num?: number,
}
type sendObj = { 
  data: obj[],
  commit?: string,
  total: number,
  created: number,
}
type MenuType = { 
  products: obj[], 
  cart: obj[],
  setCart: (obj: obj[]) => void,
}
type CartType = { 
  cart: obj[],
  setCart: (obj: obj[]) => void,
  orderList: sendObj[],
  setOrderList: (obj: sendObj[]) => void,
}
type HistoryType = { 
  order: sendObj,
  setCart: (obj: obj[]) => void,
}

export type {
  obj,
  sendObj,
  // ProductProps
  MenuType,
  CartType,
  HistoryType,
};
