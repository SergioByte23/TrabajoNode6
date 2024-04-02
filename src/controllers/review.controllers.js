const catchError = require('../utils/catchError');
const Review = require('../models/Review');
const User = require('../models/User');
const Hotel = require('../models/Hotels');

const getAll = catchError(async(req, res) => {
    const {hotelId,userId,offset,perPage} =req.query;

    const where ={}
    if(userId) where.userId=userId;
    if(hotelId) where.hotelId=hotelId;
    
    
    const results = await Review.findAll({
        include:[{
            model:User,
            // attributes:['id','firstName','lastName','email'],
            attributes:{exclude:['password']}
        },Hotel],
        where,
        offset:offset,
        limit:perPage,
    });
    const total=await Review.count({where:where});
    return res.json({total,results});
});


const create = catchError(async(req, res) => {
    const {rating, comment ,hotelId}=req.body;
    const userId=req.user.id;
    // console.log(req.user);
    // console.log(userId);
    // console.log(req.body);
    const result = await Review.create({
        rating,comment,hotelId:hotelId,userId:userId
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Review.findByPk(id,{include:[User]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Review.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const {rating,comment}=req.body;
    const result = await Review.update(
        {rating,comment},
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