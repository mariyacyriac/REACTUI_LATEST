import React, { useState, useEffect } from 'react';
import Header from '../Main/Header'
import { Form, Button, Container, Row, Card, Col, Table } from 'react-bootstrap';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const LoanSearch = () => {
    const search = {
        borrowerName: '',
        loanNumber: '',
        loanAmount: ''
    }

    const [state, setState] = useState(search);
    const [showResults, setShowResults] = useState(false);
    const [loan, setLoan] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    useEffect(() => {
        if (isSubmitted) {
            let authcode = localStorage.getItem("auth");
            // Axios.post('http://localhost:8010/loan-api/searchLoan', state, {
            Axios.post('http://localhost:8060/loan-api/apiGate/searchLoan', state, {
                headers: {
                    'Authorization': `Bearer ${authcode}`
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        let data = response.data;
                        setLoan(data);
                        setShowResults(true);
                    }
                    else {
                        alert("No Results Found!!!")
                    }
                })
                .catch(error => {
                    console.log(error.response)
                    alert("Could not Search Loan Details!!!")
                });
            setState(search);
            setIsSubmitted(false)
        }

    }, [isSubmitted])

    useEffect(() => {
        let role = localStorage.getItem("roles")
        if (role === "ROLE_ADMIN") {
            setIsAdmin(true);
        }
        // console.log("role-> "+role);

    })

    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Button variant="outline-primary" href="/add" disabled={!isAdmin} >Add loan</Button>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center mt-5">
                        <Card>
                            <Card.Header>
                                <Form inline onSubmit={handleSubmit}>
                                    <Form.Row className="align-items-center">
                                        <Form.Group>
                                            <Col xs="auto">
                                                <Form.Control name="borrowerName" placeholder="Borrower Full Name" type="text" value={state.borrowerName} onChange={handleChange} />
                                            </Col>
                                            <Col xs="auto">
                                                <Form.Control name="loanNumber" placeholder="Loan Number" type="number" min="0" value={state.loanNumber} onChange={handleChange} />
                                            </Col>
                                            <Col xs="auto">
                                                <Form.Control name="loanAmount" placeholder="Loan Amount" type="number" min="0" value={state.loanAmount} onChange={handleChange} />
                                            </Col>
                                        </Form.Group>
                                        <Button variant="outline-primary" type="submit">Search</Button>
                                    </Form.Row>
                                </Form>
                            </Card.Header>
                            <Card.Body>
                                {showResults ? <LoanSearchTable loan={loan || null} /> : null}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


const LoanSearchTable = ({ loan }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Borrower Name</th>
                    <th>Loan Number</th>
                    <th>Loan Amount</th>

                    {localStorage.getItem("roles") === "ROLE_ADMIN" ? <th>Action</th> : null}
                </tr>
            </thead>
            <tbody>
                {loan.map(loandetails => {
                    return (
                        <tr key={loandetails.loanNumber}>
                            <td>{loandetails.loanNumber}</td>
                            <td>{loandetails.borrowerName}</td>
                            <td>{loandetails.loanNumber}</td>
                            <td>{loandetails.loanAmount}</td>

                            {localStorage.getItem("roles") === "ROLE_ADMIN" ? <td><Link to={{ pathname: "/update", loanDetailProps: { loandetails } }}>Update</Link></td> : null}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default LoanSearch;


//<td><Link to={{ pathname: '/update', state: { loanDetail: item } }}>Update</Link></td>