import React, { Component } from 'react';
import '../resources/css/home.css';
import { getAllVotes } from '../common/ApiServices';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.handlerApiLogic();
        console.log("componentWillReceiveProps");
        console.log(this.state.votes);
    }

    componentDidMount() {
        this.handlerApiLogic();
        console.log("componentDidMount");
        console.log(this.state.votes);
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


    createTable() {
        console.log("create table");
        console.log(this.state.votes);
        var array = [];

        if (this.state.votes.length > 0) {
            this.state.votes.map(item => {
                array.push(

                    <div class="col-xs-12 col-sm-6 col-md-4">
                    <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                        <div class="mainflip">
                            <div class="frontside">
                                <div class="card">
                                    <div class="card-body text-center"><br/>
                                        <center><div class="circle"></div></center>
                                        <h4 class="card-title">{item.electoraltable.name}</h4>
                                        <p class="card-text">{item.electoraltable.electoralcollege.name}</p>
                                        <p class="card-text">Total de votos: 100</p>
                                    </div>
                                </div>
                            </div>
                            <div class="backside">
                                <div class="card">
                                    <div class="card-body text-center mt-4">
                                        <center class="backCustom">
                                        <h4 class="card-title">{item.electoraltable.name} </h4>
                                        <p class="card-text"></p>
                                        <p class="card-text">Total de votos: 100</p>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            });
            return array;
        }
    }


    render() {
        return (
            <div>
            <section id="team" class="pb-5">
                <div class="container" style={{'background':'#ffffffd6','border-radius':'6px'}}>
                    <h5 class="section-title h1">MIS VOTOS</h5>
                    <div class="row">
                            {this.createTable()}

                    
                    </div>
                </div>
                </section>
            </div>
        );
    }
}

export default Home;