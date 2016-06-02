/**
 * Created by gordan on 01.06.16..
 */

module.exports = {
    firstName: [
        [(value) => /^[a-zšđčćžA-ŽŠĐČĆŽ'-]*$/.test(value), 'First name must consist of alphanumerics.'],
        [function(value) { return value && value.length === 0; }, 'First name is required.']
    ],
    middleName: [
        [function(value) { return /^[a-zšđčćžA-ŽŠĐČĆŽ'-]*$/.test(value) }, 'Middle name must consist of alphanumerics.']
    ],
    lastName: [
        [function(value) { return /^[a-zšđčćžA-ŽŠĐČĆŽ-]*$/.test(value) }, 'Last name must consist of alphanumerics.'],
        [function(value) { return value && value.length === 0; }, 'Last name is required.']
    ]
};