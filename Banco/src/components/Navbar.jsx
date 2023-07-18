import { Link } from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <h2>
                <Link to={`/`}>Supera Bank</Link>
            </h2>
            <ul>
                <li>
                    <Link to={`/`}>Todas as contas</Link>
                </li>
                <li>
                    <Link to={`/new`} className="new-btn">Nova Conta</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar