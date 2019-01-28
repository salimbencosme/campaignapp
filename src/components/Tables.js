import React,{Component} from 'react';
import '../resources/css/home.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';



var styleInput = {
    'text-align': 'initial',
    'width': '97%'
}

class Tables extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="body-div">
                <div class="container">

                    <div class="row justify-content-center">

                        <div class="col-12 col-md-12 col-lg-12">

                            <form>

                                <div class="pull-left">
                                    <h2 style={{ 'margin-left': '7px' }} class="titleDetails">Formulario de Mesas</h2>
                                </div>
                                <br />
                                <div class="card-contact border-primary rounded-0">

                                    <div class="form-group">
                                        <div>
                                            <input style={styleInput} type="text" class="form-control" id="fullname" name="fullname" placeholder="Codigo de mesa" required />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label>Colegio</label>
                                        <select class="custom-select">
                                            <option>-</option>
                                        </select>
                                    </div>

                                    <div class="pull-right space-button">
                                        <input style={{ 'margin-right': '30px' }} type="button" class="fadeIn fourth" value="Guardar" />
                                    </div>
                                    <br />
                                    <br />



                                </div>


                            </form>


                        </div>
                    </div>
                </div>

                <NotificationContainer />

            </div>
        );
    }
}

export default Tables;