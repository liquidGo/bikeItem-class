import React, { Component } from 'react'
import axios from 'axios'
import './detail.less'
import '../../style/common.less'
import '../../resouce/api/order/detail'
import { Card } from 'antd'

export default class Order_details extends Component {
    state = {
        orderData: {}

    }
    componentWillMount() {
        let orderId = this.props.match.params
        if (orderId) {
            this.getDetails(orderId)
        }
    }
    getDetails = (orderId) => {
        let { bike_sn, order_sn, status, user_name, distance } = orderId;
        console.log(bike_sn, 'sljdkfskljdfkliiii');
        axios.post('detail.php', {
            params: {
                bike_sn,
                order_sn,
                status,
                user_name,
                distance
            }
        }).then(res => {
            if (res.data.code == '0') {
                console.log(res.data.result, 'sdjfsokdjfsdfjs1231');
                this.setState({
                    orderData: res.data.result
                })
                this.renderMap(res.data.result)
            }
        })

    }
    renderMap = result => {
        // 创建Map实例
        this.map = new window.BMap.Map('orderDetailMap');
        // 初始化地图,设置中心点坐标和地图级别
        this.map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11);
        // 开启鼠标滚轮缩放
        this.map.enableScrollWheelZoom(true);
        // 调用地图控件添加方法
        this.addMapControl();
        // 调用绘制用户行驶路线方法
        this.drawBikeRoute(result.position_list);
        // 调用绘制服务区方法
        this.drawServiceArea(result.area);
    }

    // 添加地图控件
    addMapControl = () => {
        let map = this.map
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }
    // 绘制用户行驶路线
    drawBikeRoute = positionList => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length - 1];
            startPoint = new window.BMap.Point(first.lon, first.lat);
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42)
            });
            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
            map.addOverlay(startMarker);
            endPoint = new window.BMap.Point(last.lon, last.lat);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42)
            });
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            map.addOverlay(endMarker);
        }

        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat))
        }
        let polyline = new window.BMap.Polyline(trackPoint, {
            strokeColor: "#1869AD",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        map.addOverlay(polyline);
        map.centerAndZoom(endPoint, 11);
    }


    drawServiceArea = area => {
        let map = this.map
        let trackPoint = [];
        for (let i = 0; i < area.length; i++) {
            let point = area[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat))
        }
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: "#CE0000",
            strokeWeight: 3,
            fillColor: "#ff8605",
            fillOpacity: 0.4
        });
        map.addOverlay(polygon);
    }

    render() {
        let { status, order_sn, bike_sn, user_name, start_location, end_location, distance } = this.state.orderData
        distance = distance / 1000 + 'Km'
        console.log(this.state.orderData, 'sdkjfskfsjl');
        return (
            <div>
                <Card style={{ margin: 60 }}>
                    <div id='orderDetailMap' className='order-map'></div>
                    <div className='detail-items'>
                        <div className='item-title'>基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className='detail-form-left'>当前状态</div>
                                <div className='detail-form-content'>{(status = 1 ? '进行中' : '结束行程') ? (status = 1 ? '进行中' : '结束行程') : '正在查询'}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>订单编号</div>
                                <div className='detail-form-content'>{order_sn ? order_sn : '正在查询'}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>车辆编号</div>
                                <div className='detail-form-content'>{bike_sn ? bike_sn : '正在查询'}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>用户姓名</div>
                                <div className='detail-form-content'>{user_name ? user_name : '正在查询'}</div>
                            </li>
                        </ul>
                    </div><hr />
                    <div className='detail-items'>
                        <div className='item-title'>行程轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className='detail-form-left'>行程起点</div>
                                <div className='detail-form-content'>{start_location ? start_location : '正在查询'}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>行程终点</div>
                                <div className='detail-form-content'>{end_location ? end_location : '正在查询'}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>行车里程</div>
                                <div className='detail-form-content'>{distance ? distance : '正在查询'}</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
