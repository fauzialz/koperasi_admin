import React from 'react';

class NavbarTiles extends React.Component {
    state = {
        netral : "material-icons MuiIcon-root-1 MuiIcon-colorAction-4 navbar-iconfont-netral",
        netralChild : "material-icons MuiIcon-root-1 MuiIcon-colorAction-4 navbar-iconfont-netral-child"
    }
    render() {
        const { navList, onClick } = this.props
        return (
            <React.Fragment>
                {navList.map( (e) => {
                        return (
                            <React.Fragment key= {e.Id}>
                                <div className="navbar-tile"
                                    onClick={ () => onClick(e.Id)}
                                >
                                    <div className= "navbar-icon">
                                        <span className={this.state.netral} aria-hidden="true">
                                            {e.Icon}
                                        </span>
                                    </div>
                                    <div className="navbar-name">
                                        {e.Name}
                                    </div>
                                </div>
                                {e.Children.length > 0 ?
                                    e.Children.map ( (el) => {
                                        return (
                                            <div className="navbar-tile-child-base"
                                                key={el.Id}
                                                onClick={ () => onClick(el.Id)}
                                            >
                                                <div className="navbar-tile-child">
                                                    <div className= "navbar-icon-child">
                                                        <span className={this.state.netralChild} aria-hidden="true">
                                                            {el.Icon}
                                                        </span>
                                                    </div>
                                                    <div className="navbar-name-child">
                                                        {el.Name}
                                                    </div>
                                                </div>
                                            </div>
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