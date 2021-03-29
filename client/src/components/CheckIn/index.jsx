import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";
import { checkout } from "../../config/routes/server";

function CheckIn(props) {
    const [assigned, setAssigned] = useState({});

    useEffect(() => {
        const id = props.match.params.id;
        axios
            .get(`${checkout}/${id}`)
            .then(res => {
                setAssigned(res.data.filter(each => each.active === true)[0]);
            })
            .catch(error => {
                swal(error.response.statusText, error.response.data.error.message, "error");
            });

    }, [props.match.params.id]);

    const addWeekdays = (date, days) => {
        date = moment(date); // use a clone
        while (days > 0) {
          date = date.add(1, 'days');
          // decrease "days" only if it's a weekday.
          if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
            days -= 1;
          }
        }
        return date;
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Check In</h1>
            </div>
            <div className="p-3">
                
            {assigned && Object.keys(assigned).length > 0 && (
                <form>
                    <div className="m-2">
                        <label htmlFor="name">Name</label>
                        <input 
                            className="form-control" 
                            value={assigned.assignedTo.name}
                            disabled
                            id="name"
                        />
                    </div>
                    <div className="m-2">
                        <label htmlFor="phone">Phone</label>
                        <input 
                            className="form-control" 
                            value={assigned.assignedTo.phone}
                            disabled
                            id="phone"
                        />
                    </div>
                    <div className="m-2">
                        <label htmlFor="checkoutdate">Checkout Date</label>
                        <input 
                            className="form-control" 
                            value={moment(assigned.createdAt).format("DD-MM-YYYY")}
                            disabled
                            id="checkoutdate"
                        />
                    </div>
                    <div className="m-2">
                        <label htmlFor="returndate">Required Return Date</label>
                        <input 
                            className="form-control" 
                            value={addWeekdays(assigned.createdAt, 15).format("DD-MM-YYYY")}
                            disabled
                            id="returndate"
                        />
                    </div>
                    {moment().valueOf() > addWeekdays(assigned.createdAt, 15).valueOf() && (
                        <p>Rs. 5 penalty for late submission</p>
                    )}
                </form>
            )}
            </div>
        </>
    );
}

export default withRouter(CheckIn);