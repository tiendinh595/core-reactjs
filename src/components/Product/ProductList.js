import React, {PureComponent} from 'react'
import ProductItem from 'Components/Product/ProductItem'

export default class ProductList extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const {type, products} = this.props;
        if (products.length === 0)
            return null;
        return products.map(product=><ProductItem key={product.id} type={type} product={product} />)
    }
}