/**
 * Created by gordan on 13.05.16..
 */

const Seq = require('sequelize');

module.exports = {

    grade: {
        type: Seq.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
    id: {
        type: Seq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }

};