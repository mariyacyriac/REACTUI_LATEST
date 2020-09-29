import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../Components/Main/Footer';
import Login from '../Components/Login/Login';
import LoanSeacrh from '../Components/Search/LoanSearch';
import AddLoan from '../Components/Add/AddLoan';
import UpdateForm from '../Components/Update/LoanUpdate';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => (
    <BrowserRouter>
       <Switch>
            <Route path="/" component={Login} exact={true} />
            <PrivateRoute path="/Search" component={LoanSeacrh} exact={true} />
            <PrivateRoute path="/update" component={UpdateForm} exact={true} />
            <PrivateRoute path="/Add" component={AddLoan} exact={true} />
        </Switch>
       <Footer/>
    </BrowserRouter >
);

export default AppRouter;