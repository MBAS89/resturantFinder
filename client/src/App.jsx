//react router dom
import { Routes, Route } from "react-router-dom"

//layout import
import { MainLayout } from "./components/layout/MainLayout"

//routes components
import { HomePage } from "./pages/HomePage"
import { RestaurantDetailPage } from "./pages/RestaurantDetailPage"

//toastify package for error and success handling
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
            <MainLayout>
              <HomePage />
            </MainLayout>
        }></Route>
        <Route path="/restaurants/:id" element={
            <MainLayout>
              <RestaurantDetailPage />
            </MainLayout>
        }></Route>
      </Routes>
      <ToastContainer 
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App


