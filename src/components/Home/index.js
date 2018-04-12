import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import WindowTitle from 'Components/Layput/WindowTitle'

@inject('profileStore', 'commonStore')
@observer
export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('render')
        return (
            <Fragment>
                <WindowTitle title="trang chủ" />
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <h1>Home page</h1>
                <p>
                    {this.props.profileStore.is_loading_profile ? 'loading....' : JSON.stringify(this.props.profileStore.profile)}
                </p>
            </Fragment>
        )
    }
}