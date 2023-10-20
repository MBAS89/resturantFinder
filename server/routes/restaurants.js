const express = require('express')
const router = express.Router()

const { getAllRestaurants, getSingleRestaurant, createRestaurant, updateRestaurant, deleteRestaurant} = require('../controllers/restaurants')



router.get('/', getAllRestaurants)
router.get('/', getSingleRestaurant)
router.post('/', createRestaurant)
router.put('/', updateRestaurant)
router.delete('/', deleteRestaurant)

module.exports = router