//react router dom
import { Routes, Route } from "react-router-dom"


//layout import
import { MainLayout } from "./components/layout/MainLayout"

//routes components
import { HomePage } from "./pages/HomePage"
import { RestaurantDetailPage } from "./pages/RestaurantDetailPage"


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
    </>
  )
}

export default App


