import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getGroups } from '../actions/groupActions';

import DonutChart from '../components/DonutChart';
import ExpenditureItem from '../components/ExpenditureItem';
import GroupItem from '../components/GroupItem';
import HomeInfo from '../components/HomeInfo';
import AddGroup from '../components/AddGroup';

const Home = props => {
    const navigate = useNavigate();

    const [myGroups, setMyGroups] = useState([]);

    useEffect(() => {
        if (!props.auth.isAuthenticated) {
            navigate('/login');
        }
        props.getGroups();
    }, []);

    useEffect(() => {
        setMyGroups(props.groups)
    }, [props.groups]);

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <section id="home">
            <div className="container">
                <div className="row align-items-center gap-5">
                    <div className="col-md-5">
                        <div className="row mb-5 pb-mb-5 justify-content-center">
                            <HomeInfo willPay="400" willGet="200" balance="200" />
                        </div>
                        <div className="row gap-1 gap-md-4 justify-content-around home_groups_container mostly-customized-scrollbar align-items-start">
                            <AddGroup />
                            {myGroups.length !== 0 && myGroups.map((group, index) => (
                                // <div className="col-4 text-center home_grp_item py-2 border border-light">
                                <Link to={`group/${group._id}`} style={{ textDecoration: 'none', color: "#fff" }} className="col-auto text-center home_grp_item py-2">
                                    <GroupItem key={index} name={group.name} />
                                </Link>
                                // </div>

                            ))}
                        </div>

                    </div>
                    <div className="col-md-6 test">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <DonutChart data={data} />
                            </div>
                        </div>
                        <div className="row gap-2 mt-4 justify-content-center home_expenditures_container mostly-customized-scrollbar">
                            <ExpenditureItem amount="140" date="2022/9/1" category="Food" description="Test 1" />
                            <ExpenditureItem amount="150" date="2022/9/1" category="Movies" description="Test 2" />
                            <ExpenditureItem amount="689" date="2022/9/1" category="Bills" description="Test 3" />
                            <ExpenditureItem amount="18" date="2022/9/1" category="Others" description="Test 4" />
                            <ExpenditureItem amount="50" date="2022/9/1" category="Others" description="Test 5" />
                            <ExpenditureItem amount="100" date="2022/9/1" category="Food" description="Description of the expenditure" />
                            <ExpenditureItem amount="100" date="2022/9/1" category="Food" description="Description of the expenditure" />
                            <ExpenditureItem amount="100" date="2022/9/1" category="Food" description="Description of the expenditure" />
                            <ExpenditureItem amount="100" date="2022/9/1" category="Food" description="Description of the expenditure" />
                            <ExpenditureItem amount="100" date="2022/9/1" category="Food" description="Description of the expenditure" />
                            <ExpenditureItem amount="100" date="2022/9/1" category="Food" description="Description of the expenditure" />
                            <ExpenditureItem amount="100" date="2022/9/1" category="Food" description="Description of the expenditure" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


const mapStateToProps = store => ({
    auth: store.auth,
    groups: store.groups
});

export default connect(mapStateToProps, { getGroups })(Home)
