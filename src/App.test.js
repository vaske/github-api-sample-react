import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import { shallow, mount, render } from 'enzyme';

import sinon from 'sinon';
import ReactDOM from 'react-dom';


import App from './App';


describe('Testing <App /> component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders input for usernames', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.input-username').length).toBe(1);
  });

  it('check does app calls renderRepos', () => {
    const spy = sinon.spy(App.prototype, 'renderRepos');
    const wrapper = mount(<App />);
    expect(App.prototype.renderRepos.calledOnce).toBe(true);
  });

  it('allows us to set username', () => {
    const wrapper = mount(<App />);
    wrapper.setProps({ name: "vaske" });
    expect(wrapper.props().name).toBe("vaske");
  });

  it('should have props for handleSubmit and handleChange', function () {
    const wrapper = shallow(<App />);
    expect(wrapper.props().handleSubmit).toBe.defined;
    expect(wrapper.props().handleChange).toBe.defined;
  });

  it('should have props for handleSubmit and handleChange', function () {
    const wrapper = shallow(<App />);
    expect(wrapper.find('[type="submit"]').length).toBe(1);
  });

});