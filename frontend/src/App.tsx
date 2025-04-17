import { useEffect, useState } from "react";
import Navbar from "./components/navBar";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RequireAuth from "./routes/RequireAuth";
import ProfilePage from "./pages/Profile";
import {Toaster} from 'sonner'

// This function is a React component designed to be a shared layout for multiple routes.
function Layout({ isTopPage }: { isTopPage: boolean }) {
  return (
    <>
      <Navbar isTopOfPage={isTopPage} />
      <main className="pt-[64px]">
        <Outlet />
      </main>
    </>
  );
}

function App() {
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      } else {
        setIsTopOfPage(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BrowserRouter>
    <Toaster position="top-center" richColors closeButton />
      <Routes>
        <Route element={<Layout isTopPage={isTopOfPage} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Feed />} />

          {/* Authorized routes */}
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
