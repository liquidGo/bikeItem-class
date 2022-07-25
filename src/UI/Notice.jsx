import { Button } from 'antd'
import './index.less'
import React, { Component } from 'react'
import { Card, notification } from 'antd'

export default class Notice extends Component {
    openNotice = (type,direction) => {
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message: '吃饭',
            description: '晚上吃烧烤'
        })
    }
    render() {
        return (
            <div>
                <Card title='通知提醒框' className='card-wrap' >
                    <Button type='primary' onClick={() => { this.openNotice('success') }}>Success</Button>
                    <Button type='primary' onClick={() => { this.openNotice('info') }}>Info</Button>
                    <Button type='primary' onClick={() => { this.openNotice('warning') }}>warning</Button>
                    <Button type='primary' onClick={() => { this.openNotice('error') }}>Error</Button>
                </Card>
                <Card title='通知提醒框' className='card-wrap' >
                    <Button type='primary' onClick={() => { this.openNotice('success','topLeft') }}>Success</Button>
                    <Button type='primary' onClick={() => { this.openNotice('info','topRight') }}>Info</Button>
                    <Button type='primary' onClick={() => { this.openNotice('warning','bottomLeft') }}>warning</Button>
                    <Button type='primary' onClick={() => { this.openNotice('error','bottomRight') }}>Error</Button>
                </Card>
            </div>
        )
    }
}
