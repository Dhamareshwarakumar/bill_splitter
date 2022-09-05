import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";
import axios from 'axios';

import { getGroups } from '../actions/groupActions';

import GroupMiniBar from '../components/GroupMiniBar';
import TotalExpense from '../components/TotalExpense';
import Member from '../components/Member';
import AddExpense from '../components/AddExpense';
import ExpenseItem from '../components/ExpenseItem';
import Transactions from '../components/Transactions';
import Payments from '../components/Payments';
import AddMember from '../components/AddMember';


const Group = props => {
    const params = useParams();

    const [currentSection, setCurrentSection] = useState('expenses');
    // const [currentGroup, setCurrentGroup] = useState(null);
    const [members, setMembers] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        props.getGroups();
    }, []);

    useEffect(() => {
        if (props.groups.length !== 0) {
            const currentGroup = props.groups.filter(group => group._id === params.groupId);
            setMembers(currentGroup[0].members);
        }
    }, [props.groups, params.groupId]);

    const test = () => {
        if (props.groups.length !== 0) {
            const currentGroup = props.groups.filter(group => group._id === params.groupId);
            setMembers(currentGroup[0].members);
        }
    }

    useEffect(() => {
        axios.get('/api/expenses/group/' + params.groupId)
            .then(res => {
                setExpenses(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const getTotalGrpExpense = () => {
        let amount = 0;
        expenses.length !== 0 && expenses.forEach(expense => {
            amount += expense.amount;
        });
        return amount;
    }

    const updateExpenses = () => {
        axios.get('/api/expenses/group/' + params.groupId)
            .then(res => {
                setExpenses(res.data);
            })
            .catch(err => console.error(err));
    }


    return (
        <section id="group" className='container'>
            <div className="row justify-content-center my-2">
                <div className='col-auto'>
                    <GroupMiniBar setCurrentSection={setCurrentSection} />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10 col-lg-5">
                    <TotalExpense amount="9850" getTotalGrpExpense={getTotalGrpExpense} />
                </div>
            </div>
            <div className="row justify-content-center" style={{ minHeight: "70vh" }}>
                {currentSection === 'members' && <Members members={members} test={test} />}
                {currentSection === 'expenses' && <Expenses expenses={expenses} />}
                {currentSection === 'transactions' && <Transactions expenses={expenses} members={members} getTotalGrpExpense={getTotalGrpExpense} groupId={params.groupId} />}
                {currentSection === 'payments' && <Payments />}
            </div>
            <AddExpense members={members} groupId={params.groupId} toast={toast} updateExpenses={updateExpenses} />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
            />
        </section>
    )
}

const mapStateToProps = store => ({
    groups: store.groups
});

export default connect(mapStateToProps, { getGroups })(Group)

export const Members = ({ members, test }) => {
    return (
        <>
            <div className="col-md-3">
                <AddMember test={test} />
            </div>
            {members.map(member => (
                <div className="col-md-3">
                    <Member key={member._id} role={member.role} name={member.id.name} />
                </div>
            ))}
        </>
    )
}

export const Expenses = ({ expenses }) => {
    return (
        <>
            {expenses.length !== 0 && expenses.map(expense => (
                <div className="col-md-4">
                    <ExpenseItem key={expense._id} expense={expense} />
                </div>
            ))}
        </>
    )
}
