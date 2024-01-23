import { ChangeEvent } from 'react'
import { useMemo, useRef } from 'react'
import { CartType } from '@/Type'

const ShoppingCart = ({ cart, setCart, orderList, setOrderList }: CartType) => {

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
      <div className="outer px-2 py-4">
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
export default ShoppingCart
