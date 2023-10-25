import React, { useContext } from 'react'

//api
import RestaurantsApi from '../../apis/RestaurantsApi'
import { RestaurantsContext } from '../../context/RestaurantsContext'

export const UpdateRestaurant = ({updateId, setNewName, setNewLocation, setNewPriceRange, newName, newLocation, newPriceRange}) => {
    const { updateRestaurants } = useContext(RestaurantsContext);

    const handleDelete = async () => {
        const res  = await RestaurantsApi.put(`/${updateId}`, {
            newName,
            newLocation,
            newPriceRange
        })

        updateRestaurants(res.data.data.restaurants[0]);

        document.getElementById('my_modal_1').close(); 
    }

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box flex flex-col gap-4 w-[80%] mx-auto">
                <h3 className="font-bold text-[1.5rem] text-center text-warning uppercase">Update Restaurant "{updateId}"</h3>
                <input value={newName} onChange={(e) => setNewName(e.target.value)} type="text" placeholder="Name" className="input mt-4 input-bordered input-warning w-full" />
                <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)}  type="text" placeholder="Location" className="input input-bordered input-warning w-full" />
                <select value={newPriceRange} onChange={(e) => setNewPriceRange(e.target.value)} className="select select-warning w-full">
                    <option disabled>Price Range?</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
                <div className="modal-action flex justify-between">
                    <form method="dialog" className='w-full'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-neutral w-full">Cancel</button>
                    </form>
                    <div className='w-full'>
                        <button onClick={handleDelete} className='btn btn-warning w-full'>Edit</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
