import React, { Component, PropTypes } from 'react';

import { Button, Form, Input } from 'antd';
import super_agent from 'superagent';
import Upload from './Upload';

const createForm = Form.create;
const FormItem = Form.Item;

import request from 'superagent';

function noop() {
  return false;
}

let BasicDemo = React.createClass({
  getInitialState(){
    this.id = 0;
    this.imgList = [];
    return {
      id: 0,
    }
  },

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
        wc: value.wc,
        fig_urls: this.imgList
      }
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

  getID() {
    var time = new Date().getTime();
    // this.setState({id: time});
    this.id = time;
    this.props.form.setFieldsValue({'id': time});
  },

  editImg(list) {
    this.imgList = list;
  },

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const therule={
      rules: [
        { type: "integer", required: true,  },
      ],
    };
    const therule1={
      rules: [
        { required: true,  },
      ],
    }
    return (
      <Form horizontal form={this.props.form}>

        <FormItem
          {...formItemLayout}
          label="名字"
        >
          <Input {...getFieldProps('name',therule1)} placeholder="实时校验，输入 JasonWood 看看" />

        </FormItem>

        <FormItem
          {...formItemLayout}
          label="地址"
        >
          <Input {...getFieldProps('addr')} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="区县"
        >
          <Input {...getFieldProps('region')} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="优势"
        >
          <Input {...getFieldProps('adv')} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="面积"
        >
          <Input {...getFieldProps('area')} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="卧室数量"
        >
          <Input {...getFieldProps('bedroom')} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="客厅数量"
        >
          <Input {...getFieldProps('livingroom')} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="厕所数量"
        >
          <Input {...getFieldProps('wc')} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="房型"
        >
          <Input {...getFieldProps('type')} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="价格"
        >
          <Input {...getFieldProps('price_1')} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="单价"
        >
          <Input {...getFieldProps('unit_price')} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="ID"
        >
          <Input {...getFieldProps('id',therule)} placeholder="输入" />
          <Button type="primary" onClick={() => this.getID()}>获取ID</Button>
        </FormItem>

        <Upload id={this.id} editImg={(list) => this.editImg(list)}/>


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
