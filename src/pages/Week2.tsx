import Menu from '@/component/Order/Menu'
import ShoppingCart from '@/component/Order/ShoppingCart'
import History from '@/component/Order/History'
import { useState, Fragment, useMemo } from 'react'
import { TDrinks, sendObj } from '@/Type'

let idx = 1
const data: TDrinks[] = [
  {
    id: idx++,
    name: '珍珠奶茶',
    content: '香濃奶茶搭配QQ珍珠',
    price: 50,
  },
  {
    id: idx++,
    name: '冬瓜檸檬',
    content: '清新冬瓜配上新鮮檸檬',
    price: 45,
  },
  {
    id: idx++,
    name: '翡翠檸檬',
    content: '綠茶與檸檬的完美結合',
    price: 55,
  },
  {
    id: idx++,
    name: '四季春茶',
    content: '香醇四季春茶，回甘無比',
    price: 45,
  },
  {
    id: idx++,
    name: '阿薩姆奶茶',
    content: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
  },
  {
    id: idx++,
    name: '檸檬冰茶',
    content: '檸檬與冰茶的清新組合',
    price: 45,
  },
  {
    id: idx++,
    name: '芒果綠茶',
    content: '芒果與綠茶的獨特風味',
    price: 55,
  },
  {
    id: idx++,
    name: '抹茶拿鐵',
    content: '抹茶與鮮奶的絕配',
    price: 60,
  },
]
const Week2: React.FC = () => {
  const [products] = useState<TDrinks[]>(data)
  const [cart, setCart] = useState<TDrinks[]>([])
  const [orderList, setOrderList] = useState<sendObj[]>([])

  // ~類似Vue Computed
  const sortOrderList = useMemo(() => {
    const ary = orderList.sort((pre, next) => next.created - pre.created)
    return ary
  }, [orderList])

  return (
    <>
      <div className='order py-3'>
        <Fragment>
          <h2 className='title text-20px text-center my-3'>飲料點餐系統</h2>
          <div className='row'>
            <div className='col-12 col-md-5'>
              <Menu products={products} cart={cart} setCart={setCart} />
            </div>
            <div className='col-12 col-md-7'>
              {cart.length ? (
                <ShoppingCart
                  cart={cart}
                  orderList={orderList}
                  setCart={setCart}
                  setOrderList={setOrderList}
                />
              ) : (
                <div className='alert alert-primary mt-20px' role='alert'>
                  請選擇商品
                </div>
              )}
            </div>
          </div>
        </Fragment>
        <hr />
        <Fragment>
          <h2 className='title text-20px text-center my-3'>歷史訂單</h2>
          {orderList.length ? (
            <div className='row gy-3'>
              {sortOrderList.map((order) => (
                <div className='col-12 col-md-6' key={order.created}>
                  <History order={order} setCart={setCart} />
                </div>
              ))}
            </div>
          ) : (
            <div className='alert alert-info text-center' role='alert'>
              尚未建立訂單！
            </div>
          )}
        </Fragment>
      </div>
    </>
  )
}
export default Week2
