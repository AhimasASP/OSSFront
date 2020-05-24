import React, {Component} from "react";
import axios from 'axios'
import Order from '../../components/Order/Order'
import classes from './OrderList.css'
import TableTmp from "../../UI/Table/TableTmp";
import Table1 from "../../UI/Table/Table1";
import SearchInput from "../../UI/SearchInput";


export default class OrderList extends Component {

    state = {
        orderList: [],
        orderForDetailsId: '',
        details: null,
        columns: [
            {id: 'orderNumber', label: 'Order number', minWidth: 50},
            {id: 'orderStatus', label: 'Status', minWidth: 30},
            {id: 'clientName', label: 'Client', minWidth: 100},
            {id: 'clientPhoneNumber', label: 'Phone number', minWidth: 100},
            {id: 'clientAddress', label: 'Address', minWidth: 150},
            {id: 'orderComment', label: 'Comment', minWidth: 200},
        ],
        loading: false
    }

    async componentDidMount() {
        console.log('ComponentDidMount')
        try {
            let response = await axios.get('https://localhost:44374/Order/Index')
            const orderList = []
            response.data.map((order, index) => {
                orderList.push({
                    id: order.id,
                    orderNumber: order.orderNumber,
                    orderStatus: order.status,
                    clientName: order.clientName,
                    clientPhoneNumber: order.phone,
                    clientAddress: order.address,
                    orderComment: order.comment,
                })
            })

            if (!!this.state.orderForDetailsId) {
                console.log(this.state.orderForDetailsId)
            }

            this.setState({
                orderList, loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }


   showDetailsHandler = async (id) => {
       const response = await axios.get(`https://localhost:44374/Order/Get/${id}`)
       this.setState({
           orderForDetailsId: id,
           details: response.data
       })
       if (!!this.state.details) {
           console.log(this.state.details)
       }
   }


   render() {

        console.log(!!this.state.details)

       return (

           <div className={classes.OrderList}>
               <form className={classes.OrderListForm}>
                   {!!this.state.details ?
                   <Order details ={this.state.details}/> :
                   <TableTmp
                        columns = {this.state.columns}
                        orderList = {this.state.orderList}
                        onClickHandler = {this.showDetailsHandler}
                   />}
               </form>
           </div>
       )
   }

}