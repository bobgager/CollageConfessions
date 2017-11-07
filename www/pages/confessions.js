
myApp.onPageInit('confessions', function (page) {

    //watch for the Pull To Refresh event

    var ptrContent = $$('.pull-to-refresh-content');

    ptrContent.on('ptr:refresh', function (e) {
        confessionsPage.loadConfessions();
    });


});

myApp.onPageBeforeAnimation('confessions', function(page) {

    confessionsPage.loadConfessions(globals.userSchool);

    globals.confessing = false;

});

myApp.onPageAfterAnimation('confessions', function(page) {


});

var confessionsPage = {


    //******************************************************************************************************************
    loadConfessions: function () {

        //set the button tab
        if (globals.confessionSchoolFilter !== '000'){
            $$('#showAllConfessionsBTN').removeClass('active');
            $$('#showMySchoolConfessionsBTN').addClass('active');
        }
        else {
            $$('#showAllConfessionsBTN').addClass('active');
            $$('#showMySchoolConfessionsBTN').removeClass('active');
        }

        var loadingHTML = '<li class="item-content">\n' +
            '                        <div class="item-inner">\n' +
            '                            <div class="item-title-row">\n' +
            '                                <div class="item-title"><i class="fa fa-spin fa-spinner"></i>&nbsp;&nbsp;Fetching Confessions</div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </li>';


        $$('#confessionList').html(loadingHTML);

        awsConnector.fetchConfessions(confessionsPage.confessionsReturned)

    },

    //******************************************************************************************************************
    confessionsReturned: function (success, data) {

        // When loading is done, we need to reset pull to refresh UI
        myApp.pullToRefreshDone();

        if (!success){
            //data contains the error message
            //console.log(data);

            //tell the user about the error

            var errorHTML = '<li class="card " style="margin: 0px">\n' +
                '      <div class="card-header" >Error Loading Confessions</div>\n' +
                '      <div class="card-content">\n' +
                '        <div class="card-content-inner">' +
                '           <p>There was an error loading the Confessions</p> ' +
                '           <p>Please make sure you are connected to the internet and try again</p> ' +
                '           <p>'+ data +'</p> ' +
                '        </div>\n' +
                '      </div>\n' +
                '      <div class="card-footer">' +
                '           <p></p>' +
                '           <a href="#" class="button" onclick="confessionsPage.loadConfessions()">Try Again</a>' +
                '           <p></p>' +
                '       </div>\n' +
                '    </li>';

            $$('#confessionList').html(errorHTML);

            return;
        }

        //data contains the array of confessions

        //tell the user we are processing the confessions
        var processingConfessionsHTML = '<li class="item-content">\n' +
            '                        <div class="item-inner">\n' +
            '                            <div class="item-title-row">\n' +
            '                                <div class="item-title"><i class="fa fa-spin fa-spinner"></i>&nbsp;&nbsp;Processing Confessions</div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </li>';

        $$('#confessionList').html(processingConfessionsHTML);


        //filter the lsit of confessions if needed
        if (globals.confessionSchoolFilter !== '000'){
            //we need to filter

            data = data.filter(function (school) {
                return school.schoolID === globals.confessionSchoolFilter;
            });

        }


        //TODO sort the confessions by createTime

        var confessionListHTML = '';

        data.forEach(function (confession, index) {
            confessionListHTML += confessionsPage.confessionItemHTML(confession);
        });

        $$('#confessionList').html(confessionListHTML);

    },

    //******************************************************************************************************************
    confessionItemHTML: function (confession) {


        var confessionItemHTML = '<li class="item-content">\n' +
            '                        <div class="item-inner">\n' +
            '                            <div class="item-title-row">\n' +
            '                                <div class="item-title">' + confession.confession + '</div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </li>';

        return confessionItemHTML;

    },

    //******************************************************************************************************************
    showAllConfessions: function () {

        globals.confessionSchoolFilter = '000';

        $$('#showAllConfessionsBTN').addClass('active');
        $$('#showMySchoolConfessionsBTN').removeClass('active');

        confessionsPage.loadConfessions();

    },

    //******************************************************************************************************************
    showMySchoolConfessions: function () {

        //TODO need to see if the user has selected a school
        //if not, force them to select a school first

        globals.confessionSchoolFilter = globals.userSchool;

        $$('#showAllConfessionsBTN').removeClass('active');
        $$('#showMySchoolConfessionsBTN').addClass('active');

        confessionsPage.loadConfessions();

    },

    //******************************************************************************************************************
    confess: function () {

        globals.confessing = true;

        //test to see if a school has been set
        if (globals.userSchool === 'All'){

            mainView.router.loadPage({url: 'pages/schools.html', animatePages: true});

        }
        else {
            mainView.router.loadPage({url: 'pages/confess.html', animatePages: true});
        }
    }


    //******************************************************************************************************************
    //******************************************************************************************************************

};