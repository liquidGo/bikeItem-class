import React, { Component } from 'react'
import axios from 'axios'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd'
import '../../resouce/api/order/list.js'
import '../../resouce/api/order/ebike_info.js'
import '../../resouce/api/order/finish_order'
import BaseForm from '../../components/BaseForm/BaseForm.jsx'
import Utils from '../../utils/utils.js'
import Etable from '../../components/Etable/Etable.jsx'

const FormItem = Form.Item
const Option = Select.Option;
export default class Order extends Component {
    state = {
        orderConfrim: false,
        orderInfo: {}
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            placeholder: '全部',
            field: 'city',
            initialValue: '0',
            width: 80,
            list: [
                { id: '0', name: '全部' }, { id: '1', name: '北京市' }, { id: '2', name: '天津市' }, { id: '3', name: '深圳市' }
            ]
        },
        {
            type: '时间查询',
            placeholder: '2022-07-24 14:37',
            field: 'time'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            placeholder: '全部',
            field: 'status',
            initialValue: '0',
            width: 80,
            list: [
                { id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }
            ]
        }
    ]
    componentDidMount() {
        this.request();
    }
    handleFindish = () => {
        let id = this.state.selectedItem
        if (!id) {
            Modal.info({
                title: '提示',
                content: '请选择一条订单结束！'
            })
            return
        }
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'
        axios.post('ebike_info.php', {
            data: {
                params: {
                    orderId: id
                }
            }
        }).then(res => {
            ajaxLoading.style.display = 'none'
            if (res.data.code == 0 && res.status == 200) {
                this.setState({
                    orderInfo: res.data.result,
                    orderConfrim: true
                })
            }
        })
    }
    openOrder = () => {
        let list = this.state.list
        let id = this.state.selectedItem
        if (!id) {
            Modal.warning({
                title: '提示',
                content: '请先选择订单'
            })
            return
        } else {
            list = list.filter(value => {
                if (value.id == id.id) {
                    return true
                } else {
                    return false
                }
            })
            window.open(`/#/common/detail/${list[0].status}/${list[0].order_sn}/${list[0].bike_sn}/${list[0].user_name}/${list[0].distance}`, '_blank')
            // window.open(`/#/common/detail`, '_blank')
        }
    }
    handleOk = () => {
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'
        axios.post('finish_order.php', {
            data: {
                params: 1
            }

        }).then(res => {
            ajaxLoading.style.display = 'none'
            if (res.data.code == 0) {
                message.success('订单结束成功！')
                this.setState({
                    orderConfrim: false,
                    selectedRowKeys: [],
                    selectedRows: null,
                    selectedItem: null
                })
                this.request()
            }
        })
    }
    // onRowClick = (record, index) => {
    //     let selectkey = [index];
    //     this.setState({
    //         //这里为table行的索引
    //         selectedRowKeys: selectkey,
    //         //这里为行的数据
    //         selectedItem: record
    //     })
    // }
    request = () => {
        let _this = this
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'
        axios.post('order_list.php', {
            params: {
                page: this.params.page,
                datas: this.datas
            }
        }).then(res => {
            ajaxLoading.style.display = 'none'
            if (res.status == 200 && res.data.code == 0) {
                let data = res.data.result.item_list;
                data = data.map((item, index) => {
                    item.key = index
                    return item
                })
                this.setState({
                    list: data,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        this.request();
                    })
                })
            } else {
                return Promise.reject('客户端发生错误！')
            }
        }).catch(
            error => {
                Modal.info({
                    title: "提示",
                    content: error
                })
            }
        )
    }
    handleFilter = (data) => {
        this.datas = data;
        this.request()
    }

    render() {
        console.log(this.state,'这里为测试子组件的回调函数是否传参成功');
        const colums = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            }, {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            }, {
                title: '用户名',
                dataIndex: 'user_name'
            }, {
                title: '手机号码',
                dataIndex: 'mobile'
            }, {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km'
                }
            }, {
                title: '行驶时长',
                dataIndex: 'total_time',
                render(total_time) {
                    return Math.floor(total_time / 60) + '分钟'
                }
            }, {
                title: '状态',
                dataIndex: 'status',
                render(status) {
                    return status == '1' ? '进行中' : '结束行程';
                }
            }, {
                title: '开始时间',
                dataIndex: 'start_time'
            }, {
                title: '结束时间',
                dataIndex: 'end_time'
            }, {
                title: '订单金额',
                dataIndex: 'total_fee'
            }, {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const formItemLayout = {
            // 指定元素的左边Col列宽度
            labelCol: {
                span: 5
            },
            // 表单内部元素的Col列宽度
            wrapperCol: {
                span: 10
            }
        }
        const { selectedRowKeys,selectedItem,selectedIds } = this.state;

        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            selectedItem,
            selectedIds
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type='primary' onClick={this.openOrder}>订单详情</Button>
                    <Button type='primary' style={{ marginLeft: 10 }} onClick={this.handleFindish}>结束订单</Button>
                </Card>
                <Card>
                    <div className='content-wrap'>
                        <Etable
                            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                            columns={colums}
                            dataSource={this.state.list}
                            // pagination={this.state.pagination}
                            rowSelection={rowSelection}
                            // onRow={(record, index) => {
                            //     return {
                            //         onClick: () => {
                            //             this.onRowClick(record, index)
                            //         }
                            //     }
                            // }}
                        />
                        {/* <Table
                            bordered
                            columns={colums}
                            dataSource={this.state.list}
                            rowSelection={rowSelection}
                        >
                        </Table> */}
                    </div>
                </Card>

                <Modal
                    title='结束订单'
                    visible={this.state.orderConfrim}
                    onCancel={() => {
                        this.setState({
                            orderConfrim: false
                        })
                    }}
                    onOk={this.handleOk}
                    width={600}
                >
                    <Form layout='horizontal' >
                        <FormItem label='用户姓名' {...formItemLayout}>
                            {this.state.orderInfo.user_name}
                        </FormItem>
                        <FormItem label='车辆编号' {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label='剩余电量' {...formItemLayout}>
                            {this.state.orderInfo.battery}
                        </FormItem>
                        <FormItem label='开始时间' {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label='车辆地址' {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
// class FilterForm extends Component {
//     render() {

//         const { getFieldDecorator } = this.props.form
//         return (
//             <Form layout='inline'>
//                 <FormItem label='城市'>
//                     {
//                         getFieldDecorator('city_id')(
//                             <Select
//                                 style={{ width: 80 }}
//                                 placeholder='全部'
//                             >
//                                 <Option value=''>全部</Option>
//                                 <Option value='1'>北京市</Option>
//                                 <Option value='2'>天津市</Option>
//                                 <Option value='3'>深圳市</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label='订单时间'>
//                     {
//                         getFieldDecorator('start_time')(
//                             <DatePicker></DatePicker>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label=''>
//                     {
//                         getFieldDecorator('end_time')(
//                             <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label='订单状态'>
//                     {
//                         getFieldDecorator('status', {
//                             initialValue: ''
//                         })(
//                             <Select
//                                 style={{ width: 80 }}
//                                 placeholder='全部'>
//                                 <Option value=''>全部</Option>
//                                 <Option value='1'>进行中</Option>
//                                 <Option value='2'>结束行程</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     <Button type='primary' style={{ margin: '0 20px' }}>查询</Button>
//                     <Button>重置</Button>
//                 </FormItem>
//             </Form>
//         )
//     }
// }
// FilterForm = Form.create({})(FilterForm)
