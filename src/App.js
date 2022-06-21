import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import Update from "./components/update/Update";
import View from "./components/view/View";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/users/view/:id" element={<View />} />

        <Route path="/users/update/:id" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
