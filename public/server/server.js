/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('server', ['packer', 'util'])

    .factory('handleResponse', ['messageQueue', function(messageQueue){
        return function(res){
            if(res.data.error){
                messageQueue.addMessages(res.data.error);
                return Promise.reject(new Error('Rejection'));
            }
            var handler, messages;
            if(arguments.length === 3){
                handler = arguments[1];
                messages = arguments[2];
            } else if (arguments.length === 2){
                if(arguments[1].constructor === Function){
                    handler = arguments[1];
                } else{
                    messages = arguments[1];
                }
            }
            if(messages){
                messageQueue.addMessages(messages);
            }
            if(handler){
                return handler(res.data.response);
            }
        }
    }])

    .factory('serverRecipeService', ['$http', 'packer', 'messageQueue', function($http, packer, messageQueue){
        return {

            get: function(id){
                if(arguments.length === 0){
                    return $http.get('api/recipe').then(function(res){
                        var response = res.data.response;
                        var error = res.data.error;
                        if(error){
                            messageQueue.addMessages(error);
                            return Promise.reject();
                        }
                        var messages;
                        var recipes;
                        if(response.constructor === Array){
                            messages = response.map(function(recipe) { return sprintf('\'%s\' successfully loaded.', recipe.name); });
                            recipes = response.map(function(recipe) { return packer.unpackRecipe(recipe); });
                        } else{
                            messages = sprintf('\'%s\' successfully loaded.', res.response.name);
                            recipes = [];
                            recipes.push(packer.unpackRecipe(response));
                        }
                        messageQueue.addMessages(messages);
                        return recipes;
                    })
                }
            },

            put: function(recipe){
                return $http.put('api/recipe', packer.packRecipe(recipe)).then(function(res){
                    var response = res.data.response;
                    var error = res.data.error;
                    if(error){
                        messageQueue.addMessages(error);
                        return Promise.reject();
                    }
                    messageQueue.addMessages(sprintf('Successfully updated \'%s\'.', recipe.name));
                    return packer.unpackRecipe(response);
                });
            },

            post: function(recipe){
                recipe.id = 2000;
                return $http.post('api/recipe', packer.packRecipe(recipe)).then(function(res){
                    if(res.data.error){
                        messageQueue.addMessages(res.data.error);
                        return Promise.reject();
                    }
                    messageQueue.addMessages(sprintf('Successfully updated %s.', recipe.name));
                    return packer.unpackRecipe(res.data.response);
                });
            },

            delete: function(recipe){
                return $http.delete('api/recipe/' + recipe.id).then(function(res){
                    if(res.data.error){
                        messageQueue.addMessages(res.data.error);
                        return Promise.reject();
                    }
                    messageQueue.addMessages(sprintf('Successfully deleted \'%s\'.', recipe.name));
                });
            }
        }
    }])
    .factory('serverIngredientService', ['$http', 'packer', 'messageQueue', function($http, packer, messageQueue){

        return {

            put: function(ingredient){
                return $http.put('api/ingredient', packer.packIngredient(ingredient)).then(function(res){
                    if(res.data.error){
                        messageQueue.addMessages(res.data.error);
                        return Promise.reject();
                    }
                    messageQueue.addMessages(sprintf('Successfully saved \'%s\'.', ingredient.name));
                    return packer.unpackIngredient(res.data.response);
                })
            }

        }

    }]);