import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { getUsers } from '../actions/userActions';
import { addGroup } from '../actions/groupActions';

const AddGroup = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [users, setUsers] = useState([]);
    const initialFormState = {
        name: '',
        members: []
    }
    const [form, setForm] = useState(initialFormState)

    useEffect(() => {
        props.getUsers();
        setForm(initialFormState);
    }, []);

    useEffect(() => {
        setUsers(props.users.length && props.users.filter(user => user.id !== props.auth.user.id));
    }, [props.users, props.auth.user.id]);

    const addMember = e => {
        e.preventDefault();

        setForm({
            ...form,
            members: [...form.members, {
                id: uuidv4(),
                value: ''
            }]
        })
    }

    const removeMember = id => {
        setForm({
            ...form,
            members: form.members.filter(member => member.id !== id)
        });
    }

    const handleMember = (id, value) => {
        setForm({
            ...form,
            members: form.members.map(member => {
                if (member.id === id) {
                    member.value = value;
                }
                return member;
            })
        })
    }

    const handleForm = e => {
        e.preventDefault();

        let members = form.members.map(member => member.value);
        members = members.filter(member => member !== '');
        members = [...new Set([...members, props.auth.user.id])];
        const newForm = {
            name: form.name,
            members
        }

        props.addGroup(newForm, () => {
            setForm(initialFormState);
            handleClose();
        })
    }


    return (
        <>
            <div className="col-auto text-center home_grp_item py-2" onClick={handleShow}>
                Add Group <br />
                <i className="bi bi-person-plus-fill"></i>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="row">
                        <h1 className="text-center">Add Group</h1>
                        <hr />
                        <form>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    name="groupName"
                                    id="groupName"
                                    className="form-control"
                                    placeholder="Group Name"
                                    style={{ borderRadius: "20px" }}
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            {form.members.length !== 0 && form.members.map((member, index) => (
                                <AddMember
                                    key={index}
                                    member={member}
                                    users={users}
                                    handleMember={handleMember}
                                    removeMember={removeMember}
                                />
                            ))}
                            <div className='d-flex'>
                                <button type='button' className="btn btn-primary ms-auto" onClick={addMember}>Add Member</button>
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


export const AddMember = ({ member, users, handleMember, removeMember }) => {
    const isSelected = id => {
        if (member.value) {
            return member.value === id ? true : false;
        }
    }
    return (
        <div className="form-group mb-3">
            <div className="row">
                <div className="col-10">
                    <select
                        className="form-select"
                        style={{ borderRadius: "20px" }}
                        aria-label="Default select example"
                        onChange={e => handleMember(member.id, e.target.value)}
                    >
                        <option selected disabled value=''>Select Members</option>
                        {users.length !== 0 && users.map(user => (
                            <option value={user.id} selected={isSelected(user.id)}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-danger" onClick={() => removeMember(member.id)}>X</button>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, { getUsers, addGroup })(AddGroup);