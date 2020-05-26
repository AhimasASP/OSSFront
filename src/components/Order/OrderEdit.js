import React from "react";
import classes from './Order.css'
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
    console.log(details)

    const newDetails = props.details
    const cls =  props.touched ?  classes.SaveIconValid :
        classes.SaveIcon

    return (
            <div>
                <div className={classes.OrderPanel}>
                    
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

                        {/*<Button*/}
                        {/*    onClick={() => props.onDeleteOrderHandler(newDetails)}*/}
                        {/*    color="primary">*/}
                        {/*    <DeleteIcon*/}
                        {/*        className={classes.DeleteIcon}*/}
                        {/*        fontSize={'large'}/>*/}
                        {/*</Button>*/}
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
                                newDetails.clientName = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required" 
                            fullWidth
                            label="Client" defaultValue= {details.clientName} />
                            </li>
                            <li>
                        <TextField
                            onChange={event => {
                                newDetails.address = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required" 
                            fullWidth
                            label="Address" defaultValue= {details.address} />

                            </li>
                            <li>

                            <TextField
                            onChange={event => {
                                newDetails.phone = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required" 
                            fullWidth
                            label="Phone" defaultValue= {details.phone} />
                            </li>
                            <li>
                                
                        <TextField
                            onChange={event => {
                                newDetails.orderNumber = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required" 
                            fullWidth
                            label="Order number" defaultValue= {details.orderNumber} />
                            </li>
                            <li>
                        <TextField
                            onChange={event => {
                                newDetails.comment = event.target.value
                                props.onTouchEditControls()}}
                            required id="standard-required" 
                            fullWidth
                            label="Comment" defaultValue= {details.comment} />
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