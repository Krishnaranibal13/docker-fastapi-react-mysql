import React, { useState, useEffect } from 'react';
import { Input, Button, Form, message } from 'antd';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import img1 from '../images/img2.jpg';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();  
    useEffect(() => {
        if (token) {
            navigate(`/user-profile`);
        }
    }, [token]);

    const [submittable, setSubmittable] = useState(false);
    
    
    useEffect(()=>{
        if (username.length >= 3 && 
            username.length <= 100 && 
            first_name.length >= 3 && 
            first_name.length <= 100 && 
            last_name.length >= 3 && 
            last_name.length <= 100 && 
            email.length >= 3 && 
            email.length <= 100 && 
            password.length >= 3){
            setSubmittable(true)
        }
        else{
            setSubmittable(false)
        }
    })

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            // Check if email and username already exist
            const responseEmail = await axiosInstance.get(`/users/emails/${email}`);
            const responseUsername = await axiosInstance.get(`/users/usernames/${username}`);

            if (responseEmail.data.emailPresent === "false" && responseUsername.data.usernamePresent === "false"){
                const response = await axiosInstance.post('/register', {
                    username,
                    email,
                    password,
                    first_name,
                    last_name,
                });

                messageApi.success('Registration successful');
                
                // // Save the token to localStorage
                localStorage.setItem('authToken', response.data.access_token);
                localStorage.setItem('user_id', response.data.id);
                navigate('/user-profile');
            }
            else if(responseUsername.data.usernamePresent === "true"){
                messageApi.error('Username already exists');
            }
            else if(responseEmail.data.emailPresent === "true"){
                messageApi.error('Email already exists');
            }

        } catch (error) {
            messageApi.error('Registration failed');
        }
    };

    return (
        <div className='form-container'>
        {contextHolder}
        <div>
            <div className="img-container">
                <img src={img1} alt="" />
            </div>
            <Form onSubmitCapture={handleRegister} layout='vertical'>
                <h1>Register</h1>
                <Form.Item 
                    hasFeedback
                    label="First Name"
                    name="First Name"
                    validateDebounce={100}
                    rules={[{ min: 3, max: 100 }]}
                    >
                    <Input
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='Enter your first name'
                        required
                    />
                </Form.Item>

                <Form.Item 
                    hasFeedback
                    label="Last Name"
                    name="Last Name"
                    validateDebounce={100}
                    rules={[{ min: 3, max: 100 }]}
                    >
                    <Input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder='Enter your last name'
                        required
                    />
                </Form.Item>

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
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter your username'
                        required
                        />
                </Form.Item>

                <Form.Item 
                    hasFeedback
                    label="Email"
                    name="Email"
                    validateDebounce={100}
                    rules={[{ min: 3, max: 100 }]}
                    >
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                        required
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit" disabled={!submittable}>
                    Register
                </Button>
                <div>Already have an account?
                    <Button type="link" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                </div>
            </Form>
        </div>
        </div>
    );
};

export default Register;
