

var cobaltfireUtils = {

    //******************************************************************************************************************
    testVersion: function(callback){
        //assumes
        //Framework7
        //globals.AppConfiguration has the current and minimum version info in configuration

        var versionStatus;

        var currentVersion = globals.AppConfiguration.currentVersion;
        var minVersion = globals.AppConfiguration.minimumVersion;

        //if we don't have the version info.
        //make sure we have something in there
        if(!currentVersion){
            currentVersion = 1;
            minVersion = 1;
        }

        //now we can test to make sure the user can run the app

        if(globals.version >= currentVersion){
            versionStatus = 'active';
        }
        else if(globals.version < minVersion){
            versionStatus = 'cancelled';
        }
        else{
            versionStatus = 'depricated';
        }

        switch(versionStatus){
            case 'depricated':
                console.log('THIS VERSION IS DEPRICATED');

                myApp.alert('You are running an outdated version of this application.<br><br>It should still work OK, but does not have the latest functionality.<br><br>Please upgrade to the newest version when you get a chance.', 'Update Suggested!', function () {
                    callback(true);
                });

//TODO Add another button for Upgrade Now to take the user to the app store
                break;

            case 'cancelled':
                console.log('THIS VERSION IS CANCELLED');

                myApp.alert("You are running an outdated version of this application.<br><br>In fact, it's so old, it can no longer be used.<br><br>Please upgrade to the newest version.", 'Update Required!');
//TODO take the user to the proper app store to get the latest version

                callback(false);
                break;

            case 'active':
                console.log('THIS VERSION IS ACTIVE');
                callback(true);
                break;

            default:
                callback(true);
        }


    },

    //******************************************************************************************************************
    guid: function () {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }


    /*
    //!******************************************************************************************************************
    setCustomSkin: function(){

        //console.log('setCustomSkin() called');


        if(globals.theLocationID){
            //we have a previously set location
            //so, figure out it's index

            //make sure we don't have an un-initilized locationIndex
            var locationIndex = 0;
            for (i = 0; i < globals.theLocationsArray.length; i++) {
                if(globals.theLocationsArray[i].locationID === globals.theLocationID){
                    //we have a hit
                    locationIndex = i;
                    break;
                }

            }
        }
        else{
            //the location has never been set
            //so just use the first location
            locationIndex = 0;
        }

        //customize the Nav bar for this customer location
        $('.navbar').css('background', globals.theLocationsArray[locationIndex].NavBarBackgroundColor);
        $('.navbar').css('color', globals.theLocationsArray[locationIndex].NavBarTextColor);
        $('.back').css('color', globals.theLocationsArray[locationIndex].NavBarTextColor);
        $('.topNavBarLeftIcon').css('color', globals.theLocationsArray[locationIndex].NavBarTextColor);
        $('.topNavBarRightIcon').css('color', globals.theLocationsArray[locationIndex].NavBarTextColor);

        //and the toolbar
        $('.toolbar').css('background', globals.theLocationsArray[locationIndex].NavBarBackgroundColor);
        $('.toolbar').css('color', globals.theLocationsArray[locationIndex].NavBarTextColor);
        $('.tabbar a.active').css('color', globals.theLocationsArray[locationIndex].NavBarTextColor);

        //and the devices statusbar
        $('.statusbar-overlay' ).css( "background", globals.theLocationsArray[locationIndex].NavBarBackgroundColor );


        if(!globals.localDev){
            //StatusBar.overlaysWebView(false);
            //StatusBar.backgroundColorByHexString(globals.theLocationsArray[locationIndex].NavBarBackgroundColor);
        }


    },

    //!******************************************************************************************************************
    calibratedDateTime: function(){

        //this function needs to return a claibrated Date/Time value so that different agents
        //will all be using the same clock even though they are on different machines that could be sent differently

        //if we don't have the server offset, get it.
        if(globals.serverTimeOffset === 0){
            $.ajax({
                dataType : 'json',
                url: 'http://cobaltfire.com/iqueue3/backbone_php/servertime.php',
                type: 'get',
                success: function(results) {

                    var serverTime = results * 1000;

                    var now = new Date();
                    var localTime = now.getTime();

                    globals.serverTimeOffset = localTime - serverTime;

                },
                error: function (request, status, error) {

                }
            });
        }

        var now = new Date();

        var calibratedTime = now.getTime() - globals.serverTimeOffset;

        var calibratedDateTime = new Date(calibratedTime);

        return calibratedDateTime;
    },

    //!******************************************************************************************************************
    convertPHPDateTimeString: function(dateString, timeString){

    //converts time represented by two strings
    //yyyy-mm-dd
    //hh:mm:ss
    // into a date object set to that time

    var dateArray = dateString.split("-");
    var timeArray = timeString.split(":");

    var theDateObject = new Date();
    theDateObject.setFullYear(Number(dateArray[0]));
    theDateObject.setMonth(Number(dateArray[1])-1);
    theDateObject.setDate(Number(dateArray[2]));
    theDateObject.setHours(Number(timeArray[0]));
    theDateObject.setMinutes(Number(timeArray[1]));
    theDateObject.setSeconds(Number(timeArray[2]));

    return theDateObject;
},

    //!******************************************************************************************************************
    validateEmail: function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },

    //!******************************************************************************************************************
*/

};
