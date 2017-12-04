
var globals = {

    version: 2.056,

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
    blockedUsers: null,
    hiddenConfessions: null,
    hideReported: null,
    seenEULA: null,
    userGUID: null,
    userName: null,
    userSchool: null,


    //******************************************************************************************************************
    initPersistentGlobals: function(){
        //pull all the persistent globals out of persistent storage

        globals.blockedUsers = $.jStorage.get('blockedUsers');
        if(!globals.blockedUsers){globals.setPersistentGlobal('blockedUsers', [])}

        globals.hiddenConfessions = $.jStorage.get('hiddenConfessions');
        if(!globals.hiddenConfessions){globals.setPersistentGlobal('hiddenConfessions', [])}

        globals.hideReported = $.jStorage.get('hideReported');
        if(!globals.hideReported){globals.setPersistentGlobal('hideReported', false)}

        globals.seenEULA = $.jStorage.get('seenEULA');
        if(!globals.seenEULA){globals.setPersistentGlobal('seenEULA', false)}

        globals.userGUID = $.jStorage.get('userGUID');
        if(!globals.userGUID){globals.setPersistentGlobal('userGUID', cobaltfireUtils.guid())}

        globals.userName = $.jStorage.get('userName');
        if(!globals.userName){globals.setPersistentGlobal('userName', 'Anonymous')}

        globals.userSchool = $.jStorage.get('userSchool');
        if(!globals.userSchool){globals.setPersistentGlobal('userSchool', '000')}

    },

    //******************************************************************************************************************
    resetPersistentGlobals: function(){
        //reset all the persistent globals out of persistent storage

        globals.setPersistentGlobal('blockedUsers', []);
        globals.setPersistentGlobal('hiddenConfessions', []);
        globals.setPersistentGlobal('hideReported', false);
        globals.setPersistentGlobal('seenEULA', false);
        globals.setPersistentGlobal('userGUID', cobaltfireUtils.guid());
        globals.setPersistentGlobal('userName', 'Anonymous');
        globals.setPersistentGlobal('userSchool', '000');

    },

    //!******************************************************************************************************************
    setPersistentGlobal: function(globalName, globalValue){

        switch(globalName) {

            case 'blockedUsers':
                $.jStorage.set('blockedUsers', globalValue);
                globals.blockedUsers = globalValue;
                break;

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

            case 'userGUID':
                $.jStorage.set('userGUID', globalValue);
                globals.userGUID = globalValue;
                break;

            case 'userName':
                $.jStorage.set('userName', globalValue);
                globals.userName = globalValue;
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
