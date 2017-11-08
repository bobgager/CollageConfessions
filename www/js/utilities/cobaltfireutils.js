

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
    },

    //******************************************************************************************************************
    daysAgo: function (time) {


        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(time);
        var secondDate = new Date();

        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

        if (diffDays === 0){
            return 'Today';
        }

        if (diffDays === 1){
            return diffDays + ' Day Ago';
        }

        return diffDays + ' Days Ago';
    }


    /*






    //!******************************************************************************************************************
    validateEmail: function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },

    //!******************************************************************************************************************
*/

};
