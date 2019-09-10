import React, { Component } from 'react';
import '../resources/css/home.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { getAllVotes } from '../common/ApiServices';



var styleInput = {
    'text-align': 'initial',
    'width': '97%'
}

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: []
        }
    }


    componentWillReceiveProps(nextProps) {

        if(localStorage.getItem('user-storage') != null){
            this.handlerApiLogic();
            console.log("componentWillReceiveProps");
            console.log(this.state.votes);      
        }else{
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        if(localStorage.getItem('user-storage') != null){
            this.handlerApiLogic();
            console.log("componentDidMount");
            console.log(this.state.votes);      
        }else{
            this.props.history.push('/');
        }
    }

    handlerApiLogic() {
        console.log("somebody called me salim ");
        let currentComponent = this;

        getAllVotes().on('value', function (data) {
            let infoData = data.val();
            var votesContainer = [];

            for (var key in infoData) {
                if (infoData[key].active === true) {
                    votesContainer.push(
                        {
                            active: infoData[key].active,
                            citizen: {
                                active: infoData[key].citizen.active,
                                age: infoData[key].citizen.age,
                                email: infoData[key].citizen.email,
                                identification: infoData[key].citizen.identification,
                                name: infoData[key].citizen.name,
                                phone: infoData[key].citizen.phone,
                                type: infoData[key].citizen.type
                            },
                            date_cretated: infoData[key].date_cretated,
                            electoraltable: {
                                active: infoData[key].electoraltable.active,
                                date_cretated: infoData[key].electoraltable.date_created,
                                electoralcollege: {
                                    active: infoData[key].electoraltable.electoralcollege.active,
                                    address: infoData[key].electoraltable.electoralcollege.address,
                                    date_cretated: infoData[key].electoraltable.electoralcollege.date_cretated,
                                    id: infoData[key].electoraltable.electoralcollege.id,
                                    name: infoData[key].electoraltable.electoralcollege.name,
                                    pic: infoData[key].electoraltable.electoralcollege.pic,
                                    video: infoData[key].electoraltable.electoralcollege.video
                                },
                                id: infoData[key].electoraltable.id,
                                name: infoData[key].electoraltable.name
                            }
                        }
                    );
                }
            }


            currentComponent.setState({
                votes: votesContainer
            });

        }, function (error) {
            console.log("Error loding votes: " + error.code);
        });
    }


    orderTable(votesContainer) {
        console.log("ORDER TABLE");
        /*ORDER */
        var infoTemp = votesContainer;
        var titleTemp = [];
        var tableTempOrder = [];
        for (var x = 0; x < infoTemp.length; x++) {

            var toAdd = 0;
            for (var f = 0; f < titleTemp.length; f++) {
                if (infoTemp[x].electoraltable.electoralcollege.name === titleTemp[f]) {
                    toAdd++;
                }
            }

            if (toAdd === 0) {

                titleTemp.push(infoTemp[x].electoraltable.electoralcollege.name);
                for (var k = 0; k < votesContainer.length; k++) {
                    if (votesContainer[k].electoraltable.electoralcollege.name === infoTemp[x].electoraltable.electoralcollege.name) {
                        tableTempOrder.push(votesContainer[k]);
                    }
                }
            }


        }

        /** END ORDER */

        return tableTempOrder;

    }


    createTable() {
        console.log("create table");
        console.log(this.state.votes);
        var array = [];

        array.push(
            <tr>
                
                    <th>NOMBRE</th>
                    <th>CÉDULA</th>
                    <th>EDAD</th>
                    <th>CONTACTOS</th>
                    <th>CENTRO</th>
                    <th>COLEGIO</th>
                    <th>REGISTRADO</th>
            
            </tr>
        );

        if (this.state.votes.length > 0) {

            var votesOrdered = this.orderTable(this.state.votes);

            votesOrdered.map(item => {
                array.push(
                    <tr>
                        <td>{item.citizen.name}</td>
                        <td>{item.citizen.identification}</td>
                        <td>{item.citizen.age}</td>
                        <td>
                            <b>Email: </b>{item.citizen.email === undefined ? 'N/A' : item.citizen.email}
                            <br />
                            <b>Telefono(s): </b>{item.citizen.phone}
                        </td>
                        <td>{item.electoraltable.electoralcollege.name}</td>
                        <td>{item.electoraltable.name}</td>
                        <td>{item.date_cretated}</td>
                    </tr>)
            });
            return array;
        }
    }




    render() {
        return (
            <div class="body-div">
                <div class="container">

                    <div class="row justify-content-center">

                        <div class="col-12 col-md-12 col-lg-12">

                            <form>

                                <div class="pull-left">
                                    <h2 style={{ 'margin-left': '7px' }} class="titleDetails">CIUDADANOS REGISTRADOS</h2>
                                </div>
                                <br />
                                <div class="card-contact border-primary rounded-0">

                                    <table id="customers" >
                                            {this.createTable()}
                                    </table>



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


export default Reports;