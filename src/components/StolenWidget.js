import React, { Component } from 'react';
import searchIcon from '../icons/search.svg';
import List from './List';
import NoResults from './NoResults';
import { fetchStolenNearby, fetchStolenSerial } from '../api';
import { headerHeight, defaultHeight } from '../utility';
import { ClipLoader } from 'react-spinners';
import '../styles/stolen-widget.scss';

const Loading = () => (
  <ClipLoader
    sizeUnit={"px"}
    size={100}
    color={'#fff'}
    loading={true}
  />
);

export default class StolenWidget extends Component {
  state = {
    results: [],
    loading: true,
    searchToken: '',
    serialNumber: '',
    recentStolen: true,
  }

  async componentDidMount() {
    const { location } = this.props;
    const { bikes: results } = await fetchStolenNearby(location);
    this.setState({ loading: false, results });
  }

  searchSerial = async () => {
    const { searchToken: serialNumber } = this.state;
    const { bikes: results } = await fetchStolenSerial(serialNumber);
    this.setState({recentStolen: false, results, serialNumber})
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
    const searchToken = e.target.value;
    this.setState({ searchToken });
  };

  render() {
    const { location, height } = this.props;
    const { loading, serialNumber, searchToken, results, recentStolen } = this.state;
    const noResults = !loading && results.length === 0 && (serialNumber || recentStolen);
    const maxHeight = (parseInt(height) || defaultHeight) - headerHeight;

    return (
      <div id="stolen-widget">
        <form className="topsearcher" onSubmit={this.onSubmitSearch}>
          <input
            type="text"
            value={searchToken}
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
            <List 
              results={results} 
              recentStolen={recentStolen} 
              serialNumber={serialNumber} 
              maxHeight={maxHeight}
            />
          )}

          {!loading && recentStolen && (
            <div className="widget-info">
              Recent reported stolen bikes 
              {location && <span> near <em>{location}</em></span>}
            </div>
          )}
        </div>
      </div>
    );
  }
}

