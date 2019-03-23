import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import StolenWidget from './StolenWidget';

describe('<StolenWidget /> shallow rendered', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<StolenWidget />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('accepts config props', () => {
    const wrap = shallow(
      <StolenWidget
        cacheResults
        recentResults={false}
        location="Portland, OR"
        height={400}
      />,
    );
    const { props } = wrap.instance();
    const expected = {
      cacheResults: true,
      recentResults: false,
      location: 'Portland, OR',
      height: 400,
    };
    expect(props).toEqual(expected);
  });

  it('is loading by default', () => {
    const wrap = shallow(<StolenWidget />);
    expect(wrap.state('loading')).toEqual(true);
  });

  it('has a disabled search input', () => {
    const wrap = shallow(<StolenWidget />);
    expect(wrap.find('.topsearcher input').is('[disabled]')).toBe(true);
  });

  it('on search input changes searchToken', () => {
    const wrap = shallow(<StolenWidget />);
    const input = wrap.find('input');
    input.simulate('change', { target: { value: 'something' } });
    expect(wrap.state('searchToken')).toEqual('something');
  });

  it('calls searchSerial when the search button is clicked', () => {
    const wrap = shallow(<StolenWidget />);
    const event = Object.assign(jest.fn(), { preventDefault: () => {} });
    const instance = wrap.instance();

    jest.spyOn(instance, 'searchSerial');
    wrap.find('button').simulate('click', event);
    expect(instance.searchSerial).toHaveBeenCalled();
  });

  describe.skip('<StolenWidget /> mount', () => {
    it.skip('has a disabled loading state after componentDidMount');
    it.skip('has a list of recent stolen bikes');
    it.skip('has a list of bikes with matching serial numbers');
    it.skip('adjusts the height of the widget');
    it.skip('displays a message for no results');
  });
});
