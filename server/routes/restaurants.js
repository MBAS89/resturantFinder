const express = require('express')
const router = express.Router()

const { getAllRestaurants, getSingleRestaurant, createRestaurant, updateRestaurant, deleteRestaurant} = require('../controllers/restaurants')



router.get('/', getAllRestaurants)
router.get('/:id', getSingleRestaurant)
router.post('/', createRestaurant)
router.put('/:id', updateRestaurant)
router.delete('/:id', deleteRestaurant)

module.exports = router