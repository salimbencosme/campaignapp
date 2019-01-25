import React, { Component } from 'react';

import Nav from '../components/Nav';
import { Grid, Row, Col } from 'react-bootstrap';



class Main extends Component {

    constructor(props) {
        super(props);
    }

 
    render() {

        return (
            <div>
                <Nav  classparam="nav-bar-style-blue" />
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={12}>
                            <br />
                            {this.props.children}
                            <br />
                        </Col>
                    </Row>

                </Grid>

            </div>

        );

    }


}
export default Main;