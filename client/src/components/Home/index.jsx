import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import moment from "moment";
import { books, checkout } from "../../config/routes/server";

export default function Home() {
    const [data, setData] = useState([]);
    const [seleced, setSelected] = useState({});
    const [assigned, setAssigned] = useState({});
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios
            .get(`${books}?size=0`)
            .then(response => {
                setData(response.data.books)
            })
            .catch(error => {
                swal(error.response.statusText, error.response.data.error, "error");
            });
    }, []);

    const handleSelect = (id) => {
        let selectedBook = data.filter(each => each._id === id);
        setSelected(selectedBook[0]);
        if(!selectedBook[0].available) {
            axios
                .get(`${checkout}/${id}`)
                .then(res => {
                    setAssigned(res.data.filter(each => each.active === true)[0]);
                    setHistory(res.data);
                })
                .catch(error => {
                    swal(error.response.statusText, error.response.data.error.message, "error");
                });
        }
        else {
            axios
                .get(`${checkout}/${id}`)
                .then(res => {
                    setAssigned({});
                    setHistory(res.data);
                })
                .catch(error => {
                    swal(error.response.statusText, error.response.data.error.message, "error");
                });
        }
    }

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
                <h1 className="h2">Dashboard</h1>
            </div>

            <h2>Books</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th> </th>
                            <th>#</th>
                            <th>Title</th>
                            <th>ISBN</th>
                            <th>Cover Price</th>
                            <th>Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((each, idx) => (
                            <tr key={each._id}>
                                <td>
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="selectedBook"
                                            onChange={() => handleSelect(each._id)}
                                        />
                                    </div>
                                </td>
                                <td>{idx + 1}</td>
                                <td>{each.title}</td>
                                <td>{each.isbn}</td>
                                <td>$ {each.coverPrice}</td>
                                <td>{each.available ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 mb-2">
                <h4>Selected Book</h4>
                {seleced && Object.keys(seleced).length > 0 && (
                    <div className="card" style={{width: "24rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">{seleced.title}</h5>
                            <h6 className="card-subtitle mb-2">Year: {seleced.year}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">ISBN: {seleced.isbn}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">$ {seleced.coverPrice}</h6>
                            <p className="card-text">{seleced.desc}</p>
                            {seleced.available ? (
                                <Link to={`/checkout/${seleced._id}`}>
                                    <button className="btn btn-secondary">Check Out</button>
                                </Link>
                            ) : (
                                <Link to={`/checkin/${seleced._id}`}>
                                    <button className="btn btn-primary">Check In</button>
                                </Link>
                            )}
                            {assigned && Object.keys(assigned).length > 0 && (
                                <>
                                    <hr />
                                    Assigned to: {assigned.assignedTo.name} <br />
                                    NIC: {assigned.assignedTo.nic} <br />
                                    Phone: {assigned.assignedTo.phone} <br />
                                    Checkout Date: {moment(assigned.createdAt).format("DD-MM-YYYY")} <br />
                                    <b>Return Date: {addWeekdays(assigned.createdAt, 15).format("DD-MM-YYYY")} </b>
                                </>
                            )}
                            <hr />
                            <h5>History</h5>
                            {history && history.map(each => (
                                <div key={each._id}>
                                    Assigned to: {each.assignedTo.name} <b />
                                    NIC: {each.assignedTo.nic} <br />
                                    Phone: {each.assignedTo.phone} <br />
                                    Date: {moment(each.createdAt).format("DD-MM-YYYY")}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}