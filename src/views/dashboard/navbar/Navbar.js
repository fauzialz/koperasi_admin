import React from 'react'
import './Navbar.scss'
import HelperHttp from '../../../helper/HelperHttp'
import ConfigApi from '../../../config/ConfigApi';
import Icon from '../../../components/icon';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navList : [],
            editSession : false
        }
    } 

    editSessionHendler = () => {
        this.setState({
            editSession: !this.state.editSession
        })
    }

    buttonHendler = (index) => {
        if(this.state.editSession){
            //edit menu
            alert(this.state.navList[index].Code)
            //ready to deliver the value to crud
        }else{
            //run menu
        }
    }

    getNavigationList = () => {
        HelperHttp.request(ConfigApi.ROUTE.GET_MENU, ConfigApi.METHODS.GET, {},
            (success, response) => {
                if(success){
                    let list = response.Result
                    this.setState({
                        navList : list
                    })
                   /*  debugger */
                }
            }
        )
    }

    componentDidMount() {
        this.getNavigationList()
    }

    render() {
        const { navList } = this.state

        return (
            <React.Fragment>
                <div className="grid-drawer">
                    <div 
                        className={ this.props.open ?
                        "drawer-tile-active" :
                        "drawer-tile"
                    }>
                        <div className="drawer-icon">
                            <Icon 
                                iconName="menu"
                                onClick={this.props.onClick}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="grid-navbar">
                    {this.props.open ? 
                        <div className="navbar-show">

                            

                           <div className= "navbar-edit">
                                {navList.map( (e,n) => {
                                        return (
                                            <div key= {e.Code} className="navbar-tile">
                                                <div className= "navbar-icon">
                                                    <Icon 
                                                        iconName="face"
                                                        onClick={ () => this.buttonHendler(n)}
                                                        title= "Navbar Settings"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className= "edit-tile">
                                    <div className= "navbar-icon">
                                        <Icon 
                                            iconName="settings"
                                            onClick={this.editSessionHendler}
                                            title= "Navbar Settings"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="navbar-hide" />
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar