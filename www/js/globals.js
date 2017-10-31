
var globals = {

    version: 2.044,

    //localDev is programatically set to indicate we're running in a browser
    localDev: false,

    //holds various server based configuration values
    AppConfiguration: null,




    // Persistent Globals
    userFirstName: null,
    userSchool: null,


    //******************************************************************************************************************
    initPersistentGlobals: function(){
        //pull all the persistent globals out of persistent storage

        globals.userFirstName = $.jStorage.get('userFirstName');
        if(!globals.userFirstName){globals.setPersistentGlobal('userFirstName', 'Anonymous')};

        globals.userSchool = $.jStorage.get('userSchool');
        if(!globals.userSchool){globals.setPersistentGlobal('userSchool', 'All')};

    },

    //******************************************************************************************************************
    resetPersistentGlobals: function(){
        //reset all the persistent globals out of persistent storage

        globals.setPersistentGlobal('userFirstName', 'Anonymous');
        globals.setPersistentGlobal('userSchool', 'All');

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
