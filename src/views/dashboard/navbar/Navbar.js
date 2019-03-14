import React from 'react'
import './Navbar.scss'
import HelperHttp from '../../../helper/HelperHttp'
import ConfigApi from '../../../config/ConfigApi';
import Loading from '../../../components/loading';
import ButtonStatus from '../../../components/button_status';
import NavbarEditAuth from './NavbarEditAuth';
import NavbarEdit from './NavbarEdit';
import NavbarTiles from './NavbarTiles';

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
        console.log(index)
        if(this.state.editSession){
            //edit menu show modal
            this.getNavbarById(this.state.navList[index].Id)
        }else{
            //run menu
        }
    }

    getNavigationList = () => {
        this.loadingSwitch()
        HelperHttp.request(ConfigApi.ROUTE.GET_MENU, ConfigApi.METHODS.GET, {},
            (success, response) => {
                this.loadingSwitch()
                if(success){
                    let list = response.Result
                    debugger
                    this.setState({
                        navList : list
                    })
                }
            }
        )
    }

    getNavbarById = (id) => {
        this.loadingSwitch()
        let route = ConfigApi.ROUTE.MENU + '/' +id
        HelperHttp.request(route, ConfigApi.METHODS.GET, {}, 
            (success, response) => {
                this.loadingSwitch()
                if(success) {
                    this.setState({
                        navObj: response.Result,
                        openEditModal: true
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
        const { navList, openAuthModal, openEditModal, loading } = this.state

        return (
            <React.Fragment>

                <NavbarEditAuth
                    open={openAuthModal}    editSession={this.editSessionSwitch}
                    onClose={this.onClose}  loading={this.loadingSwitch}
                />
                <NavbarEdit 
                    open={openEditModal}
                    dataNow={this.state.navObj}
                    onClose={this.onClose}
                    loading={this.loadingSwitch}
                    hotReload={this.getNavigationList}
                />

                {loading && <Loading />}

                <div className="grid-navbar">
                    {this.props.open ? 
                        <div className="navbar-show">
                           <div className= "navbar-wrapper">
                                <NavbarTiles navList={navList} onClick={this.buttonHendler} />
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