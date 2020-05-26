import React, {Component} from "react";
import axios from 'axios'
import Order from '../../components/Order/Order'
import OrderEdit from '../../components/Order/OrderEdit'
import OrderAddition from '../../components/Order/OrderAddition'
import classes from './OrderList.css'
import TableTmp from "../../UI/Table/TableTmp";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

export default class OrderList extends Component {



    state = {
        creationNewOrder: false,
        offset: 0,
        orderList: [],
        edit: false,
        orderForDetailsId: '',
        details: null,
        showImage: null,
        touched: false,
        columns: [
            {id: 'orderNumber', label: 'Order number', minWidth: 50},
            {id: 'orderStatus', label: 'Status', minWidth: 30},
            {id: 'clientName', label: 'Client', minWidth: 100},
            {id: 'clientPhoneNumber', label: 'Phone number', minWidth: 100},
            {id: 'clientAddress', label: 'Address', minWidth: 150},
            {id: 'orderComment', label: 'Comment', minWidth: 200},
        ],
        newOrder: {
            clientName: '',
            address: '',
            phone: '',
            orderNumber: '',
            comment: '',
            images: []
        },
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


    checkForNullDetails = () => {
        if (this.state.details === null) {
            const emptyDetails = {images: []}
            this.setState({
                details: emptyDetails
            })
        }
    }

    fileSelectHandler = event => {

        let fileBase64
        let details = this.state.details
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        let currentImages = this.state.details.images

        reader.onloadend = () => {
            fileBase64 = reader.result.split(',')[1]
            currentImages.push(fileBase64 + '|||Added')
            console.log(currentImages)
            details.images = currentImages

            this.setState({
                details: details,
                touched: true
            })
            console.log(this.state.details.images)
        };
    }

    onDeleteImageHandler = async (id) => {

        await axios.delete(`https://localhost:44374/Image/Delete/${id}`)
        await this.showDetailsHandler(this.state.orderForDetailsId)
        this.render()
    }

    onDeleteOrderHandler = async () => {
       try {
           await axios.delete(`https://localhost:44374/Order/Delete/${this.state.details.id}`)
           await this.componentDidMount()
           this.onDetailsCloseHandler()
       } catch (e) {
           console.log(e)
       }

    }

    onImageCloseHandler = () => {
        this.setState({
            showImage: null
        })
    }

    onDetailsCloseHandler = () => {
        this.setState({
            details: null,
            showImage: null,
            edit: false,
            touched: false,
            creationNewOrder: false,
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

    onEditHandler = () => {
        this.setState({
            edit: true,
        })
    }

  onSaveDetailsChanges = async (changes) => {

      this.state.details.images.map(async image => {
          let file = image.split('|||')
          if (file[1] === 'Added') {
              await axios.post(`https://localhost:44374/Image/Create`, {owner: changes.id, body:file[0]})
          }
      })

        const details = {
            status: changes.status,
            address: changes.address,
            clientName: changes.clientName,
            phone: changes.phone,
            orderDate: changes.orderDate,
            orderNumber: changes.orderNumber,
            paymentType: changes.paymentType,
            isCredit: true,
            creditMonthCount: 0,
            finalSum: changes.finalSum,
            comment: changes.comment
        }
        try {
            await axios.put(`https://localhost:44374/Order/Modify/${changes.id}`, details)
            await this.componentDidMount()
            this.onDetailsCloseHandler()
        } catch (e) {
            console.log(e)
        }
    }

    onCreateNewOrder = async (details) => {

        const newOrder = {
            status: details.status,
            address: details.address,
            clientName: details.clientName,
            phone: details.phone,
            orderDate: details.orderDate,
            orderNumber: details.orderNumber,
            paymentType: details.paymentType,
            isCredit: true,
            creditMonthCount: 0,
            finalSum: details.finalSum,
            comment: details.comment
        }

        try {

            const response = await axios.post('https://localhost:44374/Order/Create', newOrder )

            this.state.details.images.map(async image => {
                let file = image.split('|||')
                if (file[1] === 'Added') {
                    await axios.post(`https://localhost:44374/Image/Create`, {owner: response.data.id, body:file[0]})
                }
            })
            await this.componentDidMount()
            this.onDetailsCloseHandler()

        } catch (e) {
            console.log(e)
        }
    }

    onTouchEditControls = () => {
        this.setState({
            touched: true
        })
    }

    handleClick(offset) {
        this.setState({ offset });
        console.log('offset: ' + offset)
    }

   render() {

       const theme = createMuiTheme();

       return (

           <div className={classes.OrderList}>
               <form className={classes.OrderListForm}>

                   {
                       this.state.creationNewOrder ?

                            <OrderAddition
                                newOrder ={this.state.details}
                                touched = {this.state.touched}
                                onTouchEditControls = {this.onTouchEditControls}
                                fileSelectHandler = {this.fileSelectHandler}
                                checkForNullDetails = {this.checkForNullDetails}
                                onCreationCloseHandler = {this.onDetailsCloseHandler}
                                onCreateNewOrder = {this.onCreateNewOrder}
                            /> :

                       !!this.state.details ?

                      this.state.edit ?
                          <OrderEdit
                              details ={this.state.details}
                              onDetailsCloseHandler = {this.onDetailsCloseHandler}
                              onSaveDetailsChanges = {this.onSaveDetailsChanges}
                              touched = {this.state.touched}
                              onTouchEditControls = {this.onTouchEditControls}
                              onDeleteImageHandler = {this.onDeleteImageHandler}
                              onDeleteOrderHandler = {this.onDeleteOrderHandler}
                              fileSelectHandler = {this.fileSelectHandler}
                          /> :

                   <Order details ={this.state.details}
                          showImageHandler = {this.showImageHandler}
                          showImage = {this.state.showImage}
                          onImageCloseHandler = {this.onImageCloseHandler}
                          onDetailsCloseHandler = {this.onDetailsCloseHandler}
                          onEditHandler = {this.onEditHandler}
                   /> :
                       <div>
                           <TableTmp
                                offset = {this.state.offset}
                                columns = {this.state.columns}
                                orderList = {this.state.orderList}
                                onClickHandler = {this.showDetailsHandler}
                                onSearchHandler = {this.onSearchHandler}
                           />
                           <hr/>
                           <div className={classes.BottomLevel}>
                               <Button

                                   onClick={() => this.setState({creationNewOrder: true, details: this.state.newOrder })}
                                   color="primary">
                                   <NoteAddIcon
                                       fontSize={'large'}/>
                                       Add new order
                               </Button>
                               <MuiThemeProvider theme={theme}>
                                   <CssBaseline />
                                   <Pagination
                                       limit={8}
                                       offset={this.state.offset}
                                       total={this.state.orderList.length}
                                       onClick={(e, offset) => this.handleClick(offset)}
                                   />
                               </MuiThemeProvider>
                           </div>
                       </div>
                   }
               </form>
           </div>
       )
   }

}