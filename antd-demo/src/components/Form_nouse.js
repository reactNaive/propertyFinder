import React, { Component, PropTypes } from 'react';

import { Button, Form, Input } from 'antd';
import super_agent from 'superagent';

const createForm = Form.create;
const FormItem = Form.Item;

import request from 'superagent';

function noop() {
  return false;
}

let BasicDemo = React.createClass({
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, value) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
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

        <FormItem
          {...formItemLayout}
          label="addr"
          hasFeedback
          help={isFieldValidating('addr') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('addr',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="adv"
          hasFeedback
          help={isFieldValidating('adv') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('adv',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="area"
          hasFeedback
          help={isFieldValidating('area') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('area',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="bedroom"
          hasFeedback
          help={isFieldValidating('bedroom') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('bedroom',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="livingroom"
          hasFeedback
          help={isFieldValidating('livingroom') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('livingroom',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>



        <FormItem
          {...formItemLayout}
          label="name"
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('name',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>



        <FormItem
          {...formItemLayout}
          label="price_1"
          hasFeedback
          help={isFieldValidating('price_1') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('price_1',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>



        <FormItem
          {...formItemLayout}
          label="region"
          hasFeedback
          help={isFieldValidating('region') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('region',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>





        <FormItem
          {...formItemLayout}
          label="type"
          hasFeedback
          help={isFieldValidating('type') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('type',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="unit_price"
          hasFeedback
          help={isFieldValidating('unit_price') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('unit_price',therule)} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>



        <FormItem
          {...formItemLayout}
          label="wc"
          hasFeedback
          help={isFieldValidating('wc') ? '校验中...' : (getFieldError('addr') || []).join(', ')}
        >
          <Input {...getFieldProps('wc',therule)} placeholder="实时校验，输入 JasonWood 看看" />
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

/*
 <FormItem
 id="control-textarea"
 label="文本域"
 labelCol={{ span: 6 }}
 wrapperCol={{ span: 14 }}
 >
 <Input type="textarea" id="control-textarea" rows="3"/>
 </FormItem>

 <FormItem
 id="select"
 label="Select 选择器"
 labelCol={{ span: 6 }}
 wrapperCol={{ span: 14 }}
 >
 <Select id="select" size="large" defaultValue="lucy" style={{ width: 200 }} onChange={handleSelectChange}>
 <Option value="jack">jack</Option>
 <Option value="lucy">lucy</Option>
 <Option value="disabled" disabled>disabled</Option>
 <Option value="yiminghe">yiminghe</Option>
 </Select>
 </FormItem>

 <FormItem
 label="Checkbox 多选框"
 labelCol={{ span: 6 }}
 wrapperCol={{ span: 18 }}
 >
 <Checkbox className="ant-checkbox-vertical">选项一</Checkbox>
 <Checkbox className="ant-checkbox-vertical">选项二</Checkbox>
 <Checkbox className="ant-checkbox-vertical" disabled>选项三（不可选）</Checkbox>
 </FormItem>

 <FormItem
 label="Checkbox 多选框"
 labelCol={{ span: 6 }}
 wrapperCol={{ span: 18 }}
 >
 <Checkbox className="ant-checkbox-inline">选项一</Checkbox>
 <Checkbox className="ant-checkbox-inline">选项二</Checkbox>
 <Checkbox className="ant-checkbox-inline">选项三</Checkbox>
 </FormItem>

 <FormItem
 label="Radio 单选框"
 labelCol={{ span: 6 }}
 wrapperCol={{ span: 18 }}
 >
 <RadioGroup defaultValue="b">
 <Radio value="a">A</Radio>
 <Radio value="b">B</Radio>
 <Radio value="c">C</Radio>
 <Radio value="d">D</Radio>
 </RadioGroup>
 </FormItem>


 // fetch('http://54.171.189.58:8983/solr/gettingstarted/update', {
 //   method: 'POST',
 //   headers: {
 //     'Accept': 'application/json',
 //     'Content-Type': 'application/json',
 //   },
 //   body: JSON.stringify({
 //     id: 15,
 //     addr: "ssds"
 //   })
 // });

 // fetch('http://127.0.0.1:8983/solr/gettingstarted/update', {
 //   method: 'POST',
 //   crossDomain: true,
 //   headers: {
 //     'Content-Type': 'application/json',
 //   },
 //   body: data,
 // }).catch(function(error) {
 //   console.log('request failed', error)
 // });

 // fetch("http://localhost:8983/solr/gettingstarted/select?indent=on&q=*:*&wt=json")
 //   .then((response) => response.json())
 //   .then((json) => {
 //
 //      console.log("json.response");
 //     console.log(json.response.docs);
 //   })
 //   .catch(function(error) {
 //     console.log('request failed', error)
 //   });

 // $.ajax({
 //   url: "http://localhost:8983/solr/gettingstarted/select?indent=on&q=*:*&wt=json",
 //   dataType: 'json',
 //   // jsonp: false,
 //   // jsonpCallback: 'callback',
 //   // cache: false,
 // }).done(function (data) {
 //
 //   //this.setState({json_data: data});
 //   console.log("hello");
 //   console.log(data.response);
 // }.bind(this));
 // //console.log(this.state.json_data.response);
 // var win = window.open('http://127.0.0.1:8983/solr/gettingstarted/update?wr=json');
 // win.postMessage('[{"id":"32323"}]', '*');

 // $.ajax({
 //   url: 'http://127.0.0.1:8983/solr/gettingstarted/update',//请求地址
 //   type: 'POST',
 //   data: { id: 32 },
 //   //调小超时时间会引起异常
 //   timeout: 3000,
 //   //请求成功后触发
 //   dataType: 'jsonp',
 //   success: function (data) { show.append('success invoke!' + data+''); },
 //   //请求失败遇到异常触发
 //   error: function (xhr, errorInfo, ex) { show.append('error invoke!errorInfo:' + errorInfo+' '); },
 //   //完成请求后触发。即在success或error触发后触发
 //   complete: function (xhr, status) { show.append('complete invoke! status:' + status+' '); },
 //   //发送请求前触发
 //   beforeSend: function (xhr) {
 //     //可以设置自定义标头
 //     xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
 //     //show.append('beforeSend invoke!' +' ');
 //   },
 //   //是否使用异步发送
 //   async: true
 // });
 // fetch('http://127.0.0.1:8983/solr/gettingstarted/update', {
 //   method: 'POST',
 //   headers: {
 //     'Content-Type': 'application/json',
 //     // 'Content-Transfer-Encoding': 'binary'
 //   },
 //   body: data,
 // })
 //   .then((response) => response.json())
 //   .then((responseJson) => {
 //     console.log(responseJson);
 //     Alert.alert("注册成功,请登录");
 //   })
 //   .catch((error) => {
 //     console.log(error);
 //   });


 //11




 // $.ajax({
 //   type: 'POST',
 //   url: 'http://127.0.0.1:8983/solr/gettingstarted/update',
 //   data: JSON.stringify(data),
 //   error: function(e) {
 //     console.log(e);
 //   },
 //   dataType: "json",
 //   contentType: "application/json"
 // });



 // $.ajax({
 //   type: 'POST',
 //   url: 'http://54.171.189.58:8983/solr/gettingstarted/update',
 //   crossDomain:true,
 //   dataType: 'json',
 //   jsonp: false,
 //   jsonpCallback: 'callback',
 //   cache: false,
 // }).done(function (data) {
 //
 //   //this.setState({json_data: data});
 //   console.log("hello");
 //   console.log(data.response);
 // }.bind(this));


 // $(document).ready(function(){
 //     $.post("http://54.171.189.58:8983/solr/gettingstarted/update?getJSON",
 //       [{
 //         "id": "Donald Duck",
 //         "addr": "Duckburg"
 //
 //       }],
 //       function(data,status){
 //         alert("Data: " + data + "\nStatus: " + status);
 //       });
 //
 // });

 <FormItem
 {...formItemLayout}
 label="邮箱"
 hasFeedback
 >
 <Input {...emailProps} type="email" placeholder="onBlur 与 onChange 相结合" />
 </FormItem>
 */
