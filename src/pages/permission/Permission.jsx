import React, { Component } from 'react'
import { Card, Button, Modal, Form, Input, Select, Tree, Transfer } from 'antd'
import Etable from '../../components/Etable/Etable'
import Utils from '../../utils/utils'
import axios from 'axios'
import '../../resouce/api/role/list'
import '../../resouce/api/role/create'
import '../../resouce/api/permission/edit'
import '../../resouce/api/role/user_list'
import '../../resouce/api/role/user_role_edit'
import menuConfig from '../../resouce/menuConfig'
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode

class Permission extends Component {
    state = {
        selectedRowKeys: '',
        visible: false,
        authorityVisibel: false,
        userVisibel: false
    }
    params = {
        page: 1
    }
    componentWillMount() {
        this.request()
    }
    request = () => {
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'
        axios.post('role_list.php', {
            page: this.params.page
        }).then(res => {
            ajaxLoading.style.display = 'none'
            if (res.data.code == 0) {
                console.log(res, '测试鉴权组件json');
                let data = res.data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item
                })
                this.setState({
                    list: data
                })
            }
        })
    }
    createUser = () => {
        this.props.form.resetFields()
        this.setState({
            visible: true
        })
    }
    createSubmit = () => {
        this.setState({
            visible: false,
        })
        this.params.createUsers = this.props.form.getFieldsValue()
        this.props.form.validateFields((err, values) => {
            // console.log(err,values);
            if (err) {
                Modal.warning({
                    title: '提示',
                    content: `用户名不能为空！`
                })
            } else {
                let ajaxLoading = document.getElementById('ajaxLoading')
                ajaxLoading.style.display = 'block'
                axios.post('create.php', {
                    params: this.params
                }).then(res => {
                    ajaxLoading.style.display = 'none'
                    Modal.info({
                        title: '成功',
                        content: `恭喜你添加成功！“${res.data.user}”的状态为“${res.data.status == '1' ? '关闭' : '开启'}”`
                    })
                })
            }
        })

        // console.log(this.params,'123');
    }
    authoritySubmit = () => {
        let data = this.authority.props.form.getFieldsValue()
        console.log(data, 'data的数据');
        data.role_id = this.state.selectedItem.id
        data.menus = this.state.menuInfo;
        data.name = this.state.selectedItem.authorize_user_name
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'
        axios.post('perEdit.php', {
            data
        }).then(res => {
            ajaxLoading.style.display = 'none'
            console.log(res, 'permission res');
            this.setState({
                authorityVisibel: false
            }, () => {
                Modal.info({
                    title: '提示',
                    content: `更改权限成功！${res.data.name}现更新为${res.data.menus.length}条权限！`
                })
            })

        })
    }
    setauthority = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '提示',
                content: '请选择一条用户！',
            })
            return
        } else {
            this.setState({
                authorityVisibel: true,
                detailInfo: item,
                menuInfo: item.menus
            })
        }
    }
    //用户授权
    userauthority = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '提示',
                content: '请选择一条用户！',
            })
            return
        } else {
            console.log(item.id, '查看选中的id');
            this.setState({
                userVisibel: true,
                detailInfo: item
            })
            this.getRoleUser(item.id)
        }
    }
    //获取用户
    getRoleUser = (id) => {
        let item = this.state.selectedItem;
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'
        axios.post('user_list.php', {
            //把当前选中的id发送给后端，后端根据发送的id进行写入逻辑
            data: {
                params: {
                    id
                }
            }
        }).then(res => {
            if (res.data.code == '0') {
                console.log(res, '打印一下14章最后一个组件');
                ajaxLoading.style.display = 'none'

                this.getAuthUserList(res.data.result)
            }
        })
    }
    getAuthUserList = (data) => {
        console.log(data, 'data,data,data,data');
        //rightData就是目标的key值
        const leftData = []
        const rightData = []
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i]);
            const data1 = {
                key: data[i].user_id,
                title: data[i].user_name,
                status: data[i].status
            }
            if (data[i].status == 1) {
                rightData.push(data1.key)
            }
            leftData.push(data1)

        }
        this.setState({
            leftData: leftData,
            rightData: rightData
        })
        console.log(this.state, '打印一下state');
    }
    userAuthoritySubmit = () => {
        let data = {}
        //选中的所有数据和选中的单条数据传送给后台
        data.user_ids = this.state.rightData;
        data.role_id = this.state.selectedItem.id;
        let ajaxLoading = document.getElementById('ajaxLoading')
        ajaxLoading.style.display = 'block'
        axios.post('user_role_edit.php', {
            params: {
                data: data
            }
        }).then(res => {
            ajaxLoading.style.display = 'none'
            this.setState({
                userVisibel:false
            })
        })
    }
    render() {
        console.log(this, '测试父组件的this');
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        }


        const { getFieldDecorator } = this.props.form
        const columns = [
            {
                title: '角色id',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formateDate
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    return status == '1' ? '启用' : '禁用'
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formateDate

            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ]
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        }
        return (
            <div>
                <Card>
                    <Button onClick={this.createUser} style={{ marginRight: 10 }}>创建角色</Button>
                    <Button onClick={this.setauthority} style={{ marginRight: 10 }}>设置权限</Button>
                    <Button onClick={this.userauthority} style={{ marginRight: 10 }}>用户授权</Button>
                </Card>
                <Card>
                    <div className="content-wrap">
                        <Etable
                            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={this.state.list}
                        />
                    </div>
                </Card>
                <Modal
                    visible={this.state.visible}
                    title='新建用户'
                    onOk={() => {
                        this.createSubmit()
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                >
                    <Form>
                        <FormItem label='用户名' {...formItemLayout}>
                            {
                                getFieldDecorator('create_name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空！'
                                        }
                                    ]
                                })(
                                    <Input type='text' placeholder='请输入用户名称！'></Input>
                                )
                            }
                        </FormItem>
                        <FormItem label='状态' {...formItemLayout}>
                            {
                                getFieldDecorator('status', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value='1'>关闭</Option>
                                        <Option value='2'>开启</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    title='设置权限'
                    visible={this.state.authorityVisibel}
                    width={600}
                    onOk={this.authoritySubmit}
                    onCancel={() => {
                        this.setState({
                            authorityVisibel: false
                        })
                    }}
                >
                    <Authority
                        wrappedComponentRef={(c) => { this.authority = c }}
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo}
                        patchs={(data) => {
                            this.setState({
                                menuInfo: data
                            })
                        }}
                    />
                </Modal>
                <Modal
                    visible={this.state.userVisibel}
                    width={800}
                    title='用户授权'
                    onOk={this.userAuthoritySubmit}
                    onCancel={() => {
                        this.setState({
                            userVisibel: false
                        })
                    }}
                >
                    <UserModalForm
                        wrappedComponentRef={(c) => { this.usermodalF = c }}
                        detailInfo={this.state.detailInfo}
                        leftData={this.state.leftData}
                        rightData={this.state.rightData}
                        pathUserInfo={(rightData) => {
                            this.setState({
                                rightData
                            })
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

export default Permission = Form.create({})(Permission)

class Authority extends Component {
    onCheck = (data) => {
        this.props.patchs(data)
    }
    renderTreeNodes = (data) => {
        let data1 = data.map((value, index) => {
            // console.log(value, '测试问题');

            if (value.children) {
                return <TreeNode title={value.title} key={value.key}>
                    {this.renderTreeNodes(value.children)}
                </TreeNode>
            } else {
                return <TreeNode title={value.title} key={value.key}></TreeNode>
            }
        })
        return data1;
    }
    render() {
        let { getFieldDecorator } = this.props.form
        let { detailInfo, menuInfo } = this.props
        console.log(detailInfo, '12345');
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        }
        return (
            <Form layout='horizontal'>
                <FormItem label='角色名称' {...formItemLayout}>
                    <Input disabled placeholder={detailInfo.role_name} />
                </FormItem>
                <FormItem label='状态' {...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value='1'>启用</Option>
                                <Option value='2'>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checked) => {
                        // console.log(checked);
                        this.onCheck(checked)
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title='平台权限' key='platform_all'>
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
Authority = Form.create({})(Authority)

class UserModalForm extends Component {
    handleChange = (targetKeys) => {
        this.props.pathUserInfo(targetKeys)
    }
    render() {
        console.log(this.props, ('最后一个组件'));
        let { getFieldDecorator } = this.props.form
        let { detailInfo } = this.props
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        }
        return (
            <Form>
                <FormItem label='用户授权' {...formItemLayout}>
                    {getFieldDecorator('name_user')(
                        <Input disabled placeholder={detailInfo.role_name}></Input>
                    )}
                </FormItem>
                <FormItem label='选择用户' {...formItemLayout}>
                    <Transfer
                        listStyle={{ width: 200, height: 400 }}
                        dataSource={this.props.leftData}
                        targetKeys={this.props.rightData}
                        titles={['待选用户', '已选用户']}
                        // locale='locale'
                        showSearch//显示搜索框
                        render={item => item.title}
                        onChange={this.handleChange}
                    ></Transfer>
                </FormItem>
            </Form>
        )
    }
}
UserModalForm = Form.create({})(UserModalForm)
