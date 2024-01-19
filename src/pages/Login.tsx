import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
const { VITE_BASEURL } = import.meta.env

type LoginData = {
  email: string
  password: string
}
// 登入
const Login: React.FC  = () => {
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
      document.cookie = `token=${token}; expires=${new Date(exp * 1000)}`
      navigate('/todo')
    } 
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
        setMsg(error?.response?.data?.message)
      }
    }
  }
  return (
    <div id='loginPage' className='bg-yellow'>
      <div className='container2 loginPage vhContainer'>
        <div className='side'>
          <img
            className='d-m-n'
            src='https://github.com/panduola666/2023_React/blob/master/src/assets/img/left.png?raw=true'
            alt='workImg'
          />
        </div>
        <div className='formGroup w-full md:w-auto'>
          <form className='formControls' action='' onSubmit={ handleSubmit(login) }>
            <h2 className='formControls_txt'>最實用的線上代辦事項服務</h2>
            <div className='mt-10px text-violet text-wrap'>登入訊息：{ msg }</div>
            {/* react-hook-form插件寫法 */}
            <div className="inputGroup email">
              <label className='formControls_label' htmlFor='email'>
                Email
              </label>
              <input
                className='formControls_input'
                type='text'
                id='email'
                {...register('email', {
                  required: { value: true, message: '信箱必填' },
                  pattern: { value: /^\S+@\S+$/i, message: '信箱格式錯誤' },
                })}
                placeholder='請輸入 email'
              />
              <span>{errors.email && errors.email.message}</span>
            </div>
            <div className="inputGroup password">
              <label className='formControls_label' htmlFor='pwd'>
                密碼
              </label>
              <input
                className='formControls_input'
                type='password'
                id='pwd'
                {...register('password',{
                  required: {value: true, message: '密碼必填'}, 
                  minLength: {value: 6, message: '密碼不可低於 6 個字元'}
                })}
                placeholder='請輸入密碼'
                autoComplete='on'
              />
              <span>{errors.password && errors.password.message}</span>
            </div>

            <div className='flex items-center justify-center mt-30px'>
              <input className='formControls_btnSubmit mr-40px'type='submit'value='登入'/>
              <NavLink to='/signUp' className='formControls_btnLink'><p>註冊帳號</p></NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
