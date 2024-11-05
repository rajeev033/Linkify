import { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginForm() {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const userData = res.data.data.user;
      localStorage.setItem('userData', JSON.stringify(userData));
      setLoading(false);
      setUser(userData);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (e) {
      setLoading(false);
      alert("Login Failed! Please try again");
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-8">
      <div className="bg-white bg-opacity-90 p-8 rounded-md border-[1px] w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Welcome Back</h2>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-black hover:!bg-gray-800 text-white font-bold px-4 rounded-md transition duration-300"
            
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center mt-4 text-gray-400">
          Don't have an account? <Link to="/register" className=" text-black hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
