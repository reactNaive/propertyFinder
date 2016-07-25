import React, { Component, PropTypes } from 'react';

import { Button, Form, Input } from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;


function noop() {
  return false;
}

var BasicDemo = React.createClass({
 

  fetch_solr(solr_query){

    fetch(solr_query)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          solr_json: json.response.docs,
          dataSource:this.state.dataSource.cloneWithRows(json.response.docs)
        });
        // console.log("json.response");
        // console.log(json.response.docs);
      })
      .catch(function(error) {
        console.log('request failed', error)
      });
  },

  ComponentDidMount(){
    //
    // $.ajax({
    //   type: 'POST',
    //   url: 'http://54.171.189.58:8983/solr/gettingstarted/update',
    //   crossDomain: true,
    //   // beforeSend: function (request)
    //   // {
    //   //   request.setRequestHeader("Authority", authValue);
    //   // },
    //   data: data,
    //   // data: data,
    //   //processData: false,
    //   dataType: 'json',
    //   contentType: "application/json",
    //
    //   success: function(responseData, textStatus, jqXHR) {
    //     alert('POST sucess.');
    //   },
    //   error: function (responseData, textStatus, errorThrown) {
    //     alert('POST failed.');
    //   }
    // });
  },


  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, value) => {
      // if (!!errors) {
      //   console.log('Errors in form!!!');
      //   return;
      // }
      //var data = `${value}`;
      var data = [{id: value.id,
        addr: value.addr,
        adv: value.adv,
        area: value.area,
        bedroom: value.bedroom,
        livingroom: value.livingroom,
        name: value.name,
        price_1: value.price_1,
        region: value.region,
        type: value.type,
        unit_price: value.unit_price,
        wc: value.wc}
      ];
      data=JSON.stringify(data);
      $.ajax({
        type: 'POST',
        url: 'http://54.171.189.58:8983/solr/gettingstarted/update',
        crossDomain: true,
        // beforeSend: function (request)
        // {
        //   request.setRequestHeader("Authority", authValue);
        // },
        data: data,
        // data: data,
        //processData: false,
        dataType: 'json',
        contentType: "application/json",

        success: function(responseData, textStatus, jqXHR) {
          alert('POST sucess.');
        },
        error: function (responseData, textStatus, errorThrown) {
          alert('POST failed.');
        }
      });

      console.log('Submit!!!');



    });
  },

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  },

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd'], { force: true });
    }
    callback();
  },

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  },

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: '用户名至少为 5 个字符' },
        { validator: this.userExists },
      ],
    });

    const therule={
      rules: [
        { required: true,  },
      ],
    }




    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [
          { required: true },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
    });
    const passwdProps = getFieldProps('passwd', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
        { validator: this.checkPass },
      ],
    });
    const rePasswdProps = getFieldProps('rePasswd', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请再次输入密码',
      }, {
        validator: this.checkPass2,
      }],
    });
    const textareaProps = getFieldProps('textarea', {
      rules: [
        { required: true, message: '真的不打算写点什么吗？' },
      ],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return (
      <Form horizontal form={this.props.form}>
        <FormItem
          {...formItemLayout}
          label="id"
          hasFeedback
          help={isFieldValidating('id') ? '校验中...' : (getFieldError('name') || []).join(', ')}
        >
          <Input {...getFieldProps('id',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>



        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  },
});
BasicDemo = createForm()(BasicDemo);
export default BasicDemo;
