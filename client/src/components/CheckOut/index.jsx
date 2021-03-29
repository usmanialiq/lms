import { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import InputMask from "react-input-mask";
import { checkout } from "../../config/routes/server";

function CheckOut(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [nic, setNic] = useState("");
    const maskNumber = "99-999 9999"
    const maskNIC = "99999999999";

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            assignedTo: {
                name,
                phone,
                nic
            },
            book: props.match.params.id
        };
        axios
            .post(checkout, payload)
            .then((res) => {
                if(res.data.success)
                    props.history.push("/")
            })
            .catch(error => {
                swal(error.response.statusText, error.response.data.error.message, "error");
            });
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Checkout</h1>
            </div>
            <form className="p-3 border rounded">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                value={name}
                                onChange={e => setName(e.target.value)}   
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <InputMask 
                                mask={maskNumber} 
                                className="form-control"
                                placeholder={maskNumber} 
                                id="phone" 
                                value={phone}
                                onChange={e => setPhone(e.target.value)}   
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="nic" className="form-label">NIC</label>
                            <InputMask 
                                mask={maskNIC} 
                                className="form-control" 
                                placeholder={maskNIC}
                                id="nic" 
                                value={nic}
                                onChange={e => setNic(e.target.value)}   
                                required
                            />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button 
                            className="btn btn-success" 
                            onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default withRouter(CheckOut);