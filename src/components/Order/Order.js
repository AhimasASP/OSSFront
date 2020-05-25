import React from "react";
import classes from './Order.css'
import Button from "@material-ui/core/Button";
import ImageGrid from "../../UI/ImageGrid/ImageGrid";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";


const OrderDetails = props => {

    const details = props.details

    return (
    <div >
        <div className={classes.Order}>
            <span>
                <h2>Details</h2>&nbsp;
            </span>
            <Button color="primary">
                <HighlightOffIcon
                    onClick={() => {props.onDetailsCloseHandler()}}
                    fontSize={'large'}
                    className={classes.HighlightOff}/>
            </Button>
            {/*<hr/>*/}
        </div>

        {!!props.showImage ?

            <div className={classes.Details}>
                <Button
                    onClick = {() => props.onImageCloseHandler()}
                    color="primary">
                    <HighlightOffIcon
                        color = {'green'}
                        fontSize={'normal'}/>
                </Button>
            <img src={`data:image/jpg;base64, ${props.showImage}`}/>
            </div>
            :
            <div>

                <p>Client: <strong>{details.clientName}</strong></p>

                <hr/>
                <p>Creation date: <strong>{details.creationDate}</strong></p>
                <hr/>
                <p>Client address: <strong>{details.address}</strong></p>
                <hr/>
                <p>Client phone: <strong>{details.phone}</strong></p>
                <hr/>
                <p>Order date: <strong>{details.orderDate}</strong></p>
                <hr/>
                <p>Order number: <strong>{details.orderNumber}</strong></p>
                <hr/>
                <p>Order sum: <strong>{details.finalSum}</strong></p>
                <hr/>
                <p>Comment: <strong>{details.comment}</strong></p>
                <hr/>
                <p>Modified: <strong>{details.modificationDate}</strong></p>
            </div>
        }

        <ImageGrid
            images={details.images}
            showImageHandler={props.showImageHandler}
        />
        <Button text={'Edit'}/>
    </div>

    )
}

export default OrderDetails