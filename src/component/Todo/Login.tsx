import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const { VITE_BASEURL } = import.meta.env

type LoginData = {
  email: string
  password: string
}
// 登入
const Login: React.FC = () => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState('')

  // ~react-hook-form插件寫法
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    // mode: onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
    mode: 'onTouched',
  })
  const login = async (data: LoginData) => {
    try {
      const res = await axios.post(`${VITE_BASEURL}/users/sign_in`, data)
      // exp 是後端回傳回來的 時間到期日(時間搓)
      const { token, exp } = res.data
      setMsg(res.data.token)
      document.cookie = `react-token=${token}; expires=${new Date(exp * 1000)}`
      navigate('/todo')
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
        setMsg(error?.response?.data?.message)
      }
    }
  }
  return (
    <div className="container2 loginPage vhContainer">
      <div className="side">
        <img
          className="d-m-n"
          src="https://github.com/panduola666/2023_React/blob/master/src/assets/img/left.png?raw=true"
          alt="workImg"
        />
      </div>
      <div className="formGroup w-full md:w-auto">
        <form className="formControls" action="" onSubmit={handleSubmit(login)}>
          <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
          <div className="mt-10px text-violet text-wrap">
            登入訊息：
            { msg }
          </div>
          {/* react-hook-form插件寫法 */}
          <div className="inputGroup email">
            <label className="formControls_label" htmlFor="email">
              Email
            </label>
            <input
              className="formControls_input"
              type="text"
              id="email"
              {
                ...register('email', {
                  required: { value: true, message: '信箱必填' },
                  pattern: { value: /^\S[^\s@]*@\S+$/, message: '信箱格式錯誤' },
                })
              }
              placeholder="請輸入 email"
            />
            <p className="text-red mt-4px">{errors.email && errors.email.message}</p>
          </div>
          <div className="inputGroup password">
            <label className="formControls_label" htmlFor="pwd">
              密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              id="pwd"
              {
                ...register('password', {
                  required: { value: true, message: '密碼必填' },
                  minLength: { value: 6, message: '密碼不可低於 6 個字元' },
                })
              }
              placeholder="請輸入密碼"
              autoComplete="on"
            />
            <p className="text-red mt-4px">{errors.password && errors.password.message}</p>
          </div>

          <div className="flex items-center justify-end mt-30px">
            <input className="btnSubmit border-0" type="submit" value="登入" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
