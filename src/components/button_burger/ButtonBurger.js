import React from 'react'
import './ButtonBurger.scss'

const ButtonBurger = (props) => {
    return (
        <React.Fragment>
            <div className={ !props.active ? "burger-base" : "burger-base-x" } onClick={props.onClick}>
                <div className={ !props.active ? "burger-wrapper" : "burger-wrapper-x"}>
                    <div className={ !props.active ? "burgerline-top" : "burgerline-top-x"} />
                    <div className={ !props.active ? "burgerline-middle" : "burgerline-middle-x"} />
                    <div className={ !props.active ? "burgerline-bottom" : "burgerline-bottom-x"} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ButtonBurger