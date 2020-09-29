import React, { useState, useEffect } from 'react'
import Header from '../Main/Header'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './AddLoan.css'

const AddLoan = () => {
  let [errors, setErrors] = useState({})
  let [isSubmited, setIsSubmitted] = useState(false);
  let [redirect, setRedirect] = useState(false);
  const [loan, setLoan] = useState({
    borrowerName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zipCode: '',
    lienId: '',
    loanAmount: '',
    loanTerm: '',
    lienType: '',
    docDetails: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan({
      ...loan,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validationinfo()) {
      setIsSubmitted(true);
      console.log("submitted")
    }
  }

  useEffect(() => {
    if (isSubmited) {
      setIsSubmitted(false);
      let authcode = localStorage.getItem("auth");
      console.log(loan)
      //   axios.post('http://localhost:8090/loan-api/add/loanDetails',loan , {
      axios.post('http://localhost:8060/loan-api/apiGate/add/loanDetails', loan, {
        headers: {
          'Authorization': `Bearer ${authcode}`
        }
      })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            alert("Loan Details has been added Successfully");
            setRedirect(true);
            console.log(response.data);
          }
          else {
            alert("Loan Add was not successful. Please try after some time!!!")
          }
        })
        .catch(error => {
          console.log(error.response)
          alert("Loan Add was not successful. Please try after some time!!!")
        }
        )
    }
  }, [isSubmited])

  const validationinfo = () => {

    let errorsArray = [];
    let { borrowerName, addressLine1, addressLine2, city, zipCode, lienId, loanAmount, loanTerm, lienType, docDetails } = loan;

    if (!borrowerName.trim()) {
      errorsArray.borrowerName = "Borrower Name is required"
    } else if (borrowerName.length < 4) {
      errorsArray.borrowerName = "borrowerName length should be minimum 4 characters long"
    }
    if (!addressLine1.trim()) {
      errorsArray.addressLine1 = "Address Line1 is required"
    }
    if (!addressLine2.trim()) {
      errorsArray.addressLine2 = "Address Line2 is required"
    }
    if (!city.trim()) {
      errorsArray.city = "City is required"
    }
    if (!zipCode.trim()) {
      errorsArray.zipCode = "zipCode is required"
    } else if (!/^\d+$/.test(zipCode)) {
      errorsArray.zipCode = 'zipCode should be a number  ';
    }
    if (zipCode > 699999 || zipCode < 600000) {
      errorsArray.zipCode = 'zipCode should be a number greater than  600000  and less than 699999 ';
    }
    if (!lienId.trim()) {
      errorsArray.lienId = "Loan Id is required"
    } else if (!/^\d+$/.test(lienId)) {
      errorsArray.lienId = 'Lien ID should be a number  ';
    }
    if (lienId < 1 || lienId > 1000) {
      errorsArray.lienId = 'Lien ID should be a number between 1 and 1000  ';
    }
    if (!loanAmount.trim()) {
      errorsArray.loanAmount = "loanAmount is required"
    } else if (loanAmount < 500000) {
      errorsArray.loanAmount = 'Loan Amount should be greater than 500000 ';
    }
    else if (!/^\d+$/.test(loanAmount)) {
      errorsArray.loanAmount = 'Loan Amount should be a number';
    }
    if (!loanTerm.trim()) {
      errorsArray.loanTerm = "loanTerm is required"
    } if (!/^\d+$/.test(loanTerm)) {
      errorsArray.loanTerm = 'Loan Term should be a number';
    } if (loanTerm < 5 || loanTerm > 20) {
      errorsArray.loanTerm = 'Loan Term should be a less than 20 and greater than 5';
    }
    if (!lienType.trim()) {
      errorsArray.lienType = "lienType is required"
    }
    if (!docDetails.trim()) {
      errorsArray.docDetails = "Legal documents description is required"
    }
    setErrors({ ...errorsArray })

    return (Object.keys(errorsArray).length === 0);
  }
  if (redirect) {
    return (<Redirect to="/Search" />);
  }
  else {
    return (
      <div>
        <Header />
        <form className="form-2">
          <div className="row">
            <div className="col-25">
              <label htmlFor="bname">Borrower Name</label>
            </div>

            <div className="col-75">
              <input type="text" id="bname" name="borrowerName" onChange={handleChange} placeholder="Please Enter your Name"></input>
            </div>
            <p className="Validation">{errors.borrowerName}</p>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="address1">Address Line 1</label>
            </div>

            <div className="col-75">
              <input type="text" id="address1" name="addressLine1" onChange={handleChange} placeholder="Please Enter your address"></input>
            </div>
            <p className="Validation">{errors.addressLine1}</p>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="address2">Address Line 2</label>
            </div>

            <div className="col-75">
              <input type="text" id="address2" name="addressLine2" onChange={handleChange} placeholder="Please Enter your address 2"></input>
            </div>
            <p className="Validation">{errors.addressLine2}</p>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="city">City</label>
            </div>

            <div className="col-75">
              <input type="text" id="city" name="city" onChange={handleChange} placeholder="Please enter your city"></input>
            </div>
            <p className="Validation">{errors.city}</p>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="zipCode">zipCode</label>
            </div>

            <div className="col-75">
              <input type="text" id="zipCode" name="zipCode" onChange={handleChange} placeholder="Please enter your zipCode"></input>
            </div>
            <p className="Validation">{errors.zipCode}</p>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="lienId">Lien Id</label>
            </div>

            <div className="col-75">
              <input type="text" id="lienId" name="lienId" onChange={handleChange} placeholder="Please enter Lien Id"></input>
            </div>
            <p className="Validation">{errors.lienId}</p>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="loanAmount">Loan Amount</label>
            </div>

            <div className="col-75">
              <input type="text" id="loanAmount" name="loanAmount" onChange={handleChange} placeholder="Please enter Loan Amount"></input>
            </div>
            <p className="Validation">{errors.loanAmount}</p>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="loanTerm">Loan Term</label>
            </div>

            <div className="col-75">
              <input type="text" id="loanTerm" name="loanTerm" onChange={handleChange} placeholder="Please enter Loan Term"></input>
            </div>
            <p className="Validation">{errors.loanTerm}</p>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="lienType">Lien Type</label>
            </div>

            <div className="col-75">
              <input type="text" id="lienType" name="lienType" onChange={handleChange} placeholder="Please enter Lien Type"></input>
            </div>
            <p className="Validation">{errors.lienType}</p>
          </div>



          <div className="row">
            <div className="col-25">
              <label htmlFor="subject">Legal Documents</label>
            </div>

            <div className="col-75">
              <textarea id="subject" name="docDetails" onChange={handleChange} placeholder="Write something.."></textarea>
            </div>
            <p className="Validation">{errors.docDetails}</p>
          </div>

          <div className="row">
            <input type="submit" value="Submit" onClick={handleSubmit}></input>
          </div>
        </form>
      </div>

    )
  }
}


export default AddLoan 