import React, { Component } from 'react'
import { Card } from 'antd'
//导入主题
import echartTheme from '../themeLight'
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
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            series: [
                {
                    name: '订单量', type: 'pie', data: [
                        {
                            value: 1000,
                            name: '周一',
                        }, {
                            value: 1000,
                            name: '周二',
                        }, {
                            value: 1000,
                            name: '周三',
                        }, {
                            value: 1000,
                            name: '周四',
                        }, {
                            value: 2000,
                            name: '周五',
                        }, {
                            value: 1000,
                            name: '周六',
                        }, {
                            value: 60,
                            name: '周日',
                        },
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
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            series: [
                {
                    name: '订单量', type: 'pie',radius:['50%','60%'] ,center:['50%','60%'],data: [
                        {
                            value: 1000,
                            name: '周一',
                        }, {
                            value: 1000,
                            name: '周二',
                        }, {
                            value: 1000,
                            name: '周三',
                        }, {
                            value: 1000,
                            name: '周四',
                        }, {
                            value: 2000,
                            name: '周五',
                        }, {
                            value: 1000,
                            name: '周六',
                        }, {
                            value: 60,
                            name: '周日',
                        },
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
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            series: [
                {
                    name: '订单量', type: 'pie',data: [
                        {
                            value: 1000,
                            name: '周一',
                        }, {
                            value: 1000,
                            name: '周二',
                        }, {
                            value: 1000,
                            name: '周三',
                        }, {
                            value: 1000,
                            name: '周四',
                        }, {
                            value: 2000,
                            name: '周五',
                        }, {
                            value: 1000,
                            name: '周六',
                        }, {
                            value: 600,
                            name: '周日',
                        },
                    ].sort((a,b)=>{
                        return a.value-b.value
                    }),
                    roseType:'radius'
                }
            ]
        }
        return option
    }


    render() {
        console.log(echarts.registerTheme);
        return (
            <div>

                <Card title='饼图一'>
                    {/* 使用主题 */}
                    <ReactEcharts option={this.getOption()} theme='Imooc' style={{ height: 500 }} />
                </Card>
                <Card title='饼图二' style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption2()} theme='Imooc' style={{ height: 500 }} />
                </Card>
                <Card title='饼图三' style={{ marginTop: 10 }}>
                    <ReactEcharts option={this.getOption3()} theme='Imooc' style={{ height: 500 }} />
                </Card>
            </div>

        )
    }
}
