import React from 'react';
import './DummyNavbar.scss'

const NavParent = () => {
    return (
        <div className="dummy-navbar-tile">
            <div className="dummy-navbar-aranged">
                <div className="dummy-navbar-icon" />
            </div>
            <div className="dummy-navbar-title" />
        </div>
    )
}
const NavChildren = () => {
    return (
        <div className="dummy-navbar-tile">
            <div className="dummy-navbar-aranged-child">
                <div className="dummy-navbar-title-children" />
            </div>
        </div>
    )
}

const DummyNavbar = (props) => {
    let jsx = []
    var navList = props.navList
    if(navList.length === 0) {
        for(let i=0; i < 4; i++) {
            jsx.push(<NavParent key={i}/>)
        }
    }else{
        for(let i=0; i < navList.length; i++) {
            jsx.push(<NavParent key={i}/>)
            for(let j=0; j < navList[i].Children.length; j++) {
                jsx.push(<NavChildren key={i+"-"+j}/>)
            }
        }
    }
    return (
        <React.Fragment>
            {jsx}
        </React.Fragment>
    )
}

export default DummyNavbar