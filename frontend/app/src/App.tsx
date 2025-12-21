import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../pages/navbar'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import Map from '../pages/map'
import NewTrip from '../pages/newtrip'
import PaymentGateway from '../pages/paymentgateway'
import Places from '../pages/places'
import Pricing from '../pages/pricing'
import Profile from '../pages/profile'
import Signup from '../pages/signup'
import NotFound from '../pages/404'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<Map />} />
        <Route path="/newtrip" element={<NewTrip />} />
        <Route path="/paymentgateway" element={<PaymentGateway />} />
        <Route path="/places" element={<Places />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
