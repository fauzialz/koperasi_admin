import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import Login from './views/login';
import Dashboard from './views/dashboard';
import HelperCookie from './helper/HelperCookie';
import ConfigLocal from './config/ConfigLocal';
import Dummy from './views/contents/Dummy';

const outside = '/login'
const inside = '/dashboard'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        {...rest}
        render = {props => 
            HelperCookie.get(ConfigLocal.TOKEN) == null?
                (<Redirect 
                    to={{
                        pathname: {outside},
                        state: { from: props.location}
                    }}
                />):
                (<Component {...props} />)
                
        }
    />
)

const RouterTierOne = () => {
    return (
        <main>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to={outside} />
                    )} />
                    <Route exact path={outside} component={Login} />
                    <PrivateRoute path={inside} component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </main>
    )
}

const RouterTierTwo = () => {
    return (
        <Switch>
            <Route path={inside + '/admin'} component={Dummy} />
        </Switch>
    )
}


export{ 
    RouterTierOne,
    RouterTierTwo
}