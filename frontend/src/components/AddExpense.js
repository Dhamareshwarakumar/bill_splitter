import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios';


const AddExpense = ({ members, groupId, toast, updateExpenses }) => {
    const [show, setShow] = useState(false);
    const initialState = {
        groupId: groupId,
        description: '',
        amount: '',
        category: '',
        paidBy: ''
    }
    const [form, setForm] = useState(initialState);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleInputChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleForm = e => {
        e.preventDefault();
        axios.post('/api/expenses', form)
            .then(res => {
                setForm(initialState);
                handleClose();
                updateExpenses();
                toast.success(res.data.msg);
            })
            .catch(err => {
                if (err.response.data.msg === 'Valiodation Failed') {
                    toast.error(err.response.data.msg);
                }
            });
    }

    const isSelected = id => {
        return form.paidBy === id;
    }

    return (
        <>
            <div className="floating-button " onClick={handleShow}>
                <i class="bi bi-plus-circle-fill"></i>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="row">
                        <h1 className="text-center">Add Expense</h1>
                        <hr />
                        <form>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    placeholder="Description"
                                    style={{ borderRadius: "20px" }}
                                    value={form.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    className="form-control"
                                    placeholder="Category"
                                    style={{ borderRadius: "20px" }}
                                    value={form.category}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className="form-control"
                                    placeholder="Amount"
                                    style={{ borderRadius: "20px" }}
                                    value={form.amount}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <select
                                    className="form-select"
                                    style={{ borderRadius: "20px" }}
                                    aria-label="Default select example"
                                    name="paidBy"
                                    onChange={handleInputChange}
                                >
                                    <option selected disabled value=''>Paid By</option>
                                    {members.length !== 0 && members.map(member => (
                                        <option value={member.id._id} selected={isSelected(member.id._id)}>{member.id.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group d-grid">
                                <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px" }} onClick={handleForm}>Add Expense</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddExpense