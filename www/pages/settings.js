
myApp.onPageInit('settings', function (page) {



});

myApp.onPageBeforeAnimation('settings', function(page) {

    //set the Hide Reported checkbox of the popup
    $$('#hideReportedSettingsCBX').prop('checked', globals.hideReported);

    //show how many confessions this user has hidden
    $$('#hiddenConfessionCount').html(globals.hiddenConfessions.length);

    //show or hide the hidden confessions reset button
    if (globals.hiddenConfessions.length === 0){
        $$('#resetHiddenConfessionsLink').hide();
    }
    else {
        $$('#resetHiddenConfessionsLink').show();
    }


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
    },

    //******************************************************************************************************************
    showID: function () {
        myApp.alert(globals.userGUID,'Anonymous ID' );
    },

    //******************************************************************************************************************
    resetHiddenConfessions: function () {
        myApp.confirm('Are you sure you want to reset the Hidden Confessions?</br>All confessions you have previously requested to be hidden will now be shown.', 'Unhide Confessions?', function () {

            //clear the hidden confessions list
            globals.setPersistentGlobal('hiddenConfessions', []);

            //show how many confessions this user has hidden
            $$('#hiddenConfessionCount').html(globals.hiddenConfessions.length);

            $$('#resetHiddenConfessionsLink').hide();

        });
    }


    //******************************************************************************************************************

    //******************************************************************************************************************
    //******************************************************************************************************************

};