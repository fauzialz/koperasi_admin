import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './login/Login';
import Dashboard from './dashboard/dashboard';

const Crossroads = () => {
    return (
        <main>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/dashboard' component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </main>
    )
}

export default Crossroads