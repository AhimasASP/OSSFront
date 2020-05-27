import React from 'react';
import Layout from "./hoc/Layout/Layout";
import {Switch, Route} from 'react-router-dom'
import Catalog from "./containers/Catalog/Catalog";
import OrderList from "./containers/OrderList/OrderList";
import Auth from "./containers/Auth/Auth";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/catalog" component={Catalog}/>
                <Route path="/orders" component={OrderList}/>
            </Switch>
        </Layout>
    )
}

export default App





