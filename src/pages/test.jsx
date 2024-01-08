import { ChangeEvent ,useState ,useEffect ,useRef } from 'react'

type childType = { 
  name: string, 
  edit: (id: number, text: string) => void, 
  id: number 
}
const EditName = ( { name, edit, id }: childType) => {
  const [toggle, setToggle] = useState(false)
  const [text, setText] = useState(name)
  const inputRef = useRef<HTMLInputElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // console.log('useEffect', toggle );
    if (toggle === true) {
      // console.log(`inputRef` , inputRef);
      const parentElementTD = inputRef.current?.parentNode?.parentNode?.parentNode as HTMLElement;
      parentElementTD?.classList.add('active');
    }else {
      const parentElementTD = spanRef.current?.parentNode?.parentNode as HTMLElement;
      parentElementTD?.classList.remove('active');
    }
  }, [toggle]);

  // !event型別
  // ~import { ChangeEvent, MouseEvent } from 'react'
  // ~MouseEvent<HTMLInputElement>
  // ~ChangeEvent<HTMLInputElement>

  function handlerEdit (e: ChangeEvent<HTMLInputElement>){
    setText(e.target.value);
  }
  function handlerSave() {
    edit(id , text)
    setToggle(!toggle)
  }
  function handlerToggle(){
    setToggle(!toggle);
  }

  return (
    <>
      { toggle 
        ? <div className="box">
            {/* 這邊要綁props的text資料才會連動 */}
            <input ref={inputRef} type='text' id='name' name='name' value={ text }
              onChange={ handlerEdit }
            />
            <button onClick={ handlerSave }>更改</button>
          </div>
        : <span ref={spanRef} onClick={ handlerToggle }>{ name }</span>
      }
    </>
  )
}
const Week1: React.FC = () => {
  let idx = 1
  const data = [
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
  const [str] = useState('Week1')
  const [products, setProducts] = useState(data)
  function handlerPatchProduct(id: number, str: string) {
    const ary = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          num: str === 'add' ? (product.num += 1) : (product.num > 0 ? product.num -= 1 : 0),
        }
      }
      return product
    })
    setProducts(ary)
  }
  function handlerChangeName(id: number,text: string) {
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
  }

  return (
    <>
      <h2 className='title'>{str}</h2>
      <div className="outer">
        <table className='table'>
          
          <thead>
            <tr>
              <th scope='col'>品項</th>
              <th scope='col'>描述</th>
              <th scope='col'>價格</th>
              <th scope='col'>庫存</th>
            </tr>
          </thead>

          <tbody>
            {
              products.map((product) => (
                <tr key={ product.id }>
                  <td>
                    <EditName edit={handlerChangeName} id={ product.id } name={ product.name }/>
                  </td>
                  <td>
                    <small>{ product.content }</small>
                  </td>
                  <td>{ product.price }</td>
                  <td>
                    <button
                      type='button'
                      onClick={ () => handlerPatchProduct(product.id, 'cut') }
                    >
                      <span>-</span>
                    </button>
                    <span className='inline-block w-20px text-center'>
                      { product.num }
                    </span>
                    <button
                      type='button'
                      onClick={ () => handlerPatchProduct(product.id, 'add') }
                    >
                      <span>+</span>
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </div>
    </>
  )
}

export default Week1
