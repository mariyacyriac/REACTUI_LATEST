

export default function validateUpdateForm(loandetails) {

    let errors = [];
    let { loanAmount, loanTerm, lienType, lienId } = loandetails;

    if (loanAmount.length === 0) {
        errors.loanAmount = 'Loan Amount is required ';
    } else if (loanAmount < 500000) {
        errors.loanAmount = 'Loan Amount should be greater than 500000 ';
    }
    //else if (!/^\d+$/.test(loanAmount)) {
    else if (!/^\d+$/.test(loanAmount)) {
        errors.loanAmount = 'Loan Amount should be a number';
    }

    if (loanTerm.length === 0) {
        errors.loanTerm = 'Loan term is required ';
    }
     if (!/^\d+$/.test(loanTerm)) {
        errors.loanTerm = 'Loan Term should be a number';
    } if (loanTerm < 5 || loanTerm > 20) {
        errors.loanTerm = 'Loan Term should be a less than 20 and greater than 5';
    }

    if (JSON.stringify(lienId).trim().length === 0) {
        errors.lienId = 'Lien ID is required ';
    }
    else if (!/^\d+$/.test(lienId)) {
        errors.lienId = 'Lien ID should be a number  ';
    } if (lienId < 1 || lienId > 1000) {
        errors.lienId = 'Lien ID should be a number between 1 and 1000  ';
    }

    if (lienType.length === 0) {
        errors.lienType = 'Lien Type  is required ';
    }


    return errors;
}