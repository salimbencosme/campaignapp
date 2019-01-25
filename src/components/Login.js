import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import '../resources/css/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleInfo = this.handleInfo.bind(this);
    }

    handleInfo(event){
        this.props.history.push('/home');
    }

    render() {
        return (
            <div class="wrapper-l fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first">
                        <h1 id="login-title">Ruddy Castro</h1>
                    </div>
                    <form>
                        <input type="text" id="login" class="fadeIn second" name="login" placeholder="Usuario" />
                        <input type="text" id="password" class="fadeIn third" name="login" placeholder="Contraseña" />
                        <input type="button" class="fadeIn fourth" value="Inicia sesión" onClick={this.handleInfo} />
                    </form>

                    <div id="formFooter">
                        <h3 id="copy-right">© Todos los derechos reservados pertenecen a Salim Bencosme.</h3>
                    </div>

                </div>
            </div>
        );
    }
}

export default Login;
