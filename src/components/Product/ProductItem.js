import React, {PureComponent} from 'react'
import {API_URI} from 'Constants'
import {Link} from 'react-router-dom'

export default class ProductItem extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        let {type, product, className} = this.props;

        if(className === undefined)
            className = "col-md-4";

        return (
            type === 'list'
                ?

                <div className="mb-4 card-style_list">
                    <div className="view overlay">
                        <img className="img-fluid" src={product.images[0] ? product.images[0].full_url : `${API_URI}/storage/images/default-image.png`}/>
                        <Link to={`/product/${product.id}/${product.slug}`}>
                            <div className="mask rgba-white-slight"/>
                        </Link>
                    </div>
                    <div className="card_list_item">
                        <ul>
                            <li>
                                <strong>{product.title}</strong>
                            </li>
                            <li>
                                -
                                <span>Diện tích: {product.area} m2</span>
                                <span>Phòng: {product.room_number}</span>
                            </li>
                            <li>
                                - Giá {product.price_to}
                            </li>
                            <li>
                                - Địa Chỉ: {product.address}
                            </li>
                            <li>
                                <Link to={`/product/${product.id}/${product.slug}`} title="Details" className="btn btn-primary  detail-list">Details</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                :
                <div className={className}>
                    <div className="card mb-4 card-style">
                        <div className="view overlay">
                            <img className="img-fluid" src={product.images[0] ? product.images[0].full_url : `${API_URI}/storage/images/default-image.png`}/>
                            <Link to={`/product/${product.id}/${product.slug}`}>
                                <div className="mask rgba-white-slight"/>
                            </Link>
                            <span className="currentPlace">{product.district.name}</span>
                            <div className="info_house">
                                <a>
                                    <span className="icons-squa2"/>{product.area}m2
                                </a>
                                <a>
                                    <span className="icons-nem2"/>{product.room_number}
                                </a>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                <span className="icons-adddress"/> {product.address}</p>
                        </div>
                        <div className="card-footer">
                            <a>{product.price_to}</a>
                            <Link to={`/product/${product.id}/${product.slug}`}>
                                <span className="icons-squa"/>{product.area}m2</Link>
                            <Link to={`/product/${product.id}/${product.slug}`}>Details</Link>
                        </div>
                    </div>
                </div>
        )
    }
}