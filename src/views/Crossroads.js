import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import Login from './login';
import Dashboard from './dashboard';
import HelperCookie from '../helper/HelperCookie';
import ConfigLocal from '../config/ConfigLocal';


const Crossroads = () => {
    return (
        <main>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to="/login" />
                    )} />
                    <Route path='/login' component={Login} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </main>
    )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        {...rest}
        render = {props => 
            HelperCookie.get(ConfigLocal.TOKEN) == null?
                (<Redirect 
                    to={{
                        pathname: "/login",
                        state: { from: props.location}
                    }}
                />):
                (<Component {...props} />)
                
        }
    />
)

export default Crossroads