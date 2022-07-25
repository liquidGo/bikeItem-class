import React, { Component } from 'react'
import moment from 'moment'
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, message, InputNumber } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea;
class Rigister extends Component {
    state = {}
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg: imageUrl,
                loading: false,
            }));
        }
    }




    onclickSubmit=()=>{
        let userInfo=this.props.form.getFieldsValue();
        message.success(`欢迎${userInfo.userName}，你的密码为${userInfo.userPwd}`)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 10
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }


        return (
            <div>
                <Card title='注册表单'>
                    <Form layout='horizontal'>
                        <FormItem label='用户名' {...formItemLayout}>
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

                        <FormItem label='密码'  {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '123',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空！'
                                        }, {
                                            min: 5, max: 10,
                                            message: '长度不在规范内！'
                                        }, {
                                            pattern: /^\w+$/g,
                                            message: '密码必须为英文字母或数字！'
                                        }
                                    ]
                                })(
                                    <Input type='password' prefix={<Icon type='lock' />} placeholder='请输入用户名'></Input>
                                )
                            }
                        </FormItem>
                        <FormItem label='性别' {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1'
                                })(
                                    <RadioGroup>
                                        <Radio value='1'>男</Radio>
                                        <Radio value='2'>女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label='年龄' {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <RadioGroup>
                                        <InputNumber />
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label='当前状态' {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value='1'>菜鸟</Option>
                                        <Option value='2'>高手</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='爱好' {...formItemLayout}>
                            {
                                getFieldDecorator('love', {
                                    initialValue: ['1']
                                })(
                                    <Select mode='multiple'>
                                        <Option value='1'>看书</Option>
                                        <Option value='2'>玩游戏</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='是否已婚' {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label='生日' {...formItemLayout}>
                            {
                                getFieldDecorator('brithday', {
                                    initialValue: moment('2022-07-18')
                                })(
                                    <DatePicker
                                        showTime
                                        format='YYYY-MM-DD HH:mm:ss'
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label='联系地址' {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '哈尔滨市南岗区'
                                })(
                                    <TextArea
                                        autoSize={
                                            {
                                                minRows: 4,
                                                maxRows: 5
                                            }
                                        }
                                    >

                                    </TextArea>
                                )
                            }
                        </FormItem>
                        <FormItem label='早起时间' {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker
                                        showTime
                                        format='YYYY-MM-DD HH:mm:ss'
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像"
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('userImg',{valuePropName:'userImg'})(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg ? <img src={this.state.userImg} /> : <Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem 
                            {...offsetLayout}
                        >
                            {
                                getFieldDecorator('userImg')(
                                    <Checkbox checked>
                                        我已经阅读过<a href="#">慕课协议</a>
                                    </Checkbox>
                                )
                            }
                        </FormItem>
                        <Form.Item {...offsetLayout}>
                            <Button type='primary' onClick={this.onclickSubmit}>注册</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Rigister)
