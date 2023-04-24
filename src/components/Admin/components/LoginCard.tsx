import React from 'react';

import styled from '@emotion/styled';
// import h2 from '../../public/img/h2.jpg';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { adminLogin } from '../utils/auth';
import { adminVar } from 'src/apollo/reactiveVars';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .admin-login-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    margin: auto;

    width: 20em;
    height: 20em;
    padding: 10px;
    margin: 2em;
    border-radius: 12px;
    box-shadow: 0px 10px 30px -15px rgba(0, 0, 0, 0.3);
    transition: 0.15s all;
  }

  .admin-login-card:hover {
    box-shadow: 0px 20px 40px -15px rgba(0, 0, 0, 0.5);
    transform: translateY(-5px);
  }

  .login-title {
    margin: 2em 0 0.75em 0;
    letter-spacing: 0.1rem;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

function Card({
  title = 'Login',
  onSubmit,
}: {
  title: string;
  onSubmit: (values: any) => void;
}) {
  return (
    <div className={'admin-login-card'}>
      <label className="login-title">{title}</label>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
}

const onSubmit = (values: any) => {
  adminLogin(values.username, values.password);
  adminVar({ username: values.username, password: values.password });
  console.log('Received values of form:', values);
};

function LoginCard() {
  return (
    <StyledDiv>
      <Card title={'Login as Admin'} onSubmit={onSubmit} />
    </StyledDiv>
  );
}

export default LoginCard;
