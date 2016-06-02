/**
 * Created by gordan on 02.06.16..
 */

'use strict';

module.exports = class BadRequest{
    
    constructor(error, message) {
        this.status = 400;
        this.error = error;
        this.message = message;
    }
    
};