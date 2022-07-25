import React, { Component } from 'react'
import { Menu, Icon } from 'antd'//1
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;//1
import '../NavLeft/index.less'
// const MenuItemGroup=Menu.ItemGroup
import menuList from './../../resouce/menuConfig'

export default class NavLeft extends Component {

    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuList)
        this.setState({ menuTreeNode })
    }
    renderMenu = (data) => {
        // console.log(data);
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key} >
                <Link to={item.key}>
                    {item.title}
                </Link>
            </Menu.Item>
        })
    }
    render() {

        return (
            <div style={{height:'100vh'}}>
                <div className='logo'>
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme='dark'>
                    {this.state.menuTreeNode}
                    {/* <SubMenu key='sub1' title={<span><Icon type='mail'></Icon>第一个</span>}>
                        <Menu.Item key='1'>Option 1</Menu.Item>
                        <Menu.Item key='2'>Option 1</Menu.Item>
                        <Menu.Item key='3'>Option 1</Menu.Item>
                        <Menu.Item key='4'>Option 1</Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>
        )
    }
}
