import { Outlet } from "react-router-dom"
import Footer from "../Components/Common/Footer"
import Header from "../Components/Common/Header"

const Client_Layout = () => {
    return (<>
        <Header />
        {/* --- */}

            <Outlet />

        {/* --- */}
        <Footer />
    </>)
}

export default Client_Layout