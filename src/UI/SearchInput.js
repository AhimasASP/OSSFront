import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";



const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const CustomizedInputBase = props => {
    const classes = useStyles()

    let searchValue = ''

    function setSearchValue (value) {
        searchValue = value
    }


    return (
        <Paper component="form" className={classes.root}>

            <InputBase
                className={classes.input}
                onChange={event => setSearchValue(event.target.value)}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Button className={classes.iconButton} aria-label="search"
                    onClick={() => props.onSearchHandler(searchValue)}
            >
                <SearchIcon />
            </Button>
            <Divider className={classes.divider} orientation="vertical" />

        </Paper>
    );
}

export default CustomizedInputBase