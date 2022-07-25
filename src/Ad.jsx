import React, { Component } from 'react'

export default class Ad extends Component {
    render() {
        return (        
            <div>
                {/* {console.log(this.props.children,'123')} */}
                {this.props.children}
            </div>
        )
    }
}
