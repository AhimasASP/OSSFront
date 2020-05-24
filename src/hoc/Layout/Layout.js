import React, {Component} from "react";
import Auth from "../../containers/Auth/Auth";
import OrderList from '../../containers/OrderList/OrderList'

class Layout extends Component {


    render() {
        return (
            // <Auth/>
            <OrderList/>
        )
    }
}

export default Layout