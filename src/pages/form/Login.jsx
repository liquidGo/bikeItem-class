import React, { Component } from 'react'
import { Form, Card, Input, Button, message, Icon, Checkbox, Modal } from 'antd'
const FormItem = Form.Item


class Login extends Component {
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue()
        this.props.form.validateFields((err, values) => {
            // console.log(err,'err');
            if (!err) {
                message.success(`欢迎${userInfo.userName}，你的密码为${userInfo.userPwd}`)
            } else {
                Modal.warning({
                    title: '警告',
                    content: '账户或密码输入错误！',
                    onOk:()=>{
                        this.props.form.resetFields()
                    }
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='card-wrap'>
                <Card title='登录行内表单' style={{ marginBottom: '20px' }}>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder='请输入用户名'
                            ></Input>
                        </FormItem>
                        <FormItem>
                            <Input placeholder='请输入密码'></Input>
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title='登录水平表单'>
                    <Form layout='horizontal' style={{ width: 300 }}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: 'Jack',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空！'
                                        }, {
                                            min: 5, max: 10,
                                            message: '长度不在规范内！'
                                        }, {
                                            pattern: /^\w+$/g,
                                            message: '用户名必须为英文字母或数字！'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type='user' />} placeholder='请输入用户名'  ></Input>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    // <Input placeholder='123123'  ></Input>
                                    <Input prefix={<Icon type='lock' />} type="password" placeholder='请输入密码'></Input>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: []
                                })(
                                    // <Input placeholder='123123'  ></Input>
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href='javascript:;' style={{ float: 'right' }}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type='primary' onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Login)