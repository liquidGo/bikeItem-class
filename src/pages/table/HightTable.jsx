import React, { Component } from 'react'
import { Card, Table, Modal, Button, Badge } from 'antd'
import axios from 'axios'
import '../../style/loading.less'
import Utils from '../../utils/utils.js'
import '../../resouce/api/table/high/list.js'
import { message } from 'antd'


export default class HightTable extends Component {
    state = {
    }

    params = {
        page: 1
    }

    componentDidMount() {
        this.request();
    }
    request = () => {
        let _this = this
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'

        axios.post('high.php', {
            params: {
                page: this.params.page
            }
        }).then(res => {
            // console.log(res,'123123');
            ajaxLoading.style.display = 'none'
            // console.log(res, '123');
            if (res.status == '200' && res.data.code == 0) {
                let data = res.data.result.list
                data = data.map((item, index) => {
                    item.key = index;
                    return item;
                })
                this.setState({
                    dataSource: data,
                    // selectedRowKeys: [],
                    // selectedRows: null,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        this.request();
                    })
                })
            } else {
                return Promise.reject('客户端数据发生错误！')
            }
        }).catch(error => {
            // console.log(error, 'sdfs');
            Modal.info({
                title: "提示",
                content: error
            })
        })
    }
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    }
    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title: '确认',
            content: '您确认要删除此条数据吗？',
            onOk: () => {
                message.success('删除成功')
                this.request();
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80
            }, {
                title: '用户名',
                dataIndex: 'userName',
                width: 80
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    // console.log(sex);
                    return sex == '1' ? '男' : '女';
                },
                width: 80
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
                },
                width: 80
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
                },
                width: 80
            }, {
                title: '生日',
                dataIndex: 'brithday',
                width: 120
            }, {
                title: '地址',
                dataIndex: 'address',
                width: 80
            }, {
                title: '早起时间',
                dataIndex: 'time',
                width: 80
            }
        ]
        // 1160 700
        const columns2 = [
            {
                title: `id`,
                dataIndex: 'id',
                width: 180,
                fixed: "left",
            }, {
                title: "用户名",
                dataIndex: 'userName',
                width: 180,
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    // console.log(sex);
                    return sex == '1' ? '男' : '女';
                },
                width: 180
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
                },
                width: 180
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
                },
                width: 180
            }, {
                title: '生日',
                dataIndex: 'brithday',
                width: 120
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 180,
            }, {
                title: "早起时间",
                dataIndex: 'time',
                width: 180,
                fixed: 'right'
            }
        ]

        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id',
            }, {
                title: '用户名',
                dataIndex: 'userName',
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    // console.log(sex);
                    return sex == '1' ? '男' : '女';
                },
            }, {
                title: '年龄',
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            }
            , {
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
                },
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
                },
            }, {
                title: '生日',
                dataIndex: 'brithday',
            }, {
                title: '地址',
                dataIndex: 'address',
            }, {
                title: '早起时间',
                dataIndex: 'time',
            }
        ]
        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id',
            }, {
                title: '用户名',
                dataIndex: 'userName',
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    // console.log(sex);
                    return sex == '1' ? '男' : '女';
                },
            }, {
                title: '年龄',
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            }
            , {
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
                },
            }, {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': <Badge status='success' text='成功' />,
                        '2': <Badge status='error' text='失败' />,
                        '3': <Badge status='default' text='正常' />,
                        '4': <Badge status='processing' text='进行中' />,
                        '5': <Badge status='warning' text='警告' />,
                        '6': <Badge status='success' text='成功' />,
                        '7': <Badge status='success' text='成功' />,
                        '8': <Badge status='success' text='成功' />
                    }
                    return config[interest]
                },
            }, {
                title: '生日',
                dataIndex: 'brithday',
            }, {
                title: '地址',
                dataIndex: 'address',
            }, {
                title: '早起时间',
                dataIndex: 'time',
            }, {
                title: '操作',
                render: (text, item) => {
                    return <Button size='small' onClick={(item) => { this.handleDelete(item) }}>删除</Button>
                }
            }
        ]
        return (
            <div>
                <Card title='头部固定' className='card-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title='两侧固定' style={{ margin: '10px 0' }} className='card-wrap'>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 700 }}
                    />
                </Card>
                <Card title='表格排序' style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title='操作按钮' style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
