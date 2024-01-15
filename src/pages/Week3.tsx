import { useState , useEffect } from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '@/assets/week03.scss'
const { VITE_BASEURL } = import.meta.env;
// console.log(import.meta.env)

// const apiUrl = "https://todolist-api.hexschool.io"
// ooopp42@hotmail.com
// 26473564
// curry
// -NnrOEhKXcXssUhHmlI1

// 註冊
const SignUp = () => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState("");
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
  const onSubmit = async (data) => {
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
      navigate('/');
    } catch (error) {
      console.log(`error` ,error?.response?.data?.message);
      setMsg(error?.response?.data?.message);
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
            <div className='mt-10px'>註冊訊息：{ msg }</div>

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
              <input className='formControls_btnSubmit mr-40px' type='submit' value='註冊帳號'/>
              <NavLink to='/' className='formControls_btnLink'><p>登入</p></NavLink>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
// 登入
const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    // mode: onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
    mode: 'onTouched',
  })
  const login = async (data) => {
    try {
        const res = await axios.post(`${VITE_BASEURL}/users/sign_in`, data);
        const { token, exp } = res.data
        document.cookie = `token=${token};expires=${new Date(exp * 1000)}`;
        navigate('/todo');
      } catch (err) {
        alert(err?.response?.data?.message);
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
        <div className='formGroup'>
          <form className='formControls' action='' onSubmit={ handleSubmit(login) }>
            <h2 className='formControls_txt'>最實用的線上代辦事項服務</h2>

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
// 驗證
const Verify = () => {
  const [token, setToken] = useState("");
  const [msg, setMsg] = useState("");
  const handleVerify = async () => {
    try {
      const res = await axios.get(`${apiUrl}/users/checkout`, {
        headers: {
          Authorization: token
        }
      });
      setMsg("token驗證成功");
      setToken("");
    } catch (error) {
      setMsg(error.response.data.message);
      setToken("");
    }
  }
  return (
    <>
      <h2>驗證</h2>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Token</span>
        <input
          type="text"
          className="form-control"
          placeholder="請輸入 Token"
          value={ token }
          onChange={ (e) => setToken(e.target.value) }
        />
      </div>
      <button className="btn btn-warning mr-2" onClick={ handleVerify }> 驗證 </button>
      <span>驗證結果：{ msg }</span>
    </>
  )
}
// 登出
const Logout = ({token, setToken}) => {
  const [msg, setMsg] = useState("");
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/users/sign_out`,{},
        {
          headers: {
            Authorization: token
          }
        }
      );
      setMsg(res.data.message);
      setToken("");
    } catch (error) {
      setMsg(error.response.data.message);
      setToken("");
    }
  }
  return (
    <>
      <h2>登出</h2>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Token</span>
        <input
          type="text"
          className="form-control"
          placeholder="請輸入 Token"
          value={ token }
          onChange={ (e) => setToken(e.target.value) }
        />
      </div>
      <button className="btn btn-warning mr-2" onClick={ handleLogout }>登出</button>
      <span>登出訊息：{ msg }</span>
    </>
  )
}
// todolist
const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, [token]);

  const addTodo = async () => {
    if (!newTodo) {
      alert("請輸入代辦")
      return
    }
    try {
      const res = await axios.post(
        `${apiUrl}/todos`, { content: newTodo },
        {
          headers: {
            Authorization: token
          }
        }
      )
      setNewTodo("")
      getTodos()
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  const getTodos = async () => {
    try {
      const res = await axios.get(`${apiUrl}/todos`, {
        headers: {
          Authorization: token
        }
      });
      setTodos(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  const completeTodo = async (id) => {
    try {
      const res = await axios.patch(
        `${apiUrl}/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: token
          }
        }
      );
      getTodos();
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/todos/${id}`, {
        headers: {
          Authorization: token
        }
      });
      getTodos();
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <>
      <div className='todolist mt-10'>
      { token
        ? <div>
            <h2>Todo List</h2>
            <div className="d-flex justify-content-center align-item-center mb-4">
              <input
                type="text"
                className="form-control me-2 w-75"
                placeholder="請輸入代辦事項"
                value={ newTodo }
                onChange={ (e) => setNewTodo(e.target.value) }
              />
              <button type="button" className="btn btn-sm-warning mr-2" onClick={ addTodo }> 新增 </button>
            </div>
            <ul className='border p-6'>
              {
                todos.map((todo, index) => {
                  return (
                    <li className="d-flex justify-content-between mb-2 fw-bold"  key={ todo.id }>
                      <div className='flex items-center'>
                        <span className='mr-4'>{ todo.content }</span>
                        <span className={ todo.status ? "line-through" : "none" }>{ todo.status ? "[已完成]" : "[未完成]" }</span>
                      </div>
                      <div className="d-flex">
                        <button
                          type="button"
                          className="btn btn-sm-warning me-2"
                          onClick={ () => completeTodo(todo.id) }
                        >
                          切換
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm-warning"
                          onClick={ () => deleteTodo(todo.id) }
                        >
                          刪除
                        </button>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        : <h2>請先登入才能編輯代辦清單唷！</h2>
      }
      </div>
    </>
  )
}
const Week3: React.FC= () => {
  return (
    <>
      {/* <SignUp /> */}
      <Login />
    </>
  )
}

export default Week3
