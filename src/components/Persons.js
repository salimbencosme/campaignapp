import React, { Component } from 'react';
import '../resources/css/home.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { getAllCollageAndTables,getCollageInfo,getTableInfo } from '../common/ApiServices';

var styleInput = {
    'text-align': 'initial',
    'width': '97%'
}


class Persons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collage:[],
            collage_id_selected: -1
        }

        this.handlerSelectItem  = this.handlerSelectItem.bind(this);
    }

    handlerApiLogic(){
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

    createSelectCollage(){
        let list = [];
        list.push(<option value="-1">-</option>);
        this.state.collage.forEach(element => {
            list.push(<option value={element.id}>{element.name}</option>);
        });
        return <select onChange={this.handlerSelectItem} class="custom-select">{list}</select>;
    }

    createSelectAge(){
        let list = [];
        for(let x=18;x<=150;x++){
            list.push(<option value={x}>{x}</option>);
        }
        return <select class="custom-select">{list}</select>;
    }


    createSelectTables(){

        if(this.state.collage_id_selected === -1){
            return <select class="custom-select"><option value="-1">-</option></select>;
        }else{
            let list = [];
            var ref_this = this;
            ref_this.state.table.forEach(element => {

                if(element.electoralcollege.id === ref_this.state.collage_id_selected){
                    list.push(<option value={element.id}>{element.name}</option>);
                }   
            });
            return <select class="custom-select">{list}</select>;
        }
    }

    handlerSelectItem(event){
        console.log(event.target.value);
        console.log(this.state.table);
        var this_holder = this;
        this_holder.setState({collage_id_selected:event.target.value}, function () {
            this_holder.createSelectTables();
        });
    }

    render() {
        return (
            <div class="body-div">
                <div class="container">

                    <div class="row justify-content-center">

                        <div class="col-12 col-md-12 col-lg-12">

                            <form>

                                <div class="pull-left">
                                    <h2 style={{ 'margin-left': '7px' }} class="titleDetails">Formulario de registro</h2>
                                </div>
                                <br />
                                <div class="card-contact border-primary rounded-0">

                                    <div class="form-group">
                                        <div>
                                            <input style={styleInput} type="text" class="form-control" id="fullname" name="fullname" placeholder="Nombre completo" required />
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <div>
                                            <input style={styleInput} type="text" class="form-control" id="fullname" name="fullname" placeholder="Cedula" required />
                                        </div>
                                    </div>

                                 

                                    <div class="form-group">
                                        <div>
                                            <input style={styleInput} type="text" class="form-control" id="fullname" name="fullname" placeholder="Correo electronico" required />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div>
                                            <input style={styleInput} type="text" class="form-control" id="fullname" name="fullname" placeholder="Telefono" required />
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
                                        <select class="custom-select">
                                            <option>Ciudadano</option>
                                            <option>Coordinador</option>
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

export default Persons;