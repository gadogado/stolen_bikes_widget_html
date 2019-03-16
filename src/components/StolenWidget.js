import React, { Component } from 'react';
import { fetchStolenNearby } from './api';
import { Config } from './config';
import './stolen-widget.scss';

const Loading = () => <div>Loading...</div>;

export default class StolenWidget extends Component {
  state = {
    results: [],
    loading: true,
    serialNumber: null,
  };

  async componentDidMount() {
    const { location = Config.defaultLocation } = this.props;
    const { bikes: results } = await fetchStolenNearby(location);
    this.setState({ loading: false, results });
  }

  render() {
    const { loading } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div id="stolen-widget">
        <form className="topsearcher" id="binx_search_form">
          <input
            id="binx_search"
            type="text"
            placeholder="Search for a serial number"
          />
          <input type="submit" id="binxformsubm" />
          <a href="#" class="subm" id="binxformsubm_a">
            <img src="search.svg" />
          </a>
        </form>
        <div className="binxcontainer" id="binx_list_container" />
      </div>
    );
  }
}
