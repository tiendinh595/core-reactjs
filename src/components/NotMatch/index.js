import React, {PureComponent, Fragment} from 'react'
import WindowTitle from 'Components/Layput/WindowTitle'


export default class NotMatch extends PureComponent {
    render() {
        return (
            <Fragment>
                <WindowTitle title="404" />
                <h1>404</h1>
            </Fragment>
        )
    }
}