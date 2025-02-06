 import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom"
import { Login } from "./components/Login"
import { Menu } from "./components/UserMenu"
import { PageListOrders } from "./components/PageListOrders"
import { StockMobileMerchandise } from "./components/StockMobileMerchandise"
import { AdminWindow } from "./components/AdminWindow"
import { LoginProvider } from "./context/LoginContext"
import { PrivateRoute } from "./hooks/PrivateRoute"
import { MobileStock } from "./components/LoadMobileStock";

function App() {

  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ventana-del-administrador"element={<PrivateRoute><AdminWindow/></PrivateRoute>}/>
          <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/pedidos" element={<PrivateRoute><PageListOrders /></PrivateRoute>} />
          <Route path="/stock" element={<PrivateRoute><StockMobileMerchandise/></PrivateRoute>} />
          <Route path="/stock-del-movil" element={<PrivateRoute><MobileStock/></PrivateRoute>}></Route>
        </Routes>
      </Router>
    </LoginProvider>
  )
}

export default App
