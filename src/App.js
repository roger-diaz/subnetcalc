import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Table } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleNetworkChange = this.handleNetworkChange.bind(this);
    this.handleHostsChange = this.handleHostsChange.bind(this);

    this.state = {
      network: '',
      hosts: ''
    };
  }

  handleNetworkChange(e) {
    this.setState({ network: e.target.value });
  }

  handleHostsChange(e) {
    this.setState({ hosts: e.target.value });
  }

  render() {
    let {network, hosts} = this.state;
    let _hosts = hosts.split(",")
    .sort((a,b) => a > b)
    .map((h) => 
      <tr>
        <td>{h}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Subnet Calc v1</h1>
        </header>

        <div className="container">
          <form>
            <FormGroup>
              <ControlLabel>Start Network: </ControlLabel>
              <FormControl type="text" value={network} placeholder="Start Network" onChange={this.handleNetworkChange} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Host List: </ControlLabel>
              <FormControl type="text" value={hosts} placeholder="eg: 200,10,1000,2,1" onChange={this.handleHostsChange} />
            </FormGroup>
          </form>
          <hr />
          
          <Table>
            <thead>
              <tr>
                <th>Host</th>
                <th>Mask</th>
                <th>Network</th>
                <th>Broadcast</th>
              </tr>
            </thead>
            <tbody>
              {_hosts}
            </tbody>
          </Table>
        </div>
        
      </div>
    );
  }
}

export default App;
