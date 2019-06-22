import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import Login from './views/login';
import Dashboard from './views/dashboard';
import HelperCookie from './helper/HelperCookie';
import ConfigLocal from './config/ConfigLocal';
import Dummy from './views/contents/dummy';
import Store from './views/contents/store';
import Mitra from './views/contents/mitra';

const outside = '/login'
const inside = '/dashboard'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        {...rest}
        render = {props => 
            HelperCookie.get(ConfigLocal.TOKEN) == null?
                (<Redirect 
                    to={{
                        pathname: '/login',
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
            <Route path={inside + '/store'} component={Store} />
            <Route path={inside + '/mitra'} component={Mitra} />
        </Switch>
    )
}


export{ 
    RouterTierOne,
    RouterTierTwo
}