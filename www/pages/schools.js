
myApp.onPageInit('schools', function (page) {

    var mySearchbar = myApp.searchbar('.searchbar', {
        searchList: '.list-block-search',
        searchIn: '.item-title, .item-subtitle'
    });

});

myApp.onPageBeforeAnimation('schools', function(page) {

    schoolsPage.buildSchoolList();

    if (globals.confessing){
        $$('#addNew_BTN').show();
        $$('#seeAll_BTN').hide();
    }
    else {
        $$('#addNew_BTN').hide();
        $$('#seeAll_BTN').show();
    }

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

        globals.setPersistentGlobal('userSchool', schoolID);

        $$('#menu_UserSchool').html(globals.userSchool);

        if (globals.confessing){

        }
        else {

            //set the school filter to this school
            globals.confessionSchoolFilter = schoolID;

            //show the confessions
            mainView.router.loadPage({url: 'pages/confessions.html', animatePages: true});
        }
    }


    //******************************************************************************************************************
    //******************************************************************************************************************

};