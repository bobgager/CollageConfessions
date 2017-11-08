
var globals = {

    version: 2.049,

    //localDev is programatically set to indicate we're running in a browser
    localDev: false,

    //holds various server based configuration values
    AppConfiguration: null,

    //holds the list of schools read from the cloud
    cc_schools: [],

    //set to true while in a confessing workflow
    confessing: false,

    //holds the schoolID to filter the list of confessions to
    //set to '000' to show all schools
    confessionSchoolFilter: '000',


    // Persistent Globals
    userFirstName: null,
    userSchool: null,


    //******************************************************************************************************************
    initPersistentGlobals: function(){
        //pull all the persistent globals out of persistent storage

        globals.userFirstName = $.jStorage.get('userFirstName');
        if(!globals.userFirstName){globals.setPersistentGlobal('userFirstName', 'Anonymous')};

        globals.userSchool = $.jStorage.get('userSchool');
        if(!globals.userSchool){globals.setPersistentGlobal('userSchool', '000')};

    },

    //******************************************************************************************************************
    resetPersistentGlobals: function(){
        //reset all the persistent globals out of persistent storage

        globals.setPersistentGlobal('userFirstName', 'Anonymous');
        globals.setPersistentGlobal('userSchool', '000');

    },

    //!******************************************************************************************************************
    setPersistentGlobal: function(globalName, globalValue){

        switch(globalName) {

            case 'userFirstName':
                $.jStorage.set('userFirstName', globalValue);
                globals.userFirstName = globalValue;
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
