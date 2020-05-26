import React from "react";
import classes from './Order.css'
import Button from "@material-ui/core/Button";
import ImageGrid from "../../UI/ImageGrid/ImageGrid";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";


const OrderDetails = props => {


    const details = props.details

    return (
    <div >

        {!!props.showImage ?

            <div className={classes.Details}>
                <div >
                    <Button
                    onClick = {() => props.onImageCloseHandler()}
                    color="primary">
                    <HighlightOffIcon className={classes.DetailsIcon}
                        fontSize={'large'}
                    />
                    </Button>
                    <img src={`data:image/jpg;base64, ${props.showImage}`}/>
                </div>
            </div>
            :
            <div>
                <div className={classes.Order}>
                        <span>
                            <h2>Details</h2>&nbsp;
                        </span>
                    <div>
                        <Button
                            onClick={() => props.onEditHandler()}
                            color="primary">
                            <EditIcon
                                className={classes.EditIcon}
                                fontSize={'large'}/>
                        </Button>
                        <Button
                            color="primary">
                        <HighlightOffIcon
                            onClick={() => {props.onDetailsCloseHandler()}}
                            className={classes.HighlightOff}
                            fontSize={'large'}/>
                        </Button>
                    </div>
                </div>
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
            </div>
        }

        <ImageGrid
            images={details.images}
            onClickHandler={props.showImageHandler}
            icon = {<AspectRatioIcon style={{ color: 'white', fontSize: 30}}/>}
        />
            <div>

            </div>
    </div>

    )
}

export default OrderDetails