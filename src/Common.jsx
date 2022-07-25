import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Header from './components/Headers/Headers'
import Ad from './Ad'
import './style/common.less'
import './components/Headers/index.less'

export default class App extends Component {
    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Header menuType='second' />
                </Row>  
                <Row>
                    {this.props.children}
                </Row>  
            </div>
        )
    }
}
