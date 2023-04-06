import { Route, Routes, BrowserRouter, HashRouter } from "react-router-dom"
import Navigation from "../widgets/Navigation/Navigation"
import AdminPanel from "../widgets/AdminPanel/AdminPanel"
import EditPanel from "../widgets/EditFiltres/EditPanel"
import Basket from "./Basket/Basket"
import Main from "./Catalog/Catalog"
import Product from "./Product/Product"
import Admin from "./AdminPanel/Admin"

const Routing = () => {
    return (
        <HashRouter>
            <Navigation>
                <Routes>
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/" element={<Main />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/adm" element={<Admin />} />
                    <Route path="/editfilter" element={<EditPanel />} />
                    <Route path="*" element={<h2>404</h2>} />
                </Routes>
            </Navigation>
        </HashRouter>
    )
}

export default Routing
