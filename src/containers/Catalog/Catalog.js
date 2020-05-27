import React, {Component} from "react";
import axios from 'axios'
import CatalogItem from '../../components/Catalog/CatalogItem'
import CatalogItemEdit from '../../components/Catalog/CatalogItemEdit'
import CatalogItemAddition from '../../components/Catalog/CatalogItemAddition'
import classes from './Catalog.css'
import TableTmp from "../../UI/Table/TableTmp";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Loading from '../../UI/Loader/Loader'

export default class Catalog extends Component {



    state = {
        creationNewItem: false,
        offset: 0,
        currency: {},
        catalog: [],
        edit: false,
        itemIdForDetails: '',
        details: null,
        showImage: null,
        touched: false,
        columns: [
            {id: 'article', label: 'Item article', minWidth: 100},
            {id: 'name', label: 'Item name', minWidth: 100},
            {id: 'type', label: 'Type', minWidth: 50},
            {id: 'size', label: 'Size', minWidth: 50},
            {id: 'currency', label: 'Currency', minWidth: 100},
            {id: 'price', label: 'Price', minWidth: 50},
            {id: 'description', label: 'Description', minWidth: 200},
        ],
        newItem: {
            article: '',
            name: '',
            type: '',
            size: '',
            currency: '',
            price: '',
            description: '',
            images: []
        },
        loading: true
    }

    async componentDidMount() {
        try {
            let response = await axios.get('https://localhost:44374/Item/Index')
            const catalog = []
            response.data.map((item, index) => {
                catalog.push({
                    id: item.id,
                    article: item.article,
                    name: item.name,
                    type: item.type,
                    size: item.size,
                    currency: item.currency,
                    price: item.price,
                    description: item.description,
                })
            })


            this.setState({
                catalog, loading: false
            })
        } catch (e) {
            console.log(e)
        }

        try {
            const currency = {
                usd: '',
                eur: '',
                rub: '',
            }

            const usd = (await axios.get(`https://www.nbrb.by/api/exrates/rates/USD?parammode=2`)).data.Cur_OfficialRate
            const eur  = (await axios.get(`https://www.nbrb.by/api/exrates/rates/EUR?parammode=2`)).data.Cur_OfficialRate
            const rub = (await axios.get(`https://www.nbrb.by/api/exrates/rates/RUB?parammode=2`)).data.Cur_OfficialRate

            currency.usd = usd.toString()
            currency.eur = eur.toString()
            currency.rub = rub.toString()

            this.setState({
                currency
            })
        } catch (e) {
            console.log(e)
        }

    }



   showDetailsHandler = async (id) => {
       const response = await axios.get(`https://localhost:44374/Item/Get/${id}`)
       this.setState({
           itemIdForDetails: id,
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
        await this.showDetailsHandler(this.state.itemIdForDetails)
        this.render()
    }

    onDeleteItemHandler = async () => {
       try {
           await axios.delete(`https://localhost:44374/Item/Delete/${this.state.details.id}`)
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
            creationNewItem: false,
        })
    }

    onSearchHandler = async (param) => {

        if (param === '') return {}
        const response = await axios.get(`https://localhost:44374/Item/Search/${param}`)
        const items = []

        response.data.map((item, index) => {
             items.push({
                 id: item.id,
                 article: item.article,
                 name: item.name,
                 type: item.type,
                 size: item.size,
                 currency: item.currency,
                 price: item.price,
                 description: item.description,
            })
        })

        this.setState({
            catalog: items
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

            article: changes.article,
            name: changes.name,
            type: changes.type,
            size: changes.size,
            currency: changes.currency,
            price: changes.price,
            photo: '',
            purchasePrice: 0,
            description: changes.description,

        }

        try {
            await axios.put(`https://localhost:44374/Item/Modify/${changes.id}`, details)
            await this.componentDidMount()
            this.onDetailsCloseHandler()
        } catch (e) {
            console.log(e)
        }
    }

    onCreateNewItem = async (details) => {



        const newItem = {

            article: details.article,
            name: details.name,
            type: details.type,
            size: details.size,
            currency: details.currency,
            price: details.price,
            photo: '',
            purchasePrice: 0,
            description: details.description,
        }
        console.log(newItem)

        try {

            const response = await axios.post('https://localhost:44374/Item/Create', newItem )

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
    }

   render() {

       const theme = createMuiTheme();

       return (

           <div className={classes.Catalog}>
               <form className={classes.CatalogForm}>

                   {

                       this.state.loading ? <Loading/> :

                       this.state.creationNewItem ?

                            <CatalogItemAddition
                                newItem ={this.state.details}
                                touched = {this.state.touched}
                                onTouchEditControls = {this.onTouchEditControls}
                                fileSelectHandler = {this.fileSelectHandler}
                                checkForNullDetails = {this.checkForNullDetails}
                                onCreationCloseHandler = {this.onDetailsCloseHandler}
                                onCreateNewItem = {this.onCreateNewItem}
                            /> :

                       !!this.state.details ?

                      this.state.edit ?
                          <CatalogItemEdit
                              details ={this.state.details}
                              onDetailsCloseHandler = {this.onDetailsCloseHandler}
                              onSaveDetailsChanges = {this.onSaveDetailsChanges}
                              touched = {this.state.touched}
                              onTouchEditControls = {this.onTouchEditControls}
                              onDeleteImageHandler = {this.onDeleteImageHandler}
                              onDeleteItemHandler = {this.onDeleteItemHandler}
                              fileSelectHandler = {this.fileSelectHandler}
                          /> :

                   <CatalogItem details ={this.state.details}
                          showImageHandler = {this.showImageHandler}
                          showImage = {this.state.showImage}
                          onImageCloseHandler = {this.onImageCloseHandler}
                          onDetailsCloseHandler = {this.onDetailsCloseHandler}
                          onEditHandler = {this.onEditHandler}
                   /> :
                       <div>
                           <TableTmp
                                currency = {this.state.currency}
                                offset = {this.state.offset}
                                columns = {this.state.columns}
                                elementslist = {this.state.catalog}
                                onClickHandler = {this.showDetailsHandler}
                                onSearchHandler = {this.onSearchHandler}
                           />
                           <hr/>
                           <div className={classes.BottomLevel}>
                               <Button

                                   onClick={() => this.setState({creationNewItem: true, details: this.state.newItem })}
                                   color="primary">
                                   <NoteAddIcon
                                       fontSize={'large'}/>
                                       Add new catalog item
                               </Button>
                               <MuiThemeProvider theme={theme}>
                                   <CssBaseline />
                                   <Pagination
                                       limit={8}
                                       offset={this.state.offset}
                                       total={this.state.catalog.length}
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