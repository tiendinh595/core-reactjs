import React, {PureComponent, Fragment} from 'react'
import WindowTitle from 'Components/Layout/WindowTitle'
import {Link} from 'react-router-dom'


export default class NotMatch extends PureComponent {
    render() {
        return (
            <Fragment>
                <WindowTitle title="404"/>
                <div className="page404" style={{position:'absolute', top: 0, left: 0}}>
                    <div className="text404">
                        <img src="/assets/img/404.png" alt="" className="img-fluid"/>
                        <p className="mt-2 mb-2">
                            Trang tìm kiếm không tồn tại !
                        </p>
                        <p>
                            <Link to="/" className="icons-gohome"></Link>
                        </p>
                    </div>
                </div>
            </Fragment>
        )
    }
}