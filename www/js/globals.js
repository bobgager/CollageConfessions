
var globals = {

    version: 2.054,

    //localDev is programatically set to indicate we're running in a browser
    localDev: false,

    //holds various server based configuration values
    AppConfiguration: null,

    //holds the list of schools read from the cloud
    cc_schools: [],

    //holds the confessions returned from the cloud
    confessions: [],

    //set to true while in a confessing workflow
    confessing: false,

    //holds the schoolID to filter the list of confessions to
    //set to '000' to show all schools
    confessionSchoolFilter: '000',

    //set to true if we running the Admin Tool
    isAdim: false,

    //set to true to filter only reported confessions in Admin Tool
    onlyReportedAdmin: false,


    // Persistent Globals
    hiddenConfessions: null,
    hideReported: null,
    seenEULA: null,
    userFirstName: null,
    userGUID: null,
    userSchool: null,


    //******************************************************************************************************************
    initPersistentGlobals: function(){
        //pull all the persistent globals out of persistent storage

        globals.hiddenConfessions = $.jStorage.get('hiddenConfessions');
        if(!globals.hiddenConfessions){globals.setPersistentGlobal('hiddenConfessions', [])};

        globals.hideReported = $.jStorage.get('hideReported');
        if(!globals.hideReported){globals.setPersistentGlobal('hideReported', false)};

        globals.seenEULA = $.jStorage.get('seenEULA');
        if(!globals.seenEULA){globals.setPersistentGlobal('seenEULA', false)};

        globals.userFirstName = $.jStorage.get('userFirstName');
        if(!globals.userFirstName){globals.setPersistentGlobal('userFirstName', 'Anonymous')};

        globals.userGUID = $.jStorage.get('userGUID');
        if(!globals.userGUID){globals.setPersistentGlobal('userGUID', cobaltfireUtils.guid())};

        globals.userSchool = $.jStorage.get('userSchool');
        if(!globals.userSchool){globals.setPersistentGlobal('userSchool', '000')};

    },

    //******************************************************************************************************************
    resetPersistentGlobals: function(){
        //reset all the persistent globals out of persistent storage

        globals.setPersistentGlobal('hiddenConfessions', []);
        globals.setPersistentGlobal('hideReported', false);
        globals.setPersistentGlobal('seenEULA', false);
        globals.setPersistentGlobal('userFirstName', 'Anonymous');
        globals.setPersistentGlobal('userGUID', cobaltfireUtils.guid())
        globals.setPersistentGlobal('userSchool', '000');

    },

    //!******************************************************************************************************************
    setPersistentGlobal: function(globalName, globalValue){

        switch(globalName) {

            case 'hiddenConfessions':
                $.jStorage.set('hiddenConfessions', globalValue);
                globals.hiddenConfessions = globalValue;
                break;

            case 'hideReported':
                $.jStorage.set('hideReported', globalValue);
                globals.hideReported = globalValue;
                break;

            case 'seenEULA':
                $.jStorage.set('seenEULA', globalValue);
                globals.seenEULA = globalValue;
                break;

            case 'userFirstName':
                $.jStorage.set('userFirstName', globalValue);
                globals.userFirstName = globalValue;
                break;

            case 'userGUID':
                $.jStorage.set('userGUID', globalValue);
                globals.userGUID = globalValue;
                break;

            case 'userSchool':
                $.jStorage.set('userSchool', globalValue);
                globals.userSchool = globalValue;
                break;

            default:
            //
        }


    }

};
