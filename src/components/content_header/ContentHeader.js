import React from 'react'
import Button from '../button';
import ConfigLocal from '../../config/ConfigLocal';
import './ContentHeader.scss'
import { AppContext } from '../../global';

const ContentHeader = (props) => {
    const icon = ConfigLocal.MISC.MaterialIcon + ' add-button-icon'
    return (
        <AppContext.Consumer>
            {contex => (
                <div className={!contex.onTop? "header-sticky header-line": "header-sticky"}>
                    <div className="content-header">
                        <div className="content-title">{props.title}</div>
                        { !props.noAdd ? 
                            <div className="content-add-button">
                                <Button onClick={props.addFunction} label={
                                    <React.Fragment>
                                        <span className={icon} aria-hidden="true">
                                            add
                                        </span>
                                        <span className="add-button-text">
                                            New {props.title}
                                        </span>
                                    </React.Fragment>
                                } blue depressed /> 
                            </div>: null
                        }
                    </div>
                </div>
            )}
        </AppContext.Consumer>
    )
}

export default ContentHeader