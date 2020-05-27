import React from "react";
import classes from './CatalogItem.css'
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
                <div className={classes.Catalog}>
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
                    <p>Article: <strong>{details.article}</strong></p>
                    <hr/>
                    <p>Name: <strong>{details.name}</strong></p>
                    <hr/>
                    <p>Type: <strong>{details.type}</strong></p>
                    <hr/>
                    <p>Size: <strong>{details.size}</strong></p>
                    <hr/>
                    <p>Currency: <strong>{details.currency}</strong></p>
                    <hr/>
                    <p>price: <strong>{details.price}</strong></p>
                    <hr/>
                    <p>description: <strong>{details.description}</strong></p>
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