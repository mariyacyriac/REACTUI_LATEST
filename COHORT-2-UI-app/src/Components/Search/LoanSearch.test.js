import React from 'react';
import { mount, shallow } from 'enzyme';
import LoanSearch from './LoanSearch';
import { Form } from 'react-bootstrap';

it('Search component loanAmount input check', () => {
    const component = mount(<Form.Control type="number" name="loanAmount" min={0} />);
    expect(component.find('input')).toHaveLength(1);
    expect(component.min).toBeFalsy();
})

it('Search component defined', () => {
    const wrapper = shallow(<LoanSearch />);
    expect(wrapper).toBeDefined();
})



