'use client';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {

    const baseUrl = `http://localhost:7080/api`;
    const user = sessionStorage.getItem('ut');
    const router = useRouter();

    const [ userData, setUserData ] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    }
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await axios.post(`${baseUrl}/user/login`, userData)
        .then(res => {
            sessionStorage.setItem("ut", res.data.token);
            res.data.token && router.push('/dashboard');
        })
        .catch(err => {
            alert(err?.response?.data);
            console.log(err);
        });
    }
    
    useLayoutEffect(() => {
        if(user){
            router.push('/dashboard');
        }
    }, []);
    
    return(
        <div className="login-main h-[90vh] w-screen flex justify-center items-center font-kanit">
            <div className="login-box p-7 border-2 rounded-md flex flex-col">
                <h1 className="login-heading text-4xl text-center text-green-700">Sign In</h1>
                <form method='post' encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="username flex flex-col mt-5">
                        <span>Username</span>
                        <input type="text" value={userData.username} onChange={handleChange} className="bg-transparent border-2 px-3 py-2 rounded"  name="username" placeholder="Username" />
                    </div>
                    <div className="password flex flex-col mt-3">
                        <span>Password</span>
                        <input type="password" value={userData.password} onChange={handleChange} className="bg-transparent border-2 px-3 py-2 rounded"  name="password" placeholder="Password" />
                    </div>
                    {/* <Link href='/dashboard' className='self-center w-full'> */}
                        <button type="submit" className="w-full mt-5 bg-green-700 rounded px-3 py-2 hover:bg-green-800">Login</button>
                    {/* </Link> */}
                </form>
            </div>
        </div>
    );
}

export default Login;