import React, { useState, createContext } from 'react'

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = props => {
    const [restaurants, setRestaurants] = useState([])

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    };

    const updateRestaurants = (updatedRestaurant) => {
        setRestaurants(prevRestaurants =>
            prevRestaurants.map(restaurant =>
                restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
            )
        );
    };

    return (
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurants, updateRestaurants}}> 
            {props.children}
        </RestaurantsContext.Provider>
    )
}