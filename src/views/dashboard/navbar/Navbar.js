import React from 'react'
import './Navbar.scss'
import HelperHttp from '../../../helper/HelperHttp'
import ConfigApi from '../../../config/ConfigApi';
import Icon from '../../../components/icon';
import Loading from '../../../components/loading';
import ButtonStatus from '../../../components/button_status';
import NavbarEditAuth from './NavbarEditAuth';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navList : [],
            navObj  : {},
            editSession : false,
            loading : false,
            openAuthModal: false,
            openEditModal: false,
        }
    } 

    editSessionSwitch = () => {
        this.setState({
            editSession: !this.state.editSession
        })
    }

    loadingSwitch = () => {
        this.setState({loading : !this.state.loading})
    }

    editSessionHendler = () => {
        if(this.state.editSession === false){
            this.setState({openAuthModal:true})
        }else{
            this.editSessionSwitch()
        }
    }

    buttonHendler = (index) => {
        if(this.state.editSession){
            //edit menu show modal
            this.setState({
                navObj: this.state.navList[index],
                openEditModal: true
            })
        }else{
            //run menu
        }
    }

    getNavigationList = () => {
        this.loadingSwitch()
        HelperHttp.request(ConfigApi.ROUTE.GET_MENU, ConfigApi.METHODS.GET, {},
            (success, response) => {
                if(success){
                    this.loadingSwitch()
                    let list = response.Result
                    this.setState({
                        navList : list,
                    })
                }
            }
        )
    }

    onClose = () => {
        this.setState({
            openAuthModal: false,
            openEditModal: false,
        })
    }

    componentDidMount() {
        this.getNavigationList()
    }

    render() {
        const { navList, openAuthModal, loading } = this.state

        return (
            <React.Fragment>

                <NavbarEditAuth
                    open={openAuthModal}    editSession={this.editSessionSwitch}
                    onClose={this.onClose}  loading={this.loadingSwitch}
                />

                {loading && <Loading />}

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