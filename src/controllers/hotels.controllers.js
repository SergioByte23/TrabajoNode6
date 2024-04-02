const catchError = require('../utils/catchError');
const Hotels = require('../models/Hotels');
const City = require('../models/City');
const { Op }=require('sequelize');
const Image = require('../models/image');
const Review = require('../models/Review');

const getAll = catchError(async(req, res) => {
    const {cityId,name} =req.query;

    const where ={}
    if(cityId) where.cityId=cityId;
    if(name) where.name={
        [Op.iLike]:`%${name}%`
    };
    const results = await Hotels.findAll({
        include: [City,Image,Review],
        where : where
    });
    const hotelsWithRating=results.map(hotels =>{
        const hotelJson=hotels.toJSON();
        let sum=0;
        hotelJson.reviews.forEach(review => {
          sum +=review.rating  
        });
        const reviewCount=hotelJson.reviews.length;
        const average=reviewCount >0 ?sum/ hotelJson.reviews.length :0;
        delete hotelJson.reviews;
        return {...hotelJson,rating: average};

    })
    return res.json(hotelsWithRating);
});

const create = catchError(async(req, res) => {
    const result = await Hotels.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Hotels.findByPk(id,{include: [City,Image,Review]});
    if(!result) return res.sendStatus(404);
   
    const hotelJson=result.toJSON();
        let sum=0;
        hotelJson.reviews.forEach(review => {
          sum +=review.rating  
        });
        const reviewCount=hotelJson.reviews.length;
        const average=reviewCount >0 ?sum/ reviewCount :0;
        delete hotelJson.reviews;
        return res.json({...hotelJson,rating: average});
   
   
   
    // return res.json(result);


});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Hotels.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Hotels.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}