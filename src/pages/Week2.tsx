import { MouseEvent ,ChangeEvent , useMemo, useState, useRef } from 'react'

let idx = 1
const data = [
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
function Menu({ products, cart, setCart }: MenuType) {
  const handlerAddCart = (product: obj) => {
    const isfind = cart.some(item => item.id === product.id)
    if (isfind) {
      // ~縮寫 return item.id === product.id ? { ...item, num: (item.num ?? 0) + 1 } : item
      const ary = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            num: (item.num ?? 0) + 1
          };
        }
        // 如果不符合條件，保持原樣
        return item;
      })
      setCart(ary);
    } else {
      setCart([ ...cart, { ...product, num: 1 }]) // 製作新陣列
    }
  }
  return (
    <div className='list-group'>
      {
        products.map((product) => (
          <button
            key={ product.id }
            type='button'
            className='list-group-item list-group-item-action'
            onClick={ () => handlerAddCart(product) }
            >
            <h2 className='flex justify-between'>
              <p className='text-black'>{ product.name }</p>
              <small className='text-20px text-red'>${ product.price }</small>
            </h2>
            <p className='text-black/50'>{ product.content }</p>
          </button>
        ))
      }
    </div>
  )
}
function ShoppingCart({ cart, setCart, orderList, setOrderList }: CartType) {

  const commit = useRef<HTMLTextAreaElement>(null);
  // ~產生1~20 數值序列
  const numOption = Array.from({ length: 20 }, (_, index) => {
    return index + 1;
  })
  // ~類似Vue Computed
  const totalPrice = useMemo(() => {
    const total = cart.reduce((total, product) => {
      return (total + product.price * (product.num ?? 0));
    },0);
    return total
  }, [cart])

  const handlerChangNum = (id: number, e: ChangeEvent<HTMLSelectElement>) => {
    setCart(
      cart.map((item) => ({
        ...item,
        num: item.id === id ? + e.target.value : item.num,
      }))
    );
  }
  const handlerDeleteCart = (id:number) => {
    setCart(cart.filter((item) => item.id !== id));
  }
  const handlerCreateOrder = () => {
    if (!commit.current?.value) {
      alert('請輸入備註')
      return
    }
    setOrderList([
      ...orderList,
      {
        data: cart,
        commit: commit.current?.value,
        total: totalPrice,
        created: new Date().getTime(),
      },
    ])
    commit.current.value = ''
    setCart([])
  }
  return (
    <>
      <div className="outer">
        <table className='table table-sm table-hover text-center align-middle'>
          <thead>
            <tr>
              <th scope='col'>操作</th>
              <th scope='col'>品項</th>
              <th scope='col'>單價(元)</th>
              <th scope='col'>數量</th>
              <th scope='col'>小計(元)</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <button
                      type='button'
                      className='btn btn-sm'
                      onClick={ () => handlerDeleteCart(item.id) }>
                      x
                    </button>
                  </td>
                  <td>{ item.name }</td>
                  <td>{ item.price }</td>
                  <td>
                    <select
                      className='form-select form-select-sm'
                      aria-label='Default select example'
                      value={ item.num }
                      onChange={ (e) => handlerChangNum(item.id, e) }
                      >
                      {
                        numOption.map((number) => (
                          <option value={ number } key={ number }>{ number }</option>
                        ))
                      }
                    </select>
                  </td>
                  <td>{ item.price * (item.num ?? 0) }</td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className='text-end'>總計</td>
              <td>$ { totalPrice }</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className='orderList'>
        <textarea className='form-control mb-3' rows={3} placeholder='備註' ref={ commit }></textarea>
        <button type='button' className='btn btn-primary float-end' onClick={ handlerCreateOrder }>送出</button>
      </div>
    </>
  )
}
function History({ order, setCart } : HistoryType) {
  const addCart = (e:MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setCart(order.data)
  }
  return (
    <div className='card h-100 border-primary border-2'>
      <div className='card-body'>
        <h3 className='card-title text-20px'>{ new Date(order.created).toLocaleString() }
          <a href='#' className='btn btn-sm btn-primary float-end' onClick={ (e) => addCart(e) }>再點一次</a>
        </h3>
        <div className="outer">
          <table className='table table-sm text-center align-middle card-text mt-3 mb-1'>
            <thead>
              <tr>
                <th scope='col'>品項</th>
                <th scope='col'>數量</th>
                <th scope='col'>小計</th>
              </tr>
            </thead>
            <tbody>
              {
                order.data.map(item => (
                  <tr key={ item.id }>
                    <td>{ item.name }</td>
                    <td>{ item.num }</td>
                    <td>{ (item.num ?? 0) * item.price }</td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className='text-end'>總計</td>
                <td>$ { order.total }</td>
              </tr>
            </tfoot>
          </table>
        </div>
        { <small className=''>備註: { order.commit || '無備註'}</small> }
      </div>
    </div>
  )
}

const Week2: React.FC = () => {
  const [products] = useState<obj[]>(data)
  const [cart, setCart] = useState<obj[]>([])
  const [orderList, setOrderList] = useState<sendObj[]>([])

  return (
    <>
      <div className='order py-3'>
        <h1 className='text-center'>飲料點餐系統</h1>
        <div className='row'>
          <div className='col-12 col-md-5'>
            <Menu products={ products } cart={ cart } setCart={ setCart }/>
          </div>
          <div className='col-12 col-md-7'>
            { cart.length 
              ? <ShoppingCart cart={ cart } setCart={ setCart } orderList={ orderList } setOrderList={ setOrderList } />
              : <div className='alert alert-primary mt-20px' role='alert'>請選擇商品</div>
            }
          </div>
        </div>

        <hr />

        <h3>歷史訂單</h3>
        { orderList.length
        ? <div className='row gy-3'>
            {
              orderList.sort((pre,next) => next.created - pre.created).map(order => (
                <div className='col-12 col-md-6' key={ order.created }>
                  <History order={ order } setCart={ setCart } />
                </div>
              ))
            }
          </div>
        : <div className='alert alert-info text-center' role='alert'>尚未建立訂單！</div>
        }
      </div>
    </>
  )
}

export default Week2
