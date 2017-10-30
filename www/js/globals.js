
var globals = {

    version: 2.043,

    //localDev is programatically set to indicate we're running in a browser
    localDev: false,

    //holds various server based configuration values
    AppConfiguration: null,




    //******************************************************************************************************************
    /*Everything below can be deleted once things are working as they are from iQueue Mobile*/
    //******************************************************************************************************************

/*



    //holds on offset between the local clock and the server clock
    serverTimeOffset: 0,

    //holds the configuration code to identify which iQueue customer is being accessed
    configCode: '',

    //holds the iQueue customer info
    customer: null,

    //holds info about the customers locations
    theLocationsArray:  [],
    //and the location selected by this user
    theLocationID:  null,
    theLocationName: '',
    theLocationSubName: '',

    //holds the latest fetch of the Categories of questions
    theCategoriesArray:  [],
    theFAQs:[],
    //and the Category selected by this user
    theCategoryID: null,
    theCategoryName: '',

    //holds the latest fetch of the SubCategories of questions
    theSubCategoriesArray:  [],
    //and the SubCategory selected by this user
    theSubCategoryID: '',
    theSubCategoryQuestion: '',

    //holds some additional detail for this user
    userFirstName:  '',
    userLastName:   '',
    userEmail:      '',
    referredBy:     '',

    //holds the guid of this user if they are in line
    myguid: null,

    //holds the ID of the users open question in the database
    myQuestionID:   null,

    //!******************************************************************************************************************
    initPersistentGlobals: function(){
        //pull all the persistent globals out of persistent storage

        globals.configCode = $.jStorage.get('configCode');

        globals.userFirstName = $.jStorage.get('userFirstName');
        globals.userLastName = $.jStorage.get('userLastName');
        globals.userEmail = $.jStorage.get('userEmail');

        globals.theLocationID = $.jStorage.get('theLocationID');
        globals.theLocationName = $.jStorage.get('theLocationName');
        globals.theLocationSubName = $.jStorage.get('theLocationSubName');

        globals.myguid = $.jStorage.get('myguid');
        if(!globals.myguid){globals.setPersistentGlobal('myguid', '')};

        globals.myQuestionID = $.jStorage.get('myQuestionID');
    },

    //!******************************************************************************************************************
    setPersistentGlobal: function(globalName, globalValue){

        switch(globalName) {

            case 'configCode':
                $.jStorage.set('configCode', globalValue);
                globals.configCode = globalValue;
                break;

            case 'userFirstName':
                $.jStorage.set('userFirstName', globalValue);
                globals.userFirstName = globalValue;
                break;

            case 'userLastName':
                $.jStorage.set('userLastName', globalValue);
                globals.userLastName = globalValue;
                break;

            case 'userEmail':
                $.jStorage.set('userEmail', globalValue);
                globals.userEmail = globalValue;
                break;

            case 'theLocationID':
                $.jStorage.set('theLocationID', globalValue);
                globals.theLocationID = globalValue;
                break;

            case 'theLocationName':
                $.jStorage.set('theLocationName', globalValue);
                globals.theLocationName = globalValue;
                break;

            case 'theLocationSubName':
                $.jStorage.set('theLocationSubName', globalValue);
                globals.theLocationSubName = globalValue;
                break;

            case 'myguid':
                $.jStorage.set('myguid', globalValue);
                globals.myguid = globalValue;
                break;

            case 'myQuestionID':
                $.jStorage.set('myQuestionID', globalValue);
                globals.myQuestionID = globalValue;
                break;

            default:
            //
        }


    }
*/

};
