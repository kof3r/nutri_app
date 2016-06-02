/**
 * Created by gordan on 02.06.16..
 */

module.exports = {

    fields: {
        amount: [
            [ amount => amount >= 0, 'Amount must be a non-negative value.' ]
        ]
    }

};