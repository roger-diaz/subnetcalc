import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Table, InputGroup, Glyphicon } from 'react-bootstrap';
import {getMask, getMaskAddress, getNetwork, nextNetwork, getBroadcast} from './Network.js';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleNetworkChange = this.handleNetworkChange.bind(this);
    this.handleHostsChange = this.handleHostsChange.bind(this);
    this.handleHostsClick = this.handleHostsClick.bind(this);

    this.state = {
      network: '',
      networktmp: '',
      networkError: true,
      hosts: [],
      host: '',
      
    };
  }

  handleNetworkChange(e) {
    // var re = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
    // if( re.test(network)) {
    //   this.setState({ network: network, networkError: false });
    // } else {
    //   this.setState({ networkError:true, networktmp: e.target.value});
    // }
    this.setState({ network: e.target.value });
  }


  handleHostsChange(e) {
    this.setState({ host: e.target.value });
  }

  handleHostsClick(e) {
    let {hosts,host} = this.state;
    hosts.push(parseInt(host));
    this.setState({ hosts: hosts, host: '' });
  }

  render() {
    const {network, hosts, host} = this.state;
    let hostNetwork = network;
    let first = true;
    let _hosts = hosts
    .sort((a,b) => a < b)
    .map((h) => {
      let mask = getMask(h);
      let maskAddress = getMaskAddress(mask);
      let _hostNetwork = getNetwork(hostNetwork, mask, first);
      let broadcastAddress = getBroadcast(hostNetwork, mask);
      hostNetwork = nextNetwork(broadcastAddress);
      first = false;
      return (<tr>
        <td>{h}</td>
        <td>{maskAddress}/{mask}</td>
        <td>{_hostNetwork}</td>
        <td>{broadcastAddress}</td>
      </tr>)
    });
    return (
      <div className="App">
        <div className="container">
          <div className="row header-banner">
            <h1 className="header-title">Subnet Calc v1</h1>
          </div>
          <div className="row">
            <div className="app-form col-sm-4">
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
                      <Glyphicon glyph="plus-sign" onClick={this.handleHostsClick} />
                    </InputGroup.Addon>
                    </InputGroup>
                  </FormGroup>
                </form>
              </div>
            </div>
            <div className="col-sm-6">
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
        </div>
      </div>
    );
  }
}

export default App;
