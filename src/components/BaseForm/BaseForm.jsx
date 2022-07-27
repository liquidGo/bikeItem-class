import React, { Component } from 'react'
import Utils from '../../utils/utils';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

class BaseForm extends Component {
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        console.log(fieldsValue);
        this.props.filterSubmit(fieldsValue)
    }
    reset = () => {
        this.props.form.resetFields();
    }
    initFormList = () => {
        const { getFieldDecorator } = this.props.form
        const formList = this.props.formList
        const formItemList = []
        if (formList && formList.length > 0) {
            formList.forEach((value, index) => {
                let label = value.label;
                let field = value.field;
                let initialValue = value.initialValue || '';
                let placeholder = value.placeholder;
                let width = value.width
                if (value.type == '时间查询') {
                    const begin_time = <FormItem label='订单时间' key={field + '1'} >
                        {
                            getFieldDecorator('begin_time', {
                                defaultValue: moment()
                            })(
                                <DatePicker format='YYYY-MM-DD HH:mm:ss' showTime={true} placeholder={'输入起始时间'}></DatePicker>
                            )
                        }
                    </FormItem>
                    formItemList.push(begin_time)
                    const end_time = <FormItem label='~' colon={false} key={field + '2'} >
                        {
                            getFieldDecorator('end_time', {
                                defaultValue: moment()
                            })(
                                <DatePicker format='YYYY-MM-DD HH:mm:ss' showTime={true} placeholder={'输入结束时间'}></DatePicker>
                            )
                        }
                    </FormItem>
                    formItemList.push(end_time)
                } else if (value.type == 'INPUT') {
                    const INPUT = <FormItem label={label} key={field} >
                        {
                            getFieldDecorator(field, {
                                // initialValue:moment()
                            })(
                                <Input type='text' placeholder={placeholder}></Input>
                            )
                        }
                    </FormItem>

                    formItemList.push(INPUT)
                } else if (value.type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={field} >
                        {
                            getFieldDecorator(field, {
                                initialValue
                            })(
                                <Select
                                    style={{ width: width }}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(value.list)}
                                </Select>
                            )
                        }
                    </FormItem>

                    formItemList.push(SELECT)

                } else if (value.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field} >
                        {
                            getFieldDecorator([field], {
                                initialValue,
                                valuePropName: 'checked'
                            })(
                                { label }
                            )
                        }
                    </FormItem>
                    formItemList.push(CHECKBOX)
                } else if (value.type == 'DATE') {
                    const DATE = <FormItem label={label} key={field} >
                        {
                            getFieldDecorator([field], {
                                defaultValue: moment()
                            })(
                                <DatePicker format='YYYY-MM-DD HH:mm:ss' showTime={true} placeholder={'输入结束时间'}></DatePicker>
                            )
                        }
                    </FormItem>
                    formItemList.push(DATE)
                }
            })
        }
        return formItemList
    }
    render() {
        // console.log(this.props.formList);
        return (
            <Form layout='inline'>
                {this.initFormList()}
                <FormItem>
                    <Button onClick={this.handleFilterSubmit} type='primary' style={{ margin: '0 20px' }}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create({})(BaseForm)
