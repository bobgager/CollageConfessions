
// Initialize Framework7
var myApp = new Framework7({
    swipeBackPage: false,
    pushState: true,
    modalTitle: 'College Confessions',
    animateNavBackIcon:true
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    // disable Dom Cache so pages don't double load (framework7 bug?)
    domCache: false

});

myApp.onPageAfterAnimation('index', function(page) {

    app.initializeCloud();

});


var app = {

/**********************************************************************************************************************/
    // Application Constructor
    initialize: function() {

        //see if we're running on a device or not
        if(myApp.device.os){
            console.log('we are running on a device');
            globals.localDev = false;
        }
        else{
            console.log('we are running in a browser');
            globals.localDev = true;
        }

        this.bindEvents();

    },

    /******************************************************************************************************************/
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('resume', app.resumeApp, false);

        //if we're developing locally, we won't get the deviceready event, so fake it
        if(globals.localDev){
            this.onDeviceReady();
        }
    },

    /******************************************************************************************************************/
    resumeApp:function(){
        //mainView.router.loadPage('index.html');
        //app.onDeviceReady();
    },

    /******************************************************************************************************************/
    // deviceready Event Handler
    onDeviceReady: function() {
        console.log('DeviceReady has fired');


        //track the launch event
        //get the device info
/*        if(!globals.localDev){
            var cordovaVersion = device.cordova;
            var deviceModel = device.model;
            var devicePlatform = device.platform;
            var deviceID = device.uuid;
            var deviceVersion = device.version;
        }
        else{
            var cordovaVersion = 'browser';
            var deviceModel = 'browser';
            var devicePlatform = 'browser';
            var deviceID = 'browser';
            var deviceVersion = 'browser';
        }*/


        //TODO at some point, record a launch heartbeat so we can see how many folks are using College Confessions

        //initialize any persistant global variables
        globals.initPersistentGlobals();


        app.initializeCloud();
    },

    /******************************************************************************************************************/
    initializeCloud: function() {

        //initialize AWS
        awsConnector.initializeAWS(app.fetchAppParameters);

    },

    /******************************************************************************************************************/
    fetchAppParameters: function(){

        //fetch the configuration parameters
        awsConnector.fetchAppConfig(app.appConfigReturned);

        //need to wait until we have config, or a failure to get config before proceeding
    },

    /******************************************************************************************************************/
    appConfigReturned: function (success, data) {

        if (!success){
            //there was an error reading the app configuration

            myApp.modal({
                title:  'DOH!',
                text: 'There was an error communicating with The Cloud.<br><br>Please check that you are connected to the internet and launch College Confessions again.<br><br>(Error Code: acr_001)<br>' + data,
                buttons: [
                    {
                        text: 'Try Again',
                        bold: true,
                        onClick: function() {
                            awsConnector.fetchAppConfig(app.appConfigReturned);
                        }
                    }
                ]
            });

            return ;

        }

        globals.AppConfiguration = data;

        //check to make sure we can run this version
        cobaltfireUtils.testVersion(app.initializeApp);

    },

    /******************************************************************************************************************/
    initializeApp: function(okToRun) {

        //test to make sure this version can be run
       if( !okToRun){
           ///since we got a false back, it means the app MUST be upgraded
           $('#index_LoadingMessage').html('Update Required');
           return;
       }
        //OK to proceed

        //pull in the persistent globals from long term storage
        globals.initPersistentGlobals();

        $$('#rightPanelGreeting').html('Hello ' + globals.userFirstName );

       if(globals.userSchool === '000'){
           $$('#menu_UserSchool').html('Not Selected');
       }
       else {
           $$('#menu_UserSchool').html(globals.userSchool.schoolName);
       }


       //fetch the list of schools
        awsConnector.fetchSchools(app.schoolsReturned);


    },

    /******************************************************************************************************************/
    schoolsReturned: function (success, data) {
        if (!success){
            //data contains the error message
            //console.log(data);

            //tell the user about the error

            myApp.alert('There was an error loading the list of schools from The Cloud.<br>Please make sure you are connected to the internet and click OK to try again.<br>' + data, 'Error Loading Schools!', function () {
                awsConnector.fetchSchools(app.schoolsReturned);
            });

            return;
        }

        //save the schools locally so we can use them later
        globals.cc_schools = data;

        //show the confessions
        mainView.router.loadPage({url: 'pages/confessions.html', animatePages: true});

    }

    /******************************************************************************************************************/


};


