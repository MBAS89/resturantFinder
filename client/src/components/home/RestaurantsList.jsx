import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//api
import RestaurantsApi from '../../apis/RestaurantsApi';

//context
import { RestaurantsContext } from '../../context/RestaurantsContext';

//icons
import { FiEdit2 } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { UpdateRestaurant } from './UpdateRestaurant';

export const RestaurantsList = () => {
    const navigate = useNavigate();

    const { restaurants, setRestaurants } = useContext(RestaurantsContext)
    useEffect(() => {
        const fetchData = async () => {
            try {

                const res = await RestaurantsApi.get("/")
                setRestaurants(res.data.data.restaurants)

            } catch (error) {
                console.log(error)
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
        } catch (error) {
            console.log(error)
        }
    }

    //update Restaurant
    const [updateId, setUpdateId] = useState("")
    const [newName, setNewName] = useState("")
    const [newLocation, setNewLocation] = useState("")
    const [newPriceRange, setNewPriceRange] = useState("Price Range?")

    return (
        <div className='w-[90%] mx-auto border-[1px] border-primary my-5 h-fit'>
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
                                    <div className="rating">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    </div>
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
