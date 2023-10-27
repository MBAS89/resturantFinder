import React, { useState, useContext } from 'react'

//api
import RestaurantsApi from '../../apis/RestaurantsApi'

//context
import { RestaurantsContext } from '../../context/RestaurantsContext'

//toastify package for error and success handling
import { toast } from 'react-toastify';

export const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("Price Range?")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await RestaurantsApi.post("/", {
        name,
        location,
        priceRange
      })

      addRestaurants(res.data.data.restaurants[0]);
      toast.success(res.data.message)

      //empty all inputs fields after submit
      setName("")
      setLocation("")
      setPriceRange("Price Range?")

    } catch (error) {
      toast.error(error.response.data.error)
    }
    
  }


  return (
    <div className='flex justify-center items-center gap-5 w-[90%] mx-auto mt-4'>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="input input-bordered input-primary w-full" />
        <input value={location} onChange={(e) => setLocation(e.target.value)}  type="text" placeholder="Location" className="input input-bordered input-primary w-full" />
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="select select-primary w-full">
            <option disabled>Price Range?</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
        </select>
        <button onClick={handleSubmit} type='submit' className="btn btn-primary w-1/6">Add</button>
    </div>
  )
}
