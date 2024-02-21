import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen bg-fake-pink">
      <Outlet />
    </div>
  );
}

export default App;
