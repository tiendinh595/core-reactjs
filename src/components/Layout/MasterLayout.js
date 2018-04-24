import React, {Fragment} from 'react'
import Header from 'Components/Common/Header'
import Footer from 'Components/Common/Footer'
import {observer,inject} from 'mobx-react'

@inject('commonStore', 'userStore')
@observer
export default class MasterLayout extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <Header/>
                { this.props.children }
                <Footer/>
            </Fragment>
        )
    }
}