import React from 'react'

import { StarsRating } from './StarsRating'

//iocns
import { FiTrash } from "react-icons/fi";
import RestaurantsApi from '../apis/RestaurantsApi';

export const Reviews = ({setReviewDeleted, reviews}) => {

    const handleDeleteReview = async (id) => {
        try {
            await RestaurantsApi.delete(`/${id}/delete-review`)

            setReviewDeleted(true)
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <div className='w-[90%] mx-auto flex flex-wrap gap-5 justify-center items-center mt-5'>
        {reviews && reviews.map((review) => (
            <div key={review.id} className="card w-96 h-[12rem] bg-neutral text-neutral-content relative group">
                <div className="card-body text-left">
                    <div className='flex justify-between items-center'>
                        <h2 className="card-title">{review.name}</h2>
                        <StarsRating rating={review.rating}/>
                    </div>
                    <hr></hr>
                    <p>{review.body}</p>
                </div>
                <FiTrash onClick={() => handleDeleteReview(review.id)} className='text-[1.2rem] text-error cursor-pointer hover:scale-105 absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition ease-in-out delay-150'/>
            </div>
        ))}
    </div>
    )
}
