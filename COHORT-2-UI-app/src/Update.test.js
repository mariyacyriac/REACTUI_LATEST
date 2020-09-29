import React from 'react';
import { shallow } from 'enzyme';
import UpdateForm from './Components/Update/LoanUpdate';  ///updatecomponent/UpdateForm


const loandetails = {
    loanAmount: 80000,
    loanTerm: 1.5,
    lienType: 'lien type A',
    lienId: 567,
    loanNumber: '123',
    borrowerName: 'abcd',
    addressLine1: 'street 122',
    addressLine2: 'house number 1',
    city: 'bangalore',
    zipCode: '90893',
    legalDocuments: 'doc1 , doc 2 , doc3',

}

const routeComponentPropsMock = {
    history: {},
    location: {
        loanDetailProps: { loandetails }
    },
    match: {},
}
const defaultProps = {
    ...routeComponentPropsMock
}
const wrapper = shallow(<UpdateForm {...defaultProps} />)

describe('test for rendering the update Compoent ', () => {
    it('should render the form', () => {
        expect(wrapper.getElement()).toMatchSnapshot()
    })
});

describe('test for rendering labels for the editable fields  ', () => {
    it("should have a label for loan Amount ", () => {
        const containerloanAmountLabel = shallow(<label>Loan Amount</label>);
        expect(containerloanAmountLabel).toMatchSnapshot();
    });

    it("should have a label for loan Term ", () => {
        const containerloanTermLabel = shallow(<label>Loan Term</label>);
        expect(containerloanTermLabel).toMatchSnapshot();
    });
    it("should have a label for Lien Type ", () => {
        const containerLienTypeLabel = shallow(<label>Lien Type</label>);
        expect(containerLienTypeLabel).toMatchSnapshot();
    });
    it("should have a label for Lien ID ", () => {
        const containerLienIDLabel = shallow(<label>Lien ID</label>);
        expect(containerLienIDLabel).toMatchSnapshot();
    });
});



describe('test for rendering buttons in update component ', () => {
    it("should have a submit button ", () => {
        const containerButtonSubmit = wrapper.find("button").at(0);
        expect(containerButtonSubmit.text()).toEqual("Submit");
    });
    it("should have a cancel button ", () => {
        const containerButtonSubmit = wrapper.find("button").at(1);
        expect(containerButtonSubmit.text()).toEqual("Cancel");
    });
});