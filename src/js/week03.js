import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '@/assets/week03.scss'
const apiUrl = "https://todolist-api.hexschool.io"

// ooopp42@hotmail.com
// 26473564
// curry

// -NnrOEhKXcXssUhHmlI1

// 註冊
const SignUp = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [msg, setMsg] = useState("");
  const handleSignUp = async () => {
    if (!email || !password || !nickname) {
      alert("請填寫正確的註冊資訊");
      return
    }
    const signUpData = {
      email,
      password,
      nickname
    }

    try {
      const res = await axios.post(`${apiUrl}/users/sign_up`, signUpData)
      // console.log(`res`, res);
      setMsg(res.data.uid);
      setEmail("")
      setPassword("")
      setNickname("")
    } catch (error) {
      setMsg(error?.response?.data?.message)
    }
  }
  return (
    <>
      <h2>註冊</h2>
      <div className='group'>
        <div className="input-group mb-3">
          <span className="input-group-text">帳號</span>
          <input
            type="text"
            className="form-control"
            placeholder="請輸入 Email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">密碼</span>
          <input
            type="password"
            className="form-control"
            placeholder="請輸入密碼"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">暱稱</span>
          <input
            type="text"
            className="form-control"
            placeholder="請輸入暱稱"
            value={ nickname }
            onChange={ (e) => setNickname(e.target.value) }
          />
        </div>
      </div>
      <button className="btn btn-warning mr-2" onClick={ handleSignUp }> 註冊 </button>
      <span>註冊訊息：{ msg }</span>
    </>
  )
}
// 登入
const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const handleLogin = async () => {
    const loginData = {
      email: email,
      password: password
    };

    try {
      const res = await axios.post(`${apiUrl}/users/sign_in`, loginData);
      setToken(res.data.token);
      setMsg(res.data.token);
      setEmail("");
      setPassword("");
    } catch (error) {
      setMsg(error.response.data.message);
    }
  }
  return (
    <>
      <h2>登入</h2>
      <div className="group">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"> 帳號 </span>
          <input
            type="text"
            className="form-control"
            placeholder="請輸入 Email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"> 密碼 </span>
          <input
            type="password"
            className="form-control"
            placeholder="請輸入密碼"
            value={ password }
            onChange={ (e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-warning mr-2" onClick={handleLogin}>登入</button>
      <span>Token：{ msg }</span>
    </>
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
  const [token, setToken] = useState("")
  return (
    <>
      <div className="container my-5 overflow-hidden">
        <div className="row gx-3">

          <div className="col-12 col-md-6">
            <SignUp />
            <hr />
            <Login token={ token } setToken={ setToken } />
            <hr />
            <Verify />
            <hr />
            <Logout token={ token } setToken={ setToken }/>
          </div>

          <div className="col-12 col-md-6">
            <TodoList token={ token } />
          </div>

        </div>
      </div>
    </>
  )
}

export default Week3
