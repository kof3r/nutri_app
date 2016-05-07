/**
 * Created by ggrab on 25.2.2016..
 */

module.exports = function(){

    class Base{

        constructor(dto) {
            for(let property in dto){
                this[property] = dto[property];
            }
        }

        isNew(){
            return typeof this.id === 'undefined';
        }

    }

    return Base;

}