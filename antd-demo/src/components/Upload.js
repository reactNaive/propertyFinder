import React, { Component, PropTypes } from 'react';
import { Upload, Icon, Modal,message } from 'antd';
import styles from './Upload.less';

const userURL= "http://54.171.189.58/";

const ImageUploadList = React.createClass({
  getInitialState() {
    this.num = 1;
    this.imgList = [];
    return {
      priviewVisible: false,
      priviewImage: '',
      url: userURL + this.props.id + "/" + this.num + ".jpg"
    };
  },
  componentWillReceiveProps(nextProps) {
    var url = userURL + nextProps.id + "/" + this.num + ".jpg";
    this.setState({url: url});
  },
  handleChange(info) {
    if (info.file.status === 'done') {
      message.success("上传成功");
      this.imgList.push(this.state.url);
      console.log(this.imgList);
      this.props.editImg(this.imgList);
      this.num++;
      var url = userURL + this.props.id + "/" + this.num + ".jpg";
      this.setState({url: url});
    } else if (info.file.status === 'error') {
      message.error("上传失败");
    }
  },
  beforeUpload(){
    if(this.props.id === 0) {
      message.warning("请填写或获取ID");
      return false;
    } else {
      console.log(this.state.url);
    }
  },
  handleCancel() {
    this.setState({
      priviewVisible: false,
    });
  },
  render() {
    const props = {
      action: this.state.url,
      listType: 'picture-card',
      onChange: (e) => this.handleChange(e),
      beforeUpload: (e) => this.beforeUpload(e),
      onPreview: (file) => {
        this.setState({
          priviewImage: file.url,
          priviewVisible: true,
        });
        console.log(this.state.priviewVisible);
      },
    };
    return (
      <div className={styles.container}>
        <Upload {...props}>
          <Icon type="plus" />
          <div className="ant-upload-text">上传照片</div>
        </Upload>
        <Modal visible={this.state.priviewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" src={this.state.priviewImage} />
        </Modal>
      </div>
    );
  },
});

export default ImageUploadList;
