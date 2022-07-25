import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Header from './components/Headers/Headers'
import NavLeft from './components/NavLeft/NavLeft'
import Footers from './components/Footers/Footers'
import Home from './pages/home'
import Ad from './Ad'
import './style/common.less'

export default class App extends Component {
    render() {
        return (
            <Row className='container'>
                <Col span={4} className='nav-left'>
                    <NavLeft />
                </Col>
                <Col span={20} className="main">
                    <Header />
                    <div className="content">
                        {/* <Home/> */}
                        {this.props.children}
                    </div>
                    <Footers />
                </Col>
            </Row>
        )
    }
}
