/**
 * Created by ggrab on 12.3.2016..
 */

module.exports = function(){
        function Packer(Type, packOptions, unpackOptions){

            this.Type = Type;
            this.dummy = new Type();
            this.packOptions = packOptions || {};
            this.unpackOptions = unpackOptions || {};

        }

        Packer.prototype.pack = function(entity){
            var dto = Object.create(null);
            for(var p in entity){
                if(typeof this.dummy[p] === 'undefined' && typeof this.packOptions[p] === 'undefined'){
                    dto[p] = entity[p];
                } else if(angular.isFunction(this.packOptions[p])){
                    this.packOptions[p].call(dto, entity);
                }
            }
            return dto;
        }

        Packer.prototype.unpack = function(dto){
            var entity = new this.Type();
            for(var p in dto){
                if(typeof this.unpackOptions[p] === 'undefined'){
                    entity[p] = dto[p];
                } else if(angular.isFunction(this.unpackOptions[p])) {
                    this.unpackOptions[p].call(entity, dto);
                }
            }
            return entity;
        }

        return Packer;
}