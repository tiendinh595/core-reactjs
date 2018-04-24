import React, {Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import WindowTitle from 'Components/Layout/WindowTitle'
import MasterLayout from 'Components/Layout/MasterLayout'
import BaseComponent from 'Components/BaseComponent'
import * as ApiCaller from 'Utils/ApiCaller'
import {NotificationContainer, NotificationManager} from 'react-notifications';


@inject('userStore', 'commonStore')
@observer
export default class Login extends BaseComponent {
    constructor(props) {
        super(props);
        this.initState();
    }

    initState = () => {
        this.state = {
            is_calling_api: false,
            errors: [],
            username: '',
            password: ''
        }
    };

    onChange = (e) => {
        const {value, name} = e.target;
        this.setState({
            [name]: value,
        });
    };


    onLogin = (e) => {
        e.preventDefault();
        const {username, password} = this.state;

        this.setState({
            is_calling_api: true
        });

        ApiCaller.post('/login', {
            username,
            password,
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
                    this.props.commonStore.setToken(res.data.token);
                    this.props.userStore.setCurrentUser(res.data);
                    this.initState();
                    window.location.href = '/';
                }

            })
            .catch(err=>{
                console.log(err)
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
                <NotificationContainer />
                <WindowTitle title="Đăng nhập"/>

                <div className="nhadatban_content">
                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                <div className="box-register mt-5">
                                    <div className="info_up mt-5">
                                        <div className="dotted"/>
                                        <h4 className="info_up__h">Đăng Nhập</h4>
                                        <form onSubmit={this.onLogin}>
                                            <div className="form-group row mb-1">
                                                {/* Material input */}
                                                <label htmlFor="tendangnhap"
                                                       className="col-sm-3 col-form-label label-dangtin">Tên đăng
                                                    nhập</label>
                                                <div className="col-sm-7">
                                                    <div className="md-form mt-0">
                                                        <input type="text" id="tendangnhap"
                                                               className="form-control white border-color" name="username" onChange={this.onChange}/>
                                                    </div>
                                                    { this.showErrors(errors, 'username')}

                                                </div>
                                            </div>
                                            <div className="form-group row mb-1">
                                                {/* Material input */}
                                                <label htmlFor="matkhau"
                                                       className="col-sm-3 col-form-label label-dangtin">Mật
                                                    khẩu</label>
                                                <div className="col-sm-7">
                                                    <div className="md-form mt-0">
                                                        <input type="password" id="matkhau"
                                                               className="form-control white border-color" name="password" onChange={this.onChange}/>
                                                    </div>
                                                    { this.showErrors(errors, 'password')}
                                                </div>
                                            </div>
                                            <div className="form-group row mb-1">
                                                {/* Material input */}
                                                <label htmlFor="matkhau"
                                                       className="col-sm-3 col-form-label label-dangtin"/>
                                                <div className="col-sm-7">
                                                    <div className="md-form mt-0">
                                                        <button type="submit"
                                                                className={this.state.is_calling_api ? "btn btn-primary btn-dang waves-effect waves-light disabled" : "btn btn-primary btn-dang waves-effect waves-light"}>
                                                            <span className="icons-dang"/> Đăng nhập
                                                        </button>
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