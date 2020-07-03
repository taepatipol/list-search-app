import React from 'react';
import './App.css';
import { Select, Input, Button } from 'antd';

const { Option } = Select;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listInput: '',
      keyInput: '',
      searchType: 'linear',
      results: []
    }
  }

  // search functions
  stringToList = (str) => {
    let list = str.split(',');
    let listTrimmed = [];
    list.forEach(item => {
        listTrimmed.push(item.trim());
    });

    return listTrimmed;
  }

  linearSearch = (listStr, keyStr) => {
    let list = this.stringToList(listStr);
    let i = 0;
    let key = parseInt(keyStr);
    let results = []

    for(i = 0; i < list.length; i++) {
      let n = parseInt(list[i]);
      
      if (n === key) {
        results = [...results, `Round ${i+1} ===> ${key} = ${n} found!!`]
        break;
      } else {
        results = [...results, `Round ${i+1} ===> ${key} != ${n}`]
      }
    }

    this.setState({
      results: results
    });
  }

  // handle functions
  handleSelectChange = (value) => {
    this.setState({
      searchType: value
    });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.linearSearch(this.state.listInput,this.state.keyInput);
  }

  renderResults = (resultStr) => {
    return (
      <p>{resultStr}</p>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-box">
          <h1 style={{ marginTop: '50px'}}>List Search App</h1>
          <form onSubmit={this.handleSubmit}>
            <span className="row">
              <p>List:</p>
              <Input name="listInput" value={this.state.listInput} onChange={this.handleInputChange} placeholder="ex. 1,2,8"/>
            </span>
            <span className="row">
              <p>ค้นหา:</p>
              <Input name="keyInput" value={this.state.keyInput} onChange={this.handleInputChange} placeholder="ex. 2"/>
              <Button type="primary" htmlType="submit">ค้นหา</Button>
            </span>
            <span>
              <p>ประเภทการค้นหา</p>
            </span>
            <span className="row">
              <Select defaultValue="linear" style={{ width: 240 }} onChange={this.handleSelectChange}>
                <Option value="linear">Linear Search</Option>
                <Option value="binary">Binary Search</Option>
                <Option value="bubble">Bubble Search</Option>
              </Select>
            </span>
          </form>
          {this.state.results.map(this.renderResults)}
        </div>
      </div>
    );
  }
}

export default App;
