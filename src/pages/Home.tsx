import { useState } from 'react'

const Home: React.FC = () => {
  // 單數類型 會自動推導
  const [count] = useState(1200)
  // 複數類型
  const [title] = useState<number | string>('白爛貓')

  return (
    <>
      <p>
        {title}
        賣
        {count}
        元
      </p>
    </>
  )
}

export default Home
