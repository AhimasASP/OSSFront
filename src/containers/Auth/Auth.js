import React, {Component} from "react";
import classes from './Auth.css'
import Button from "../../UI/Button/Button";
import Inputs from "../../UI/Input/Input";
import is from 'is_js'

export default class Auth extends Component {

    state = {
        isFormValid: true,
        formControl: {
            login: {
                type: 'text',
                value: 'Login',
                label: 'Login',
                errorMessage: 'incorrect login',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                type: 'pass',
                label:'Password',
                value: 'Password',
                errorMessage: 'incorrect password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    validateControl (value, validation) {
        if (!validation) {return true}

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid

    }

    onChangeHandler = (event, controlName) => {

        const formControls = {...this.state.formControl}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControl: formControls,
            isFormValid
        })
    }


render() {
    return (
        <div className={classes.Auth}>
            <div>
                <h1>Order Support System</h1>
                <form className={classes.AuthForm}>

                    { Object.keys(this.state.formControl).map((inputName, index) => {

                            const currentInput = this.state.formControl[inputName]
                            return (
                                <Inputs
                                    key = {currentInput + index}
                                    type = {currentInput.type}
                                    label ={currentInput.label}
                                    value = {currentInput.value}
                                    valid = {currentInput.valid}
                                    touched = {currentInput.touched}
                                    errorMessage = {currentInput.errorMessage}
                                    onChange = {event => this.onChangeHandler(event, inputName)}
                                />
                            )
                        })
                    }

                    <Button
                        disabled = {!this.state.isFormValid}
                        text = 'Login'
                    />
                </form>
            </div>
        </div>
    )
}
}
