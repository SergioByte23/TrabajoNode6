const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Hotels = sequelize.define('hotels', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    lon: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
});

module.exports = Hotels;