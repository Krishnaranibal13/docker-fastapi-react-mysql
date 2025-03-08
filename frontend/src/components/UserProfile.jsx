import React, { useEffect, useState } from 'react';
import { Card, Button, message, Modal, Form, Input, Skeleton } from 'antd';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({userData, sendDataToParent}) => {
    const [user, setUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const user_id = localStorage.getItem('user_id');
    
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }else {
            setUser(userData);
        }
    }, [token,userData]);
    
    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await axiosInstance.get(`/users/${user_id}`);
            setUser(response.data);
            sendDataToParent(response.data)
          } catch (error) {
            messageApi.error('Failed to fetch user details');
          }
        };
    
        fetchUserProfile();
      }, []);

    const showModal = () => {
        setIsModalVisible(true);
        form.setFieldsValue({
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
        });
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const response = await axiosInstance.put(`/users/${user_id}`, values);
            sendDataToParent(response.data)

            messageApi.success('User details updated successfully');
            setIsModalVisible(false);
        } catch (error) {
            messageApi.error('Failed to update user details');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    return (
        <div className="user-details">
            {contextHolder}
            <Card>
                {user ? (
                    <div>
                        <h1>User Details</h1>
                        <p><strong>First Name: </strong>{user.first_name}</p>
                        <p><strong>Last Name: </strong>{user.last_name}</p>
                        <p><strong>Username: </strong>{user.username}</p>
                        <p><strong>Email: </strong>{user.email}</p>
                        <Button type="primary" onClick={showModal}>
                            Edit User
                        </Button>
                        <Modal
                            title="Edit User"
                            open={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <Form form={form} layout="vertical">
                                <Form.Item
                                    name="first_name"
                                    label="First Name"
                                    rules={[{ required: true, message: 'Please input your first name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="last_name"
                                    label="Last Name"
                                    rules={[{ required: true, message: 'Please input your last name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="username"
                                    label="Username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                ) : (
                    <div style={{width:"300px"}}>
                        <div>Please wait. Content is loading...</div>
                        <Skeleton active />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default UserProfile;
