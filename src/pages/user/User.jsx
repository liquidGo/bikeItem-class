import React, { Component } from 'react'
import { Card, Button, Modal, Form, Radio, DatePicker, Input, Select } from 'antd'
import axios from 'axios';
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm/BaseForm';
import '../../resouce/api/table/list'
import Etable from '../../components/Etable/Etable';
import '../../style/common.less'
import '../../resouce/api/user/add'
import moment from 'moment';
// import { relativeTimeThreshold } from 'moment';
const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option;

export default class User extends Component {
    params = {
        page: 1
    }
    state = {}
    componentDidMount() {
        this.request()
    }
    filterSubmit = (params) => {
        this.params = params
        this.request()
    }
    handleSubmit = () => {
        // console.log(this.user.props.form.getFieldsValue(),'123123123123123s');
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'
        let type = this.state.type;
        let data = this.user.props.form.getFieldsValue();
        axios.post('addUser.php', {
            data: {
                params: data
            }
        }).then(res => {
            ajaxLoading.style.display = 'none'

            console.log(res, '打印res');
            if (res.data.code == 0) {
                this.setState({
                    isVisible: false
                })
                Modal.warning({
                    title: '提示',
                    content: '添加成功！',
                    onOk: () => {
                        this.request()
                    }
                })
            }
        })

    }
    request = () => {
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'
        axios.post('tableList.php', {
            params: {
                page: this.params.page
            }
        }).then(res => {
            ajaxLoading.style.display = 'none'
            let data = res.data.result.list
            data = data.map((item, index) => {
                item.key = index;
                return item;
            })
            console.log(data, 'res');

            this.setState({
                list: data
            })
        })
    }
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            placeholder: '请输入用户名称！',
            field: 'user_name',
            width: 130,
        }, {
            type: 'INPUT',
            label: '用户手机号',
            placeholder: '请输入手机号',
            field: 'user_mobile',
            width: 130,
        }, {
            type: 'DATE',
            label: '请选择入职日期',
            placeholder: '请输入日期',
            field: 'user_date',
            width: 130,
        }
    ]
    handleOperate = (type) => {
        let item = this.state.selectedItem
        if (type == 'create') {
            this.setState({
                type,
                isVisible: true,
                title: '创建员工'
            })
        } else if (type == 'edit') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一条订单编辑'
                })
            } else {
                this.setState({
                    type: type,
                    isVisible: true,
                    title: '编辑员工',
                    userInfo: item
                })
            }
        }
    }

    render() {
        console.log(this.state, '子组件点击更新按钮，将getFieldDecorator包裹着的值传给父组件');
        const colums = [
            {
                title: 'id',
                dataIndex: 'id'
            }, {
                title: '用户名',
                dataIndex: 'userName'
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '闲鱼一条',
                        '2': '奉化浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state]
                }
            }, {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '百度FE',
                        '5': '创业者',
                        '6': '读书',
                        '7': '玩电脑',
                        '8': '跑步'
                    }
                    return config[interest]
                }
            }, {
                title: '生日',
                dataIndex: 'brithday'
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            selectedItem: this.state.selectedItem
        }

        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.filterSubmit} />
                </Card>
                <Card style={{ marginTop: 10 }} className='operate-wrap'>
                    <Button type='primary' icon='plus' onClick={() => this.handleOperate('create')}>创建员工</Button>
                    <Button type='primary' icon='edit' onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button type='primary' onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type='primary' icon='delete' onClick={() => this.handleOperate('delete')}>删除员工</Button>
                    {/* <Button type='primary' style={{ marginLeft: 10 }} onClick={this.handleFindish}>结束订单</Button> */}
                </Card>
                <Card>

                    <div className='content-wrap'>
                        <Etable
                            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                            columns={colums}
                            dataSource={this.state.list}
                            rowSelection={rowSelection}
                        />
                    </div>
                    <Modal
                        title={this.state.title}
                        visible={this.state.isVisible}
                        onOk={this.handleSubmit}
                        onCancel={() => {
                            this.user.props.form.resetFields();
                            this.setState({
                                isVisible: false
                            })
                        }}
                        width={600}
                    >
                        <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={c => this.user = c}></UserForm>
                    </Modal>
                </Card>
            </div>
        )
    }
}
class UserForm extends Component {
    render() {
        let type = this.props.type
        let userInfo = this.props.userInfo || {}
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        }
        return (
            <Form layout='horizontal'>
                <FormItem label='用户名' {...formItemLayout}>
                    {
                        getFieldDecorator('user_name', {
                            initialValue: userInfo.userName
                        })(
                            <Input type='text' placeholder='请输入用户名'></Input>
                            // <RadioGroup>
                            //     <Radio value={1}>男</Radio>
                            //     <Radio value={2}>女</Radio>
                            // </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label='性别' {...formItemLayout}>
                    {
                        getFieldDecorator('sex', {
                            initialValue: userInfo.sex
                        })(
                            // <Input type='text' placeholder='请输入用户名'></Input>
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label='状态' {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue: userInfo.state
                        })(
                            // <Input type='text' placeholder='请输入用户名'></Input>
                            <Select>
                                <Option value={1}>闲鱼一条</Option>
                                <Option value={2}>奉化浪子</Option>
                                <Option value={3}>北大才子</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='生日' {...formItemLayout}>
                    {
                        getFieldDecorator('brithday', {
                            initialValue:moment(userInfo.brithday)
                        })(
                            // <Input type='text' placeholder='请输入用户名'></Input>
                            <DatePicker></DatePicker>
                        )
                    }
                </FormItem>
                <FormItem label='联系地址' {...formItemLayout}>
                    {
                        getFieldDecorator('address', {
                            initialValue: userInfo.address
                        })(
                            // <Input type='text' placeholder='请输入用户名'></Input>
                            <TextArea rows={3} placeholder='请输入联系地址'></TextArea>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)