import { Route, Routes } from "react-router-dom"
import Authenticate from "./pages/Authenticate"
import Home from "./pages/Home"
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import AdminHome from "./pages/admin/AdminHome"
import AdminRoutes from "./routes/AdminRoutes"
import Products from "./pages/Products"
import MainState from "./contexts/MainState"
import Cart from "./pages/Cart"
import Status from "./pages/payments/Status"
import UserRoutes from './routes/UserRoutes';
import ScrollReset from "./layouts/ScrollReset"

function App() {
  return (
    <>
      <MainState>
        <div className="py-10 herobg min-h-screen">
          <Header />

          <ScrollReset />

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/account" element={<Authenticate />} />

            <Route element={<UserRoutes />}>

              <Route path="/cart" element={<Cart />} />

              <Route path="/payment/:status" element={<Status />} />

            </Route>

            <Route element={<AdminRoutes />}>
              <Route path="/admin" element={<AdminHome />} />
            </Route>

          </Routes>
        </div>
        <Footer />
      </MainState>
    </>
  )
}

export default App