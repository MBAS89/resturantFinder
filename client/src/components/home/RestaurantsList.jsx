import React, { useEffect, useContext, useState } from 'react'

//react router dom useNavigate to naigate programmatically
import { useNavigate } from 'react-router-dom';

//Custom axios class that we created
import RestaurantsApi from '../../apis/RestaurantsApi';

//Our Restaurant context api
import { RestaurantsContext } from '../../context/RestaurantsContext';

//icons
import { FiEdit2, FiTrash } from "react-icons/fi";

//Other Components
import { UpdateRestaurant } from './UpdateRestaurant';
import { StarsRating } from '../StarsRating';

//toastify package for error and success handling
import { toast } from 'react-toastify';

export const RestaurantsList = () => {
    const navigate = useNavigate();

    const { restaurants, setRestaurants } = useContext(RestaurantsContext)
    useEffect(() => {
        const fetchData = async () => {
            try {

                const res = await RestaurantsApi.get("/")
                setRestaurants(res.data.data.restaurants)

            } catch (error) {
                toast.error(error.response.data.error)
            }
        }

        fetchData()

    },[])

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const res = await RestaurantsApi.delete(`/${id}`)

            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))

            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    //update Restaurant
    const [updateId, setUpdateId] = useState("")
    const [newName, setNewName] = useState("")
    const [newLocation, setNewLocation] = useState("")
    const [newPriceRange, setNewPriceRange] = useState("Price Range?")

    const renderRating = (restaurant) => {
        return(
            <div className='flex items-center gap-2'>
                <StarsRating rating={restaurant.average_rating} />
                <span className='text-warning'>({restaurant.count || 0})</span>
            </div>
        )
    }

    return (
        <div className='w-[90%] mx-auto border-[1px] border-primary my-5 h-fit mb-[5rem]'>
            {restaurants.length > 0 ? 
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Price Range</th>
                                <th>Rating</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restaurants && restaurants.map((restaurant) => (
                                <tr key={restaurant.id} onClick={()=>navigate(`/restaurants/${restaurant.id}`)} className='cursor-pointer hover:bg-base-200'>
                                    <th>{restaurant.id}</th>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.location}</td>
                                    <td>{"$".repeat(restaurant.price_range)}</td>
                                    <td>
                                        {renderRating(restaurant)}
                                    </td>
                                    <td className='flex gap-4'>
                                        <button 
                                            className='btn btn-square btn-warning' 
                                            onClick={(e)=> {
                                                e.stopPropagation();
                                                document.getElementById('my_modal_1').showModal(); 
                                                setUpdateId(restaurant.id);
                                                setNewName(restaurant.name)
                                                setNewLocation(restaurant.location)
                                                setNewPriceRange(restaurant.price_range)
                                            }
                                        }>
                                            <FiEdit2 className='text-[1.2rem]'/>
                                        </button>
                                        <button onClick={(e) => handleDelete(e, restaurant.id)} className='btn btn-square btn-error'><FiTrash className='text-[1.2rem]'/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            :(
                <div className='text-[2rem] text-warning text-center h-[50vh] flex items-center justify-center capitalize'>It seems there are no restaurants available right now.</div>
            )}
            <UpdateRestaurant 
                updateId={updateId} 
                setNewName={setNewName} 
                setNewLocation={setNewLocation} 
                setNewPriceRange={setNewPriceRange}
                newName={newName}
                newLocation={newLocation}
                newPriceRange={newPriceRange}
            />
        </div>
    )
}
