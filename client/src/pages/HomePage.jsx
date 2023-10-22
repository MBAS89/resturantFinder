import React from 'react'

import { AddRestaurant } from '../components/home/AddRestaurant'
import { RestaurantsList } from '../components/home/RestaurantsList'


export const HomePage = () => {
  return (
    <>
      <AddRestaurant /> 
      <RestaurantsList />
    </>
  )
}
