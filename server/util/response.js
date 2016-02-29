/**
 * Created by ggrab on 26.2.2016..
 */

function Response(response, error){

    if(arguments.length === 0){
        this.error = 'An error occurred.'
    }else{
        this.response = response;
        this.error = error;
    }
};

module.exports = Response;