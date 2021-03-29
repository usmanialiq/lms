import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../config/redux/actions/auth";

function Sidebar(props) {
    const getNavLinkClass = (path) => {
        return props.location.pathname === path ? "nav-link active" : "nav-link";
    }
    const onLogout = (e) => {
        e.preventDefault();
        setTimeout(() => {
            props.logoutUser();
        })
    }
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className={getNavLinkClass("/")} aria-current="page" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={getNavLinkClass("/add-book")} to="/add-book">
                            Add Book
                        </Link>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>User Info</span>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <a className="nav-link text-primary" href="#!">
                            {props.auth.user.name}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#!" onClick={onLogout}>
                            Sign Out
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func,
    auth: PropTypes.object,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(Sidebar);