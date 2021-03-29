import Header from "./Header";
import Sidebar from "./Sidebar";
export default function Layout(props) {
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar {...props} />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
}