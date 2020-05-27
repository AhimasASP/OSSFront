import React from "react";
import classes from './CatalogItem.css'
import Button from "@material-ui/core/Button";
import ImageGrid from "../../UI/ImageGrid/ImageGrid";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from '../../UI/Modal/Modal'


const OrderEditDetails = props => {

    const details = props.details
    let fileInput

    const newDetails = props.details
    const cls =  props.touched ?  classes.SaveIconValid :
        classes.SaveIcon

    return (
            <div>
                <div className={classes.CatalogPanel}>
                    
                    <div className={classes.ActionsPanel}>

                        <Button
                            disabled={!props.touched}
                            onClick={() => props.onSaveDetailsChanges(newDetails)}
                            color="primary">
                            <SaveIcon
                                className={cls}
                                fontSize={'large'}/>
                        </Button>

                        <Modal
                            buttonYes = {
                                <Button
                                    onClick={() => props.onDeleteOrderHandler(newDetails)}
                                    color="primary">
                                        <DeleteIcon
                                            className={classes.DeleteIcon}
                                            fontSize={'large'}/>
                                </Button>}
                                    buttonNo = {  <Button
                                        color="primary">
                                        <HighlightOffIcon
                                            onClick={() => props.onDetailsCloseHandler()}
                                            className={classes.HighlightOff}
                                            fontSize={'large'}/>
                            </Button>}
                            icon = { <DeleteIcon
                                className={classes.DeleteIcon}
                                fontSize={'large'}/>}
                            mainText = 'Are you sure?'>

                        </Modal>
                        <Button
                            color="primary">
                            <HighlightOffIcon
                                onClick={() => props.onDetailsCloseHandler()}
                                className={classes.HighlightOff}
                                fontSize={'large'}/>
                        </Button>
                    </div>
                    <div className={classes.Form}>
                        <div>
                            <h2>Edit order details</h2>
                        </div>
                        <ul>
                            <li>

                        <TextField
                            onChange={event => {
                                newDetails.article = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required" 
                            fullWidth
                            label="Article" defaultValue= {details.article} />
                            </li>
                            <li>
                        <TextField
                            onChange={event => {
                                newDetails.name = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required" 
                            fullWidth
                            label="Name" defaultValue= {details.name} />

                            </li>
                            <li>

                            <TextField
                            onChange={event => {
                                newDetails.type = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required" 
                            fullWidth
                            label="Type" defaultValue= {details.type} />
                            </li>
                            <li>
                                
                        <TextField
                            onChange={event => {
                                newDetails.size = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required" 
                            fullWidth
                            label="Size" defaultValue= {details.size} />
                            </li>
                            <li>
                        <TextField
                            onChange={event => {
                                newDetails.currency = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required" 
                            fullWidth
                            label="currency" defaultValue= {details.currency} />
                            </li>
                            <li>
                        <TextField
                            onChange={event => {
                                newDetails.price = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required"
                            fullWidth
                            label="Price" defaultValue= {details.price} />
                            </li>
                            <li>
                        <TextField
                            onChange={event => {
                                newDetails.description = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required"
                            fullWidth
                            label="Description" defaultValue= {details.description} />
                            </li>
                        </ul>
                    </div>
                    <div className={classes.Order}>
                        <ImageGrid
                            images={details.images}
                            onClickHandler={props.onDeleteImageHandler}
                            icon = {<DeleteIcon style={{ color: 'white', fontSize: 30}}/>}
                        />
                        <input
                            style={{display: "none"}}
                            onChange={props.fileSelectHandler}
                            type="file"
                            ref={inpt => fileInput = inpt}
                        />
                        <Button
                            onClick={() => fileInput.click()}
                            color="primary">

                            <AddPhotoAlternateIcon
                                className={classes.AddPhotoAlternateIcon}
                                style={{ fontSize: 100 }}

                            />
                        </Button>
                    </div>
                </div>
            </div>
    )
}

export default OrderEditDetails