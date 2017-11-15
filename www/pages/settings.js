
myApp.onPageInit('settings', function (page) {



});

myApp.onPageBeforeAnimation('settings', function(page) {

    //set the Hide Reported checkbox of the popup
    $$('#hideReportedSettingsCBX').prop('checked', globals.hideReported);

});

var settingsPage = {


    //******************************************************************************************************************
    setHideReported: function () {
        if ($('#hideReportedSettingsCBX').is(":checked")) {
            // it is checked
            globals.setPersistentGlobal('hideReported', true);
        }
        else {
            globals.setPersistentGlobal('hideReported', false);
        }
    }


    //******************************************************************************************************************

    //******************************************************************************************************************
    //******************************************************************************************************************

};