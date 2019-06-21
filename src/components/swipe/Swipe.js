import React from 'react';
import SwipeSocket from 'react-easy-swipe';
import { AppContext } from '../../global';
import './Swipe.scss';

class Swipe extends React.Component {
    static contextType = AppContext

    onSwipeRight = () => {
        this.context.setNavbarOpen(true)
    }
    onSwipeLeft = () => {
        this.context.setNavbarOpen(false)
    }

    render() {
        return (
            <SwipeSocket 
                onSwipeRight={this.props.onSwipeRight || this.onSwipeRight}
                onSwipeLeft={this.props.onSwipeLeft || this.onSwipeLeft}
                onSwipeUp={this.props.onSwipeUp}
                onSwipeDown={this.props.onSwipeDown}
                onSwipeStart={this.props.onSwipeStart}
                onSwipeMove={this.props.onSwipeMove}
                onSwipeEnd={this.props.onSwipeEnd}
            >
                <div className="swipe-socket">
                    {this.props.children}
                </div>
            </SwipeSocket>
        )
    }
}

export default Swipe;