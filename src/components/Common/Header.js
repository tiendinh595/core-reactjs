import React, {Fragment} from 'react'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'

@inject('commonStore', 'userStore')
@observer
export default class Header extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {userStore} = this.props;

        return (
            <section id="section-header">
                {/* Header */}
                <header>
                    <div className="menu-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-7">
                                    <ul className="menu-adddress ">
                                        <li>
                                            <a href="#">
                                                <span className="icons-add"/>
                                                <span>1703 CMT8, P.10, Q,10 TP.HCM</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="tell:+1 254-752-3993">
                                                <span className="icons-phone"/>
                                                <span className="hidemobile">+1 254-752-3993</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="mailto:luctt@gmail.com">
                                                <span className="icons-mail"/>
                                                <span className="hidemobile">luctt@gmail.com</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-12 col-md-5">
                                    <ul className="menu-login">
                                        <li>
                                            <Link to="/dang-tin-ban-nha-dat" title="Đăng bài">Đăng bài</Link>
                                        </li>
                                        <li/>
                                        {
                                            userStore.current_user === null
                                                ? <Fragment>
                                                    <li>
                                                        <Link to="/login">Đăng nhập</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/register">Đăng ký</Link>
                                                    </li>
                                                </Fragment>
                                                : <li>
                                                    <a href="#">{userStore.current_user.name}</a>
                                                </li>
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="menu-primary">
                        {/*Navbar*/}
                        <nav className="navbar navbar-expand-lg navbar-dark white-color">
                            <div className="container">
                                <div className="row w-100">
                                    <Link className="navbar-brand d-none d-md-none d-lg-block" to="/">
                                        <img src="/assets/img/logo.png"/>
                                    </Link>
                                    <button className="navbar-toggler toggle-mobile" type="button"
                                            data-toggle="collapse" data-target="#navbarSupportedContent"
                                            aria-controls="navbarSupportedContent" aria-expanded="false"
                                            aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"/>
                                    </button>
                                    <button className="navbar-toggler toggle-mobile search-mobile" type="button">
                                        <span className="fa far fa-search"/>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav ml-auto navbar-menu-primary">
                                            <li className="nav-item active">
                                                <a className="nav-link" href="#">HOME
                                                    <span className="sr-only">(current)</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">LISTINGS</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">AGENCIES</a>
                                            </li>
                                            {/* <li class="nav-item">
                                      <a class="nav-link" href="#">PAGES</a>
                                  </li> */}
                                            <li className="nav-item dropdown btn-group">
                                                <a className="nav-link dropdown-toggle waves-effect waves-light nav-ct ct1"
                                                   href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                                                   aria-haspopup="true" aria-expanded="true"> Pages</a>
                                                <ul className="dropdown-menu multi-level dropdown-menu-left sub-menu-style">
                                                    <li className="dropdown-submenu dropdown-arrow">
                                                        <a href="abc.com"
                                                           className="dropdown-toggle waves-effect waves-light">
                                                            Marketing</a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a href="#" className=" waves-effect waves-light">Small
                                                                    Business Marketing</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className=" waves-effect waves-light">
                                                                    Content Marketing</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className=" waves-effect waves-light">Xem
                                                                    tất cả</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu dropdown-arrow">
                                                        <a href="bcd.com"
                                                           className="dropdown-toggle waves-effect waves-light">
                                                            IT</a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a href="#" className=" waves-effect waves-light">
                                                                    Security</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu dropdown-arrow">
                                                        <a href="#"
                                                           className="dropdown-toggle waves-effect waves-light">
                                                            IT</a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a href="#" className=" waves-effect waves-light">
                                                                    Security</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className=" waves-effect waves-light">Clound
                                                                    Computing</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className=" waves-effect waves-light">Big
                                                                    Data</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">BLOG</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">CONTACT US</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        {/*/.Navbar*/}
                    </div>
                </header>
                {/* End - Header */}

            </section>
        )
    }
}