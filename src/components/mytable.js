import { Table, Button } from 'antd';
import React, { Component, PropTypes } from 'react';
import Form1 from "./Form1";

const columns = [{
  title: 'id',
  dataIndex: 'id',
  width: 60,
}, {
  title: 'addr',
  dataIndex: 'addr',
}, {
  title: 'adv',
  dataIndex: 'adv',
}, {
  title: 'area',
  dataIndex: 'area',
}, {
  title: 'bedroom',
  dataIndex: 'bedroom',
}, {
  title: 'livingroom',
  dataIndex: 'livingroom',
}, {
  title: 'name',
  dataIndex: 'name',
}, {
  title: 'price_1',
  dataIndex: 'price_1',
}, {
  title: 'region',
  dataIndex: 'region',
}, {
  title: 'type',
  dataIndex: 'type',
}, {
  title: 'unit_price',
  dataIndex: 'unit_price',
}, {
  title: 'wc',
  dataIndex: 'wc',
}];

var data = [];
// for (let i = 0; i < 1; i++) {
//   data.push({
//     key: i,
//     id: `李大嘴${i}`,
//     addr: 32,
//     adv: `西湖区湖底公园${i}号`,
//   });
// }

const App = React.createClass({
  getInitialState() {
    return {
      selectedRowKeys: [],  // 这里配置默认勾选列
      loading: false,
      text: "*:*"
    };
  },
  componentWillMount() {
    this.text="";
    this.fetch_solr("http://54.171.189.58:8983/solr/gettingstarted/select?indent=on&q=*:*&wt=json");
  },
  componentDiDMount(){

  },
  fetch_solr(solr_query){

    data=[];
    fetch(solr_query)
      .then((response) => response.json())
      .then((json) => {
        //data=[];
        for (var i = 0; i < json.response.docs.length; i++) {
          data.push({
            key: json.response.docs[i].id,
            id: json.response.docs[i].id,
            addr: json.response.docs[i].addr,
            adv: json.response.docs[i].adv,
            area: json.response.docs[i].area,
            bedroom: json.response.docs[i].bedroom,
            livingroom: json.response.docs[i].livingroom,
            name: json.response.docs[i].name,
            price_1: json.response.docs[i].price_1,
            region: json.response.docs[i].region,
            type: json.response.docs[i].type,
            unit_price: json.response.docs[i].unit_price,
            wc: json.response.docs[i].wc,

          });
        }
        console.log("data");
        console.log(data);
        console.log("json.response.docs.length");
        console.log(json.response.docs.length);
        console.log("json.response.docs[0].id");
        console.log(json.response.docs[0].id);
        this.setState({
          solr_json: json.response.docs,
          //dataSource:this.state.dataSource.cloneWithRows(json.response.docs)
        });


        // console.log("json.response");
        // console.log(json.response.docs);
      })
      .catch(function(error) {
        console.log('request failed', error)
      });
  },



  start() {

    console.log("selectedRowKeys");
    console.log(this.state.selectedRowKeys);

    var data123="<delete><query>id:";
    this.state.selectedRowKeys.map((id)=>{
      data123=data123+id+" ";
    });
    data123=data123+"</query></delete>";

    //var data123=`<delete><query>id:${this.state.selectedRowKeys}</query></delete>`;

    $.ajax({
      type: 'POST',
      url: 'http://54.171.189.58:8983/solr/gettingstarted/update',
      crossDomain: true,
      // beforeSend: function (request)
      // {
      //   request.setRequestHeader("Authority", authValue);
      // },
      data: data123,
      // data: data,
      //processData: false,
      dataType: 'xml',
      contentType: "application/xml",

      success: function(responseData, textStatus, jqXHR) {
        alert('POST sucess.');
      },
      error: function (responseData, textStatus, errorThrown) {
        alert('POST failed.');
      }
    });


    this.setState({ loading: true });
    // 模拟 ajax 请求，完成后清空
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);



  },
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  },
  changeText(text) {
  this.state.text = text;

    if (this.state.text === "") {
      this.state.text = "*:*";
    }
    console.log("this.statetext");
    console.log(this.state.text);
    var url1='';
      url1= "http://54.171.189.58:8983/solr/gettingstarted/select?indent=on"+"&q="+this.state.text+"&wt=json";
    console.log("url");
    console.log(url1);
    this.fetch_solr(url1);
    console.log("text");
    console.log(text);
    this.setState({
      text:text,
    });
  },
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Form1 _func={(text) => this.changeText(text)}/>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.start}
                  disabled={!hasSelected} loading={loading}
          >删除</Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  },
});
export default App;

