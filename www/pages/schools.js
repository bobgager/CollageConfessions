
myApp.onPageInit('schools', function (page) {

    //Events to watch

});

myApp.onPageBeforeAnimation('schools', function(page) {

    //check to see if we're loading this page because the user is trying to confess without having already selecting a school

    if (page.query.choiceContext){
        if (page.query.choiceContext === 'confessing'){
            //the user is trying to confess
            if (globals.userSchool === 'All'){
                //and, they have not selected their school
                $$('#schoolPageUserMessage').html('You need to choose your school before you can confess');
                return;
            }
        }
    }

    //we're not choosing a school because the user is confessing without a school selected
    //so, they are just picking a school for whatever reason
    $$('#schoolPageUserMessage').html('Please select your school');


});

var schoolsPage = {

    //******************************************************************************************************************


    //******************************************************************************************************************
    //******************************************************************************************************************

};