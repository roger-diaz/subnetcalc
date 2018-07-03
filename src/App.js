import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Table, InputGroup, Glyphicon } from 'react-bootstrap';
import {getMask, getMaskAddress, nextNetwork, getBroadcast} from './Network.js';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleNetworkChange = this.handleNetworkChange.bind(this);
    this.handleHostsChange = this.handleHostsChange.bind(this);
    this.handleHostsClick = this.handleHostsClick.bind(this);
    this.handleItemHeaderClick = this.handleItemHeaderClick.bind(this);

    this.state = {
      network: '192.168.1.0',
      networktmp: '',
      networkError: true,
      hosts: [],
      host: '',
      errors: {
        network: false,
        host: false
      }
    };
  }

  handleNetworkChange(e) {
    // var re = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
    this.setState({ network: e.target.value });
  }


  handleHostsChange(e) {
    this.setState({ host: e.target.value });
  }

  handleHostsClick(e) {
    let {hosts,host} = this.state;
    hosts.push(parseInt(host, 10));
    this.setState({ hosts: hosts, host: '' });
  }

  handleItemHeaderClick(e) {
    this.setState({ hosts: []});
  }

  handleItemClick = idx => e => {
    let {hosts} = this.state;
    hosts.splice(idx, 1);
    this.setState({ hosts: hosts});
  }

  executeCalc() {
    const {network, hosts} = this.state;
    let networkAddress = network;
    return hosts
      .sort((a,b) => a < b)
      .map((h) => {
        let mask = getMask(h);
        let address = networkAddress;
        let maskAddress = getMaskAddress(mask);
        let broadcastAddress = getBroadcast(networkAddress, mask);
        networkAddress = nextNetwork(broadcastAddress);
        return { 
          hosts: h, 
          mask: maskAddress + "/" + mask, 
          network: address, 
          broadcast: broadcastAddress
        }
      });
  }

  render() {
    const {network, host} = this.state;
    let _hosts = this.executeCalc().map( (item, i) => {
      //console.log(item);
      return (<tr key={i}>
        <td>{item.hosts}</td>
        <td>{item.mask}</td>
        <td>{item.network}</td>
        <td>{item.broadcast}</td>
        <td><a onClick={this.handleItemClick(i)} data-id={i}><Glyphicon glyph="trash" /></a></td>
      </tr>)
    });
   

    return (
      <div className="App">
        <div className="container">
          <div className="row header-banner">
            <h1 className="header-title">Subnet Calc v1</h1>
          </div>
          <div className="row">
            <div className="app-form col-sm-3">
              <div className="row">
                <form>
                  <FormGroup className="col-sm-12">
                    <ControlLabel>Network: </ControlLabel>
                    <FormControl type="text" value={network} placeholder="Network" onChange={this.handleNetworkChange} />
                  </FormGroup>
                  <FormGroup className="col-sm-12">
                    <ControlLabel>Hosts: </ControlLabel>
                    <InputGroup>
                    <FormControl type="text" value={host} placeholder="Hosts" onChange={this.handleHostsChange} />
                    <InputGroup.Addon>
                      <a onClick={this.handleHostsClick}><Glyphicon glyph="plus-sign" /></a>
                    </InputGroup.Addon>
                    </InputGroup>
                  </FormGroup>
                </form>
              </div>
            </div>
            <div className="col-sm-9">
              <Table>
              <thead>
                <tr>
                  <th>Host</th>
                  <th>Mask</th>
                  <th>Network</th>
                  <th>Broadcast</th>
                  <th><a onClick={this.handleItemHeaderClick}><Glyphicon glyph="trash" /></a></th>
                </tr>
              </thead>
              <tbody>
                {_hosts}
              </tbody>
            </Table>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

export default App;
