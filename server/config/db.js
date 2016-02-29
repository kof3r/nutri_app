/**
 * Created by ggrab on 23.2.2016..
 */

module.exports = {
    database: 'nutrition',
    username: 'root',
    password: 'root',
    options:{
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
}
