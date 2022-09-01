import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-auto text-center">
                        &copy; {new Date().getFullYear()} - Bill Splitter <br />
                        Made with 💖 by Dhamareshwarakumar
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer