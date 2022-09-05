import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers } from '../actions/userActions';



const AddGroup = props => {
    const navigate = useNavigate()
    const params = useParams();
    const [form, setForm] = useState({
        name: ''
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleForm = e => {
        e.preventDefault();
        axios.put('/api/groups/add_members', {
            groupId: params.groupId,
            members: [form.name]
        })
            .then(res => {
                props.test();
                handleClose();
                props.getUsers();
                navigate('/')
                alert('Member added successfully');
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className="col-auto text-center grpMember" onClick={handleShow}>
                <div className='member-card'>
                    <div className={`badge ` + 'light'}>{' '}</div>
                    <div className="text-center">
                        <i class="bi bi-plus-circle-fill" style={{ fontSize: "5rem" }}></i>
                    </div>
                    <div className="text-center">Add Member</div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="row">
                        <h1 className="text-center">Add Group</h1>
                        <hr />
                        <form>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-12">
                                        <select
                                            className="form-select"
                                            style={{ borderRadius: "20px" }}
                                            aria-label="Default select example"
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                        >
                                            <option selected disabled value=''>Select Members</option>
                                            {props.users.length !== 0 && props.users.map(user => (
                                                <option value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="d-grid my-3">
                                <button className="btn btn-success" type="button" onClick={handleForm}>Create Group</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}


const mapStateToProps = state => ({
    users: state.users,
    auth: state.auth
});


export default connect(mapStateToProps, { getUsers })(AddGroup)