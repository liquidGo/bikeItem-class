import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Utils from '../../utils/utils'
import Axios1 from '../axios/index'

export default class Headers extends Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        this.setState({
            userName: '左岸'
        })
        setInterval(() => {
            let sysTime = Utils.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherApi();
    }
    getWeatherApi() {
        // console.log(Axios1);
        Axios1.jsonp({
            url: 'https://www.yiketianqi.com/free/day?appid=59964865&appsecret=B6k8KEOl&unescape=1'
        }).then(res => {
            console.log(res,'123');
            if (res) {
                let city = res.city;
                let wea = res.wea;
                let temperature=res.tem
                this.setState({
                    city, wea,temperature
                })
            }
        })
    }

    render() {
        const menuType = this.props.menuType;
        return (
            <div className='header'>
                <Row className='header-top' >
                    {
                        menuType ?
                            <Col span={6} className='logo'>
                                <img src="/assets/logo-ant.svg" alt="" />
                                <span>左岸管理系统</span>
                            </Col>:''
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href='#'>退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' : <Row className='breadcrumb'>
                        <Col span={4} className='breadcrumb-title'>首页</Col>
                        <Col span={20} className='weather'>
                            <span className='date' >{this.state.sysTime}</span>
                            <span className='weather-detail'>{this.state.city}{'     '}{this.state.wea}{' '}{this.state.temperature}{'°'}</span>
                        </Col>
                    </Row>
                }

            </div>
        )
    }
}
