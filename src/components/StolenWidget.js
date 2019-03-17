import React, { Component } from 'react';
import Config from '../config';
import searchIcon from '../icons/search.svg';
import { fetchStolenNearby } from '../api';
import List from './List';
import '../styles/stolen-widget.scss';

const Loading = () => <div>Loading...</div>;

export default class StolenWidget extends Component {
  state = {
    results: [],
    loading: true,
    serialNumber: '',
  };

  async componentDidMount() {
    const { location = Config.defaultLocation } = this.props;
    const { bikes: results } = await fetchStolenNearby(location);
    this.setState({ loading: false, results });
  }

  searchSerial = async () => {
    const { serialNumber } = this.state;
    // TODO: search serial
  };

  onClickSearch = e => {
    e.preventDefault();
    this.searchSerial();
  };

  onSubmitSearch = e => {
    e.preventDefault();
    this.searchSerial();
  };

  onChangeSerial = e => {
    const serialNumber = e.target.value;
    this.setState({ serialNumber });
  };

  render() {
    const { loading, serialNumber, results } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div id="stolen-widget">
        <form className="topsearcher" onSubmit={this.onSubmitSearch}>
          <input
            type="text"
            placeholder="Search for a serial number"
            value={serialNumber}
            onChange={this.onChangeSerial}
          />
          <a href="#" className="subm" onClick={this.onClickSearch}>
            <img src={searchIcon} />
          </a>
        </form>
        <List results={results} />
      </div>
    );
  }
}
