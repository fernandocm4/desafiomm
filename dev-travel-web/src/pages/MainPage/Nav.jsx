import React, {useContext} from "react";

import { AuthContext } from "../../contexts/auth";

const Nav = ({onLogout}) => {
    const {user} = useContext(AuthContext);
    return (
        <div className="nav">
            <h1 className="logo">MMTravels</h1>
            <button className="sair" onClick={onLogout}>Sair</button>
        </div>
    )
}

export default Nav;