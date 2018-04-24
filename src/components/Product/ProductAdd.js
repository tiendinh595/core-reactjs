import React from 'react'
import BaseComponent from 'Components/BaseComponent'
import WindowTitle from 'Components/Layout/WindowTitle'
import MasterLayout from 'Components/Layout/MasterLayout'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Recaptcha from 'react-recaptcha'
import * as ApiCaller from 'Utils/ApiCaller'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {inject} from 'mobx-react'
import 'Styles/upload.css'

class UploadItem extends React.Component {
    state = {is_deleted: false};

    constructor(props) {
        super(props)
    }

    onDelete = () => {
        const {id} = this.props.image;
        ApiCaller.remove(`/files/${id}`)
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        is_deleted: true
                    });
                    NotificationManager.success('xóa file thành công');
                    this.props.onDelete(id)
                }
                else
                    NotificationManager.errr(res.message)
            })
            .catch(err=>NotificationManager.errr('Có lỗi xảy ra'))
    };

    render() {
        const {image} = this.props;

        if (this.state.is_deleted)
            return null;

        return (
            <div className="upload-item">
                <NotificationContainer/>
                <img src={image.full_url} className="img-thumbnail"/>
                <i className="fa fa-trash" onClick={this.onDelete}/>
            </div>
        )
    }
}

class ListImageUpload extends React.PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const {images} = this.props;

        return (
            <div className="upload_wrap">
                {
                    images.map(image => <UploadItem key={image.id} image={image} onDelete={this.props.onDelete}/>)
                }
            </div>
        )
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    return <GoogleMap
        defaultZoom={15}
        defaultCenter={{lat: props.lat, lng: props.lng}}
    >
        <Marker
            position={{lat: props.lat, lng: props.lng}}
            draggable={true}
            onDragEnd={props.onChangeLocation}
        />
    </GoogleMap>
}));

@inject('userStore')
export default class ProductAdd extends BaseComponent {

    constructor(props) {
        super(props);
        this.initState();
    }

    initState = () => {
        this.state = {
            is_calling_api: false,
            default_lat: 10.792876,
            default_lng: 106.679957,
            cities: [],
            districts: [],
            wards: [],
            product_types: [],
            list_images: [],
            progress_upload: {},
            errors: [],
            city_id: null,
            district_id: null,
            ward_id: null,
            product_type_master_id: null,
            product_type_child_id: null,
            price_from: null,
            price_to: null,
            area: null,
            title: null,
            description: null,
            images: [],
            frontage_area: null,
            land_with: null,
            home_direction: null,
            balcony_direction: null,
            floor_number: null,
            room_number: null,
            toilet_number: null,
            interior: null,
            location: null,
            contact_name: null,
            contact_phone: null,
            contact_address: null,
            captcha: '',

        }
    };

    onChangeLocation = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        this.setState({
            location: `${lat},${lng}`,
            default_lat: lat,
            default_lng: lng
        })
    };

    onUploadFile = (e) => {
        const file = e.target.files[0];
        ApiCaller.post('/files/', {file}, (progressEvent)=>{
            let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            this.setState({
                progress_upload: {
                    ...this.state.progress_upload,
                    [file.name]: percentCompleted
                }
            })
        }).then(res=>{
            let progress_upload = this.state.progress_upload;
            delete progress_upload[file.name];
            this.setState({
                progress_upload: progress_upload
            });
            if(res.code === 200) {
                this.setState({
                    list_images: this.state.list_images.concat(res.data),
                    images: this.state.images.concat(res.data.id)
                })
            } else {
                NotificationManager.error(res.message)
            }
        })
    };

    onDeleteImage = (file_id)=>{
        this.setState({
            images: this.state.images.filter((item)=>item !== file_id)
        })
    };

    onChange = (e) => {
        const {value, name} = e.target;
        this.setState({
            [name]: value,
        });


        switch (name) {
            case 'city_id' :
                ApiCaller.get(`/location/districts?city_id=${value}`)
                    .then(res => {
                        if (res.code === 200) {
                            this.setState({
                                districts: res.data,
                            })
                        }
                    });
                break;
            case 'district_id':
                ApiCaller.get(`/location/wards?district_id=${value}`)
                    .then(res => {
                        if (res.code === 200) {
                            this.setState({
                                wards: res.data,
                            })
                        }
                    });
                break;
            case 'product_type_child_id':
                const master_id = e.target.options[e.target.selectedIndex].getAttribute('master');
                this.setState({
                    product_type_master_id: master_id
                });
                break;
            case 'price_from':
                this.setState({
                    price_to: value
                });
                break;
        }
    };

    onAddProduct = (e) =>{
        e.preventDefault();
        let {
            city_id,
            district_id,
            ward_id,
            product_type_master_id,
            product_type_child_id,
            price_from,
            price_to,
            area,
            title,
            description,
            images,
            frontage_area,
            land_with,
            home_direction,
            balcony_direction,
            floor_number,
            room_number,
            toilet_number,
            interior,
            location,
            contact_name,
            contact_phone,
            contact_address,
            captcha,
        } = this.state;

        ApiCaller.post('/products/', {
            city_id,
            district_id,
            ward_id,
            product_type_master_id,
            product_type_child_id,
            price_from,
            price_to,
            area,
            title,
            description,
            images,
            frontage_area,
            land_with,
            home_direction,
            balcony_direction,
            floor_number,
            room_number,
            toilet_number,
            interior,
            location,
            contact_name,
            contact_phone,
            contact_address,
            captcha,
        })
            .then(res=>{

            })
            .catch(err=>{
                NotificationManager.error('Có lỗi xảy ra')
            })
    };

    componentWillMount() {
        ApiCaller.get('/location/cities')
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        cities: res.data,
                    });
                }
            });

        ApiCaller.get('/product-types/')
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        product_types: res.data,
                    });
                }
            });
    }


    renderProgressUpload = () =>{
        let result = [];
        for(let item in this.state.progress_upload) {
            result.push(<div className="progress primary-color-dark" key={item}>
                    <div className="indeterminate" />
                </div>);
        }
        return result;
    };

    render() {
        const {errors} = this.state;

        return (
            <MasterLayout>
                <NotificationContainer/>
                <WindowTitle title="Đăng tin rao bán , cho thuê nhà đất"/>
                <div className="nhadatban_content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="info_up mt-5">
                                    <h2>Đăng tin rao bán , cho thuê nhà đất </h2>
                                    <p className="info_up__p">
                                        <strong> (Quý vị nhập thông tin nhà đất cần bán hoặc cho thuê vào các mục dưới
                                            đây)</strong>
                                    </p>
                                    <form>
                                        <div className="dotted"/>
                                        <h4 className="info_up__h">Thông tin cơ bản</h4>
                                        {/* Horizontal material form */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="tinh_thanh"
                                                   className="col-sm-3 col-form-label label-dangtin">Tỉnh/Thành (<span
                                                className="canhbao">*</span>)</label>
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
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="quan_huyen"
                                                   className="col-sm-3 col-form-label label-dangtin">Quận/Huyện (<span
                                                className="canhbao">*</span>)</label>
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
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="phuong_xa"
                                                   className="col-sm-3 col-form-label label-dangtin"> Phường/Xã (<span
                                                className="canhbao">*</span>)</label>
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
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="diachi" className="col-sm-3 col-form-label label-dangtin">
                                                Địa chỉ</label>
                                            <div className="col-sm-9">
                                                <div className="md-form mt-0">
                                                    <input type="text" id="diachi"
                                                           className="form-control white border-color" name="address"
                                                           onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="loai_bds" className="col-sm-3 col-form-label label-dangtin">Loại
                                                bất động sản (<span className="canhbao">*</span>)</label>
                                            <div className="col-sm-9">
                                                <div className="md-form mt-0">
                                                    <div className="select_wrapper">
                                                        <select
                                                            className="browser-default mb-3 w-100 select-search select_box"
                                                            name="product_type_child_id" onChange={this.onChange}
                                                            defaultValue={0}>
                                                            <option value="0">Chọn loại</option>
                                                            {
                                                                this.state.product_types.map((type) => {
                                                                    let result = [];
                                                                    result.push(<option
                                                                        value={type.id}
                                                                        key={type.id}
                                                                        disabled={true}>{type.name}</option>);
                                                                    type.childs.map(child => {
                                                                        result.push(<option value={child.id}
                                                                                            key={child.id}
                                                                                            master={type.id}>
                                                                            -- {child.name}</option>)
                                                                    });

                                                                    return result;
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                {this.showErrors(errors, 'ward_id')}

                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="gia"
                                                   className="col-sm-3 col-form-label label-dangtin">Giá(<span
                                                className="canhbao">*</span>)</label>
                                            <div className="col-sm-3">
                                                <div className="md-form mt-0">
                                                    <input type="text" id="gia"
                                                           className="form-control white border-color" placeholder="Giá"
                                                           name="price_from" onChange={this.onChange}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="md-form mt-0">
                                                    <input type="text" id="dientich"
                                                           className="form-control white border-color"
                                                           placeholder="Diện tích m2" name="area"
                                                           onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="input-char-counter"
                                                   className="col-sm-3 col-form-label label-dangtin">Tiêu đề( <span
                                                className="canhbao">*</span> )</label>
                                            <div className="col-sm-9">
                                                <div className="md-form mt-0">
                                                    <input id="input-char-counter" type="text" length={70}
                                                           className="form-control white  border-color" name="title"
                                                           onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="noi_dung" className="col-sm-3 col-form-label label-dangtin">Nội
                                                dung(<span className="canhbao">*</span>)</label>
                                            <div className="col-sm-9">
                                                <div className="md-form mt-0">
                                                    <textarea id="textarea-char-counter "
                                                              className="form-control white border-dt area-dangtin"
                                                              length={2000} rows={5}
                                                              placeholder="Bổ sung đầy đủ thông tin cửa hàng (địa chỉ, diện tích, giá cả), tham khảo gợi ý góc phải phía dưới khung điền. Vui lòng nhậ Tiếng Việt có dấu."
                                                              defaultValue={""} name="description"
                                                              onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="tieu_de" className="col-sm-3 col-form-label label-dangtin ">Đăng
                                                hình ảnh(*)</label>
                                            <div className="col-sm-9">
                                                <div className="md-form mt-0 bg_danganh">
                                                    <p>ĐĂNG ẢNH THẬT ĐỂ ĐƯỢC HIỆU QUẢ NHẤT!</p>
                                                    <div className="file-field">
                                                        <div className="icons-camera">
                                                            <input type="file" onChange={this.onUploadFile}/>
                                                        </div>
                                                    </div>
                                                    <p>
                                                        Click vào dấu cộng ở trên để up hình, bạn có thể up tối đa 30
                                                        hình, mỗi hình tối đa 6MB
                                                    </p>
                                                </div>
                                                {
                                                    this.renderProgressUpload()
                                                }
                                                <ListImageUpload images={this.state.list_images} onDelete={this.onDeleteImage}/>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        <div className="dotted"/>
                                        <h4 className="info_up__h">Thông tin khác</h4>
                                        <p>Quý vị nên điền đầy đủ thông tin vào các mục dưới đây để tin đăng có hiệu quả
                                            hơn</p>
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="gia" className="col-sm-3 col-form-label label-dangtin">Mặt
                                                tiền(m)</label>
                                            <div className="col-sm-3">
                                                <div className="md-form mt-0">
                                                    <input type="text" id="gia"
                                                           className="form-control white border-color"
                                                           placeholder="mặt tiền" name="frontage_area"
                                                           onChange={this.onChange}/>
                                                </div>
                                            </div>
                                            <label htmlFor="gia" className="col-sm-2 col-form-label label-dangtin">Đường
                                                vào(m)</label>
                                            <div className="col-sm-4">
                                                <div className="md-form mt-0">
                                                    <input type="text" id="gia"
                                                           className="form-control white border-color"
                                                           placeholder="đường vào" name="land_with"
                                                           onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="gia" className="col-sm-3 col-form-label label-dangtin">Hướng
                                                nhà</label>
                                            <div className="col-sm-3">
                                                <div className="md-form mt-0">
                                                    <div className="select_wrapper">
                                                        <select
                                                            className="browser-default mb-3 w-100 select-search select_box"
                                                            name="home_direction" onChange={this.onChange}
                                                            defaultValue={0}>
                                                            <option value="0">Không xác định</option>
                                                            <option value="1">Đông</option>
                                                            <option value="2">Tây</option>
                                                            <option value="3">Nam</option>
                                                            <option value="4">Bắc</option>
                                                            <option value="5">Tây Bắc</option>
                                                            <option value="6">Đông Bắc</option>
                                                            <option value="7">Tây Nam</option>
                                                            <option value="8">Đông nam</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {this.showErrors(errors, 'home_direction')}
                                            </div>
                                            <label htmlFor="gia" className="col-sm-2 col-form-label label-dangtin">Hướng
                                                ban công</label>
                                            <div className="col-sm-4">
                                                <div className="md-form mt-0">
                                                    <div className="select_wrapper">
                                                        <select
                                                            className="browser-default mb-3 w-100 select-search select_box"
                                                            name="balcony_direction" onChange={this.onChange}
                                                            defaultValue={0}>
                                                            <option value="0">Không xác định</option>
                                                            <option value="1">Đông</option>
                                                            <option value="2">Tây</option>
                                                            <option value="3">Nam</option>
                                                            <option value="4">Bắc</option>
                                                            <option value="5">Tây Bắc</option>
                                                            <option value="6">Đông Bắc</option>
                                                            <option value="7">Tây Nam</option>
                                                            <option value="8">Đông nam</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {this.showErrors(errors, 'balcony_direction')}
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="gia" className="col-sm-3 col-form-label label-dangtin">Số
                                                tầng</label>
                                            <div className="col-sm-3">
                                                <div className="md-form mt-0">
                                                    <input type="number" id="gia"
                                                           className="form-control white border-color"
                                                           name="floor_number" onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="sophongngu"
                                                   className="col-sm-3 col-form-label label-dangtin">Số phòng
                                                ngủ</label>
                                            <div className="col-sm-3">
                                                <div className="md-form mt-0">
                                                    <input type="number" id="sophongngu"
                                                           className="form-control white border-color"
                                                           name="room_number" onChange={this.onChange}/>
                                                </div>
                                            </div>
                                            <label htmlFor="sotolet" className="col-sm-2 col-form-label label-dangtin">Số
                                                tolet</label>
                                            <div className="col-sm-4">
                                                <div className="md-form mt-0">
                                                    <input type="number" id="sotolet"
                                                           className="form-control white border-color"
                                                           name="toilet_number" onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="noithat" className="col-sm-3 col-form-label label-dangtin">Nội
                                                thất</label>
                                            <div className="col-sm-9">
                                                <div className="md-form mt-0">
                                                    <textarea id="textarea-char-counter "
                                                              className="form-control white border-dt area-dangtin"
                                                              length={2000} rows={5}
                                                              placeholder="Bổ sung đầy đủ thông tin cửa hàng (địa chỉ, diện tích, giá cả), tham khảo gợi ý góc phải phía dưới khung điền. Vui lòng nhậ Tiếng Việt có dấu."
                                                              defaultValue={""} name="interior"
                                                              onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        <div className="dotted"/>
                                        <h4 className="info_up__h">bản đồ</h4>
                                        <p className="text-bando">
                                            Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí
                                            tin rao của bạn trên bản đồ bằng cách kéo icon <span
                                            className="icons-mark"/>
                                            tới đúng vị trí của tin rao.
                                        </p>
                                        <MyMapComponent
                                            isMarkerShown
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA-i9ZySsOQ3WZdzkMEj8daMzHp2WTdHNI"
                                            loadingElement={<div style={{height: `100%`}}/>}
                                            containerElement={<div style={{height: `400px`}}/>}
                                            mapElement={<div style={{height: `100%`}}/>}
                                            lat={this.state.default_lat}
                                            lng={this.state.default_lng}
                                            onChangeLocation={this.onChangeLocation}
                                        />
                                        <p className="text-bando">
                                            Có thể dữ liệu bản đồ không chính xác. Vì vậy nếu có bất kỳ sai xót nào xin
                                            bạn hãy báo cho chúng tôi để khắc phục kịp thời.
                                        </p>
                                        {/* Grid row */}
                                        <div className="dotted"/>
                                        <h4 className="info_up__h">thông tin liên hệ</h4>
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="gia" className="col-sm-3 col-form-label label-dangtin">Người
                                                liên hệ (<span className="canhbao">*</span>)</label>
                                            <div className="col-sm-9">
                                                <div className="md-form mt-0">
                                                    <input type="text" id="gia"
                                                           className="form-control white border-color"
                                                           defaultValue={this.props.userStore.current_user.name || ''}
                                                           name="contact_name" onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="sodidong" className="col-sm-3 col-form-label label-dangtin">Số
                                                di động</label>
                                            <div className="col-sm-3">
                                                <div className="md-form mt-0">
                                                    <input type="text" id="sodidong"
                                                           className="form-control white border-color"
                                                           defaultValue={this.props.userStore.current_user.mobile || ''}
                                                           name="contact_phone" onChange={this.onChange}/>
                                                </div>
                                            </div>
                                            <div className="form-check mt-2">
                                                <input className="form-check-input filled-in" type="checkbox"
                                                       defaultValue id="filledInCheckbox1" name="balcony_direction"
                                                       onChange={this.onChange}/>
                                                <label className="form-check-label fs13" htmlFor="filledInCheckbox1">
                                                    Hiển thị số điện thoại
                                                </label>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="gia" className="col-sm-3 col-form-label label-dangtin ">Địa
                                                chỉ (
                                                <span className="canhbao">*</span>)</label>
                                            <div className="col-sm-9">
                                                <div className="md-form mt-0">
                                                    <input type="text" id="gia"
                                                           className="form-control white border-color"
                                                           defaultValue={this.props.userStore.current_user.address || ''}
                                                           name="contact_address" onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="gia" className="col-sm-3 col-form-label label-dangtin "/>
                                            <div className="col-sm-9">
                                                <div className="md-form mt-0">
                                                    <Recaptcha
                                                        sitekey="6LfJL1QUAAAAABBEzplHUGtJw8qp01lTqNmfoL80"
                                                        verifyCallback={res => this.setState({"captcha": res})}
                                                    />
                                                    {this.showErrors(errors, 'captcha')}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        <div className="form-group row">
                                            {/* Material input */}
                                            <label htmlFor="gia" className="col-sm-3 col-form-label label-dangtin "/>
                                            <div className="col-sm-9">
                                                <div className="md-form mt-0">
                                                    <button type="submit"
                                                            className={this.state.is_calling_api ? "btn btn-primary btn-dang disabled" : "btn btn-primary btn-dang"} onClick={this.onAddProduct}>
                                                        <span className="icons-dang"/> Đăng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Grid row */}
                                        {/* Lưu ý */}
                                        <p className="text-luy"><strong>Lưu ý :</strong></p>
                                        <p className="fs13 text-left des-luy">
                                            Quý khách đang sử dụng tính năng đăng tin nhanh của MUADAY.vn. Tính năng này
                                            giúp Quý khách có thể đăng tin ngay mà không
                                            cần phải đăng ký hay đăng nhập như tại nhiều website khác. Tuy nhiên, để có
                                            thể quản lý được tin đăng của mình thuận lợi
                                            hơn thì Quý khách nên đăng ký và đăng nhập. Việc này cũng giúp Quý khách có
                                            thể đăng được nhiều tin hơn so với giới hạn tối
                                            đa 3 tin rao vặt nhà đất khi Quý khách không đăng nhập. Nếu gặp bất kỳ khó
                                            khăn gì trong việc đăng ký, đăng nhập, đăng tin
                                            hay trong việc sử dụng website nói chung, Quý vị hãy liên hệ ngay với tổng
                                            đài CSKH của chúng tôi: 1900 1881 hoặc email:
                                            hotro@batdongsan.com.vn để được trợ giúp
                                        </p>
                                        {/* End lưu ý */}
                                    </form>
                                    {/* Horizontal material form */}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h4 className="info_up__h search">Search </h4>
                                <form>
                                    <div className="input-group md-form form-sm form-2 pl-0">
                                        <input className="form-control my-0 py-1 border-color white" type="text"
                                               placeholder="Enter your text" aria-label="Search"/>
                                        <div className="input-group-append">
              <span className="input-group-text red" id="basic-text1">
                <i className="fa fa-search white_serch" aria-hidden="true"/>
              </span>
                                        </div>
                                    </div>
                                </form>
                                <div className="card mt-3">
                                    <div className="card-header card-hddangtin">Hướng dẫn đăng tin</div>
                                    <div className="card-body">
                                        <ul className="list-dangtin">
                                            <li>
                                                <span>*</span> Thông tin có dấu (*) là bắt buộc.
                                            </li>
                                            <li>
                                                <span>*</span> Thông tin có dấu (*) là bắt buộc.
                                            </li>
                                            <li>
                                                <span>*</span> Không đăng lại tin đã đăng trên www.batdongsan.com.vn.
                                            </li>
                                            <li>
                                                <span>*</span> Nên sử dụng trình duyệt FireFox 3.0, IE7 trở lên hoặc
                                                Google Chrome để việc đăng tin và truy cập website được thuận lợi.
                                            </li>
                                            <li>
                                                <span>*</span> Để quá trình đăng tin và duyệt nhanh hơn, xin lưu ý: gõ
                                                tiếng việt có dấu và không viết tắt...
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <h5 className="dangtin_h5">Bạn có biết nơi rao vặt nhà đất hiệu quả nhất?</h5>
                                <p className="dangtin_dec">
                                    Với hơn 100 000 lượt truy cập mỗi ngày, MUADAY.vn đã đạt mức tăng trưởng 300% chỉ
                                    trong 9 tháng đầu năm 2011 và tiếp tục
                                    khẳng định vị thế là nơi rao vặt nhà đất, quảng cáo nhà đất hiệu quả nhất hiện nay.
                                    Rao vặt nhà đất trên Batdongsan.com.vn
                                    là phương án tối ưu nhất cho nhu cầu bán, cho thuê nhà đất của Quý vị.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </MasterLayout>
        )
    }

}