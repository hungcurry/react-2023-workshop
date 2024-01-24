import { obj , MenuType } from '@/Type'

const Menu = ({ products, cart, setCart }: MenuType) => {
  const handlerAddCart = (product: obj) => {
    const isfind = cart.some(item => item.id === product.id)
    if (isfind) {
      // ~縮寫 return item.id === product.id ? { ...item, num: (item.num ?? 0) + 1 } : item
      const ary = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            num: (item.num ?? 0) + 1
          }
        }
        // 如果不符合條件，保持原樣
        return item
      })
      setCart(ary)
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
export default Menu
