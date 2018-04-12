import React, {Component} from 'react'

export default class WindowTitle extends Component {
    constructor(props) {
        super(props);

        window.document.title = this.props.title;
    }

    componentWillReceiveProps(newProps) {
        if(newProps.title !== this.props.title)
            window.document.title = newProps.title;
    }

    render() {
        return null;
    }
}