import React, {Component} from "react";
import classes from './Layout.css'
import Adornment from "../../components/Adornment/Adornment";

class Layout extends Component {


    render() {
        return (
            <div className={classes.Layout}>
                <div>
                <h1>Authorization</h1>
                    <form className={classes.LayoutForm}>
                        <Adornment/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Layout