import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getJUDUL} from '../store/action/judulAction';
import 'semantic-ui-css/semantic.min.css';
import {Card, Input} from 'semantic-ui-react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "./judul.css";

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
                <Input icon='search' type="text" value={this.state.value} onChange={this.handleCari} placeholder='Cari Judul Catatan' />
                {slice.filter((dat) =>{
                        if(this.state.mencari === ""){
                            return dat
                        }else if (dat.title.toLowerCase().includes(this.state.mencari.toLocaleLowerCase())){
                            return dat
                        }
                    }).map((dat, index)=>{
                    return(
                        <Card key={index}>
                            <Card.Content header={dat.title} />
                            <Card.Content description={dat.body} />
                        </Card>
                    )
                })}
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