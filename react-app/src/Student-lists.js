import React, { Component } from 'react'
import Student from './Student'
import { connect } from 'react-redux';
import * as action from './action'

class StudenLists extends Component {
    componentDidMount(){
        this.props.getAllStudents()
    }


    render() {
        const { studentsFromStore, loading } = this.props;
        let lists = (
            <div className='col-12 mx-auto'>
                <div className='alert-info text-center pt-5 pb-5'>
                    ไม่พบข้อมูลนักเรียน
                </div>
            </div>
        )

        if(studentsFromStore.length > 0){
            lists = studentsFromStore.map(item=>(
                <div className='col-12 col-sm-6 col-lg-4 mt-3' key={item.id}>
                    <Student data={item} />
                </div>
            ))
        }
        if(loading === true){
            return (
                <div className='d-flex justify-content-center p-5'>
                    <div className='spinner-grow text-secondary' role="status">
                        <span className='visually-hidden'>
                            Loading ...
                        </span>
                    </div>
                </div>
            )
        }
        return (
            <div className='row'>
                {lists}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        studentsFromStore : state.students,
        loading : state.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllStudents: () => {
            return dispatch(action.getStudentLists())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudenLists);

