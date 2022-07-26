import React, { Component } from 'react'
import { Card, Button } from 'antd'
import Utils from '../../utils/utils'
import axios from 'axios';
import BaseForm from '../../components/BaseForm/BaseForm';

export default class User extends Component {
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            placeholder: '请输入用户名称！',
            field: 'user_name',
            width: 80,
        }, {
            type: 'INPUT',
            label: '手机号',
            placeholder: '请输入手机！',
            field: 'user_mobile',
            width: 80,
        }
    ]
    render() {
        return (
            <div>
                <Card>
                    <BaseForm />
                </Card>
            </div>
        )
    }
}
