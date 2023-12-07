import { useContext } from "react";
import Route from "./router/Route"
import CatLoader from "./components/catLoader";
import { AuthContext } from "./contexts/AuthContext";

function App() {

  const { initialLoading } = useContext(AuthContext);

  if (initialLoading) {
    return <CatLoader />
  }

  return (
    <>
      <Route />
    </>
  )
}

export default App
