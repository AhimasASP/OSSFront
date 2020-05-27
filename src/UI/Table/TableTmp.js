import React from "react";
import classes from './TableTmp.css'
import SearchInput from "../../UI/SearchInput";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";


const OrderList = props => {

    let counter = 0

        return (
            <div>
                <div  className={classes.Table}>
                    <span>
                    <h2>Orders</h2>
                    </span>

                    {/*<div>*/}
                    {/*    {"  USD: " + props.currency.usd}*/}
                    {/*    {"  EUR: " + props.currency.eur}*/}
                    {/*    {"  RUB: " + props.currency.rub}*/}
                    {/*</div>*/}
                    <div>
                    <SearchInput
                        onSearchHandler = {props.onSearchHandler}
                    />
                    </div>
                </div>
                     <hr/>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {props.columns.map((column) => (
                                        <TableCell
                                            key = {column.id}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { props.elementslist.map((order, index) => {

                                if (props.offset <= counter && counter <= props.offset + 8){
                                    counter++
                                    return (
                                        <TableRow hover
                                                  onClick={() => props.onClickHandler(order.id)}
                                                  tabIndex={-1} key={order.id}>

                                            {props.columns.map((column) => {
                                                const value = order[column.id];
                                                return (
                                                    <TableCell key={column.id}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    )
                                } else {counter++}
                             })}

                        </TableBody>
                    </Table>
            </div>
        )
    }

    export default OrderList
