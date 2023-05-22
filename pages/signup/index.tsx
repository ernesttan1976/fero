"use client";
import React from "react";
import { Button, Form, Input } from "antd";
import { Inter } from "next/font/google";

import styles from "./index.module.css";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const SignUp: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    //console.log('Received values of form: ', values);
    delete values.confirmPassword;
    
    fetch(`/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        // Handle the response
        if (response.ok) {
          // Handle the success case
          console.log('Request succeeded');
        } else {
          // Handle the error case
          console.log('Request failed');
        }
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error('Error:', error);
      });
    };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div>
      <Form
        form={form}
        {...formItemLayout}
        className={styles.signup}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        scrollToFirstError
      >
        <Link href="/about"><LeftOutlined /></Link>
        <div className={`${styles.heading} ${inter.className}`}>SIGN UP</div>

        <Form.Item
          name="name"
          label="Name"
          rules={[{
            required: true,
            message: 'Please input your first name'
          }]}
        >
          <Input className={styles.fields}/>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'Invalid email'
            },
            {
              required: true,
              message: 'Please input your email address'
            }]}
        >
          <Input className={styles.fields}/>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password className={styles.fields}/>
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password className={styles.fields}/>
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          >
          <Button
            size="large"
            className={styles.button}
            htmlType="submit"
          >
            Create Account
          </Button>
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
        >
          <Button
            size="large"
            className={styles.buttonOutline}
          >
            Sign In
          </Button>
        </Form.Item>
        
      </Form>
      </div>
  );
};

export default SignUp;
