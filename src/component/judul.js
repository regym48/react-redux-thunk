import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getJUDUL} from '../store/action/judulAction';
// import 'semantic-ui-css/semantic.min.css';
// import {Card, Input, Grid} from 'semantic-ui-react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "./judul.css";
import { Form, Row, Col, Card, ListGroup, Container, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

 class judul extends Component {
    constructor(props){
        super(props);
        this.state={
            mencari:'',
            offset:0,
            perPage:10,
            currentPage:0
        };
        this.handleCari = this.handleCari.bind(this);
        this.handlePagi = this.handlePagi.bind(this);
    };
    handleCari(event) {
        this.setState({mencari: event.target.value});
    }
    dataPagi(){
        axios
        .get(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => {
            const data = res.data;
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage)
            })
        });
    }
    handlePagi = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
            }, () => {
            this.dataPagi()
        });
    };
    componentDidMount(){
        this.props.getJUDUL();
    }
    render() {
        const {judul} = this.props.judul
        const slice = judul.slice(this.state.offset, this.state.offset + this.state.perPage)
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="3">
                            <Image src="https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_960_720.png" width="200" height="200"/>
                        </Col>
                        <Col md="auto">   
                            <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Cari Dokumen Berdasarkan Judul</Form.Label>
                                <Form.Control type="text" value={this.state.value} onChange={this.handleCari} />
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                {/* <Input icon='search' type="text" value={this.state.value} onChange={this.handleCari} placeholder='Cari Judul Catatan' /> */}
                {/* <Grid relaxed columns={5}> */}
                <div className="container">
                 {/* <div className="row"> */}
                 <Row className="justify-content-md-center">
                        {slice.filter((dat) =>{
                                if(this.state.mencari === ""){
                                    return dat
                                }else if (dat.title.toLowerCase().includes(this.state.mencari.toLocaleLowerCase())){
                                    return dat
                                }
                            }).map((dat, index)=>{
                            return(
                                // <Grid.Column>
                                // <Card key={index}>
                                //     <Card.Content header={dat.title} />
                                //     <Card.Content description={dat.body} />
                                // </Card>
                                // </Grid.Column>
                                        <Card key={index} border="danger" style={{ width: '18rem' }}>
                                        <Card.Header>{dat.title}</Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>{dat.body}</ListGroup.Item>
                                        </ListGroup>
                                        </Card>   
                            )
                        })}
                    </Row>
                 {/* </div> */}
                </div>
                {/* </Grid> */}
                <div className="container">
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePagi}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                </div>
                {/* <Pagination 
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePagi}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    totalPages={this.state.pageCount}/> */}
            </div>
        )
    }
}

    

const mapStateToProps  = (state) => ({judul:state.judul})

export default connect(mapStateToProps, {getJUDUL})(judul);