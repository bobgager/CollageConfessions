
myApp.onPageInit('settings', function (page) {

    //watch for these events
    $$('.prompt-ResetConfig-BTN').on('click', settingsPage.prompt_ResetConfig_BTN);

});

myApp.onPageBeforeAnimation('settings', function(page) {

    //customize the app skin for this customer
    cobaltfireUtils.setCustomSkin();

    clearTimeout(inLinePage.inlineTimer);
    clearTimeout(homeLocationPage.waitTimeTimer);

    //set the ConfigCode input
    $('#settings_ConfigCodeInput').val(globals.customer.configCode);

    //set the users information
    if(globals.userEmail){
        if(globals.userEmail.length >0){
            $('#settings_UsersEmailInput').val(globals.userEmail);
        }
    }
    if(globals.userFirstName){
        if(globals.userFirstName.length >0){
            $('#settings_FirstNameInput').val(globals.userFirstName);
        }
    }
    if(globals.userLastName){
        if(globals.userLastName.length >0){
            $('#settings_LastNameInput').val(globals.userLastName);
        }
    }

});

var settingsPage = {

    //******************************************************************************************************************
    prompt_ResetConfig_BTN: function(){
        myApp.confirm('Resetting the Configuration Code is not something you should typically do.<br><br>Click OK to do it anyway.', 'Are you sure?', function () {
            globals.setPersistentGlobal('configCode', '');
            globals.setPersistentGlobal('theLocationID', null);
            mainView.router.loadPage('pages/configure.html');
        });
    },

    //******************************************************************************************************************
    saveChanges: function(){

        //save any changes to the users email
        //but first make sure it's valid
        var atpos = $('#settings_UsersEmailInput').val().indexOf("@");
        var dotpos = $('#settings_UsersEmailInput').val().lastIndexOf(".");
        if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=$('#settings_UsersEmailInput').val().length) {
            //bad email address format
            myApp.alert('Please enter a proper Email Address', 'Invalid Email Address!');

            return ;
        }

        globals.setPersistentGlobal('userEmail', $('#settings_UsersEmailInput').val());
        globals.setPersistentGlobal('userFirstName', $('#settings_FirstNameInput').val());
        globals.setPersistentGlobal('userLastName', $('#settings_LastNameInput').val());

        $('#rightPanelGreeting').html('Hello ' + globals.userFirstName );


        mainView.router.back();
    }

    //******************************************************************************************************************

    //******************************************************************************************************************
    //******************************************************************************************************************

};