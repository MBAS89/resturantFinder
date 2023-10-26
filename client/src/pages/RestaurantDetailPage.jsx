import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantsApi from '../apis/RestaurantsApi'
import { StarsRating } from '../components/StarsRating'
import { Reviews } from '../components/Reviews'
import { AddReview } from '../components/AddReview'

export const RestaurantDetailPage = () => {
  const {id} = useParams()
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext)

  const [reviewAdded, setReviewAdded] = useState(false)
  const [reviewDeleted, setReviewDeleted] = useState(false)

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await RestaurantsApi.get(`/${id}`)
        setSelectedRestaurant(res.data.data)
        setReviewAdded(false)
        setReviewDeleted(false)

      } catch (error) {
        console.log(error)
      }

    }
    fetchData()
  },[reviewAdded, reviewDeleted])


  return (
    <div className='mb-[4rem]'>
      <hr></hr>
      {selectedRestaurant && (
        <div>
          <div className='flex justify-between w-[90%] mx-auto mt-2'>
            <div className='flex items-center gap-5'>
              <h1 className='text-[2rem] font-bold text-secondary'>{selectedRestaurant.restaurants[0].name}</h1>
              <div className='flex items-center gap-2'>
                <StarsRating rating={selectedRestaurant.restaurants[0].average_rating} />
                <span className='text-warning'>({selectedRestaurant.restaurants[0].count || 0})</span>
              </div>
            </div>
            <button onClick={() => document.getElementById('my_modal_2').showModal()} type='submit' className="btn btn-secondary w-1/6">Add Review</button>
          </div>
          <div>
            <Reviews setReviewDeleted={setReviewDeleted} reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview restaurantId={id} setReviewAdded={setReviewAdded} />
        </div>
      )}
    </div>
  )
}
