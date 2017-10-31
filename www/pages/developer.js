
myApp.onPageInit('developer', function (page) {

    //watch for these events
    $$('.developer-ResetStorage-BTN').on('click', developerPage.developer_ResetStorage_BTN);

});

myApp.onPageBeforeAnimation('developer', function(page) {



});

var developerPage = {

    //******************************************************************************************************************
    developer_ResetStorage_BTN: function () {
        globals.resetPersistentGlobals();
        myApp.showPreloader('Clearing...')
        setTimeout(function () {
            myApp.hidePreloader();
        }, 2000);
    }

    //******************************************************************************************************************

    //******************************************************************************************************************
    //******************************************************************************************************************

};