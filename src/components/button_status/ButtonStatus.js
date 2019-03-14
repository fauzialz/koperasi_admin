import React from 'react';
import './ButtonStatus.scss';
import Icon from '../icon';

const ButtonStatus = (props) => {
    return (
        <React.Fragment>
            <div className="btnStat-base">
                <div className="btnStat-grid" onClick={ props.onClick } title={props.active? "Turn off setting mode": "Turn on setting mode"}>
                    <div className="btnStat-left">
                        <div className="btnStat-icon">
                            <Icon
                                iconName="settings"
                                small
                            />
                        </div>
                        <div className="btnStat-title">
                            { props.title || "Setting Mode"}
                        </div>
                    </div>
                    <div className={ props.active ? "btnStat-right-on" : "btnStat-right-off"}>
                        <div className="btnStat-status">
                            { props.active ? "On" : "Off"}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ButtonStatus