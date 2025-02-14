import type { TDrinks } from '@/Type'
import Input from '@/component/Input'
import { useCallback, useState } from 'react'

let idx = 1
const data: TDrinks[] = [
  {
    id: idx++,
    name: '珍珠奶茶',
    content: '香濃奶茶搭配QQ珍珠',
    price: 50,
    num: 20,
  },
  {
    id: idx++,
    name: '冬瓜檸檬',
    content: '清新冬瓜配上新鮮檸檬',
    price: 45,
    num: 18,
  },
  {
    id: idx++,
    name: '翡翠檸檬',
    content: '綠茶與檸檬的完美結合',
    price: 55,
    num: 34,
  },
  {
    id: idx++,
    name: '四季春茶',
    content: '香醇四季春茶，回甘無比',
    price: 45,
    num: 10,
  },
  {
    id: idx++,
    name: '阿薩姆奶茶',
    content: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    num: 25,
  },
  {
    id: idx++,
    name: '檸檬冰茶',
    content: '檸檬與冰茶的清新組合',
    price: 45,
    num: 20,
  },
  {
    id: idx++,
    name: '芒果綠茶',
    content: '芒果與綠茶的獨特風味',
    price: 55,
    num: 18,
  },
  {
    id: idx++,
    name: '抹茶拿鐵',
    content: '抹茶與鮮奶的絕配',
    price: 60,
    num: 20,
  },
]
const Week1: React.FC = () => {
  const [str] = useState('Week1')
  const [products, setProducts] = useState(data)

  const handlerPatchProduct = (id: number, str: string) => {
    const ary = products.map((product) => {
      if (product.id === id) {
        const currentNum = product.num ?? 0
        return {
          ...product,
          num: str === 'add' ? currentNum + 1 : Math.max(currentNum - 1, 0),
        }
      }
      return product
    })
    setProducts(ary)
  }
  const handlerChangeName = useCallback((id: number, text: string) => {
    const ary = products.map((product) => {
      // ~縮寫 return product.id === id ? { ...product, name: text } : product
      if (product.id === id) {
        return {
          ...product,
          name: text,
        }
      }
      return product
    })
    setProducts(ary)
  }, [products])
  const handleRender = (product: TDrinks) => {
    return (
      <tr key={product.id}>
        <td>
          <Input id={product.id} name={product.name} edit={handlerChangeName} />
        </td>
        <td>
          <small>{product.content}</small>
        </td>
        <td>{product.price}</td>
        <td className="w-200px">
          <button type="button" className="button" onClick={() => handlerPatchProduct(product.id, 'cut')}>
            <span>-</span>
          </button>
          <span className="inline-block w-20px text-center">{product.num}</span>
          <button type="button" className="button" onClick={() => handlerPatchProduct(product.id, 'add')}>
            <span>+</span>
          </button>
        </td>
      </tr>
    )
  }
  return (
    <>
      <h2 className="title my-3 text-20px">{str}</h2>
      <div className="outer">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">品項</th>
              <th scope="col">描述</th>
              <th scope="col">價格</th>
              <th scope="col">庫存</th>
            </tr>
          </thead>

          <tbody>{products.map(product => handleRender(product))}</tbody>
        </table>
      </div>
    </>
  )
}
export default Week1
