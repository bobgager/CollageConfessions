
myApp.onPageInit('confess', function (page) {

    //Events to watch

});

myApp.onPageBeforeAnimation('confess', function(page) {

    $$('#confessionSchoolName').html(globals.userSchool.schoolName);
    $$('#userNameConfessPageLabel').html(globals.userName);

});

var confessPage = {

    //******************************************************************************************************************
    postConfession: function () {

        //check to make sure they actually entered something
        if($$('#confessionInput').val() === 'Enter your confession here'){
            myApp.alert('Please confess to something', 'Confession Required!', function () {
                $$('#confessionInput').focus();
            });
            return;
        }

        //We've got a confession
        var newConfession = {};
        newConfession.itemID = cobaltfireUtils.guid();
        newConfession.confession = $$('#confessionInput').val();
        newConfession.schoolID = globals.userSchool.itemID;
        newConfession.forgiveCount = 0;
        newConfession.condemCount = 0;
        newConfession.bsCount = 0;
        newConfession.userGUID = globals.userGUID;
        newConfession.userName = globals.userName;

        awsConnector.postConfession(newConfession, confessPage.confessionPosted);

    },

    //******************************************************************************************************************
    confessionPosted: function (success, data) {

        if (!success){
            //the confession failed to post
            myApp.modal({
                title:  'DOH!',
                text: 'There was an error communicating with The Cloud.<br><br>Please check that you are connected to the internet and try again.<br><br>(Error Code: cp_001)<br>' + data,
                buttons: [
                    {
                        text: 'OK',
                        bold: true,
                        onClick: function() {

                        }
                    }
                ]
            });

            return ;

        }

        //confession posted OK
        globals.confessing = false

        mainView.router.loadPage({url: 'pages/confessions.html', animatePages: true});


    }

    //******************************************************************************************************************
    //******************************************************************************************************************

};