import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const { VITE_BASEURL } = import.meta.env

type SignData = {
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
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
      checkPwd: '',
    },
    // mode: onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
    mode: 'onTouched',
  })
  const onSubmit = async (data: SignData) => {
    if (data.password !== data.checkPwd) {
      alert('兩次密碼不一樣')
      return
    }

    try {
      const res = await axios.post(`${VITE_BASEURL}/users/sign_up`, data)
      console.log('註冊成功')
      console.log('res', res.data.uid)
      setMsg(res.data.uid)
      navigate('/week3')
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
        setMsg(error?.response?.data?.message)
      }
    }
  }
  return (
    <div className="container2 signUpPage vhContainer">
      <div className="side">
        <img
          className="d-m-n"
          src="https://github.com/panduola666/2023_React/blob/master/src/assets/img/left.png?raw=true"
          alt="workImg"
        />
      </div>
      <div className="formGroup">
        <form className="formControls" action="index.html" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="formControls_txt">註冊帳號</h2>
          <div className="mt-10px text-violet text-wrap">
            註冊訊息：
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
          <div className="inputGroup nickname">
            <label className="formControls_label" htmlFor="name">
              您的暱稱
            </label>
            <input
              className="formControls_input"
              type="text"
              {
                ...register('nickname', {
                  required: { value: true, message: '暱稱必填' },
                })
              }
              id="name"
              placeholder="請輸入您的暱稱"
            />
            <p className="text-red mt-4px">{errors.nickname && errors.nickname.message}</p>
          </div>
          <div className="inputGroup password">
            <label className="formControls_label" htmlFor="pwd">
              密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              {
                ...register('password', {
                  required: { value: true, message: '密碼必填' },
                  minLength: { value: 6, message: '密碼不可低於 6 個字元' },
                })
              }
              id="pwd"
              placeholder="請輸入密碼"
            />
            <p className="text-red mt-4px">{errors.password && errors.password.message}</p>
          </div>
          <div className="inputGroup checkPwd">
            <label className="formControls_label" htmlFor="checkPwd">
              再次輸入密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              {
                ...register('checkPwd', {
                  required: { value: true, message: '確認密碼必填' },
                  minLength: { value: 6, message: '確認密碼不可低於 6 個字元' },
                })
              }
              id="checkPwd"
              placeholder="請再次輸入密碼"
            />
            <p className="text-red mt-4px">{errors.checkPwd && errors.checkPwd.message}</p>
          </div>

          <div className="flex items-center justify-end mt-30px">
            <input className="btnSubmit border-0" type="submit" value="註冊" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUp
