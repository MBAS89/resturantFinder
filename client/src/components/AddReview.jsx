import React, { useState } from 'react'

//Custom axios class that we created
import RestaurantsApi from '../apis/RestaurantsApi'

//toastify package for error and success handling
import { toast } from 'react-toastify';

export const AddReview = ({ restaurantId, setReviewAdded }) => {
    const [name, setName] = useState("")
    const [reviewBody, setReviewBody] = useState("")
    const [rating, setRating] = useState("Rating?")


    const handleAddReview = async () => {
        try {
            const res = await RestaurantsApi.post(`/${restaurantId}/add-review`, {
                name,
                reviewBody,
                rating
            })
            setReviewAdded(true)

            toast.success(res.data.message)

            //to close the pop up
            document.getElementById('my_modal_2').close(); 

            setName("")
            setReviewBody("")
            setRating("Rating?")


        } catch (error) {
            toast.error(error.response.data.error)
        }
    }


    return (
    <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col gap-4 w-[80%] mx-auto">
            <h3 className="font-bold text-[1.5rem] text-center text-secondary uppercase">Add Review</h3>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Name</span>
                </div>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" className="input input-secondary w-full" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Review</span>
                </div>
                <textarea value={reviewBody} onChange={(e) => setReviewBody(e.target.value)} className="textarea textarea-secondary" placeholder="Your review here"></textarea>
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Rating</span>
                </div>
                <select value={rating} onChange={(e) => setRating(e.target.value)}  className="select select-secondary w-full">
                    <option disabled>Rating?</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </label>

            <div className="modal-action flex justify-between">
                <form method="dialog" className='w-full'>
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-neutral w-full">Cancel</button>
                </form>
                <div className='w-full'>
                    <button onClick={handleAddReview} className='btn btn-secondary w-full'>Add Review</button>
                </div>
            </div>
        </div>
    </dialog>
    )
}
