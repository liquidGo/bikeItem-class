import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import './index.less'

export default class Modus extends Component {
    state = {
        d1: false,
        d2: false,
        d3: false,
        d4: false
    }
    handleOpen = (type) => {
        this.setState({
            [type]: true
        })
    }
    handConfirm=(type)=>{
        Modal[type]({
            title:'确认',
            content:'左岸',
            onOk(){
                console.log('ok');
            },
            onCancel(){
                console.log('123');
            }
        })
    }
    render() {

        return (
            <div>
                <Card title='基础模态框' className='card-wrap' >
                    <Button onClick={() => this.handleOpen('d1')}>Open</Button>
                    <Button onClick={() => this.handleOpen('d2')}>自定义页脚</Button>
                    <Button onClick={() => this.handleOpen('d3')}>顶部20px弹框</Button>
                    <Button onClick={() => this.handleOpen('d4')}>水平垂直居中弹框</Button>
                </Card>
                <Card title='信息确认框' className='card-wrap' >
                    <Button onClick={() => this.handConfirm('confirm')}>Open</Button>
                    <Button onClick={() => this.handConfirm('info')}>自定义页脚</Button>
                    <Button onClick={() => this.handConfirm('success')}>顶部20px弹框</Button>
                    <Button onClick={() => this.handConfirm('warning')}>水平垂直居中弹框</Button>
                </Card>
                <Modal title="React" visible={this.state.d1} onCancel={() => { this.setState({ d1: false }) }} >
                    <p>欢迎！</p>
                </Modal>
                <Modal title="React" visible={this.state.d2} okText='好的' cancelText='算了' onCancel={() => { this.setState({ d2: false }) }} >
                    <p>欢迎！</p>
                </Modal>
                <Modal title="React" style={{top:20}} visible={this.state.d3}  onCancel={() => { this.setState({ d3: false }) }} >
                    <p>欢迎！</p>
                </Modal>
                <Modal wrapClassName='vertical-center-modal' title="React"visible={this.state.d4}  onCancel={() => { this.setState({ d4: false }) }} >
                    <p>欢迎！</p>
                </Modal>
            </div>
        )
    }
}
