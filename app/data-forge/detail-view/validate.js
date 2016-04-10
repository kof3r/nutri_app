/**
 * Created by gordan on 10.04.16..
 */

module.exports = ['dataForge_registry', function(registry){

    return {
        restrict: 'A',
        require:'ngModel',
        link: function(scope, elem, attrs, ctrl){

            attrs.$observe('validate', function(){
                var validators = scope.resolveValidators(attrs.validate);

                validators.forEach(function(validatorObj){
                    var validatorInvocation = validatorObj.validator.split(':');
                    var validator = registry.validator(validatorInvocation[0]);
                    if(validator.length === 0){
                        validator = validator.apply(ctrl, validatorInvocation);
                    }

                    ctrl.$validators[validatorObj.validator] = validator.bind(ctrl);
                })
            })

        }
    }
}]