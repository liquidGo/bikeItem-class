import React, { Component } from 'react'
import { Menu, Icon } from 'antd'//1
import { Link } from 'react-router-dom';
import '../NavLeft/index.less'
// const MenuItemGroup=Menu.ItemGroup
import menuList from './../../resouce/menuConfig'
import { connect } from 'react-redux';
import {switchMenu} from '../../redux/action/index'
const SubMenu = Menu.SubMenu;//1

class NavLeft extends Component {
    state={
        currentKey:''
    }
    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuList)
        let currentKey=window.location.hash.replace(/#|\?.*$/g,'')
        this.setState({ menuTreeNode,currentKey })
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
    //将左侧导航栏的高光定住
    changeClick=(data)=>{
        let {dispatch} =this.props
        let {title}=data.item.props
        console.log('title',title);
        dispatch(switchMenu(title))
        console.log(data,'data');

        
        this.setState({
            currentKey:data.key
        })
    }
    render() {
        console.log(this.props,'this.propss');

        return (
            <div style={{height:'100vh'}}>
                <div className='logo'>
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu 
                onClick={this.changeClick}
                theme='dark'
                selectedKeys={this.state.currentKey}
                >
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

export default connect()(NavLeft)