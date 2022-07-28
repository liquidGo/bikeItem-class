import React, { Component } from 'react'
import { Card } from 'antd'
//导入主题
import echartTheme from '../echartTheme'
//按需加载

import echarts from 'echarts/lib/echarts'
// import * as echarts from 'echarts'
//导入柱形图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends Component {
    componentWillMount() {
        //注册主题
        echarts.registerTheme('Imooc', echartTheme)
    }
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七']
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七']
            },
            yAxis: {
                type: 'value'
            }
            ,
            series: [
                {
                    name: '订单量', type: 'line', data: [
                        1000,
                        2000,
                        5000,
                        850,
                        1000,
                        2200,
                        659
                    ]
                }
            ]
        }
        return option
    }
    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'left'
            },
            legend: {
                data: ['OFO订单量', '小蓝订单量'],
                x: 'center'
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七']
            },
            yAxis: {
                type: 'value'
            }
            ,
            series: [
                {
                    name: 'OFO订单量', type: 'line', data: [
                        1000,
                        2000,
                        5000,
                        850,
                        1000,
                        2200,
                        659
                    ]
                },
                {
                    name: '小蓝订单量', type: 'line', data: [
                        500,
                        100,
                        5000,
                        850,
                        900,
                        2200,
                        2000
                    ]
                }
            ]
        }
        return option
    }
    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'left'
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type:'category',
                boundaryGap:false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七']
            },
            yAxis: {
                type: 'value'
            }
            ,
            series: [
                {
                    name: 'OFO订单量', type: 'line',areaStyle:{}, data: [
                        1000,
                        2000,
                        5000,
                        850,
                        1000,
                        2200,
                        659
                    ]
                }
            ]
        }
        return option
    }


    render() {
        console.log(echarts.registerTheme);
        return (
            <div>

                <Card title='折线图一'>
                    {/* 使用主题 */}
                    <ReactEcharts option={this.getOption()} theme='Imooc' style={{ height: 500 }} />
                </Card>
                <Card title='折线图二' style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption2()} theme='Imooc' style={{ height: 500 }} />
                </Card>
                <Card title='折线图三' style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption3()} theme='Imooc' style={{ height: 500 }} />
                </Card>
            </div>

        )
    }
}
