import React, {Fragment} from 'react'
import {observer, inject} from 'mobx-react'
import * as ApiCaller from 'Utils/ApiCaller'


@inject('commonStore', 'userStore')
@observer
export default class FormSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            product_types: [],
            cities: [],
            districts: [],
            product_type: null,
            city_id: null,
            district_id: null,
            area: null,
            price: null,
        }
    }

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
        }
    };

    componentWillMount() {
        ApiCaller.get('/location/cities').then(res => {
                if (res.code === 200) {
                    this.setState({
                        cities: res.data,
                    });
                }
            });

        ApiCaller.get('/product-types/').then(res => {
                if (res.code === 200) {
                    this.setState({
                        product_types: res.data,
                    });
                }
            });
    }

    onSearch = ()=>{
        ApiCaller.get()
    };



    render() {
        const {
            cities,
            product_types,
            districts,
        } = this.state;

        return (
            <div className="search-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Sidebar navigation */}
                            <div className="row list-chitiet">
                                <div className="col-12 col-md-6 col-lg-2 mt-3">
                                    <select className="browser-default mb-3 w-100 select-search" defaultValue={0}
                                            name="product_type" onChange={this.onChange}>
                                        <option value={0}>Loại bất động sản</option>
                                        {
                                            product_types.map(type=> <option value={type.id} key={type.id}>{type.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="col-12 col-md-6 col-lg-2 mt-3">
                                    <select className="browser-default mb-3 w-100 select-search" defaultValue={0}
                                            name="city_id" onChange={this.onChange}>
                                        <option value={0}>Tỉnh / Thành Phố</option>
                                        {
                                            cities.map(city=> <option value={city.id} key={city.id}>{city.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="col-12 col-md-6 col-lg-2 mt-3">
                                    <select className="browser-default mb-3 w-100 select-search" defaultValue={0}
                                            name="district_id" onChange={this.onChange}>
                                        <option value={0}>Quận / Huyện</option>
                                        {
                                            districts.map(district=> <option value={district.id} key={district.id}>{district.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="col-12 col-md-6 col-lg-2 mt-3">
                                    <select className="browser-default mb-3 w-100 select-search" defaultValue={0}
                                            name="area" onChange={this.onChange}>
                                        <option value={0}>Diện tích</option>
                                        <option value="30-<">{'<= 30 m2'}</option>
                                        <option value="30-50">30 - 50 m2</option>
                                        <option value="50-80">50 - 80 m2</option>
                                        <option value="80-100">80 - 100 m2</option>
                                        <option value="100-150">100 - 150 m2</option>
                                        <option value="150-200">150 - 200 m2</option>
                                        <option value="200->">{'> 200 m2'}</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-6 col-lg-2 mt-3">
                                    <select className="browser-default mb-3 w-100 select-search" defaultValue={0}
                                            name="price" onChange={this.onChange}>
                                        <option value={0}>Mực giá</option>
                                        <option value="500000000-<">{'< 500 triệu'}</option>
                                        <option value="500000000-800000000">500 - 800 triệu</option>
                                        <option value="800000000-1000000000">800 triệu - 1 tỷ</option>
                                        <option value="1000000000-2000000000">1 tỷ - 2 tỷ</option>
                                        <option value="2000000000-3000000000">2 tỷ - 3 tỷ</option>
                                        <option value="3000000000-5000000000">3 tỷ - 5 tỷ</option>
                                        <option value="5000000000->"> {'> 5 tỷ'}</option>

                                    </select>
                                </div>
                                <div className="col-12 col-md-6 col-lg-2 mt-3">
                                    <button className="btn btn-primary btn-block btn-search">
                                        <i className="fa far fa-search"/> Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/*/. Sidebar navigation */}
                    </div>
                </div>
            </div>
        )
    }
}