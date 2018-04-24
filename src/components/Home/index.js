import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import WindowTitle from 'Components/Layout/WindowTitle'
import MasterLayout from 'Components/Layout/MasterLayout'
import FormSearch from 'Components/Common/FormSearch'
import ProductList from 'Components/Product/ProductList'
import * as ApiCaller from 'Utils/ApiCaller'
import ProductItem from 'Components/Product/ProductItem'


@inject('profileStore', 'commonStore')
@observer
export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products_lease_data: [],
            products_lease_meta: {},
            products_sell_data: [],
            products_sell_meta: {}
        }
    }


    componentWillMount() {
        ApiCaller.get('/products/?product_type_master_id=1&limit=6').then(res => {
            if (res.code === 200) {
                this.setState({
                    products_sell_data: res.data,
                    products_sell_meta: res.metadata,
                });
            }
        });

        ApiCaller.get('/products/?product_type_master_id=2&limit=6').then(res => {
            if (res.code === 200) {
                this.setState({
                    products_lease_data: res.data,
                    products_lease_meta: res.metadata,
                });
            }
        });
    }

    onLoadMore = (e, type)=>{
        const meta = type === 'sell' ? this.state.products_sell_meta : this.state.products_lease_meta;
        console.log(meta)
        console.log(meta['next_link'])
        if( meta.next_link !== null) {
            ApiCaller.get(meta.next_link)
                .then(res=>{
                    if (res.code === 200) {
                        if(type === 'sell') {
                            this.setState({
                                products_sell_data: this.state.products_sell_data.concat(res.data),
                                products_sell_meta: res.metadata,
                            });
                        } else {
                            this.setState({
                                products_lease_data: this.state.products_lease_data.concat(res.data),
                                products_lease_meta: res.metadata,
                            });
                        }
                    }
                })
        }
    };

    render() {

        const {
            products_lease_data,
            products_lease_meta,
            products_sell_data,
            products_sell_meta
        } = this.state;


        return (
            <MasterLayout>

                <WindowTitle title="home"/>
                <FormSearch/>
                <div>

                    {/* nhà bán đất */}
                    <div className="nhadatban">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="h1-title">Nhà đất bán </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nhadatban_content">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="nhadatban_content__title">
                                        <ul className="nav group-list">
                                            <li>
                                                <a className="nav-link icons-gird active" data-toggle="tab" href="#block_gird" role="tab" />
                                            </li>
                                            <li>
                                                <a className="nav-link icons-list" data-toggle="tab" href="#block_list" role="tab" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Tab panels */}
                            <div className="tab-content p-0 content-list-grid">
                                {/*Panel 1*/}
                                <div className="tab-pane fade in show active" id="block_gird" role="tabpanel">
                                    <div className="row  mt-5">
                                        <ProductList type="grid" products={products_sell_data} />
                                    </div>
                                </div>
                                {/*/.Panel 1*/}
                                {/*Panel 2*/}
                                <div className="tab-pane fade" id="block_list" role="tabpanel">

                                    <ProductList type="list" products={products_sell_data} />

                                </div>
                                {/*/.Panel 2*/}
                            </div>

                            <div className="row">
                                <div className="col-12 text-center">
                                    <button className={products_sell_meta.next_link === null ? "btn btn-primary btn-search disabled" : "btn btn-primary btn-search"} style={{paddingLeft: '20px', paddingRight:'20px'}} onClick={(e)=>this.onLoadMore(e, 'sell')}>
                                        Xem Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end - nhà bán đất */}
                    {/* nhà đất cho thuê */}
                    <div className="nhadatban bg_nhadat">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="h1-title">Nhà đất cho thuê </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nhadatban_content bg_nhadat">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    {/* Nav tabs */}
                                    <ul className="nav nav-tabs nav-tabs-ndchothue" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#panel5" role="tab">
                                                <span className="icons-chungcu" /> Chung cư</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#panel6" role="tab">
                                                <span className="icons-biethu" /> Biệt thự</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Tab panels */}
                        <div className="tab-content m-0 p-0">
                            {/*Panel 1*/}
                            <div className="tab-pane fade in show active" id="panel5" role="tabpanel">
                                <div className="container">
                                    <div className="row">
                                        <ProductList type="grid" products={products_lease_data} />
                                    </div>
                                </div>
                            </div>
                            {/*/.Panel 1*/}
                            {/*Panel 2*/}
                            <div className="tab-pane fade" id="panel6" role="tabpanel">
                                <div className="container">
                                    <div className="row">
                                        <ProductList type="grid" products={products_lease_data} />
                                    </div>
                                </div>
                            </div>
                            {/*/.Panel 2*/}
                        </div>
                    </div>
                    {/* end - nhà bán đất */}

                </div>

            </MasterLayout>
        )
    }
}