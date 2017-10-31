
myApp.onPageInit('confess', function (page) {

    //Events to watch

});

myApp.onPageBeforeAnimation('confess', function(page) {

    //test to see if a school has been set
    if (globals.userSchool === 'All'){

        myApp.alert('Before you Confess, we need to know what school you go to.', 'Information Needed!', function () {
            myApp.alert('Button clicked!')
        });

    }

});

var confessPage = {

    //******************************************************************************************************************


    //******************************************************************************************************************
    //******************************************************************************************************************

};