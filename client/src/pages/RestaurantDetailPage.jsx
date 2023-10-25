import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantsApi from '../apis/RestaurantsApi'

export const RestaurantDetailPage = () => {
  const {id} = useParams()
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext)

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await RestaurantsApi.get(`/${id}`)

        setSelectedRestaurant(res.data.data.restaurants[0])
      } catch (error) {
        console.log(error)
      }

    }
    fetchData()
  },[])

  return (
    <div>{selectedRestaurant && selectedRestaurant.name}</div>
  )
}
