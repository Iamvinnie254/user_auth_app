import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import LoadingIndicator from './LoadingIndicator'





const Form = ({ route, method }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login' ? 'Login' : 'Register'
    
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { username, password })
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
            
        } catch (error) {
            alert(error)
            
        } finally {
            setLoading(false)
        }
    }



  return (
    <div className="w-full h-screen bg-black/20 flex flex-col p-10 md:p-20 items-center    shadow-lg ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center lg:w-[500px] w-[300px]  bg-white rounded-3xl md:p-20 p-5"
      >
        <h1 className="text-4xl font-bold font-serif pb-2">{name}</h1>
        <input
          type="text"
          className=" w-[90%] p-3 m-[10px] border border-box rounded-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          className="w-[90%] p-3  m-[10px] border border-box rounded-full "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {loading && <LoadingIndicator/>}
        <button
          className="w-[95%] p-[10px] my-[20px] mx-[0px] rounded-full bg-blue-500 hover:bg-blue-600 text-white border-none cursor-pointer"
          type="submit"
        >
          {name}
        </button>
      </form>
    </div>
  );
}

export default Form