import React, { Component } from 'react'
import './index.less'
import { Card, Button, message, Tabs, Icon } from 'antd'
const TabPane = Tabs.TabPane;

export default class Tabs1 extends Component {
    newTabIndex=0;
    callback = (key) => {
        message.info('点击了' + key)
    }
    componentWillMount() {
        const panes = [
            {
                title: 'tab 1',
                content: 'tab 1',
                key: '1'
            }, {
                title: 'tab 2',
                content: 'tab 2',
                key: '2'
            }
        ]
        this.setState({
            activeKey:panes[0].key,
            panes,

        })
    }
    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }



    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }





    render() {
        return (
            <div>
                <Card title='Tab标签' className='card-wrap'>
                    <Tabs dafaultActiveKey='1' onChange={this.callback}>
                        <TabPane tab='Tab 1' key='1'>左岸</TabPane>
                        <TabPane tab='Tab 2' key='2'>左岸</TabPane>
                        <TabPane tab='Tab 3' key='3'>左岸</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab带图的标签' className='card-wrap'>
                    <Tabs dafaultActiveKey='1' onChange={this.callback}>
                        <TabPane tab={<span><Icon type='plus'></Icon>Tab 1</span>} key='1'>左岸</TabPane>
                        <TabPane tab={<span><Icon type='edit'></Icon>Tab 2</span>} key='2'>左岸</TabPane>
                        <TabPane tab={<span><Icon type='delete'></Icon>Tab 3</span>} key='3'>左岸</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab带图的标签' className='card-wrap'>
                    <Tabs
                        activeKey={this.state.activeKey}
                        onChange={this.onChange}
                        type='editable-card'
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map(value => {
                                return <TabPane
                                    tab={value.title}
                                    key={value.key}
                                >
                                </TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
