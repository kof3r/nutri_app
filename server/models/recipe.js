/**
 * Created by ggrab on 23.2.2016..
 */

var Seq = require('sequelize');

module.exports = {
    attributes:{

        id:{
            type: Seq.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name:{
            type: Seq.STRING(128),
            allowNull: false
        }

    },

    relations:{
        hasMany:['ingredient']
    }
};

