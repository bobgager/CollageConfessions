
myApp.onPageInit('newSchool', function (page) {

    //watch for these events


});

myApp.onPageBeforeAnimation('newSchool', function(page) {



});

var newSchoolPage = {

    //******************************************************************************************************************
    addSchool:function () {

        var newSchool = myApp.formToData('#newSchool-form');

        if (newSchool.schoolName.length === 0){
            myApp.alert("Please enter your school's Name", 'Info Needed!',function () {
                $$('#schoolName').focus();
            });
            return;
        }

        if (newSchool.schoolCity.length === 0){
            myApp.alert("Please enter your school's City", 'Info Needed!',function () {
                $$('#schoolCity').focus();
            });
            return;
        }

        if (newSchool.schoolState.length === 0){
            myApp.alert("Please enter your school's State", 'Info Needed!',function () {
                $$('#schoolState').focus();
            });
            return;
        }

        if (newSchool.schoolZip.length === 0){
            myApp.alert("Please enter your school's Zip Code", 'Info Needed!',function () {
                $$('#schoolZip').focus();
            });
            return;
        }

        newSchool.itemID = cobaltfireUtils.guid();

        globals.setPersistentGlobal('userSchool', newSchool);
        globals.confessionSchoolFilter = newSchool.itemID;
        $$('#menu_UserSchool').html(newSchool.schoolName);

        awsConnector.addSchool(newSchool, newSchoolPage.newSchoolAdded);

    },

    //******************************************************************************************************************
    newSchoolAdded:function (success,data) {
        if (!success){
            //the confession failed to post
            myApp.modal({
                title:  'DOH!',
                text: 'There was an error communicating with The Cloud.<br><br>Please check that you are connected to the internet and try again.<br><br>(Error Code: nsa_001)<br>' + data,
            });

            return ;

        }

        awsConnector.fetchSchools(newSchoolPage.schoolsReturned);


    },

    //******************************************************************************************************************
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

        if (globals.confessing){
            //show the confession page
            mainView.router.loadPage({url: 'pages/confess.html', animatePages: true});
        }
        else {

            if (globals.isAdim) {
                mainView.router.loadPage({url: 'confessions.html', animatePages: true});
                return;
            }

            //show the confessions
            mainView.router.loadPage({url: 'pages/confessions.html', animatePages: true});
        }
    }

    //******************************************************************************************************************
    //******************************************************************************************************************

};