
myApp.onPageInit('confess', function (page) {

    //Events to watch

});

myApp.onPageBeforeAnimation('confess', function(page) {

    //test to see if a school has been set
    if (globals.userSchool === 'All'){

        mainView.router.loadPage({url: 'pages/schools.html', animatePages: true});

    }

});

var confessPage = {

    //******************************************************************************************************************


    //******************************************************************************************************************
    //******************************************************************************************************************

};