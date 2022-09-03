import React from 'react'

const GroupItem = ({ name }) => {
    return (
        <div className="col-3 text-center home_grp_item py-2">
            {name} <br />
            <i className="bi bi-people-fill"></i>
        </div>
    )
}

export default GroupItem