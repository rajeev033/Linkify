import {useState, useEffect, useContext} from 'react';
import { AuthContext } from "../context/AuthContext";
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const RegisterForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser} = useContext(AuthContext);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const userData=res.data.data.user;
      const userDataJSON = JSON.stringify(userData);
      localStorage.setItem('userData', userDataJSON);
      setLoading(false);
      console.log(userData);
      setUser(userData);
      setIsLoggedIn(true);

      navigate("/dashboard");
    } catch (e) {
      setLoading((loading) => {
        !loading;
      });
      alert("login Failed! Please try again");
      console.error(e);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
        <div className="h-[100%] w-[100%] rounded-[300px] absolute z-[-1] blur-[540px] bg-gradient-to-r from-[#fed18d] via-[#ffbee2] to-[#da9eff]"></div>
      <div className="bg-[#ffffff7a] p-8 rounded-[24px] shadow-md md:w-[30dvw] md:h-[90dvh] w-[80dvw] h-[80dvh] flex flex-col justify-evenly">
        <h2 className="text-2xl font-bold text-center mb-2">Create an Account</h2>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          className="mt-2"
        >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input placeholder="First Name" className="input-styles" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input placeholder="Last Name" className="input-styles" />
          </Form.Item>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" className="input-styles" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" className="input-styles" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" className="input-styles" />
          </Form.Item>
          <Form.Item
            name="reenterPassword"
            rules={[
              { required: true, message: 'Please re-enter your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-enter Password" className="input-styles" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-black hover:scale-[0.95] btn text-white text-base leading-[0.5rem] font-bold py-2 px-4 rounded-[24px] mt-3"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;