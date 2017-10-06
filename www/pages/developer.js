
myApp.onPageInit('developer', function (page) {

    //watch for these events
    $$('.developer-ResetConfig-BTN').on('click', developerPage.developer_ResetConfig_BTN);

});

myApp.onPageBeforeAnimation('developer', function(page) {

    //customize the app skin for this customer
    cobaltfireUtils.setCustomSkin();

});

var developerPage = {

    //******************************************************************************************************************
    developer_ResetConfig_BTN: function(){

        // clear the locally saved code
        globals.setPersistentGlobal('configCode', '');
        globals.setPersistentGlobal('theLocationID', null);
        mainView.router.loadPage('pages/configure.html');
    }

    //******************************************************************************************************************

    //******************************************************************************************************************
    //******************************************************************************************************************

};