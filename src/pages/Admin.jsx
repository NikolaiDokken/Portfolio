import { Link } from "react-router-dom";

export default function Admin() {
    return (
        <div>
            <h2>Admin Page</h2>
            <Link to="/admin/new-project">Add Project</Link>
            <Link to="/admin/new-job">Add Job</Link>
        </div>
    );
}
