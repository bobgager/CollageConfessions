
myApp.onPageInit('schools', function (page) {

    var mySearchbar = myApp.searchbar('.searchbar', {
        searchList: '.list-block-search',
        searchIn: '.item-title, .item-subtitle'
    });

});

myApp.onPageBeforeAnimation('schools', function(page) {

    schoolsPage.buildSchoolList();

});

myApp.onPageAfterAnimation('schools', function(page) {

});

var schoolsPage = {

    //******************************************************************************************************************
    buildSchoolList: function () {


        schoolListHTML = '';

        globals.cc_schools.forEach(function (school, index) {

            schoolListHTML += '<li>\n' +
                '                        <a href="#" class="item-link item-content" onclick="schoolsPage.pickSchool(&#39;' + school.itemID + '&#39;)">\n' +
                '                            <div class="item-inner">\n' +
                '                                <div class="item-title-row">\n' +
                '                                    <div class="item-title">' + school.schoolName + '</div>\n' +
                '                                </div>\n' +
                '                                <div class="item-subtitle">' + school.schoolCity + ' ' + school.schoolState + ' ' + school.schoolZip + '</div>\n' +
                '                            </div>\n' +
                '                        </a>\n' +
                '                    </li>'


        });




        $$('#schoolList').html(schoolListHTML);



    },

    //******************************************************************************************************************
    pickSchool: function (schoolID) {

        var selectedSchoolArray = globals.cc_schools.filter(function (school) {
            return school.itemID === schoolID;
        });

        globals.setPersistentGlobal('userSchool', selectedSchoolArray[0]);

        $$('#menu_UserSchool').html(globals.userSchool.schoolName);

        //set the school filter to this school
        globals.confessionSchoolFilter = schoolID;

        if (globals.confessing){
            //show the confession page
            mainView.router.loadPage({url: 'pages/confess.html', animatePages: true});
        }
        else {

            //show the confessions
            mainView.router.loadPage({url: 'pages/confessions.html', animatePages: true});
        }
    },

    //******************************************************************************************************************
    newSchool: function () {
        mainView.router.loadPage({url: 'pages/new_school.html', animatePages: true});
    }


    //******************************************************************************************************************
    //******************************************************************************************************************

};