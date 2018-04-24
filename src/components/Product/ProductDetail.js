import React from 'react'
import BaseComponent from 'Components/BaseComponent'
import WindowTitle from 'Components/Layout/WindowTitle'
import MasterLayout from 'Components/Layout/MasterLayout'
import * as ApiCaller from 'Utils/ApiCaller'
import {Redirect} from 'react-router-dom'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import LoadingSpinner from 'Components/Common/LoadingSpinner'
import ProductItem from 'Components/Product/ProductItem'
import {NotificationContainer, NotificationManager} from 'react-notifications';


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    return <GoogleMap
        defaultZoom={15}
        defaultCenter={{lat: props.lat, lng: props.lng}}
    >
        {props.isMarkerShown && <Marker position={{lat: props.lat, lng: props.lng}}/>}
    </GoogleMap>
}));

export default class ProductDetail extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            product_relates: [],
            is_loading: true,

            mail_contact: {
                email: '',
                content: '',
                name: ''
            }
        }
    }

    loadData = async (id) => {

        await ApiCaller.get(`/products/${id}`)
            .then(res => {
                if (res.code === 200)
                    this.setState({
                        is_loading: false,
                        product: res.data
                    });
            });

        await ApiCaller.get(`/products/${id}/relate`)
            .then(res => {
                if (res.code === 200)
                    this.setState({
                        product_relates: res.data
                    });
            });
    };

    onChangeFormMail = (e)=>{
        const {name, value} = e.target;
        this.setState({
            mail_contact: {
                ...this.state.mail_contact,
                [name]: value
            }
        })
    };


    onSendMailContact = (e) => {
        e.preventDefault();
        ApiCaller.post('/mail', this.state.mail_contact)
            .then(res=>{
                if(res.code === 200) {
                    NotificationManager.success(res.message)
                    this.setState({
                        mail_contact: {
                            email: '',
                            content: '',
                            name: ''
                        }
                    })
                } else {
                    NotificationManager.error(res.message)
                }
            })
    };

    componentWillMount() {
        const {id} = this.props.match.params;
        this.loadData(id);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.match.params.id !== newProps.match.params.id)
            this.loadData(newProps.match.params.id)
    }

    renderSlider = (product) => {
        if (product.images.length === 0)
            return null;

        return (
            <div id="carousel-thumb"
                 className="carousel slide carousel-fade carousel-thumbnails mt-3 mb-3 carosel_detail"
                 data-ride="carousel">
                {/*Slides*/}
                <div className="carousel-inner" role="listbox">
                    {
                        product.images.map((image, index) => {
                            return (
                                <div className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                    <img className="d-block w-100" src={image.full_url} alt="First slide"/>
                                </div>
                            )
                        })
                    }


                </div>
                {/*/.Slides*/}
                {/*Controls*/}
                <a className="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="sr-only">Next</span>
                </a>
                {/*/.Controls*/}
                <ol className="carousel-indicators">
                    {
                        product.images.map((image, index) => {
                            return (
                                <li data-target="#carousel-thumb" data-slide-to={index}
                                    className={index == 0 ? "active" : ''}>
                                    <img className="d-block w-100" src={image.full_url}/>
                                </li>
                            )
                        })
                    }

                </ol>
            </div>
        )
    };

    render() {
        const {is_loading, product, product_relates} = this.state;

        if (is_loading === true) {
            return <LoadingSpinner/>
        }

        if (is_loading === false && Object.keys(product).length === 0)
            return <Redirect to="/404"/>;


        return (
            <MasterLayout>
                <NotificationContainer />
                <WindowTitle title={product.title ? product.title : 'loading...'}/>
                <div className="nhadatban_content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="info_up mt-5">
                                    {/* info nha */}
                                    <div className="info_nha">
                                        <div className="info_nha__card">
                                            <div className="info_nha__left">
                                                <a>
                                                    <span className="icons-squa"/>{product.area}
                                                </a>
                                                <a>
                                                    <span className="icons-nem"/>{product.room_number}
                                                </a>
                                            </div>
                                            <div className="info_nha__right">
                                                <a>  {product.price_to} </a>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        this.renderSlider(product)
                                    }
                                    <div className="content_detail">
                                        <h2>{product.title}</h2>
                                        <p>
                                            {
                                                product.description
                                            }
                                        </p>
                                        <h2>Đặc điểm bất động sản</h2>
                                        <ul className="row list-dacdiembds">
                                            <li className="col-12 col-sm-6">
                                                <a href="#"><span className="icons-tick"/>Loại tin
                                                    rao: {product.product_type_master.name}
                                                    > {product.product_type_child.name}</a>
                                            </li>
                                            <li className="col-12 col-sm-6">
                                                <a href="#"><span className="icons-tick"/>Địa
                                                    chỉ {product.address}, {product.ward.name}, {product.district.name}, {product.city.name}
                                                </a>
                                            </li>
                                            <li className="col-12 col-sm-6">
                                                <a href="#"><span className="icons-tick"/>Mặt
                                                    tiền {product.frontage_area} (m)</a>
                                            </li>
                                            <li className="col-12 col-sm-6">
                                                <a href="#"><span className="icons-tick"/>Đường vào {product.land_with}
                                                    (m)</a>
                                            </li>
                                        </ul>
                                        <h2>Bản đồ</h2>
                                        <MyMapComponent
                                            isMarkerShown
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA-i9ZySsOQ3WZdzkMEj8daMzHp2WTdHNI"
                                            loadingElement={<div style={{height: `100%`}}/>}
                                            containerElement={<div style={{height: `400px`}}/>}
                                            mapElement={<div style={{height: `100%`}}/>}
                                            lat={product.lat}
                                            lng={product.lng}
                                        />
                                        <div className="tinlienquan">
                                            <h3>
                                                Tin liên quan
                                            </h3>
                                        </div>
                                        <div className="row  mt-5">
                                            {
                                                product_relates.map(product => <ProductItem key={product.id}
                                                                                            className="col-md-6"
                                                                                            product={product}/>)
                                            }
                                        </div>
                                    </div>
                                    {/* item carosel */}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h4 className="info_up__h search">{product.user.name} </h4>
                                <div className="info_user">
                                    <div className="info_user__img">
                                        <img src={product.user.avatar}/>
                                    </div>
                                    <div className="info_user__text">
                                        <h6>{product.user.username}</h6>
                                        <p>{product.contact_name}</p>
                                    </div>
                                    <div className="info_user__contact">
                                        <ul>
                                            <li>
                                                <a href={`call:${product.contact_phone}`}><span
                                                    className="icons-call"/>{product.contact_phone}</a>
                                            </li>
                                            <li>
                                                <a href="mailto:info@failte.com">
                                                    <span className="icons-email"/>{product.user.email}
                                                </a>
                                            </li>
                                            <li className="last-child">
                                                <a href={3} className="icons-tt2"/>
                                                <a href={3} className="icons-ga"/>
                                                <a href={3} className="icons-v"/>
                                                <a href={3} className="icons-face"/>
                                            </li>
                                        </ul>
                                        <a href="#" title="View Profile" className="btn btn-block btn-view-profile">
                                            <span className="icons-user"/> view profile
                                        </a>
                                    </div>
                                </div>
                                <h4 className="info_up__h search">Contact {product.user.name} </h4>
                                <form>
                                    <div className="md-form mt-1">
                                        <input type="text" id="diachi" className="form-control white border-color"
                                               placeholder="Nhập tên của bạn" name="name" required onChange={this.onChangeFormMail} value={this.state.mail_contact.name}/>
                                    </div>
                                    <div className="md-form mt-1">
                                        <input type="text" id="diachi" className="form-control white border-color"
                                               placeholder="Nhập email của bạn"  name="email" required onChange={this.onChangeFormMail} value={this.state.mail_contact.email}/>
                                    </div>
                                    <div className="md-form mt-1">
                                        <input type="text" id="diachi" className="form-control white border-color"
                                               placeholder="Nhập nội dung"  name="content" required onChange={this.onChangeFormMail} value={this.state.mail_contact.content}/>
                                    </div>
                                    <div className="md-form mt-3">
                                        <button type="submit"
                                                className="btn btn-primary btn-dang btn-block waves-effect waves-light"
                                                onClick={this.onSendMailContact}>
                                            <span className="icons-dang"/> Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </MasterLayout>
        )
    }

}