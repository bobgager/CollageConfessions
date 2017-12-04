
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


    //show how many Users this user has blocked
    $$('#blockedUserCount').html(globals.blockedUsers.length);

    //show or hide the blocked users reset button
    if (globals.blockedUsers.length === 0){
        $$('#resetBlockedUsersLink').hide();
    }
    else {
        $$('#resetBlockedUsersLink').show();
    }

    //show the users userName
    $$('#userNameInput').val(globals.userName);


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
        myApp.alert(globals.userGUID,'Sync ID' );
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
    },

    //******************************************************************************************************************
    resetBlockedUsers: function () {
        myApp.confirm('Are you sure you want to clear the list of Blocked Users?</br>All users you have previously requested to be blocked will now be shown.', 'Unblock Users?', function () {

            //clear the blocked users list
            globals.setPersistentGlobal('blockedUsers', []);

            //show how many confessions this user has hidden
            $$('#blockedUserCount').html(globals.blockedUsers.length);

            $$('#resetBlockedUsersLink').hide();

        });
    },

    //******************************************************************************************************************
    setUserName: function () {
        globals.setPersistentGlobal('userName', $$('#userNameInput').val())
        $$('#rightPanelGreeting').html('Hello ' + globals.userName );
    }


    //******************************************************************************************************************

    //******************************************************************************************************************
    //******************************************************************************************************************

};