import React, { Component } from 'react'
import { Card, Button,Radio } from 'antd'
import './index.less'

export default class Buttons extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            size:'default'
        }
    }
    handleClick = () => {
        this.setState({
            loading: false,
            size:'default'
        })
    }
    handleChange=(e)=>{
        this.setState({
            size:e.target.value
        })
    }
    render() {
        let { loading,size } = this.state
        return (
            <div>
                <Card title='基础按钮' className='card-wrap'>
                    <Button type='primary'>Imooc</Button>
                    <Button >Imooc</Button>
                    <Button type='dashed'>Imooc</Button>
                    <Button type='danger'>Imooc</Button>
                    <Button disabled >Imooc</Button>
                </Card>
                <Card title='图形按钮' className='card-wrap'>
                    <Button icon='plus'>创建</Button>
                    <Button icon='edit'>编辑</Button>
                    <Button icon='delete'>删除</Button>
                    <Button shape='circle' icon='search'></Button>
                    <Button type='primary' icon='search'>搜索</Button>
                    <Button type='primary' icon='download' >下载</Button>
                </Card>
                <Card title='Loading按钮' className='card-wrap'>
                    <Button type='primary' loading={loading}>确定</Button>
                    <Button type='primary' shape='circle' loading={loading}></Button>
                    <Button loading={loading}>点击加载</Button>
                    <Button shape='circle' loading={loading}></Button>
                    <Button type='primary' onClick={this.handleClick}>关闭</Button>
                </Card>
                <Card title='按钮组' style={{marginBottom:10}}>
                    <Button.Group>
                        <Button icon='left'>返回</Button>
                        <Button icon='right'>前进</Button>
                    </Button.Group>
                </Card>
                <Card title='按钮尺寸' className='card-wrap' >
                    <Radio.Group value={size} onChange={this.handleChange}>
                        <Radio value='small'>小</Radio>
                        <Radio value='default'>中</Radio>
                        <Radio value='large'>大</Radio>
                    </Radio.Group>
                    <Button type='primary' size={size}>Imooc</Button>
                    <Button size={size} type='dashed'>Imooc</Button>
                    <Button size={size} type='danger'>Imooc</Button>
                </Card>
            </div>
        )
    }
}
