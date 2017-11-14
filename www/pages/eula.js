
myApp.onPageInit('eula', function (page) {

    //Events to watch


});

myApp.onPageBeforeAnimation('eula', function(page) {


});

var eulaPage = {

    //******************************************************************************************************************
    understandAndAgree: function () {

        globals.setPersistentGlobal('seenEULA', true);

        mainView.router.loadPage({url: 'pages/confessions.html', animatePages: true});

    }

    //******************************************************************************************************************
    //******************************************************************************************************************

};