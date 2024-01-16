import { useContext } from "react";
import Route from "./router/Route"
import CatLoader from "./components/catLoader";
import { AuthContext } from "./contexts/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { initialLoading } = useContext(AuthContext);

  if (initialLoading) {
    return <CatLoader />
  }

  return (
    <>
      <Route />
      <ToastContainer position="bottom-center" autoClose={1500} />
    </>
  )
}

export default App
