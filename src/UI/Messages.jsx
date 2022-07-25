import React, { Component } from 'react'
import { Card,Button,notification, message } from 'antd'
import './index.less'

export default class Messages extends Component {
    showMessage=(data)=>{
        message[data]('左岸！')
    }
    render() {
        return (
            <div>
                <Card title='全局提示框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.showMessage('success')}>success</Button>
                    <Button type='primary' onClick={()=>this.showMessage('info')}>info</Button>
                    <Button type='primary' onClick={()=>this.showMessage('warning')}>warning</Button>
                    <Button type='primary' onClick={()=>this.showMessage('error')}>error</Button>
                    <Button type='primary' onClick={()=>this.showMessage('loading')} >loading</Button>
                </Card>
            </div>
        )
    }
}
