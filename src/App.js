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
    if (str === '') return [];
    let list = str.split(',');
    let listTrimmed = [];
    list.forEach(item => {
        listTrimmed.push(parseInt(item.trim()));
    });

    return listTrimmed;
  }

  linearSearch = (list, keyStr) => {
    let i = 0;
    let key = parseInt(keyStr);
    let results = []

    results.push(`List: ${list}`);
    results.push(`Search: ${key}`);
    results.push(`Results::`);

    for(i = 0; i < list.length; i++) {
      let n = list[i];
      
      if (n === key) {
        results.push(`Round ${i+1} ===> ${key} = ${n} found!!`);
        break;
      } else {
        results.push(`Round ${i+1} ===> ${key} != ${n}`);
      }
    }

    this.setState({
      results: results
    });
  }

  binarySearch = (list, keyStr) => {

    let results = [];
    let round = 0;
    let key = parseInt(keyStr);

    results.push(`List: ${list}`);
    results.push(`Search: ${key}`);
    results.push(`Results::`);

    let sortedList = [...list].sort((a,b)=>a-b);
    results.push(`List Sorted: ${list} => ${sortedList}`);

    let finished = false;
    let start = 0;
    let end = sortedList.length - 1;

    while (!finished) {
      round++;
      let mid = Math.floor((start+end)/2);
      if (sortedList[mid] === key) {
        results.push(`Round ${round}: the middle number is ${sortedList[mid]} = ${key} found!!`);
        finished = true;
        break;
      } else if (sortedList[mid] > key) {
        results.push(`Round ${round}: the middle number is ${sortedList[mid]} > ${key}`);
        let newEnd = mid - 1;
        results.push(`Shorten search range: ${sortedList.slice(start,end+1)} => ${sortedList.slice(start,newEnd+1)}`);
        end = newEnd;
      } else if (sortedList[mid] < key) {
        results.push(`Round ${round}: the middle number is ${sortedList[mid]} < ${key}`);
        let newStart = mid + 1;
        results.push(`Shorten search range: ${sortedList.slice(start,end+1)} => ${sortedList.slice(newStart,end+1)}`);
        start = newStart;
      }
      if (round === 50) {
        finished = true;
        results.push('loop exceed limit of 50');
        break;
      }
    }

    this.setState({
      results: results
    });
  }

  bubbleSort = (list) => {
    let len = list.length;
    let results = [];
    let listAfter = [...list];
    let listBefore = [...list];
    let round = 1;

    results.push(`List: ${list}`);
    results.push(`Results::`)

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (listAfter[j] > listAfter[j + 1]) {
                let tmp = listAfter[j];
                listAfter[j] = listAfter[j + 1];
                listAfter[j + 1] = tmp;

                results.push(`Round ${round++} swap the positions ${j}<->${j+1}: ${listBefore} => ${listAfter}`);
                listBefore = listAfter;
                listAfter = [...listBefore];
            }
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

    let list = this.stringToList(this.state.listInput);

    if (this.state.listInput === '') {
      alert('Please fill list and keyword.');
    }
    else if (this.state.keyInput === '' && this.state.searchType !== 'bubble') {
      alert('Please fill list and keyword.');
    }
    else if (this.state.searchType === 'linear') {
      this.linearSearch(list,this.state.keyInput);
    } 
    else if (this.state.searchType === 'binary') {
      this.binarySearch(list,this.state.keyInput);
    } 
    else if (this.state.searchType === 'bubble') {
      this.bubbleSort(list);
    }
  }


  // render utilities functions
  renderResults = (resultStr, index) => {
    return (
      <p key={index}>{resultStr}</p>
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
                <Option value="bubble">Bubble Sort</Option>
              </Select>
            </span>
          </form>
          <p>ผลลัพธ์</p>
          <div className="resultsBox">
            {this.state.results.map(this.renderResults)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
