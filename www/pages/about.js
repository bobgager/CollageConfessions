
myApp.onPageInit('about', function (page) {

    //Events to watch
    $$(document).on('click', '#openCFS_BTN', aboutPage.openCFS);
    $$(document).on('click', '#openFacebook_BTN', aboutPage.openFacebook);

});

myApp.onPageBeforeAnimation('about', function(page) {


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
    },

    //******************************************************************************************************************
    openFacebook: function () {

        if (!myApp.device.os){
            window.open('https://www.facebook.com/collegeconfessionsapp/', '_blank');
            return;
        }
        var ref = cordova.InAppBrowser.open('https://www.facebook.com/collegeconfessionsapp/', '_system');
    }

    //******************************************************************************************************************
    //******************************************************************************************************************

};