import React, { Component } from 'react'
import { Card } from 'antd'
//导入主题
import echartTheme from '../echartTheme'
//按需加载

import echarts from 'echarts/lib/echarts'
// import * as echarts from 'echarts'
//导入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {
    componentWillMount() {
        //注册主题
        echarts.registerTheme('Imooc', echartTheme)
    }
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            //鼠标放图标上显示的数据
            tooltip: {
                trigger: 'axis'
            }
            ,

            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            //主要数据
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                    data: [1300, 1400, 1800, 3000, 2000, 1500, 1300]
                }
            ]
        }
        return option
    }
    getOption2 = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            //跟下面的series主数据相对应的
            legend: {
                data: ["OFO", "摩拜", "小蓝"]
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
                }, {
                    name: '摩拜',
                    type: 'bar',
                    data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
                }, {
                    name: '小蓝',
                    type: 'bar',
                    data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
                }
            ]
        }
        return option;
    }
    render() {
        console.log(echarts.registerTheme);
        return (
            <div>

                <Card title='柱形图一'>
                    {/* 使用主题 */}
                    <ReactEcharts option={this.getOption()} theme='Imooc' style={{ height: 500 }} />
                </Card>
                <Card title='柱形图二' style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption2()} theme='Imooc' style={{ height: 500 }} />
                </Card>
            </div>

        )
    }
}
