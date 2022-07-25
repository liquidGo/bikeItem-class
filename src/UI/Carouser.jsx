import React, { Component } from 'react'
import { Card, Carousel } from 'antd'
import './index.less'
export default class Carouser extends Component {
    render() {
        return (
            <div>
                <Card title='文字背景轮播' className="slider-wrap">
                    <Carousel autoplay effect='fade'>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                </Card>
                <Card title='图片背景轮播' className="slider-wrap">
                    <Carousel autoplay effect='fade'>
                        <div><img src='/carousel-img/carousel-1.jpg' ></img></div>
                        <div><img src='/carousel-img/carousel-2.jpg' ></img></div>
                        <div><img src='/carousel-img/carousel-3.jpg' ></img></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
