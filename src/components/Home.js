import React, { Component } from 'react';
import '../resources/css/home.css';
import { getAllVotes,getVotesInfo } from '../common/ApiServices';

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
            var votesContainer = getVotesInfo(infoData);

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

                var color = 'red';

                if(item.total <= 5 ){
                    color = 'red';
                }else if(item.total > 5 && item.total <=10){
                    color = 'orange';
                }else if(item.total >10){
                    color ='green';
                }

                array.push(

                    <div class="col-xs-12 col-sm-6 col-md-4">
                    <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                        <div class="mainflip">
                            <div class="frontside">
                                <div class="card">
                                    <div class="card-body text-center"><br/>
                                        <center><div class="circle" style={{'background': color}}></div></center>
                                        <p class="card-text">{item.collage}</p>
                                        <p class="card-text">Total de votos: {item.total}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="backside" style={{'background': color}}>
                                <div class="card">
                                    <div class="card-body text-center mt-4">
                                        <center class="backCustom">
                                        <h4 class="card-title">{item.collage} </h4>
                                        <p class="card-text"></p>
                                        <p class="card-text">Total de votos: {item.collage}</p>
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