define([

], function () {
    return ['$scope', function ($scope) {


        var steps = $(".step");
        var stepIndex = 0;

        setStep(stepIndex);

        $(".step-icon").click(function () {
            var me = this;
            stepIndex = $(me).parents(".step").index();
            setStep(stepIndex);
        });


        function setStep(stepIndex) {
            $(steps).removeClass("is-sucess");
            $(steps).removeClass("last-sucess");

            for (var i = 0; i <= stepIndex; i++) {
                var step = steps[i];
                if (i < stepIndex) {
                    $(step).addClass("is-sucess");
                }
                else {
                    $(step).addClass("last-sucess");
                }
            }
        }


        function clearSteps() {
            stepIndex = -1;
            setStep(stepIndex);
        }


        function addStep(addnum) {
            if (!addnum) { addnum = 1 }
            stepIndex += addnum;
            setStep(stepIndex);
        }

    }];
});