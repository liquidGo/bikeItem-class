import Mock from 'mockjs'
import '../../resouce/api/table/list.js'
import '../../style/loading.less'
import axios from 'axios'
import React, { Component } from 'react'
import { Card, Table, Modal, Button } from 'antd'
import Utils from '../../utils/utils.js'
import { message } from 'antd'

export default class BaseTable extends Component {
    state = {
        isLoading: false
    }
    params = {
        page: 1
    }
    request = () => {
        let _this = this
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'

        axios.post('tableList.php', {
            params: {
                page: this.params.page
            }
        }).then(res => {
            ajaxLoading.style.display = 'none'
            // console.log(res, '123');
            if (res.status == '200' && res.data.code == 0) {
                let data = res.data.result.list
                console.log(data, 'basetable数据');
                data = data.map((item, index) => {
                    item.key = index;
                    return item;
                })
                this.setState({
                    dataSource2: data,
                    selectedRowKeys: [],
                    selectedRows: null,
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
    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'jack',
                sex: '1',
                state: '1',
                interest: '1',
                brithday: '1999-06-28',
                address: '哈尔滨市南岗区',
                time: '09:00'
            }, {
                id: '1',
                userName: 'tom',
                sex: '1',
                state: '1',
                interest: '1',
                brithday: '1999-06-28',
                address: '哈尔滨市南岗区',
                time: '09:00'
            }, {
                id: '2',
                userName: '赵四',
                sex: '1',
                state: '1',
                interest: '1',
                brithday: '1999-06-28',
                address: '哈尔滨市南岗区',
                time: '09:00'
            },
        ]
        dataSource.map((item, index) => {
            item.key = index;
            return item
        })

        // console.log(dataSource);
        this.setState({ dataSource })
        this.request();
    }


    onRowClick = (record, index) => {
        let selectkey = [index];
        Modal.info({
            title: '信息',
            content: `用户名：${record.userName},用户爱好：${record.interest}`
        })
        this.setState({
            //这里为table行的索引
            selectedRowKeys: selectkey,
            //这里为行的数据
            selectedItem: record
        })
    }
    onRowClick1 = (record, index) => {
        let selectkey = [index];
        // Modal.info({
        //     title: '信息',
        //     content: `用户名：${record.userName},用户爱好：${record.interest}`
        // })
        this.setState({
            //这里为table行的索引
            selectedRowKeys: selectkey,
            //这里为行的数据
            selectedItem: record
        })
    }

    handleDelete = (() => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map(item => {
            ids.push(item.id);
        })
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗？${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功！')
                this.request();
            }
        })
    })

    // add=()=>{
    //     let item=this.state.selectedItem
    //     if(item)
    // }
    render() {
        const columns = [
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
                    // console.log(sex);
                    return sex == '1' ? '男' : '女';
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
                title: '地址',
                dataIndex: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys, selectedRows
                })
            }
        }
        return (
            <div>
                <Card title='基础表格'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title='动态数据渲染表格-MOCK' style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
                <Card title='MOCK-单选' style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-多选" style={{ margin: '10px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick1(record, index)
                                }
                            }
                        }}
                    />
                </Card>
                <Card title="Mock-分页功能" style={{ margin: '10px 0' }}>

                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}
