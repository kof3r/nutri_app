/**
 * Created by ggrab on 23.2.2016..
 */

module.exports = {
    database: 'nutrition',
    username: 'nutriapp',
    password: 'nutriap',
    options:{
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
};