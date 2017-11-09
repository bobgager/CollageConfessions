/**
 * Created by bgager on 2/23/16.
 */

var awsConnector = {

    dynamodbEast: null,

    //******************************************************************************************************************
    addSchool: function(school, callback){

        var now = new Date();

        var params = {
            TableName: 'cc_confessions_schools',
            Key: { itemType : 'school', itemID: school.itemID },
            UpdateExpression: "set createTime = :ct, schoolName=:schoolName, schoolCity=:schoolCity, schoolState=:schoolState, schoolZip=:schoolZip ",
            ExpressionAttributeValues:{
                ":ct": now.getTime(),
                ":schoolName": school.schoolName,
                ":schoolCity": school.schoolCity,
                ":schoolState": school.schoolState,
                ":schoolZip": school.schoolZip
            }
        };

        this.dynamodbEast.update(params, function(err, data) {

            if (err){
                //console.log(err); // an error occurred
                callback (false, err);
            }
            else {
                //console.log(data);
                callback(true);
            }
        });

    },

    //******************************************************************************************************************
    fetchAppConfig: function(callback){

        var params = {
            TableName: 'Configurations',
            KeyConditionExpression: 'application = :appkey ',
            ExpressionAttributeValues: {
                ':appkey': 'CollegeConfessions'
            }
        };

        this.dynamodbEast.query(params, function(err, data) {
            //console.log('fetchAppConfig ' + err);
            if (err){
                //console.log(err); // an error occurred
                callback(false, err);

            }
            else {
                // successful response
                callback(true, data.Items[0]);
            }
        });

    },

    //******************************************************************************************************************
    fetchConfessions: function (callback) {

        var params = {
            TableName: 'cc_confessions_schools',
            KeyConditionExpression: 'itemType = :itemType ',
            ExpressionAttributeValues: {
                ':itemType': 'confession'
            }
        };

        this.dynamodbEast.query(params, function(err, data) {

            if (err){
                //console.log(err); // an error occurred
                callback(false, err);

            }
            else {
                // successful response
                callback(true, data.Items);
            }
        });

    },

    //******************************************************************************************************************
    fetchSchools: function ( callback) {

        var params = {
            TableName: 'cc_confessions_schools',
            KeyConditionExpression: 'itemType = :itemType ',
            ExpressionAttributeValues: {
                ':itemType': 'school'
            }
        };

        this.dynamodbEast.query(params, function(err, data) {

            if (err){
                //console.log(err); // an error occurred
                callback(false, err);

            }
            else {
                // successful response
                callback(true, data.Items);
            }
        });

    },
    
    //!******************************************************************************************************************
    initializeAWS: function(callback){

        // set the default config object
        var creds = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:f769f5d7-6530-4e45-a689-27226bb6d05e'
        });
        AWS.config.credentials = creds;

        AWS.config.region = 'us-east-1';

        AWS.config.dynamoDbCrc32 = false;

        //console.log('creating dynamodbEast');
        this.dynamodbEast = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        //console.log('dynamodbEast creation complete');

        callback();

    },

    //!******************************************************************************************************************
    postConfession: function(confession, callback){

        var now = new Date();

        var params = {
            TableName: 'cc_confessions_schools',
            Key: { itemType : 'confession', itemID: confession.itemID },
            UpdateExpression: "set createTime = :ct, confession=:confession, schoolID=:schoolID, forgiveCount=:forgiveCount, condemCount=:condemCount, bsCount=:bsCount ",
            ExpressionAttributeValues:{
                ":ct": now.getTime(),
                ":confession": confession.confession,
                ":schoolID": confession.schoolID,
                ":forgiveCount": confession.forgiveCount,
                ":condemCount": confession.condemCount,
                ":bsCount": confession.bsCount
            }
        };

        this.dynamodbEast.update(params, function(err, data) {

            if (err){
                //console.log(err); // an error occurred
                callback (false, err);
            }
            else {
                //console.log(data);
                callback(true);
            }
        });

    },

    //!******************************************************************************************************************
    updateConfessionCount: function (countName, itemID, currentCount, callback) {


        switch(countName) {
            case 'forgiveCount':
                var params = {
                    TableName: 'cc_confessions_schools',
                    Key: { itemType : 'confession', itemID: itemID },
                    UpdateExpression: "set forgiveCount=:forgiveCount ",
                    ExpressionAttributeValues:{
                        ":forgiveCount": currentCount + 1
                    }
                };
                break;

            case 'condemCount':
                var params = {
                    TableName: 'cc_confessions_schools',
                    Key: { itemType : 'confession', itemID: itemID },
                    UpdateExpression: "set condemCount=:condemCount ",
                    ExpressionAttributeValues:{
                        ":condemCount": currentCount + 1
                    }
                };
                break;

            case 'bsCount':
                var params = {
                    TableName: 'cc_confessions_schools',
                    Key: { itemType : 'confession', itemID: itemID },
                    UpdateExpression: "set bsCount=:bsCount ",
                    ExpressionAttributeValues:{
                        ":bsCount": currentCount + 1
                    }
                };
                break;

            default:
                //code block
        }



        this.dynamodbEast.update(params, function(err, data) {

            if (err){
                //console.log(err); // an error occurred
                callback (countName+itemID, false, err);
            }
            else {
                //console.log(data);
                callback(countName+itemID, true, data);
            }
        });


    }






    //******************************************************************************************************************
    /*Everything below can be deleted once things are working as they are from iQueue Mobile*/
    //******************************************************************************************************************






/*



    //!******************************************************************************************************************
    fetchCustomerConfigByConfigCode: function(configCode, callback){


        var params = {
            TableName: 'iqCustomerConfigs',
            IndexName: 'configCode-index',
            KeyConditionExpression: 'configCode = :cckey ',
            ExpressionAttributeValues: {
                ':cckey': configCode
            }
        };

        this.dynamodbEast.query(params, function(err, data) {

            //console.log('returned from fetchCustomerConfigByConfigCode with err= ' + err);

            if (err){
                //console.log(err); // an error occurred
                myApp.modal({
                    title:  'DOH!',
                    text: 'There was an error communicating with our server.<br><br>Please check that you are connected to the internet and launch iQueue Mobile again.<br><br>(Error Code: fccbcc001)',
                    buttons: [
                        {
                            text: 'Try Again',
                            bold: true,
                            onClick: function() {
                                awsConnector.fetchCustomerConfigByConfigCode(configCode, callback);
                            }
                        }
                    ]
                });

            }
            else {
                // successful response
                if(data.Items.length > 0){
                    //we got a customer that matches the congfigCode
                    globals.customer = data.Items[0];
                    var validCustomer = true;
                }
                else{
                    //no customers match the configCode
                    globals.customer = null;
                    var validCustomer = false;
                }

                callback(validCustomer);
            }
        });

    },

    //!******************************************************************************************************************
    fetchCustomerLocationsTable: function(callback){

        var params = {
            TableName: 'iqCustomerLocations',
            KeyConditionExpression: 'customerID = :ppkey ',
            ExpressionAttributeValues: {
                ':ppkey': globals.customer.customerID
            }
        };

        this.dynamodbEast.query(params, function(err, data) {

            if (err){
                //console.log(err); // an error occurred
                myApp.modal({
                    title:  'DOH!',
                    text: 'There was an error communicating with our server.<br><br>Please check that you are connected to the internet and launch iQueue Mobile again.<br><br>(Error Code: fclt001)',
                    buttons: [
                        {
                            text: 'Try Again',
                            bold: true,
                            onClick: function() {
                                awsConnector.fetchCustomerLocationsTable(callback);
                            }
                        }
                    ]
                });

            }
            else {
                // successful response
                globals.theLocationsArray = data.Items;
                callback();
            }
        });

    },

    //!******************************************************************************************************************
    fetchWaitTime: function(callback){

        var params = {
            TableName: 'iqOpenQueue',
            IndexName: 'locationID-issueStatus-index',
            KeyConditionExpression: 'locationID = :locationID and issueStatus = :issueStatus ',
            ExpressionAttributeValues: {
                ':locationID': globals.theLocationID,
                ':issueStatus': 'Open'
            }
        };

        this.dynamodbEast.query(params, function(err, data) {

            //console.log('returned from fetchWaitTime with err= ' + err);

            if (err){
                //console.log(err); // an error occurred
                myApp.modal({
                    title:  'DOH!',
                    text: 'There was an error communicating with our server.<br><br>Please check that you are connected to the internet and launch iQueue Mobile again.<br><br>(Error Code: fwt001)',
                    buttons: [
                        {
                            text: 'Try Again',
                            bold: true,
                            onClick: function() {
                                awsConnector.fetchWaitTime(callback);
                            }
                        }
                    ]
                });

            }
            else {
                // successful response

                for (var i=0;i<data.Items.length;i++)
                {
                    data.Items[i].guid = data.Items[i].personID;

                    data.Items[i].createDateTime = new Date(data.Items[i].createTime);
                    data.Items[i].waitTime = cobaltfireUtils.calibratedDateTime() - data.Items[i].createDateTime;
                }

                //sort ascending by the create time
                data.Items.sort(function(a, b){
                    var createTimeA=a.createTime, createTimeB=b.createTime
                    if (createTimeA < createTimeB) //sort  ascending
                        return -1
                    if (createTimeA > createTimeB)
                        return 1
                    return 0 //default return value (no sorting)
                });


                callback(data.Items);
            }
        });

    },

    //!******************************************************************************************************************
    fetchFAQs: function(callback){

        //$('#sc_card_content_inner').html('inside awsConnector.fetchFAQs ');

        var params = {
            TableName: 'iqFAQs',
            KeyConditionExpression: 'locationID = :locationID',
            ExpressionAttributeValues: {
                ':locationID': globals.theLocationID
            }
        };

        this.dynamodbEast.query(params, function(err, data) {

            //$('#sc_card_content_inner').html('inside awsConnector.fetchFAQs return function ');

            if (err){
                //console.log(err); // an error occurred
                //$('#sc_card_content_inner').html('awsConnector.fetchFAQs error: ' + err);
                callback(null);

            }
            else {
                // successful response

                //$('#sc_card_content_inner').html('awsConnector.fetchFAQs success');
                callback(data.Items);
            }
        });

    },

    //!******************************************************************************************************************
    saveQuestion: function(status,callback){

        //figure out the current date and time
        var now = cobaltfireUtils.calibratedDateTime();

        if(status === 'Open'){
            //create a new guid if this is a new question
            globals.setPersistentGlobal('myguid', cobaltfireUtils.guid());

            //make sure none of the optional parameters are empty
            if(globals.userEmail === ''){globals.userEmail = '?'}
            if(globals.referredBy === ''){globals.referredBy = 'n/a'}
            if(globals.theSubCategoryID === ''){globals.theSubCategoryID = 'n/a'}

            var params = {
                TableName: 'iqOpenQueue',
                Key: { locationID : globals.theLocationID, personID: globals.myguid },
                UpdateExpression: "set createTime = :ct, issueStatus=:status, firstName=:firstName, lastName=:lastName, email=:email, category=:category, question=:question, questionID=:questionID, referredby=:referredby, signonsource=:signonsource ",
                ExpressionAttributeValues:{
                    ":ct": now.getTime(),
                    ":status": status,
                    ":firstName": globals.userFirstName,
                    ":lastName": globals.userLastName,
                    ":email": globals.userEmail,
                    ":category": globals.theCategoryName,
                    ":question": globals.theSubCategoryQuestion,
                    ":questionID": 'n/a',
                    ":referredby": globals.referredBy,
                    ":signonsource": 'mobile'
                }
            };
        }
        else{
            var params = {
                TableName: 'iqOpenQueue',
                Key: { locationID : globals.theLocationID, personID: globals.myguid },
                UpdateExpression: "set issueStatus=:status",
                ExpressionAttributeValues:{
                    ":status": status
                }
            };
        }




        this.dynamodbEast.update(params, function(err, data) {
            //myApp.alert('Tried to update iqOpenQueue and err= ' + err);

            if (err){
                //console.log(err); // an error occurred
                myApp.modal({
                    title:  'DOH!',
                    text: 'There was an error communicating with our server.<br><br>Please check that you are connected to the internet and try again.<br><br>(Error Code: sq001)',
                    buttons: [
                        {
                            text: 'Start Over',
                            bold: true,
                            onClick: function() {

                                //clear the guid
                                globals.setPersistentGlobal('myguid','');
                                //go home
                                mainView.router.loadPage('pages/confessions.html');
                            }
                        },
                        {
                            text: 'Try Again',
                            bold: true,
                            onClick: function() {
                                awsConnector.saveQuestion(status, callback);
                            }
                        }
                    ]
                });
            }
            else {
                //console.log(data);
                var results = {success: true};
                callback(results);
            }
        });

    },

    //!******************************************************************************************************************
    fetchMyQuestion: function(callback){


        var params = {
            TableName: 'iqOpenQueue',
            KeyConditionExpression: 'locationID = :locationID and personID = :personID ',
            ExpressionAttributeValues: {
                ':locationID': globals.theLocationID,
                ':personID': globals.myguid
            }
        };

        this.dynamodbEast.query(params, function(err, data) {
            //console.log('returned from fetchMyQuestion with err= ' + err);
            if (err){
                //console.log(err); // an error occurred
                myApp.modal({
                    title:  'DOH!',
                    text: 'There was an error communicating with our server.<br><br>Please check that you are connected to the internet and launch iQueue Mobile again.<br><br>(Error Code: fmq001)',
                    buttons: [
                        {
                            text: 'Try Again',
                            bold: true,
                            onClick: function() {
                                awsConnector.fetchMyQuestion(callback);
                            }
                        }
                    ]
                });

            }
            else {
                // successful response
                if(data.Count === 0){
                    //no records match
                    callback(null);
                    return;
                }
                data.Items[0].status = data.Items[0].issueStatus;
                callback(data.Items[0]);
            }
        });


    },

    //!******************************************************************************************************************
    validateDomain: function(usersEmail, callback){

        //show a busy indicator
        myApp.showPreloader('Checking Your Email');

        var theDomain = usersEmail.substring(usersEmail.indexOf('@')+1);

        var params = {
            TableName: 'iqCustomerConfigs',
            FilterExpression : 'contains(allowedDomains,:theDomain)',
            ExpressionAttributeValues : {':theDomain' : theDomain}

        };


        this.dynamodbEast.scan(params, function(err, data) {
            //console.log('returned from validateDomain with err= ' + err);
            myApp.hidePreloader();

            if (err){
                //console.log(err); // an error occurred
                myApp.modal({
                    title:  'DOH!',
                    text: 'There was an error communicating with our server.<br><br>Please check that you are connected to the internet and launch iQueue Mobile again.<br><br>(Error Code: vd001)',
                    buttons: [
                        {
                            text: 'Try Again',
                            bold: true,
                            onClick: function() {
                                awsConnector.validateDomain(usersEmail, callback);
                            }
                        }
                    ]
                });

            }
            else {
                // successful response
                if(data.Count === 0){
                    callback(null);
                }
                else{
                    callback(data.Items[0].configCode);
                }
            }
        });




    }



    */
    //******************************************************************************************************************
    //******************************************************************************************************************
    //******************************************************************************************************************
};
