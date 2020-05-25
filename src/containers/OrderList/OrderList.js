import React, {Component} from "react";
import axios from 'axios'
import Order from '../../components/Order/Order'
import classes from './OrderList.css'
import TableTmp from "../../UI/Table/TableTmp";


export default class OrderList extends Component {

    state = {
        orderList: [],
        edit: false,
        orderForDetailsId: '',
        details: null,
        showImage: null,
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
    }

    showImageHandler = async (id) => {
        const response = await axios.get(`https://localhost:44374/Image/Get/${id}`)

        this.setState({
            showImage: response.data
        })
    }

    onImageCloseHandler = () => {
        this.setState({
            showImage: null
        })
    }

    onDetailsCloseHandler = () => {
        this.setState({
            details: null,
            showImage: null
        })
    }

    onSearchHandler = async (param) => {

        if (param === '') return {}
        const response = await axios.get(`https://localhost:44374/Order/Search/${param}`)
        const orders = []

        response.data.map((order, index) => {
             orders.push({
                id: order.id,
                orderNumber: order.orderNumber,
                orderStatus: order.status,
                clientName: order.clientName,
                clientPhoneNumber: order.phone,
                clientAddress: order.address,
                orderComment: order.comment,
            })
        })

        this.setState({
            orderList: orders
        })
    }

   render() {

       return (

           <div className={classes.OrderList}>
               <form className={classes.OrderListForm}>
                   {!!this.state.details ?
                   <Order details ={this.state.details}
                          showImageHandler = {this.showImageHandler}
                          showImage = {this.state.showImage}
                          onImageCloseHandler = {this.onImageCloseHandler}
                          onDetailsCloseHandler = {this.onDetailsCloseHandler}
                   /> :
                   <TableTmp
                        columns = {this.state.columns}
                        orderList = {this.state.orderList}
                        onClickHandler = {this.showDetailsHandler}
                        onSearchHandler = {this.onSearchHandler}
                   />}
               </form>
           </div>
       )
   }

}