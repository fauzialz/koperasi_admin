import React from 'react';
import Icon from '../../../components/icon';

class NavbarTiles extends React.Component {
    render() {
        const { navList, onClick } = this.props
        return (
            <React.Fragment>
                {navList.map( (e,n) => {
                        return (
                            <div key= {e.Code} className="navbar-tile"
                                onClick={ () => onClick(n)}
                            >
                                <div className= "navbar-icon">
                                    <Icon 
                                        iconName={e.Icon}
                                        title1= {e.Description}
                                        small
                                    />
                                </div>
                                <div className="navbar-name">
                                    {e.Name}
                                </div>
                            </div>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}

export default NavbarTiles