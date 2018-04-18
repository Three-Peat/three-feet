import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SingleProduct from './single-product'
import { allProducts } from '../store'
import SearchProducts from './search-products';


/**
 * COMPONENT
 */
export class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    handleChange = evt => {
        const value = evt.target.value;
        this.setState({
            inputValue: value,
        });
    };

    componentDidMount = () => {
        const { getAllProducts } = this.props;
        getAllProducts();
    };

    render() {
        const { products } = this.props;
        const inputValue = this.state.inputValue.toLowerCase();
        const filteredProducts = products.filter(product => {
            return (
                product.name.toLowerCase().match(inputValue) ||
                product.brand.toLowerCase().match(inputValue)
            );
        });
        return (
            <div>
                <SearchProducts
                    handleChange={this.handleChange}
                    inputValue={inputValue}
                />
                {filteredProducts.map(p => <SingleProduct key={p.id} product={p} />)}

            </div>
        );
    }
}

const mapState = state => {
    const { products } = state
    return { products }
}

const mapDispatch = dispatch => {
    return {
        getAllProducts: products => {
            dispatch(allProducts(products))
        }
    }
}

export default connect(mapState, mapDispatch)(AllProducts)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
