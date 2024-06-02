import React, {useContext} from "react";
import { AuthContext, AuthProvider } from "./contexts/auth";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";

const AppRoutes = () => {
    const Private = ({children}) => {
        const {authenticated, loading} = useContext(AuthContext);

        if(!authenticated){
            return <Navigate to="/login"></Navigate>
        }
        return children;
    }

    return(
        <Router>
            <AuthProvider>
                <Routes>

                    <Route exact path="/login"
                        element={<LoginPage></LoginPage>}></Route>
                    <Route exact path="/"
                        element={<Private><h1><MainPage/></h1></Private>}></Route>
                        <Route exact path="/register"
                        element={<RegisterPage/>}></Route>

                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes;