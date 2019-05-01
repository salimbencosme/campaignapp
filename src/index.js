import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch,HashRouter } from "react-router-dom";
import Main from './containers/Main';
import Login from './components/Login';
import Home from './components/Home';
import HomeDetails from './components/HomeDetails'
import Persons from './components/Persons';
import Schools from './components/Schools';
import Tables from './components/Tables';
import Reports from './components/Reports';
import ReportsDetails from './components/ReportsDetails';
ReactDOM.render(
    <HashRouter  basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reportsDetails" component={ReportsDetails} />
            <Main>
            <Route exact path="/home" component={Home} />
            <Route exact path="/homedetails" component={HomeDetails} />
            <Route exact path="/persons" component={Persons} />
            <Route exact path="/schools" component={Schools} />
            <Route exact path="/tables" component={Tables} />
            <Route exact path="/reports" component={Reports} />
            </Main>
       
        </Switch>
    </HashRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
