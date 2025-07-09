function Signin() {
    return (
        <div  className="d-flex  justify-content-center align-items-center" style={{ height: '500px' }}>
            <form>
                <div id="signin-container" className="form-group">
                    <label htmlFor="fullName">Name</label>
                    <input type="text" id="fullName" className="form-control mb-3"></input>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control mb-3"></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control  mb-3"></input>
                    <input className="btn btn-primary" type="submit"></input>
                </div>
            </form>
        </div >
    )
}

export default Signin