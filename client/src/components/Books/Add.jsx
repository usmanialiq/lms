import { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { books } from "../../config/routes/server";

function AddBook(props) {
    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [coverPrice, setCoverPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [year, setYear] = useState("");
    const [available, setAvailable] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        let bookData = {
            title,
            isbn: +isbn,
            coverPrice: + coverPrice,
            desc,
            year,
            available
        }
        axios
            .post(books, bookData)
            .then(() => {
                props.history.push("/")
            })
            .catch(error => {
                swal(error.response.statusText, error.response.data.error.message, "error");
            });
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Add a Book</h1>
            </div>
            <form className="p-3 border rounded">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Book Title</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="title" 
                                value={title}
                                onChange={e => setTitle(e.target.value)}   
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="isbn" className="form-label">ISBN</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="isbn" 
                                value={isbn}
                                onChange={e => setIsbn(e.target.value)}   
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="coverPrice" className="form-label">Cover Price</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="coverPrice" 
                                value={coverPrice}
                                onChange={e => setCoverPrice(e.target.value)}   
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="year" 
                                value={year}
                                onChange={e => setYear(e.target.value)}   
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Description</label>
                            <textarea 
                                rows="4"
                                className="form-control" 
                                id="desc" 
                                value={desc}
                                onChange={e => setDesc(e.target.value)}   
                            ></textarea>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mb-3">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value={available} 
                                    id="flexCheckDefault" 
                                    onChange={e => setAvailable(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Available
                                </label>
                            </div>
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

export default withRouter(AddBook);