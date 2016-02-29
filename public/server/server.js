/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('server', ['mapper', 'util'])

    .factory('handleResponse', ['messageQueue', function(messageQueue){
        return function(res){
            if(res.data.error){
                messageQueue.addMessages(res.data.error);
                throw new Error();
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
                        var messages = null;
                        if(res.data.response){
                            messages = res.data.response.map(function(recipe){
                                return sprintf('Loaded \"%s\".', recipe.name);
                            })
                        }
                        return handleResponse(res, mapper.map, messages);
                    })
                }
            },

            put: function(recipe){
                return $http.put('api/recipe', recipe).then(function(res){
                    return handleResponse(res, mapper.map, res.data.response ? sprintf('Recipe \"%s\" successfully created.', res.data.response.name) : null);
                })
            },

            post: function(recipe){
                return $http.post('api/recipe', recipe).then(function(res){
                    return handleResponse(res, mapper.map, sprintf('Successfully updated \"%s\".', recipe.name))
                });
            },

            delete: function(id){
                return $http.delete('api/recipe/' + id).then(function(res){
                    return handleResponse(res, sprintf('Recipe \"%s\" was successfully deleted.', res.data.response.name));
                });
            }
        }
    }]);