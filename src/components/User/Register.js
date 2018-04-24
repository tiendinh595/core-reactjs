import React, {Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import WindowTitle from 'Components/Layout/WindowTitle'
import MasterLayout from 'Components/Layout/MasterLayout'
import * as ApiCaller from 'Utils/ApiCaller'
import {withRouter} from 'react-router-dom'
import 'Styles/form.css'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Recaptcha from 'react-recaptcha'
import BaseComponent from 'Components/BaseComponent'

@inject('profileStore', 'commonStore')
@observer
@withRouter
export default class Register extends BaseComponent {
    constructor(props) {
        super(props);
        this.initState();
    }

    initState = () => {
        this.state = {
            is_calling_api: false,
            cities: [],
            districts: [],
            wards: [],
            errors: [],
            name: null,
            username: null,
            password: null,
            re_password: null,
            email: null,
            mobile: null,
            birthday: null,
            gender: 1,
            account_type: 1,
            city_id: null,
            district_id: null,
            ward_id: null,
            captcha: ''
        }
    };

    onChange = (e) => {
        const {value, name} = e.target;
        this.setState({
            [name]: value,
        });

        if (name === 'city_id') {
            ApiCaller.get(`/location/districts?city_id=${value}`)
                .then(res => {
                    if (res.code === 200) {
                        this.setState({
                            districts: res.data,
                        })
                    }
                })
        } else if (name === 'district_id') {
            ApiCaller.get(`/location/wards?district_id=${value}`)
                .then(res => {
                    if (res.code === 200) {
                        this.setState({
                            wards: res.data,
                        })
                    }
                })
        }
    };

    componentWillMount() {
        ApiCaller.get('/location/cities')
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        cities: res.data,
                    });
                }
            })
    }

    componentDidMount() {
        // let that = this;
        // $(document).ready(function () {
        //     $('.mdb-select').material_select();
        //     $(".mdb-select li").on("click", function () {
        //         let item_selected = $(this).prevAll().length;
        //         let select_element = $(this).parents('.mdb-select').find('.mdb-select');
        //         select_element = $(select_element[0]);
        //         let option_selected = $(select_element.find('option')[item_selected]);
        //         option_selected.attr('selected', 'selected');
        //         const value = option_selected.attr('value');
        //         const name = select_element.attr('name');
        //         that.setState({
        //             [name]: value
        //         });
        //
        //         if (name === 'city_id') {
        //             ApiCaller.get('/location/cities')
        //                 .then(res => {
        //                     if (res.code === 200) {
        //                         that.setState({
        //                             cities: res.data
        //                         })
        //                     }
        //                 })
        //         }
        //     });
        // })
    }

    onRegister = (e) => {
        e.preventDefault();
        const {name, username, password, re_password, email, mobile, birthday, gender, account_type, city_id, district_id, ward_id, captcha} = this.state;

        this.setState({
            is_calling_api: true
        });

        ApiCaller.post('/register', {
            name,
            username,
            password,
            re_password,
            email,
            mobile,
            birthday,
            gender,
            account_type,
            city_id,
            district_id,
            ward_id,
            captcha
        })
            .then(res => {
                this.setState({
                    is_calling_api: false
                });
                if (res.code !== 200) {
                    NotificationManager.error(res.message);
                    this.setState({
                        errors: res.errors
                    })
                } else  {
                    NotificationManager.success(res.message);
                    this.initState();
                }

            })
            .catch(err=>{
                this.setState({
                    is_calling_api: false
                });
                NotificationManager.error('Có lỗi xảy ra');

            })
    };

    render() {
        const {errors} = this.state;

        return (
            <MasterLayout>
                <NotificationContainer/>
                <WindowTitle title="Đăng ký"/>
                <div className="nhadatban_content">

                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-9">
                                <div className="box-register mt-5">
                                    <div className="info_up mt-5">
                                        <h4 className="info_up__h">Đăng ký tài khoản</h4>
                                        <form onSubmit={this.onRegister}>
                                            <div className="form-group row mb-1">
                                                {/* Material input */}
                                                <label htmlFor="tendangky"
                                                       className="col-sm-3 col-form-label label-dangtin">Tên đăng nhập (<span
                                                    className="canhbao">*</span>)</label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <input type="text" id="tendangky"
                                                               className="form-control white border-color"
                                                               name="username" onChange={this.onChange}/>
                                                    </div>
                                                    {this.showErrors(errors, 'username')}
                                                </div>
                                            </div>
                                            <div className="form-group row mb-1">
                                                {/* Material input */}
                                                <label htmlFor="email"
                                                       className="col-sm-3 col-form-label label-dangtin">Địa chỉ Email (
                                                    <span className="canhbao">*</span>)</label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <input type="email" id="email"
                                                               className="form-control white border-color" name="email"
                                                               onChange={this.onChange}/>
                                                    </div>
                                                    {this.showErrors(errors, 'email')}

                                                </div>
                                            </div>
                                            <div className="form-group row mb-1">
                                                {/* Material input */}
                                                <label htmlFor="matkhau"
                                                       className="col-sm-3 col-form-label label-dangtin">Mật khẩu (
                                                    <span className="canhbao">*</span>)</label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <input type="password" id="matkhau"
                                                               className="form-control white border-color"
                                                               name="password" onChange={this.onChange}/>
                                                    </div>
                                                    {this.showErrors(errors, 'password')}
                                                </div>
                                            </div>
                                            <div className="form-group row mb-1">
                                                {/* Material input */}
                                                <label htmlFor="rematkhau"
                                                       className="col-sm-3 col-form-label label-dangtin">Nhập lại mật
                                                    khẩu (
                                                    <span className="canhbao">*</span>)</label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <input type="password" id="rematkhau"
                                                               className="form-control white border-color"
                                                               name="re_password" onChange={this.onChange}/>
                                                    </div>
                                                    {this.showErrors(errors, 're_password')}

                                                </div>
                                            </div>
                                            <div className="form-group row mb-1">
                                                {/* Material input */}
                                                <label htmlFor="dtdd" className="col-sm-3 col-form-label label-dangtin">Điện
                                                    thoại di động (
                                                    <span className="canhbao">*</span>)</label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <input type="text" id="dtdd"
                                                               className="form-control white border-color" name="mobile"
                                                               onChange={this.onChange}/>
                                                    </div>
                                                    {this.showErrors(errors, 'mobile')}
                                                </div>
                                            </div>
                                            <div className="form-group row mb-1">
                                                {/* Material input */}
                                                <label htmlFor="fullname"
                                                       className="col-sm-3 col-form-label label-dangtin">Tên đầy đủ (
                                                    <span className="canhbao">*</span>)</label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <input type="text" id="fullname"
                                                               className="form-control white border-color" name="name"
                                                               onChange={this.onChange}/>
                                                    </div>
                                                    {this.showErrors(errors, 'name')}
                                                </div>
                                            </div>
                                            <div className="form-group row mb-1">
                                                {/* Material input */}
                                                <label htmlFor="ngaysinh"
                                                       className="col-sm-3 col-form-label label-dangtin">Ngày
                                                    sinh</label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <input type="date" id="ngaysinh"
                                                               className="form-control white border-color"
                                                               name="birthday" onChange={this.onChange}/>
                                                    </div>

                                                    {this.showErrors(errors, 'birthday')}
                                                </div>
                                                <label className="col-sm-3 col-form-label label-dangtin"></label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        {/* Default checkbox */}
                                                        <div className="form-check mr-2 mb-2 float-left p-0">
                                                            <input className="filled-in form-check-input"
                                                                   type="radio" id="checknam"
                                                                   defaultChecked="checked" name="gender" value={1} onChange={this.onChange}/>
                                                            <label className="form-check-label"
                                                                   htmlFor="checknam">Nam</label>
                                                        </div>
                                                        {/* Default checkbox */}
                                                        <div className="form-check mr-2 mb-2 float-left pl-0">
                                                            <input className="filled-in form-check-input"
                                                                   type="radio" id="checknu" name="gender" value={2} onChange={this.onChange}/>
                                                            <label className="form-check-label fillDesgin"
                                                                   htmlFor="checknu">Nữ</label>
                                                        </div>

                                                    </div>
                                                    <br/>
                                                    <div className="clear" style={{clear:'both'}}>
                                                    {this.showErrors(errors, 'gender')}
                                                    </div>

                                                </div>
                                                <label className="col-sm-3 col-form-label label-dangtin"></label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <div className="form-check mr-2 mb-2 float-left p-0 ">
                                                            <input className="filled-in  form-check-input"
                                                                   type="radio" id="checkcanhan"
                                                                   defaultChecked="checked" name="account_type" value={1} onChange={this.onChange}/>
                                                            <label className="form-check-label fillDesgin"
                                                                   htmlFor="checkcanhan">Cá Nhân</label>
                                                        </div>
                                                        {/* Default checkbox */}
                                                        <div className="form-check mr-2 mb-2 float-left pl-0">
                                                            <input className="filled-in form-check-input"
                                                                   type="radio" id="checkcty" name="account_type" value={2} onChange={this.onChange}/>
                                                            <label className="form-check-label" htmlFor="checkcty">Công
                                                                Ty</label>
                                                        </div>
                                                    </div>

                                                    <div className="clearfix" style={{clear:'both'}}>
                                                        {this.showErrors(errors, 'account_type')}
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="form-group row mb-1 mt-3">
                                                {/* Material input */}
                                                <label htmlFor="tinhthanh"
                                                       className="col-sm-3 col-form-label label-dangtin">Tỉnh /
                                                    Thành </label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <div className="select_wrapper">

                                                            <select
                                                                className="browser-default mb-3 w-100 select-search select_box"
                                                                name="city_id" onChange={this.onChange}>

                                                                <option value={0}>Tỉnh / Thành</option>
                                                                {
                                                                    this.state.cities.map((city) => <option
                                                                        value={city.id}
                                                                        key={city.id}>{city.name}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {this.showErrors(errors, 'city_id')}

                                                </div>
                                            </div>
                                            <div className="form-group row mb-1 mt-3">
                                                {/* Material input */}
                                                <label htmlFor="quanhuyen"
                                                       className="col-sm-3 col-form-label label-dangtin">Quận /
                                                    Huyện </label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <div className="select_wrapper">

                                                            <select
                                                                className="browser-default mb-3 w-100 select-search select_box"
                                                                name="district_id" onChange={this.onChange}
                                                                defaultValue={0}>
                                                                <option value={0}>Huyện / Quận</option>

                                                                {
                                                                    this.state.districts.map((district) => <option
                                                                        value={district.id}
                                                                        key={district.id}>{district.name}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {this.showErrors(errors, 'district_id')}

                                                </div>
                                            </div>
                                            <div className="form-group row mb-1 mt-3">
                                                {/* Material input */}
                                                <label htmlFor="phuongxa"
                                                       className="col-sm-3 col-form-label label-dangtin">Phường /
                                                    Xã </label>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <div className="select_wrapper">
                                                            <select
                                                                className="browser-default mb-3 w-100 select-search select_box"
                                                                name="ward_id" onChange={this.onChange}
                                                                defaultValue={0}>
                                                                <option value="0">Xã / Phường</option>
                                                                {
                                                                    this.state.wards.map((ward) => <option
                                                                        value={ward.id}
                                                                        key={ward.id}>{ward.name}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {this.showErrors(errors, 'ward_id')}

                                                </div>
                                            </div>
                                            <div className="form-group row mb-1 mt-3">
                                                {/* Material input */}
                                                <label htmlFor="phuongxa"
                                                       className="col-sm-3 col-form-label label-dangtin">Mã bảo
                                                    vệ </label>
                                                <div className="col-sm-9">
                                                    <div className="form-group row">
                                                        {/* Material input */}
                                                        <div className="col-sm-9">
                                                            <div className="md-form mt-0">
                                                                <Recaptcha
                                                                    sitekey="6LfJL1QUAAAAABBEzplHUGtJw8qp01lTqNmfoL80"
                                                                    ref={e=>console.log(e)}
                                                                    verifyCallback={res=>this.setState({"captcha": res})}
                                                                />
                                                                {this.showErrors(errors, 'captcha')}


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row mt-2">
                                                {/* Material input */}
                                                <label htmlFor="dangky"
                                                       className="col-sm-3 col-form-label label-dangtin"/>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0">
                                                        <button type="submit"
                                                                className={this.state.is_calling_api ? "btn btn-primary btn-dang waves-effect waves-light btn-block disabled" : "btn btn-primary btn-dang waves-effect waves-light btn-block"}>
                                                            <span className="icons-dang"/> Đăng ký
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row mt-3">
                                                {/* Material input */}
                                                <label htmlFor="dangky"
                                                       className="col-sm-3 col-form-label label-dangtin"/>
                                                <div className="col-sm-9">
                                                    <div className="md-form mt-0 text-left fs13">
                                                        <strong> Chú ý: thông tin Tên đăng nhập, email, số điện thoại di
                                                            động không thể thay đổi sau khi đăng ký.</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                            </div>
                        </div>
                    </div>
                </div>


            </MasterLayout>
        )
    }
}