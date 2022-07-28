import React, { Component } from 'react'
import { Card, Form } from 'antd'
import axios from 'axios'
import '../../resouce/api/map/bike_list'
import BaseForm from '../../components/BaseForm/BaseForm'

export default class Map extends Component {
    state = {
        total_count: ''
    }
    componentDidMount() {
        this.request()
    }
    request = () => {
        axios.post('bikeList.php', {
            data: {
                params: this.params
            }
        }).then(res => {
            if (res.data.code == 0) {
                console.log(res, '打印res数量');
                this.setState({
                    total_count: res.data.result.total_count
                })
                // console.log(res,'测试bikeList');
                this.requestMap(res)
            }
        })
    }
    // 地图初始化
    requestMap = (data) => {
        let list = data.data.result.route_list
        this.map = new window.BMap.Map('container');
        // 起点和终点
        //gps1=['123','456']
        let gps1 = list[0].split(',')
        let gps2 = list[list.length - 1].split(',')
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint, 11)




        // // 起点图标
        // // 参数：图标、开辟的空间大小、Icon缩放比例
        let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), { imageSize: new window.BMap.Size(36, 42) },{anchor:new window.BMap.Size(18,42)})
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), { imageSize: new window.BMap.Size(36, 42) },{anchor:new window.BMap.Size(18,42)})
        let bikeMakerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon })
        this.map.addOverlay(bikeMakerStart);
        let bikeMakerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon })
        this.map.addOverlay(bikeMakerEnd);

        //绘制车辆行驶路线
        let routeList=[]
        list.forEach(item=>{
            let p=item.split(',')
            console.log(p,'p');

            routeList.push(new window.BMap.Point(p[0],p[1]))
        })
        console.log(routeList);
        let polyLine=new window.BMap.Polyline(routeList,{
            strokeColor:'#ef4136',
            strokeWeight:3,
            strokeOpacity:1
        })
        this.map.addOverlay(polyLine);


        //绘制车辆服务区
        let servicePointList=[]
        let serviceList=data.data.result.service_list
        console.log(serviceList,'123');
        console.log(data.data.result.service_list);
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat))
        })
        // Polyline第一个参数是坐标，第二个参数是样式
        let polyServiceLine=new window.BMap.Polyline(servicePointList,{
            strokeColor:'#ef4136',
            strokeWeight:3,
            strokeOpacity:1
        })
        this.map.addOverlay(polyServiceLine);

        // 添加地图中的自行车图标
        let bikeList=data.data.result.bike_list
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), { imageSize: new window.BMap.Size(36, 42) },{anchor:new window.BMap.Size(18,42)})
        bikeList.forEach(item=>{
            let p=item.split(',')
            this.map.addOverlay(new window.BMap.Marker(new window.BMap.Point(p[0],p[1]),{icon:bikeIcon})
                )
        })


    }
    handleFilterSubmit = (params) => {
        console.log(params);
        this.params = params;
        this.request()

    }
    render() {
        const formList = [
            {
                type: 'SELECT',
                label: '城市',
                field: 'city',
                placeholder: '全部',
                initialValue: '0',
                list: [
                    { id: '0', name: '全部' },
                    { id: '1', name: '上海' },
                    { id: '2', name: '北京' },
                ],
                width: 80,
            }, {
                type: '时间查询',
                width: 80,

            }, {
                type: 'SELECT',
                label: '订单状态',
                field: 'order_status',
                placeholder: '全部',
                initialValue: '0',
                list: [
                    { id: '0', name: '全部' },
                    { id: '1', name: '进行中' },
                    { id: '2', name: '已完成' },
                ],
                width: 80,
            }
        ]
        return (
            <div>
                <Card>
                    <BaseForm formList={formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id='container' style={{ height: 500 }}>共100辆车</div>
                </Card>
            </div>
        )
    }
}
