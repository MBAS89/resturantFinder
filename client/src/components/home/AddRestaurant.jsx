import React from 'react'

export const AddRestaurant = () => {
  return (
    <div className='flex justify-center items-center gap-5 w-[90%] mx-auto mt-4'>
        <input type="text" placeholder="Name" className="input input-bordered input-primary w-full" />
        <input type="text" placeholder="Location" className="input input-bordered input-primary w-full" />
        <select className="select select-primary w-full">
            <option defaultValue>Price Range?</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
        </select>
        <button className="btn btn-primary w-1/6">Add</button>
    </div>
  )
}
