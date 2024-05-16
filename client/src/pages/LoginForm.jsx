import { useState, useContext, useEffect } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginForm() {
  
  const { setIsLoggedIn, setUser} = useContext(AuthContext);
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
      <div className="bg-[#ffffff7a] p-8 rounded-[24px] shadow-md md:w-[30dvw] md:h-[60dvh] w-[80dvw] h-[70dvh] flex flex-col justify-evenly">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back</h2>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          className="space-y-4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-black hover:scale-[0.95] btn text-white text-base leading-[0.5rem] font-bold py-2 px-4 rounded-[24px] mt-3"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
