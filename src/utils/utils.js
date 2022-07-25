
import React from 'react';
import { Select } from 'antd';
import axios from 'axios'
let { Option } = Select;

export default {
    formateDate(time) {
        if (!time) return
        let date = new Date(time);
        return date.getFullYear() + '-' +
            (date.getMonth() + 1) + '-' +
            date.getDate() + ' ' +
            (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' +
            (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
            (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    }

    ,

    pagination(data, callback) {
        // console.log(data.data.result.total_count,'12312312312312');
        return {
            onChange: current => callback(current), //页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
            current: data.data.result.page,
            pageSize: data.data.result.page_size,
            total: data.data.result.total_count,
            showTotal: () => {
                return `共${data.data.result.total_count}条`
            },
            // showQuickJumper: true
        }
    },

    getOptionList(data) {
        if (!data) {
            return []
        };
        let options = []
        data.map(item =>
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        )
        return options
    },

    // // selectedRowKeys的封装
    updateSelectedItem(selectedRowKeys, selectedItem, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedItem,  //选中的那一行
                selectedIds
            })
        } else {
            // alert('sdkjlf')
            this.setState({
                selectedRowKeys,
                selectedItem  //选中的那一行
            })
        }
    }
}