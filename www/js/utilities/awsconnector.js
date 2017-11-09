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
                callback (countName, itemID, false, err);
            }
            else {
                //console.log(data);
                callback(countName, itemID, true, data);
            }
        });


    }





    //******************************************************************************************************************
    //******************************************************************************************************************
    //******************************************************************************************************************
};
