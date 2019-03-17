import React, { Component } from 'react';
import searchIcon from '../icons/search.svg';
import { fetchStolenNearby } from '../api';
import List from './List';
import NoResults from './NoResults';
import '../styles/stolen-widget.scss';

const Loading = () => <div>Loading...</div>;

export default class StolenWidget extends Component {
  state = {
    results: [],
    loading: true,
    serialNumber: '',
    recentStolen: true,
  }

  async componentDidMount() {
    const { location } = this.props;
    const { bikes: results } = await fetchStolenNearby(location);
    this.setState({ loading: false, results });
  }

  searchSerial = async () => {
    const { serialNumber } = this.state;

    // this.setState({ recentStolen: false })
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
    const { location } = this.props;
    const { loading, serialNumber, results, recentStolen } = this.state;
    const noResults = !loading && results.length === 0 && (serialNumber || recentStolen);

    return (
      <div id="stolen-widget">
        <form className="topsearcher" onSubmit={this.onSubmitSearch}>
          <input
            type="text"
            value={serialNumber}
            onChange={this.onChangeSerial}
            placeholder="Search for a serial number"
            disabled={loading}
          />
          <a href="#" className="subm" onClick={this.onClickSearch}>
            <img src={searchIcon} />
          </a>
        </form>

        <div className="binxcontainer" id="binx_list_container">
          {loading ? (
            <Loading />
          ) : noResults ? (
            <NoResults 
              recentStolen={recentStolen} 
              serialNumber={serialNumber} 
            />
          ) : (
            <List results={results} />
          )}

          {!loading && recentStolen && (
            <div className="widget-info">
              Recent reported stolen bikes 
              {location && (<span> near <em>{location}</em></span>)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

