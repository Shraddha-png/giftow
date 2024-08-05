import React from "react";

function ModelPop() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    {/* login - Signin Screen */ }
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("/login", { email, password })
            .then(result => {
                console.log(result)
                if (result.data === "Success") {
                    navigate("/home")
                } else {
                    navigate("/register")
                    alert("You are not registered to this service")

                }

            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
            <div className="modal" show={show} onHide={handleClose} tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            {/* login - Signin Screen */}
                            <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
                                <div className="bg-white p-3 rounded w-25">
                                    <h2><center>Login</center></h2>
                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-3">
                                            <label htmlFor="email">
                                                <strong>Email</strong>
                                            </label>
                                            <input type="text"
                                                placeholder='Enter Email'
                                                autoComplete='off'
                                                name='email'
                                                className='form-control rounded-0'
                                                onChange={(e) => setEmail(e.target.value)}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email">
                                                <strong>Password</strong>
                                            </label>
                                            <input type="password"
                                                placeholder='Enter Password'
                                                name='password'
                                                className='form-control rounded-0'
                                                onChange={(e) => setPassword(e.target.value)}

                                            />
                                        </div>
                                        <button type="submit" className="btn btn-success w-100 rounded-0">
                                            Login
                                        </button>
                                    </form>
                                    <p>Don't have an account?</p>
                                    <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                                        Sign Up
                                    </Link>

                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModelPop;