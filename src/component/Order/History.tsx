import type { HistoryType } from '@/Type'
import type { MouseEvent } from 'react'

function History({ order, setCart }: HistoryType) {
  const addCart = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setCart(order.data)
  }
  return (
    <div className="card h-100 border-primary border-2">
      <div className="card-body">
        <h3 className="card-title text-20px">
          {new Date(order.created).toLocaleString()}
          <a href="#" className="btn btn-sm bg-violet-500 text-white float-end" onClick={addCart}>
            再點一次
          </a>
        </h3>
        <div className="outer">
          <table className="table table-sm text-center align-middle card-text mt-3 mb-1">
            <thead>
              <tr className="bg-violet-200">
                <th scope="col">品項</th>
                <th scope="col">數量</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              {
                order.data.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.num}</td>
                    <td>{(item.num ?? 0) * item.price}</td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="text-end">
                  總計
                </td>
                <td>
                  $
                  {order.total}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <small className="block my-2">
          備註:
          {order.commit || '無備註'}
        </small>
      </div>
    </div>
  )
}
export default History
