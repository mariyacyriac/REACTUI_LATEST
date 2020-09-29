import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import Login from './Components/Login/Login';
import { render } from 'react-test-renderer';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Login component tests', ()=> {
  const wrapper = shallow(<Login/>);

  it('should have a btn component', ()=> {
    //Button should be present
    expect(wrapper.find('button')).toHaveLength(1);
    //Button should have matching text
    expect(wrapper.find('button').text()).toEqual('Submit');
    
  });
  it('btn should be disabled', ()=> {
    expect(wrapper.find('button').is('[disabled]')).toBetruthy;
  });
});
