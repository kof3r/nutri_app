/**
 * Created by gordan on 17.05.16..
 */

const Seq = require('sequelize');

module.exports = {
    
    name: Seq.STRING,
    carbs: Seq.FLOAT,
    fats: Seq.FLOAT,
    protein: Seq.FLOAT
    
};