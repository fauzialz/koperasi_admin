import React from 'react'
import './Navbar.scss'
import HelperHttp from '../../../helper/HelperHttp'
import ConfigApi from '../../../config/ConfigApi';
import Icon from '../../../components/icon';
import Loading from '../../../components/loading';
import ButtonStatus from '../../../components/button_status';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navList : [],
            editSession : false,
            loading : false
        }
    } 

    editSessionHendler = () => {
        this.setState({
            editSession: !this.state.editSession
        })
    }

    buttonHendler = (index) => {
        if(this.state.editSession){
            //edit menu show modal
            alert(this.state.navList[index].Icon + "\n" + this.state.navList[index].Description)
            //ready to deliver the value to crud
        }else{
            //run menu
        }
    }

    getNavigationList = () => {
        this.setState({loading : true})
        HelperHttp.request(ConfigApi.ROUTE.GET_MENU, ConfigApi.METHODS.GET, {},
            (success, response) => {
                if(success){
                    let list = response.Result
                    debugger
                    this.setState({
                        navList : list,
                        loading : false
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

                {this.state.loading && <Loading />}

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
                                    <ButtonStatus
                                        onClick={this.editSessionHendler}
                                        active={this.state.editSession}
                                    />
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