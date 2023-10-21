const db = require('../db')
const ErrorResponse = require('../utils/errorResponse')
const { checkRequiredFiled } = require('../utils/validation')


//Get ALL Restaurants 
exports.getAllRestaurants = async (req, res, next) => {

    try {

        const results = await db.query('SELECT * FROM restaurants')

        res.status(202).json({
            status:"success",
            message:"All Restaurants fetched",
            results:results.rows.length,
            data: {
                restaurants:results.rows
            }
        })

    } catch (error) {
        next(error);
    }
}

//Get Single Restaurant
exports.getSingleRestaurant = async (req, res, next) => {
    const { id } = req.params

    try {

        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [id])

        res.status(202).json({
            status:"success",
            message:"Restaurant fetched",
            results:results.rows.length,
            data: {
                restaurants:results.rows
            }
        })

    } catch (error) {
        next(error);
    }
}

//Create Restaurant 
exports.createRestaurant = async (req, res, next) => {
    const { name, location, priceRange } = req.body

    try {

        checkRequiredFiled(name, "Restaurant Name", 422)
        checkRequiredFiled(location, "Restaurant Location", 422)
        checkRequiredFiled(priceRange, "Restaurant Price Range", 422)

        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [name,location,priceRange])

        if(!results.rows[0]){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        res.status(201).json({
            status:"success",
            message:"Restaurant Created",
            results:results.rows.length,
            data: {
                restaurants:results.rows
            }
        })

    } catch (error) {
        next(error);
    }
}

//Update Restaurant 
exports.updateRestaurant = async (req, res, next) => {
    const { id } = req.params
    const { newName, newLocation, newPriceRange } = req.body

    try {

        checkRequiredFiled(newName, "Restaurant Name", 422)
        checkRequiredFiled(newLocation, "Restaurant Location", 422)
        checkRequiredFiled(newPriceRange, "Restaurant Price Range", 422)

        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [newName,newLocation,newPriceRange,id])

        if(!results.rows[0]){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        res.status(201).json({
            status:"success",
            message:"Restaurant Updated",
            results:results.rows.length,
            data: {
                restaurants:results.rows
            }
        })

    } catch (error) {
        next(error);
    }
}

//Delete Restaurant 
exports.deleteRestaurant = async (req, res, next) => {
    const { id } = req.params

    try {

        await db.query("DELETE FROM restaurants where id = $1", [id])

        res.status(200).json({
            status:"success",
            message:"Restaurant Deleted"
        })

    } catch (error) {
        next(error);
    }
}


