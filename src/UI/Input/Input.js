import React from 'react';
import clsx from 'clsx';
import classes from './Input.css'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({

}));

const Inputs = props =>  {

    // const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        props.onChange(event)
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const isInvalid = ({valid, touched}) => {
        console.log(valid + "  " + touched)
        return !valid && touched

    }

    return (


        <div className={classes.Input}>

            {props.type === 'text' ?
                <TextField className={clsx(classes.margin, classes.textField)}
                           required id="standard-required"
                           label= {props.label}
                           onChange={props.onChange}
                />
                : props.type === 'pass' ?
                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">{props.label}</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            //onChange={props.onChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl> : null
            }
            <div className={classes.error}>
            {isInvalid(props) ? <span>{props.errorMessage || 'error'}</span> : null}
                {console.log(isInvalid(props))}

            </div>
        </div>
    );
}

export default Inputs