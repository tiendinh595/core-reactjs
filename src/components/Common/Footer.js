import React, {Fragment} from 'react'

export default class Footer extends React.Component{
    render() {
        return (
            <Fragment>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3 mb-3">
                                <a href="#">
                                    <img src="/assets/img/logo2.png"  className="img-fluid" />
                                </a>
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <ul className="menu-adddress  menu-footer">
                                    <li>
                                        <h3>Our Adress:</h3>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icons-add" />
                                            <span>1703 CMT8, P.10, Q,10 TP.HCM</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <ul className="menu-adddress menu-footer">
                                    <li>
                                        <h3>Phone:</h3>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icons-phone" />
                                            <span>+1 254-752-3993</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <ul className="menu-adddress  menu-footer">
                                    <li>
                                        <h3>Email:</h3>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icons-mail" />
                                            <span>luctt@gmail.com</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="author">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <p> Designed by
                                    <span className="icons-traicau" /> PhuongMinh</p>
                            </div>
                            <div className="col-6">
                                <p className="text-right">2017 © All Right Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}