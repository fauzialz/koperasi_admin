import React from 'react'
import Button from '../../components/button';
import HelperCookie from '../../helper/HelperCookie'
import ConfigLocal from '../../config/ConfigLocal'

class Dashboard extends React.Component {
    signOut = () => {
        HelperCookie.delete(ConfigLocal.TOKEN)
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.signOut} center label="Sign Out"/>
            </React.Fragment>
        )
    }
}

export default Dashboard