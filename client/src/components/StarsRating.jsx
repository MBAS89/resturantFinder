import React from 'react'

//icons
import { FaStarHalfAlt, FaStar, FaRegStar  } from "react-icons/fa";


export const StarsRating = ({ rating }) => {
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className='text-[1.4rem] text-warning'/>);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} className='text-[1.4rem] text-warning'/>);
      } else {
        stars.push(<FaRegStar key={i} className='text-[1.4rem] text-warning'/>);
      }
    }

    return (
        <div className='flex gap-1'>{stars}</div>
    )
}
