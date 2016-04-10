/**
 * Created by ggrab on 23.2.2016..
 */

var angular = require('angular');

module.exports = ['$http', function($http){

        function Service(path, packer, services){
            this.path = path;
            this.packer = packer;

            if(services){
                for(var serviceName in services){
                    this[serviceName] = services[serviceName].bind(this);
                }
            }
        }

        function getError(res){
            return res.data.error;
        }

        function getResponse(res){
            return res.data.response;
        }

        function errorHandler(service){
            return this['on' + service.capitalizeFirstLetter() + 'Error'];
        }

        function successHandler(service){
            return this['on' + service.capitalizeFirstLetter() + 'Success'];
        }

        function unpackResponse(response){
            var service = this;
            if(angular.isArray(response)){
                return response.map(function(response) {
                    return service.packer.unpack(response);
                })
            }
            return this.packer.unpack(response);
        }

        function responseHandler(service){
            return function(res){
                var error = getError(res);
                var response = getResponse(res);
                if(error){
                    var handler = errorHandler.call(this, service);
                    handler && handler(error);
                }
                else {
                    var handler = successHandler.call(this, service);
                    handler && handler(response);
                }
                return angular.isObject(response) ? unpackResponse.call(this, response) : response;
            }.bind(this);
        }

        Service.prototype.get = function(id){
            return $http.get(this.path + (id ? id : '')).then(responseHandler.call(this, 'get'));
        }

        Service.prototype.put = function(item){
            return $http.put(this.path, this.packer.pack(item)).then(responseHandler.call(this, 'put'));
        }

        Service.prototype.post = function(item){
            return $http.post(this.path, this.packer.pack(item)).then(responseHandler.call(this, 'post'));
        }

        Service.prototype.delete = function(id){
            return $http.delete(this.path + (id ? id : '')).then(responseHandler.call(this, 'delete'));
        }

        return Service;

}];