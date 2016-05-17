/**
 * Created by gordan on 17.05.16..
 */

'use strict';

class NotFound{

    constructor(message) {
        this.status = 404;
        this.message = message;
    }

}

module.exports = NotFound;