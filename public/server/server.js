/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('server', ['util', 'nutrition'])

    .config(function(){
        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
    })

    .factory('serverService', ['$http', function($http){

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

    }])

    .factory('serverRecipeService', ['serverService', 'recipePacker', 'messageQueue', function(Service, recipePacker, messageQueue){

        var service = new Service('api/recipe/', recipePacker);
        service.onGetSuccess = function(response){ messageQueue.addMessages(angular.isArray(response) ? response.map(function(recipe) { return sprintf('\'%s\' loaded.', recipe.name)}) : sprintf('\'%s\' loaded.', response.name)) };
        service.onGetError = function(error) { messageQueue.addMessages(error) };
        service.onPutSuccess = function(response) { messageQueue.addMessages(sprintf('\'%s\' created successfully.', response.name)) };
        service.onPutError = function(error) { messageQueue.addMessages(error); };
        service.onPostSuccess = function(response){ messageQueue.addMessages(sprintf('\'%s\' updated successfully.', response.name)) };
        service.onPostError = function(error) { messageQueue.addMessages(error)}
        service.onDeleteSuccess = function(response){ messageQueue.addMessages(sprintf('Recipe deleted successfully.', response.name)) };
        service.onDeleteError = function(error) { messageQueue.addMessages(error)};

        return service;

    }])

    .factory('serverIngredientService', ['serverService', 'ingredientPacker', 'messageQueue', function(Service, ingredientPacker, messageQueue){

        var service = new Service('api/ingredient/', ingredientPacker);
        service.onPutSuccess = function(response) { messageQueue.addMessages(sprintf('\'%s\' created successfully.', response.name)) };
        service.onPutError = function(error) { messageQueue.addMessages(error); };
        service.onPostSuccess = function(response){ messageQueue.addMessages(sprintf('\'%s\' updated successfully.', response.name)) };
        service.onPostError = function(error) { messageQueue.addMessages(error)}
        service.onDeleteSuccess = function(response){ messageQueue.addMessages(sprintf('Ingredient deleted successfully.', response.name)) };
        service.onDeleteError = function(error) { messageQueue.addMessages(error)};

        return service;

    }]);