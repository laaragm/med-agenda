import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { Header } from "../header";
import { ScrollToTop } from "./scroll-to-top";

export function LayoutWrapper() {
	return (
		// <AuthenticatedTemplate>
		<>
			{/* <Header /> */}
			<Outlet />
			<ScrollToTop />
			<ToastContainer position="bottom-right" autoClose={3000} closeOnClick pauseOnHover />
		</>
		// </AuthenticatedTemplate>
	);
}
