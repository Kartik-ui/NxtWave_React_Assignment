import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import FailureView from "./pages/FailureView/FailureView";
import Hero from "./pages/Hero/Hero";

function App() {
  const navigate = useNavigate();
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="*"
          element={
            <FailureView
              message={"Something went wrong"}
              buttonText={"Try Again"}
              handleClick={() => navigate("/")}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default App;
