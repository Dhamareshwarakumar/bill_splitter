import React from 'react'

const Member = ({ role, name }) => {
    const bg = role === 'admin' ? 'bg-success' : 'bg-primary'
    return (
        <div className='member-card'>
            <div className={`badge ` + bg}>{role}</div>
            <div className="text-center">
                <i class="bi bi-person-circle" style={{ fontSize: "5rem" }}></i>
            </div>
            <div className="text-center">{name}</div>
            <div>
                {/* <button className="btn btn-danger btn-sm">Remove</button> */}
            </div>
        </div >
    )
}

export default Member