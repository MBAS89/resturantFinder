import React, { useEffect, useContext } from 'react'

//api
import RestaurantsApi from '../../apis/RestaurantsApi';

//context
import { RestaurantsContext } from '../../context/RestaurantsContext';

//icons
import { FiEdit2 } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";

export const RestaurantsList = () => {

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

    return (
        <div className='w-[90%] mx-auto border-[1px] border-primary mt-5'>
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
                            <tr key={restaurant.id}>
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
                                    <button className='btn btn-square btn-warning'><FiEdit2 className='text-[1.2rem]'/></button>
                                    <button className='btn btn-square btn-error'><FiTrash className='text-[1.2rem]'/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
