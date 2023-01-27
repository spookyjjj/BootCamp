const Login = () => {
    return (
        <>
            <div className="login">
            <h1 className="h3 mb-3 fw-normal">Boot Camp</h1>

            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label htmlFor="floatingInput">Id</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3">
                <input type="checkbox" value="remember-me"/> Remember me
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
                </div>
        </>
    )
};
export default Login;