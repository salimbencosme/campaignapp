import React, { Component } from 'react';
import '../resources/css/home.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { getAllCollageAndTables, getCollageInfo, getTableInfo, savePerson, getAllVotes } from '../common/ApiServices';
import { currentDateWithFormat } from '../common/Utils';

var styleInput = {
    'text-align': 'initial',
    'width': '97%'
}


class Persons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collage: [],
            collage_id_selected: -1,
            fullname: '',
            identification_card: '',
            email: '',
            phone: '',
            type: -1,
            collage: '',
            user_type: 'ciudadano',
            collage_id: '',
            table_id: '',
            age: 18,
            table: ''
        }

        this.handlerSelectItem = this.handlerSelectItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        console.log(event);
        this.setState(
            {
                fullname: (event.target.id === 'fullname') ? event.target.value : this.state.fullname,
                identification_card: (event.target.id === 'cedula') ? event.target.value : this.state.identification_card,
                email: (event.target.id === 'email') ? event.target.value : this.state.email,
                phone: (event.target.id === 'phone') ? event.target.value : this.state.phone,
                user_type: (event.target.id === 'user_type') ? event.target.value : this.state.user_type,
                age: (event.target.id === 'age') ? event.target.value : this.state.age,
                table_id: (event.target.id === 'table') ? event.target.value : this.state.table_id
            }
        );

        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        var this_ref = this;
        if (this.state.table_id != "") {

            console.log(this.state);

            var electoraltableTemp = {};

            console.log(this.state.table);

            this.state.table.forEach(element => {
                if (element.id === this.state.table_id) {
                    electoraltableTemp = element;
                }
            });


            var info = {
                active: true,
                citizen: {
                    active: true,
                    age: this.state.age,
                    email: this.email,
                    identification: this.state.identification_card,
                    name: this.state.fullname,
                    phone: this.state.phone,
                    type: this.state.user_type
                },
                date_cretated: currentDateWithFormat(),
                electoraltable: electoraltableTemp
            };


            console.log("INFO");
            console.log(info);

            var id_to_compare = this.state.identification_card;
            var contador = -1;
            var saved = false;
            getAllVotes().on('value', function (data) {
                let infoData = data.val();
                contador = 0;
                for (var key in infoData) {
                    if (infoData[key].citizen.identification === id_to_compare && infoData[key].active === true) {
                        contador++;
                    }
                }
            }, function (error) {
                console.log("Error validadando celdula duplicada: " + error.code);
            });

            if (contador === 0) {
                try {
                    if(saved === false){
                        savePerson(info);
                        saved = true;
                        this_ref.setState(
                            {
                                collage_id_selected: -1,
                                fullname: '',
                                identification_card: '',
                                email: '',
                                phone: '',
                                type: -1,
                                user_type: 'ciudadano',
                                collage_id: '',
                                table_id: '',
                                age: 18
                            }
                        );
                        document.getElementById("personFromId").reset();
                    }
                    id_to_compare = "";
                    NotificationManager.success("Persona registrada con éxito");
                } catch (e) {
                    NotificationManager.error("No se pudo guardar la información.");
                }

            } else {
                NotificationManager.error("Existe una persona registrada con este numero de celula.");
            }



        } else {
            NotificationManager.error("Debe seleccionar un colegio electoral.");
        }

    }


    handlerApiLogic() {
        let currentComponent = this;
        getAllCollageAndTables().on('value', function (data) {
            let collageTemp = getCollageInfo(data.val());
            let tableTemp = getTableInfo(data.val());
            currentComponent.setState({
                collage: collageTemp,
                table: tableTemp
            });

        }, function (error) {
            console.log("Error Collages and tables: " + error.code);
        });
    }

    componentWillReceiveProps(nextProps) {
        this.handlerApiLogic();
        console.log("componentWillReceiveProps");
        console.log(this.state.collage);
    }

    componentDidMount() {
        this.handlerApiLogic();
        console.log("componentDidMount");
        console.log(this.state.collage);
    }

    createSelectCollage() {
        let list = [];
        list.push(<option value="-1">-</option>);

        if (this.state.collage != "") {

            this.state.collage.forEach(element => {
                list.push(<option value={element.id}>{element.name}</option>);
            });
        }

        return <select id="collage_id" name="collage_id" onChange={this.handlerSelectItem} class="custom-select">{list}</select>;
    }

    createSelectAge() {
        let list = [];
        for (let x = 18; x <= 150; x++) {
            list.push(<option value={x}>{x}</option>);
        }
        return <select onChange={this.handleChange} id="age" name="age" class="custom-select">{list}</select>;
    }

    createSelectTables() {

        if (this.state.collage_id_selected === -1) {
            return <select class="custom-select"><option value="-1">-</option></select>;
        } else {
            let list = [];
            var ref_this = this;
            ref_this.state.table.forEach(element => {
                if (element.electoralcollege.id === ref_this.state.collage_id_selected) {
                    list.push(<option value={element.id}>{element.name}</option>);
                }
            });
            return <select id="table" name="table" class="custom-select" onChange={this.handleChange}>{list}</select>;
        }
    }

    handlerSelectItem(event) {
        var this_holder = this;
        this_holder.setState({ collage_id_selected: event.target.value }, function () {
            this_holder.createSelectTables();

            if (this.state.table != "") {
                let firstIdSelected = 0;
                let cont = 0;
                this.state.table.forEach(element => {

                    if (element.electoralcollege.id === this.state.collage_id_selected) {
                        if (cont === 0) {
                            firstIdSelected = element.id;
                            cont++;
                        }
                    }
                });

                this.setState({ table_id: firstIdSelected });

            }
        });
    }

    render() {
        return (
            <div class="body-div">
                <div class="container">

                    <div class="row justify-content-center">

                        <div class="col-12 col-md-12 col-lg-12">

                            <form id="personFromId" onSubmit={this.handleSubmit}>

                                <div class="pull-left">
                                    <h2 style={{ 'margin-left': '7px' }} class="titleDetails">Formulario de registro</h2>
                                </div>
                                <br />
                                <div class="card-contact border-primary rounded-0">

                                    <div class="form-group">
                                        <div>
                                            <input style={styleInput} type="text" class="form-control" id="fullname" name="fullname" placeholder="Nombre completo" onChange={this.handleChange} required />
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <div>
                                            <input style={styleInput} type="text" class="form-control" id="cedula" name="cedula" placeholder="Cedula" onChange={this.handleChange} required />
                                        </div>
                                    </div>



                                    <div class="form-group">
                                        <div>
                                            <input style={styleInput} type="text" class="form-control" id="email" name="email" placeholder="Correo electronico" onChange={this.handleChange} required />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div>
                                            <input style={styleInput} type="text" class="form-control" id="phone" name="phone" placeholder="Telefono" onChange={this.handleChange} required />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div>
                                            <div class="form-group">

                                                <label>Edad</label>
                                                {this.createSelectAge()}
                                            </div>
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <label>Tipo</label>
                                        <select id="user_type" name="user_type" class="custom-select" onChange={this.handleChange} >
                                            <option value="ciudadano">Ciudadano</option>
                                            <option value="coordinador">Coordinador</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label>Colegio</label>
                                        {this.createSelectCollage()}
                                    </div>

                                    <div class="form-group">
                                        <label>Mesa</label>
                                        {this.createSelectTables()}
                                    </div>

                                    <div class="pull-right space-button">
                                        <input style={{ 'margin-right': '30px' }} type="submit" class="fadeIn fourth" value="Guardar" />
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

export default Persons;