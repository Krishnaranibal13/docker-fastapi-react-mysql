import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Alert, message } from 'antd';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import img1 from '../images/img1.jpg';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    useEffect(() => {
        if (token) {
            navigate('/user-profile');
        }
    }, [token]);

    const [submittable, setSubmittable] = useState(false);
    
    useEffect(()=>{
        if (username.length >= 3 && username.length <= 100 && password.length >= 3){
            setSubmittable(true)
        }
        else{
            setSubmittable(false)
        }
    })
    
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/login', {
                username,
                password,
                email: "",
                first_name:"",
                last_name:"",
            });
            // Save the token to localStorage
            localStorage.setItem('authToken', response.data.access_token);
            localStorage.setItem('user_id', response.data.user_id);
            
            messageApi.success('Login successful');
            navigate('/user-profile');
        } catch (error) {
            messageApi.error('Invalid credentials');
        }
    };

    return (
        <div className='form-container'>
        {contextHolder}
        <div>
            <div className="img-container">
                <img src={img1} alt="" />
            </div>
            <Form onSubmitCapture={handleLogin} layout="vertical" >
                <h1>Login</h1>
                <Form.Item 
                    hasFeedback
                    label="Username"
                    name="Username"
                    validateDebounce={100}
                    rules={[{ min: 3, max: 100 }]}
                    >
                    <Input
                        type="text"
                        value={username}
                        placeholder='Enter your username'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Item>

                <Form.Item 
                    hasFeedback
                    label="Password"
                    name="Password"
                    validateDebounce={100}
                    rules={[{ min: 3 }]}
                    >
                    <Input.Password
                        type='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit" disabled={!submittable}>
                    Login
                </Button>
                <div>
                    Don't have an account?
                    <Button type="link" onClick={() => navigate('/register')}>
                        Register
                    </Button>
                </div>
            </Form>
        </div>
        </div>
    );
};

export default Login;
