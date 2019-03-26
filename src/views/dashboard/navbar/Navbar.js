import React from 'react'
import './Navbar.scss'
import HelperHttp from '../../../helper/HelperHttp'
import ConfigApi from '../../../config/ConfigApi';
import Loading from '../../../components/loading';
import ButtonStatus from '../../../components/button_status';
import NavbarEditAuth from './NavbarEditAuth';
import NavbarEdit from './NavbarEdit';
import NavbarTiles from './NavbarTiles';
import { AppContext } from '../../../context_provider';
import Button from '../../../components/button';
import ConfigLocal from '../../../config/ConfigLocal';
import HelperModData from '../../../helper/HelperModData';

class Navbar extends React.Component {
    static contextType = AppContext

    constructor(props) {
        super(props)
        this.state = {
            navList : [],
            navObj  : {},
            editSession : false,
            loading : false,
            openAuthModal: false,
            openEditModal: false,
            icon: 'material-icons MuiIcon-root-1 MuiIcon-colorAction-4 navbar-add-button',
            title: 'Setting Mode'
        }
    }

    loadingSwitch = () => {
        this.setState({loading : !this.state.loading})
    }

    editSessionSwitch = () => {
        this.setState({
            editSession: !this.state.editSession,
        })
        if(this.state.title === "Setting Mode") {
            setTimeout(() => {
                this.setState({
                    title: "Setti..."
                })
            }, 100);
        }else{
            setTimeout(() => {
                this.setState({
                    title: "Setting Mode"
                })
            }, 400);
        }
    }

    editSessionButton = () => {
        if(this.state.editSession === false){
            this.setState({openAuthModal:true})
        }else{
            this.editSessionSwitch()
        }
    }

    tileHendler = (id) => {
        if(this.state.editSession){
            //edit menu show modal
            this.editModalHandler(id)
        }else{
            //open menu
            this.activeTileHandler(id)
        }
    }

    activeTileHandler = (id) => {
        let hotNavList = this.state.navList
        for(var i = 0; i< hotNavList.length; i++) {
            if(hotNavList[i].Id === id) {
                if(hotNavList[i].Children.length > 0) {
                    hotNavList[i].Clicked = !hotNavList[i].Clicked
                }else{
                    hotNavList[i].Active = true
                }
            }else{
                hotNavList[i].Active = false
                hotNavList[i].Clicked = false
            }
            if(hotNavList[i].Children.length > 0){
                for(var j = 0; j< hotNavList[i].Children.length; j++) {
                    if(hotNavList[i].Children[j].Id === id) {
                        hotNavList[i].Children[j].Active = true
                        hotNavList[i].Clicked = true
                    }else{
                        hotNavList[i].Children[j].Active = false
                    } 
                }
            }
        }
        this.setState({navList : hotNavList})
    }

    getNavigationList = () => {
        this.loadingSwitch()
        HelperHttp.request(ConfigApi.ROUTE.GET_MENU, ConfigApi.METHODS.GET, {},
            (success, response) => {
                this.loadingSwitch()
                if(success){
                    let list = HelperModData.pushObjBulk(response.Result,'Active',false)
                    list = HelperModData.pushObjBulk(list,'Clicked',false)
                    this.setState({
                        navList : list
                    })
                    localStorage.setItem(ConfigLocal.LOCSTORE.Navbar,JSON.stringify(list))
                }
            }
        )
    }

    editModalHandler = (id) => {
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
        let list = JSON.parse(localStorage.getItem(ConfigLocal.LOCSTORE.Navbar))
        if(list != null){
            if(list.length > 0){
                this.setState({
                    navList : list
                })
            }else{
                this.getNavigationList()
            }
        }else{
            this.getNavigationList()
        }
    }

    render() {
        const { navList, openAuthModal, openEditModal, loading, icon } = this.state

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

                <div className={this.props.open ? "open-navbar": "close-navbar"}> 
                        <div className="navbar-base">
                            <div className= "navbar-overflow-superadmin">
                                <NavbarTiles navList={navList} onClick={this.tileHendler} />
                            </div>
                            <div className= "edit-tile">
                            <div className={this.state.editSession? "navbar-add-on": "navbar-add-off"}>
                                <Button
                                    blue
                                    flat
                                    circle
                                    title="Add new navigation menu"
                                    label={
                                        <span className={icon} aria-hidden="true">
                                            add
                                        </span>
                                    }/>
                            </div>
                                <ButtonStatus
                                    title={this.state.title}
                                    onClick={this.editSessionButton}
                                    active={this.state.editSession}
                                />
                            </div>
                            
                        </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar