import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import swal from "sweetalert";
import { loginUser } from "../../config/redux/actions/auth";
import ClientRoute from "../../config/routes/helper";

function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push(ClientRoute(""));
        }
        if(props.errors) {
            if(props.errors && props.errors.error) {
                setIsAuthenticating(false);
                swal("Error", props.errors.error, "error");
            }
            if(props.errors && props.errors.message) {
                setIsAuthenticating(false);
                swal("Error", props.errors.message, "error");
            }
        }
    }, [props.auth, props.history, props.errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password,
        };
        setIsAuthenticating(true);        
        props.loginUser(userData);
    }

    return (
        <div className="text-center">
            <main className="form-signin">
                <form>
                    {/* <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
                    <input 
                        type="email" 
                        id="inputEmail" 
                        className="form-control" 
                        placeholder="Email address" 
                        required 
                        autoFocus 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="inputPassword" className="visually-hidden">Password</label>
                    <input 
                        type="password" 
                        id="inputPassword" 
                        className="form-control" 
                        placeholder="Password" 
                        required 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        className="w-100 btn btn-lg btn-primary" 
                        onClick={handleSubmit}>
                            {isAuthenticating ? "Authenticating..." : "Sign in"}
                        </button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        </div>
    );
}

SignIn.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(SignIn));
