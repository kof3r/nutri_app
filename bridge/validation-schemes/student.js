/**
 * Created by gordan on 01.06.16..
 */

module.exports = {
    fields: {
        firstName: [
            [(value) => /^[a-zšđčćžA-ŽŠĐČĆŽ'-]*$/.test(value), 'First name must consist of alphanumerics.'],
            [(value) => value && value.length > 0, 'First name is required.']
        ],
        middleName: [
            [(value) => /^[a-zšđčćžA-ŽŠĐČĆŽ'-]*$/.test(value), 'Middle name must consist of alphanumerics.']
        ],
        lastName: [
            [(value) => /^[a-zšđčćžA-ŽŠĐČĆŽ-]*$/.test(value), 'Last name must consist of alphanumerics.'],
            [(value) => value && value.length > 0, 'Last name is required.']
        ]
    }
};