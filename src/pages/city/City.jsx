import React, { Component } from 'react'
import { Card, Button, Table, Form, Select, Modal, message } from 'antd'
import axios from 'axios'
import Untls from '../../utils/utils'
import '../../style/loading.less'
import '../../resouce/api/city/list.js'
import '../../resouce/api/city/open.js'
import '../../style/common.less'

const FormItem = Form.Item
const Option = Select.Option;

export default class City extends Component {
    state = {
        list: [],
        isShow: false
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request();
    }
    //open city
    handleOpenCity = () => {
        this.setState({
            isShow: true
        })
    }
    //城市开通提交
    handleSubmit = () => {
        let _this = this
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'
        let city = this.select1.props.form.getFieldsValue()
        // console.log(city);
        axios.post('openCity.php', {
            data: {
                params: city
            } 
        }).then(res => {
            ajaxLoading.style.display = 'none'
            if (res.data.code == 0) {
                message.success('开通成功！');
                this.setState({
                    isShow: false
                })
                this.request()
            }
        })
    }

    //默认请求接口数据
    request = () => {
        let _this = this;
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'

        axios.post('cityData.php', {
            params: {
                page: _this.params.page
            }
        }).then(res => {
            ajaxLoading.style.display = 'none'
            if (res.status == 200 && res.data.code == 0) {
                let data = res.data.result.item_list
                data = data.map((item, index) => {
                    item.key = index
                    return item
                })
                this.setState({
                    list: data,
                    pagination: Untls.pagination(res, (current) => {
                        _this.params.page = current;
                        this.request()
                    })
                })
            } else {
                return new Promise.reject('客户端发生错误！请检查')
            }
            // console.log(res.data.result.item_list, '456');
        }).catch(error => {
            // console.log(error, 'sdfs');
            Modal.info({
                title: "提示",
                content: error
            })
        })
    }
    render() {
        const colums = [
            {
                title: '城市id',
                dataIndex: 'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode) {
                    return mode == '1' ? '禁停区模式' : '指定地点模式'
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return mode == '1' ? '自营' : '加盟'
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchChinese_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map(item => {
                        return item.user_name
                    }).join('、')
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time'
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]
        return (
            <div>
                <Card style={{ marginBottom: 10 }}>
                    <FilterForm />
                </Card>
                <Card>
                    <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className='content-wrap'>
                    <Card>
                        <Table
                            //表头
                            bordered
                            columns={colums}
                            dataSource={this.state.list}
                            pagination={this.state.pagination}
                        />
                    </Card>
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShow}
                    onCancel={
                        () => {
                            this.setState({
                                isShow: false
                            })
                        }
                    }
                    onOk={
                        this.handleSubmit
                    }
                >
                    <OpenCityForm wrappedComponentRef={c => this.select1 = c} />
                </Modal>
            </div>
        )
    }
}

class FilterForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout='inline'>
                <FormItem label='城市'>
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{ width: 80 }}
                                placeholder='全部'
                            >
                                <Option value=''>全部</Option>
                                <Option value='1'>北京市</Option>
                                <Option value='2'>天津市</Option>
                                <Option value='3'>深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='用车模式'>
                    {
                        getFieldDecorator('mode')(
                            <Select
                                style={{ width: 150 }}
                                placeholder='全部'
                            >
                                <Option value=''>全部</Option>
                                <Option value='1'>指定停车点模式</Option>
                                <Option value='2'>禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='营运模式'>
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: 80 }}

                                placeholder='全部'
                            >
                                <Option value=''>全部</Option>
                                <Option value='1'>自营</Option>
                                <Option value='2'>加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='加盟商授权状态'>
                    {
                        getFieldDecorator('auth_status')(
                            <Select
                                style={{ width: 80 }}

                                placeholder='全部'
                            >
                                <Option value=''>全部</Option>
                                <Option value='1'>已授权</Option>
                                <Option value='2'>未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type='primary' style={{ margin: '0 20px' }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm)
class OpenCityForm extends Component {

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout='horizontal'>
                <FormItem label='选择城市' {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value=''>全部</Option>
                                <Option value='1'>北京</Option>
                                <Option value='2'>天津</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='运营模式' {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value=''>全部</Option>
                                <Option value='1'>自营</Option>
                                <Option value='2'>加盟</Option>
                            </Select>
                        )
                    }

                </FormItem>
                <FormItem label='用车模式' {...formItemLayout}>
                    {
                        getFieldDecorator('user_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value='1'>指定停车点</Option>
                                <Option value='2'>禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm)
