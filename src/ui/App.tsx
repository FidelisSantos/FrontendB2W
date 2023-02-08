import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppContext from "../context/AppContext";
import { useApp } from "./hooks/useApp";
import Home from "./pages/Home/Home";
import Off from "./pages/Scripts/Off/Off";
import Out from "./pages/Scripts/Out/Out";
import Procedures from "./pages/Scripts/Procedures/Procedures";
import Users from "./pages/Users/Users";

function App() {
  const {
    user,
    error,
    loading,
    errorMessage,
    timeError,
    scripts,
    page,
    setUser,
    setErrorMessage,
    setLoading,
    setError,
    setScripts,
    setPage,
    isOpenMenu,
    setIsOpenMenu,
  } = useApp();

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            error,
            loading,
            errorMessage,
            timeError: timeError,
            scripts: scripts,
            page: page,
            isOpenMenu: isOpenMenu,
            setUser: setUser,
            setScripts: setScripts,
            setErrorMessage: setErrorMessage,
            setLoading: setLoading,
            setError: setError,
            setPage: setPage,
            setIsOpenMenu: setIsOpenMenu,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/procedures" element={<Procedures />} />
            <Route path="/out" element={<Out />} />
            <Route path="/off" element={<Off />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
