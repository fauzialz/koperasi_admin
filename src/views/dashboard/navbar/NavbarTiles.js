import React from 'react';
import './NavbarTile.scss';

class NavbarTiles extends React.Component {
    state = {
        navbar : [],
        netral : "material-icons MuiIcon-root-1 MuiIcon-colorAction-4 navbar-iconfont-netral",
        netralChild : "material-icons MuiIcon-root-1 MuiIcon-colorAction-4 navbar-iconfont-parent",
        clickedChild : "material-icons MuiIcon-root-1 MuiIcon-colorAction-4 navbar-iconfont-parent-clicked"
    }

    render() {
        const { navList, onClick } = this.props
        const { netral, netralChild, clickedChild } = this.state
        return (
            <React.Fragment>
                {navList.map( (e) => {
                        return (
                            <React.Fragment key= {e.Id}>
                                <div className={e.Children.length > 0 ? "navbar-tile-passive" : e.Active ? "navbar-tile-active" : "navbar-tile"}
                                    onClick={ () => onClick(e.Id)}
                                >
                                    <div className= "navbar-icon">
                                        <span className={netral} aria-hidden="true">
                                            {e.Icon}
                                        </span>
                                    </div>
                                    <div className="navbar-name">
                                        {e.Name}
                                    </div>
                                    {e.Children.length > 0 && <div className="navbar-arrow-base">
                                        <span className={e.Clicked ? clickedChild : netralChild} aria-hidden="true">
                                            arrow_right
                                        </span>
                                    </div>}
                                </div>
                                {e.Children.length > 0 ?
                                    e.Children.map ( (el) => {
                                        return (
                                            <React.Fragment key= {el.Id}>
                                                <div className={e.Clicked ? "navbar-tile-child-clicked" : "navbar-tile-child-none"}>
                                                    <div className={el.Active ? "navbar-tile-active" : "navbar-tile"}
                                                        onClick={ () => onClick(el.Id)}
                                                    >
                                                        <div className="navbar-name-child">
                                                            {el.Name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })
                                    : null
                                }
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}

export default NavbarTiles