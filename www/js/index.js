
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
        mainView.router.loadPage('index.html');
        app.initialize();
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




        app.initializeCloud();
    },

    /******************************************************************************************************************/
    initializeCloud: function() {

        //and initialize AWS
        awsConnector.initializeAWS(app.fetchAppParameters);



    },

    /******************************************************************************************************************/
    fetchAppParameters: function(){

        //and fetch the configuration parameters
        awsConnector.fetchAppConfig(app.appParametersReturned);

        //need to wait until we have config, or a failure to get config before proceeding
    },

    /******************************************************************************************************************/
    appParametersReturned: function () {

        //check to make sure we can run this version
        cobaltfireUtils.testVersion(app.initializeiQueue);

    },

    /******************************************************************************************************************/
    initializeiQueue: function(okToRun) {

        //test to make sure this version can be run
       if( !okToRun){
           ///since we got a false back, it means the app MUST be upgraded
           $('#index_LoadingMessage').html('Update Required');
           return;
       }
        //OK to proceed

        //pull in the persistent globals from long term storage
        globals.initPersistentGlobals();

        $('#rightPanelGreeting').html('Hello ' + globals.userFirstName );

        //do a time check so we can calibrate the clock to the server time
         var now = cobaltfireUtils.calibratedDateTime();


        //show the appropriate page depending on the config code

        if(!globals.configCode || globals.configCode === ''){
            //load up the configure page
            mainView.router.loadPage('pages/configure.html');
            return;
        }

        //we have a config code
        //so fetch the customer info for it
        //parseConnector.fetchCustomerByCode(globals.configCode, 'launch', app.customerReturned);
        awsConnector.fetchCustomerConfigByConfigCode(globals.configCode, app.customerReturned)

    },

    /******************************************************************************************************************/
    customerReturned: function(validCustomer){
        if(validCustomer){

            //replace the loading message in case the user ever uses the Back button to get back to the Index page
            $('#index_LoadingMessage').html('<p><a href="#" class="button" onclick="app.onDeviceReady();">Get Started</a></p>');

            //if there's a myguid, then this user is already in line
            if(globals.myguid != ''){
                //switch to the In Line View after getting the locations
                awsConnector.fetchCustomerLocationsTable(function(){mainView.router.loadPage({url: 'pages/inLine.html', animatePages: false});});
                return;
            }

            //fetch the locations for this customer
            awsConnector.fetchCustomerLocationsTable(app.locationsReturned);

            return;
        }
        mainView.router.loadPage({url: 'pages/configure.html', animatePages: false});
    },

    /******************************************************************************************************************/
    locationsReturned: function(){
        //let's see if there's only one location
        if(globals.theLocationsArray.length === 1){
            //only one location, so let's auto pick it
            var thePage = 'pages/home_location.html?location='+ globals.theLocationsArray[0].locationID;
            mainView.router.loadPage({url: thePage, animatePages: false});
        }
        else{
            mainView.router.loadPage({url: 'pages/home.html', animatePages: false});

        }
    }

    /******************************************************************************************************************/


};


