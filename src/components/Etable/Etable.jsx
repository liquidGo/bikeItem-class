import React, { Component } from 'react'
import Utils from '../../utils/utils'
import { Table } from 'antd'

export default class Etable extends Component {
    onRowClick = (record, index) => {
        console.log(record, index, '测试点击行的返回值');
        console.log(selectedIds, '测试是否为数组');
        let { rowSelection } = this.props
        let { selectedRowKeys, selectedItem, selectedIds } = rowSelection
        if (rowSelection.type == 'checkbox') {
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                if (i == -1) {
                    // 如果在Id的集合数组里没有找到相同的Id就添加进去然后重新更新到父组件
                    selectedRowKeys.push(index);
                    selectedIds.push(record.id);
                    selectedItem.push(record)
                    console.log(selectedRowKeys, selectedItem, selectedIds, '测试下存入的数组');
                } else {
                    //说明两次点击的是同一个，进行取消选中操作
                    selectedIds.splice(i, 1)
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1)
                }
            } else {
                // 当是多选的时候进行判断，如果是第一次点击上一次的id是false因为上一次为空
                //将当前的值更新到父组件上面
                selectedRowKeys = [index]
                selectedItem = [record]
                selectedIds = [record.id];
            }
            // 无论是不是第一次点击都对父组件进行更新
            this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
        }
        else {
            this.props.updateSelectedItem([index], record)
        }
    }
    tableInit = () => {
        // console.log(this.props, 'sdljfskd');
        let row_selection = this.props.rowSelection
        let selectedRowKeys = this.props.rowSelection.selectedRowKeys;
        // console.log(selectedRowKeys, '这里测试的子组件点击行显示');
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys,
            // onchange: this.onSelectChange
        }
        if (row_selection == false) {
            row_selection = false
        } else if (row_selection.type == 'checkbox') {
            rowSelection.type = 'checkbox'
        } else {
            // rowSelection.type = 'radio'
            rowSelection.type = 'radio'
        }
        return <Table
            bordered
            {...this.props}
            // columns={colums}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        if (!row_selection) {
                            return false
                        } else {
                            this.onRowClick(record, index)
                        }
                    }
                }
            }}
            // dataSource={this.state.list}
            // pagination={this.state.pagination}
            rowSelection={row_selection ? rowSelection : null}
        />
    }
    render() {
        console.log(this.props, '测试一下组件的props');
        return (
            <div>
                {this.tableInit()}
            </div>
        )
    }
}
