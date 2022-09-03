import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DonutChart from '../components/DonutChart';
import ExpenditureItem from '../components/ExpenditureItem';
import GroupItem from '../components/GroupItem';
import HomeInfo from '../components/HomeInfo';

const Home = props => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.auth.isAuthenticated) {
            navigate('/login');
        }
    }, []);

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
                            <div className="col-3 text-center home_grp_item py-2">
                                Add Group <br />
                                <i className="bi bi-person-plus-fill"></i>
                            </div>
                            <GroupItem name="Group 1" />
                            <GroupItem name="Group 2" />
                            <GroupItem name="Group 3" />
                            <GroupItem name="Group 4" />
                            <GroupItem name="Group 5" />
                            {/* <GroupItem name="Group 6" />
                            <GroupItem name="Group 7" />
                            <GroupItem name="Group 8" />
                            <GroupItem name="Group 9" />
                            <GroupItem name="Group 10" /> */}
                        </div>

                    </div>
                    <div className="col-md-6 test">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <DonutChart data={data} />
                            </div>
                        </div>
                        <div className="row gap-2 mt-4 justify-content-center home_expenditures_container mostly-customized-scrollbar">
                            <ExpenditureItem amount="140" date="2022/9/1" category="Food" description="Shawarma at The Shawarma Company Eluru" />
                            <ExpenditureItem amount="150" date="2022/9/1" category="Movies" description="Liger Movie at Satyanarya Cinemas Eluru" />
                            <ExpenditureItem amount="689" date="2022/9/1" category="Bills" description="Home Electricity Bill" />
                            <ExpenditureItem amount="18" date="2022/9/1" category="Others" description="Printout, Family Medicare Form from Riktam" />
                            <ExpenditureItem amount="50" date="2022/9/1" category="Others" description="Type C OTG for Macbook" />
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
    auth: store.auth
});

export default connect(mapStateToProps, null)(Home)