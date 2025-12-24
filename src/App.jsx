import "./App.css";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import TopButton from "./components/common/TopButton.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <TopButton />
    </>
  );
}

export default App;
