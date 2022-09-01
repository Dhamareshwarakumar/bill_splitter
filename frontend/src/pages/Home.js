import React from 'react';

import DonutChart from '../components/DonutChart';

const Home = () => {
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
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="row mb-5 pb-5 justify-content-center">
                            <div className="col-10 col-md-6 my-3 p-3 home_info_container">
                                <div className="row align-items-stretch">
                                    <div className="col-4 text-center">
                                        $400 <br />
                                        <b>Will Pay</b>
                                    </div>
                                    <div className="col-4 text-center">
                                        $400 <br />
                                        <b>Will Get</b>
                                    </div>
                                    <div className="col-4 text-center">
                                        $400 <br />
                                        <b>Balance</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row gap-1 gap-md-4 justify-content-around home_groups_container mostly-customized-scrollbar align-items-start">
                            <div className="col-3 text-center home_grp_item py-2">
                                Add Group <br />
                                <i class="bi bi-person-plus-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 1 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 2 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 3 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 4 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            {/* <div className="col-3 text-center home_grp_item py-2">
                                Group 5 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 6 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 7 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 8 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 9 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 10 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 11 <br />
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div className="col-3 text-center home_grp_item py-2">
                                Group 12 <br />
                                <i class="bi bi-people-fill"></i>
                            </div> */}
                        </div>

                    </div>
                    <div className="col-md-6 test">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <DonutChart data={data} />
                            </div>
                        </div>
                        <div className="row gap-2 mt-4 justify-content-center home_expenditures_container mostly-customized-scrollbar">
                            <div className="col-10 home_expenditure py-1">
                                <div className="row px-3 py-1 justify-content-between">
                                    <div className="col-auto">$400</div>
                                    <div className="col-auto">2022/9/1</div>
                                </div>
                                <div className="row px-3 py-1">
                                    <div className="col-auto badge rounded-pill text-bg-warning">Category</div>
                                    <div className="col-auto">
                                        Description of the expenditure
                                    </div>
                                </div>
                            </div>
                            <div className="col-10 home_expenditure py-1">
                                <div className="row px-3 py-1 justify-content-between">
                                    <div className="col-auto">$400</div>
                                    <div className="col-auto">2022/9/1</div>
                                </div>
                                <div className="row px-3 py-1">
                                    <div className="col-auto badge rounded-pill text-bg-warning">Category</div>
                                    <div className="col-auto">
                                        Description of the expenditure
                                    </div>
                                </div>
                            </div>
                            <div className="col-10 home_expenditure py-1">
                                <div className="row px-3 py-1 justify-content-between">
                                    <div className="col-auto">$400</div>
                                    <div className="col-auto">2022/9/1</div>
                                </div>
                                <div className="row px-3 py-1">
                                    <div className="col-auto badge rounded-pill text-bg-warning">Category</div>
                                    <div className="col-auto">
                                        Description of the expenditure
                                    </div>
                                </div>
                            </div>
                            <div className="col-10 home_expenditure py-1">
                                <div className="row px-3 py-1 justify-content-between">
                                    <div className="col-auto">$400</div>
                                    <div className="col-auto">2022/9/1</div>
                                </div>
                                <div className="row px-3 py-1">
                                    <div className="col-auto badge rounded-pill text-bg-warning">Category</div>
                                    <div className="col-auto">
                                        Description of the expenditure
                                    </div>
                                </div>
                            </div>
                            <div className="col-10 home_expenditure py-1">
                                <div className="row px-3 py-1 justify-content-between">
                                    <div className="col-auto">$400</div>
                                    <div className="col-auto">2022/9/1</div>
                                </div>
                                <div className="row px-3 py-1">
                                    <div className="col-auto badge rounded-pill text-bg-warning">Category</div>
                                    <div className="col-auto">
                                        Description of the expenditure
                                    </div>
                                </div>
                            </div>
                            <div className="col-10 home_expenditure py-1">
                                <div className="row px-3 py-1 justify-content-between">
                                    <div className="col-auto">$400</div>
                                    <div className="col-auto">2022/9/1</div>
                                </div>
                                <div className="row px-3 py-1">
                                    <div className="col-auto badge rounded-pill text-bg-warning">Category</div>
                                    <div className="col-auto">
                                        Description of the expenditure
                                    </div>
                                </div>
                            </div>
                            <div className="col-10 home_expenditure py-1">
                                <div className="row px-3 py-1 justify-content-between">
                                    <div className="col-auto">$400</div>
                                    <div className="col-auto">2022/9/1</div>
                                </div>
                                <div className="row px-3 py-1">
                                    <div className="col-auto badge rounded-pill text-bg-warning">Category</div>
                                    <div className="col-auto">
                                        Description of the expenditure
                                    </div>
                                </div>
                            </div>
                            <div className="col-10 home_expenditure py-1">
                                <div className="row px-3 py-1 justify-content-between">
                                    <div className="col-auto">$400</div>
                                    <div className="col-auto">2022/9/1</div>
                                </div>
                                <div className="row px-3 py-1">
                                    <div className="col-auto badge rounded-pill text-bg-warning">Category</div>
                                    <div className="col-auto">
                                        Description of the expenditure
                                    </div>
                                </div>
                            </div>
                            <div className="col-10 home_expenditure py-1">
                                <div className="row px-3 py-1 justify-content-between">
                                    <div className="col-auto">$400</div>
                                    <div className="col-auto">2022/9/1</div>
                                </div>
                                <div className="row px-3 py-1">
                                    <div className="col-auto badge rounded-pill text-bg-warning">Category</div>
                                    <div className="col-auto">
                                        Description of the expenditure
                                    </div>
                                </div>
                            </div>
                            <div className="col-10 home_expenditure py-1">
                                <div className="row px-3 py-1 justify-content-between">
                                    <div className="col-auto">$400</div>
                                    <div className="col-auto">2022/9/1</div>
                                </div>
                                <div className="row px-3 py-1">
                                    <div className="col-auto badge rounded-pill text-bg-warning">Category</div>
                                    <div className="col-auto">
                                        Description of the expenditure
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home