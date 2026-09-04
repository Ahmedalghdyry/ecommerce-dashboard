import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AboutPage from "../pages/About";
import ProductPage from "../pages/ProductPage";
import Product from "../pages/Product";
import HomePage from "../pages";
import Login from "../components/Login";
import Applayout from "../layout/Applayout";
import  ServicesCookie from "../services/ServicesCookie";
import AdmenDashboard from "../pages/dashboard";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardProducts from "../pages/dashboard/DashboardProducts";

const tockin = ServicesCookie.git("jwt")

const router = createBrowserRouter(
  
  createRoutesFromElements(
            <>
      <Route>
        <Route path="/" element={<Applayout/> }>
          <Route index element={<HomePage />} />,
          <Route path="productPage" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="product/:id" element={<Product />} />
          
        </Route>
           <Route path="/dashboard" element={<DashboardLayout/> }>
           <Route index element={<AdmenDashboard />} />
          <Route path="product" element={<DashboardProducts/>} />
          <Route path="categories" element={<h1>Categories</h1>} />
          <Route path="settings" element={<h1>SettingsPage</h1>} />
          
        </Route>


          <Route path="login" element={<Login isAuthenticated={tockin} />} />
      </Route>
    </>
)
)

export default router;
