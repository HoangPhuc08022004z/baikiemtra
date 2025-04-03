import { Routes, Route } from "react-router-dom"; 
import ProDuctList from "./component/ProDuctList";
import ProDuctDetail from "./component/ProDuctDetail";
import ProDuctCreate from "./component/ProDuctCreate";
import ProDuctEdit from "./component/ProDuctEdit";

function App() {
  return (
    <Routes>
      <Route path="/products/:id" element={<ProDuctDetail />} />
      <Route path="/" element={<ProDuctList />} />
      <Route path="/create" element={<ProDuctCreate />} />
      <Route path="/edit/:id" element={<ProDuctEdit />} /> 
    </Routes>
  );
}

export default App;
