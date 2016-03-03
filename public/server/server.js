/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('server', ['mapper', 'util'])

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

    .factory('serverRecipeService', ['$http', 'mapper', 'handleResponse', function($http, mapper, handleResponse){
        return {

            get: function(id){
                if(arguments.length === 0){
                    return $http.get('api/recipe').then(function(res){
                        if(res.data.response){
                            var message;
                            if(res.data.response.constructor === Array){
                                message = 'Recipes successfully loaded.'
                            } else {
                                message = sprintf('Recipe %s successfully loaded.', res.data.response.name);
                            }
                        }
                        return handleResponse(res, mapper.mapRecipe, message);
                    })
                }
            },

            put: function(recipe){
                return $http.put('api/recipe', recipe).then(function(res){
                    return handleResponse(res, mapper.mapRecipe, res.data.response ? sprintf('Recipe \"%s\" successfully created.', res.data.response.name) : null);
                });
            },

            post: function(recipe){
                return $http.post('api/recipe', recipe).then(function(res){
                    console.log(res.data.response);
                    return handleResponse(res, mapper.mapRecipe, sprintf('Successfully updated \"%s\".', recipe.name))
                });
            },

            delete: function(id){
                return $http.delete('api/recipe/' + id).then(function(res){
                    return handleResponse(res, sprintf('Recipe \"%s\" was successfully deleted.', res.data.response.name));
                });
            }
        }
    }]);