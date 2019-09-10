import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import '../resources/css/login.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { getAllUsers, getUsersInfo } from '../common/ApiServices';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "username_param": "",
            "password_param": "",
            users: [],
        }
        this.handleInfo = this.handleInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        console.log(event);
        this.setState(
            {
                username_param: (event.target.id === 'login') ? event.target.value : this.state.username_param,
                password_param: (event.target.id === 'password') ? event.target.value : this.state.password_param
            }
        );


    }

    handleInfo(event) {

        console.log("HAS ENTER TO!");

        if (this.state.password_param != "" && this.state.username_param) {
            console.log("ENTRO");
            console.log("password: " + this.state.password_param);
            console.log("username: " + this.state.username_param);

            if (this.state.users != []) {
                console.log("USERS ARRAY: " + this.state.users.length);

                let cont = 0;
                let userSelected = {}
                let u_param = this.state.username_param;
                let p_param = this.state.password_param;
                this.state.users.forEach(element => {
                    if (element.username === u_param &&
                        element.password === p_param) {
                            userSelected = element;
                            cont++;
                        return false;
                    }
                });

                if (cont > 0) {
                    localStorage.setItem('user-storage', userSelected);
                    this.props.history.push('/home');
                } else {
                    NotificationManager.error("Los credenciales ingresados no son correctos. Por favor, verifique y trate de nuevo.");
                }
            }else{
                NotificationManager.error("No existen usuarios registrados en la base de datos.");
            }
        } else {
            NotificationManager.error("No pueden haber campos vacios");
        }
    }



    handlerApiLogic() {
        let currentComponent = this;
        getAllUsers().on('value', function (data) {
            let userTemp = getUsersInfo(data.val());
            currentComponent.setState({
                users: userTemp,
                "username_param": "",
                "password_param": ""
            });

        }, function (error) {
            console.log("Error Loading user data: " + error.code);
        });
    }

    componentWillReceiveProps(nextProps) {

        if(localStorage.getItem('user-storage') === null){
            this.handlerApiLogic();
            console.log("componentWillReceiveProps");
            console.log(this.state.users);
        }else{
            this.props.history.push('/home');
        }
    }

    componentDidMount() {
        if(localStorage.getItem('user-storage') === null){
            this.handlerApiLogic();
            console.log("componentDidMount");
            console.log(this.state.users);
        }else{
            this.props.history.push('/home');
        }
    }


    render() {
        return (
            <div class="wrapper-l fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first">
                        <h1 id="login-title">Ruddy Castro</h1>
                    </div>
                    <form >
                        <input type="text" id="login" class="fadeIn second" name="login" placeholder="Usuario" onChange={this.handleChange} />
                        <input type="password" id="password" class="fadeIn third" name="login" placeholder="Contraseña" onChange={this.handleChange} />
                        <input type="button" class="fadeIn fourth" value="Inicia sesión" onClick={this.handleInfo} />
                    </form>

                    <div id="formFooter">
                        <h3 id="copy-right">© Todos los derechos reservados pertenecen a Salim Bencosme.</h3>
                    </div>

                </div>
                <NotificationContainer />
            </div>
        );
    }
}

export default Login;
