/**
 * Created by gordan on 01.06.16..
 */

module.exports = {

    firstName: [/[a-zšđčćžA-ŽŠĐČĆŽ-]{2,32}/, 'First name must consist of alphanumerics.'],
    middleName: [/[a-zšđčćžA-ŽŠĐČĆŽ-]{2,32}/, 'Middle name must consist of alphanumerics.'],
    lastName: [/[a-zšđčćžA-ŽŠĐČĆŽ-]{2,32}/, 'Last name must consist of alphanumerics.']

};