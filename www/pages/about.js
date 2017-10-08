
myApp.onPageInit('about', function (page) {

    //Events to watch
    $$(document).on('click', '#openCFS_BTN', aboutPage.openCFS);

});

myApp.onPageBeforeAnimation('about', function(page) {

    //customize the app skin for this customer
    cobaltfireUtils.setCustomSkin();

    clearTimeout(inLinePage.inlineTimer);
    clearTimeout(homeLocationPage.waitTimeTimer);

    //show the version number
    $('#aboutVersionString').html('Version: ' + globals.version);

});

var aboutPage = {

    //******************************************************************************************************************
    openCFS: function () {

        if (!myApp.device.os){
            window.open('http://www.cobaltfire.com', '_blank');
            return;
        }
        var ref = cordova.InAppBrowser.open('http://cobaltfire.com', '_system');
    }

    //******************************************************************************************************************
    //******************************************************************************************************************

};