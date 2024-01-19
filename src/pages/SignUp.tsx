import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
const { VITE_BASEURL } = import.meta.env

type LoginData = {
  email: string
  nickname: string
  password: string
  checkPwd: string
}
// 註冊
const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState('')
  // ~react-hook-form插件寫法
  const { register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues:{
      email: '',
      password: '',
      nickname: '',
      checkPwd: '',
    },
    // mode: onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
    mode: 'onTouched'
  })
  const onSubmit = async (data: LoginData) => {
    if(data.password !== data.checkPwd) {
      alert('兩次密碼不一樣')
      return
    }

    try {
      const res = await axios.post(`${VITE_BASEURL}/users/sign_up`, data);
      console.log(`註冊成功`)
      console.log(`res` ,res.data.uid);
      setMsg(res.data.uid);
      // alert('註冊成功');
      navigate('/week3/SignUp');
    } 
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
        setMsg(error?.response?.data?.message)
      }
    }
  }
  return (
    <div id='signUpPage' className='bg-yellow'>
      <div className='container2 signUpPage vhContainer'>
        <div className='side'>
          <img
            className='d-m-n'
            src='https://github.com/panduola666/2023_React/blob/master/src/assets/img/left.png?raw=true'
            alt='workImg'
          />
        </div>
        <div className='formGroup'>
          <form className='formControls' action='index.html' onSubmit={ handleSubmit(onSubmit) }>
            <h2 className='formControls_txt'>註冊帳號</h2>
            <div className='mt-10px text-violet text-wrap'>註冊訊息：{ msg }</div>
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
                  pattern: { value: /^\S+@\S+$/i, message: '信箱格式錯誤' }
                })}
                placeholder='請輸入 email'
              />
              <p style={{color: 'red'}}>{errors.email && errors.email.message}</p>
            </div>
            <div className="inputGroup nickname">
              <label className='formControls_label' htmlFor='name'>
                您的暱稱
              </label>
              <input
                className='formControls_input'
                type='text'
                {...register('nickname',{
                  required: { value: true, message: '暱稱必填' }
                })}
                id='name'
                placeholder='請輸入您的暱稱'
              />
              <p style={{color: 'red'}}>{errors.nickname && errors.nickname.message}</p>
            </div>
            <div className="inputGroup password">
              <label className='formControls_label' htmlFor='pwd'>
                密碼
              </label>
              <input
                className='formControls_input'
                type='password'
                {...register('password',{
                  required: { value: true, message: '密碼必填' }, 
                  minLength: { value: 6, message: '密碼不可低於 6 個字元' }
                })}
                id='pwd'
                placeholder='請輸入密碼'
              />
              <p style={{color: 'red'}}>{errors.password && errors.password.message}</p>
            </div>
            <div className="inputGroup checkPwd">
              <label className='formControls_label' htmlFor='checkPwd'>
                再次輸入密碼
              </label>
              <input
                className='formControls_input'
                type='password'
                {...register('checkPwd',{
                  required: { value: true, message: '確認密碼必填' }, 
                  minLength: { value: 6, message: '確認密碼不可低於 6 個字元' }
                })}
                id='checkPwd'
                placeholder='請再次輸入密碼'
              />
              <p style={{color: 'red'}}>{errors.checkPwd && errors.checkPwd.message}</p>
            </div>

            <div className='flex items-center justify-center mt-30px'>
              <NavLink to='/' className='formControls_btnLink'><p>登入</p></NavLink>
              <input className='formControls_btnSubmit ml-40px' type='submit' value='註冊帳號'/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default SignUp
