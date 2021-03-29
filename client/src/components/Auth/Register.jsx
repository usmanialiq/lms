import { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import swal from "sweetalert";
import { register } from "../../config/routes/server";

function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    const [submit, setSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            confirmPassword: cPassword
        };
        setSubmit(true);
        axios
            .post(register, userData)
            .then(() => {
                setSubmit(false);
                props.history.push("/sign-in")
            })
            .catch(error => {
                swal(error.response.statusText, error.response.data.error, "error");
            });
    }

    return (
        <div className="text-center">
            <main className="form-signin">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Register User</h1>
                    <label htmlFor="inputName" className="visually-hidden">Name</label>
                    <input 
                        type="text" 
                        id="inputName" 
                        className="form-control" 
                        placeholder="Name" 
                        required 
                        autoFocus 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
                    <input 
                        type="email" 
                        id="inputEmail" 
                        className="form-control" 
                        placeholder="Email address" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="inputPhone" className="visually-hidden">Phone</label>
                    <input 
                        type="text" 
                        id="inputPhone" 
                        className="form-control" 
                        placeholder="Phone" 
                        required 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
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
                    <label htmlFor="inputcPassword" className="visually-hidden">Confirm Password</label>
                    <input 
                        type="password" 
                        id="inputcPassword" 
                        className="form-control" 
                        placeholder="Confirm Password" 
                        required 
                        value={cPassword}
                        onChange={e => setcPassword(e.target.value)}
                    />
                    <button
                        className="w-100 btn btn-lg btn-primary" 
                        onClick={handleSubmit}>
                            {submit ? "Signing Up..." : "Sign Up"}
                        </button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        </div>
    );
}

export default withRouter(connect(state => state)(Register));