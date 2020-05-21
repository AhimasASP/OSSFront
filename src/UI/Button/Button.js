import React from 'react';
import Button from '@material-ui/core/Button';


const button = props => {



    return (
            <Button
                variant="contained"
                disabled= {props.disabled}
            >{props.text}</Button>
    );
}

export default button