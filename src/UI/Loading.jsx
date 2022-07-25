import React, { Component } from 'react'
import { Card, Button, Spin, Icon, Alert } from 'antd'
import './index.less'
// Card-卡片，Button-按钮，Spin-动图，Alert-警告
export default class Loading extends Component {
    render() {
        const icon = <Icon type='loading' style={{ fontSize: 24 }} />
        return (
            <div>
                <Card title='Spin用法' className='card-wrap'>
                    <Spin size='small'></Spin>
                    <Spin style={{ margin: '0 10px' }} ></Spin>
                    <Spin size='large'></Spin>
                    <Spin indicator={icon} style={{ marginLeft: 10 }} spinning={true} ></Spin>
                </Card>
                <Card title='内容遮罩' className='card-wrap'>
                    <Alert
                        message='React'
                        description='欢迎！'
                        type='info'
                    ></Alert>
                    <Spin>
                        <Alert
                            message='React'
                            description='欢迎！'
                            type='warning'
                        ></Alert>
                    </Spin>
                    <Spin  tip='加载中...'>
                        <Alert
                            message='React'
                            description='欢迎！'
                            type='warning'
                        ></Alert>
                    </Spin>
                    <Spin indicator={icon} >
                        <Alert
                            message='React'
                            description='欢迎！'
                            type='warning'
                        ></Alert>
                    </Spin>
                </Card>
            </div>
        )
    }
}
