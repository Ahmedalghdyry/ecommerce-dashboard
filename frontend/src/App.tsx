import { RouterProvider } from "react-router-dom";
import router from "./routes";
import CartDrawer from "./components/CartDrawer";

const App = () => {
  return (
    <>
    <CartDrawer title="Shopping Cart" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
