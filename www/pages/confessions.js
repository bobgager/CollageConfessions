
myApp.onPageInit('confessions', function (page) {

    //watch for the Pull To Refresh event

    var ptrContent = $$('.pull-to-refresh-content');

    ptrContent.on('ptr:refresh', function (e) {
        confessionsPage.loadConfessions();
    });


});

myApp.onPageBeforeAnimation('confessions', function(page) {

    confessionsPage.loadConfessions();

});

myApp.onPageAfterAnimation('confessions', function(page) {




});

var confessionsPage = {


    //******************************************************************************************************************
    loadConfessions: function () {

        var loadingHTML = '<li class="item-content">\n' +
            '                        <div class="item-inner">\n' +
            '                            <div class="item-title-row">\n' +
            '                                <div class="item-title"><i class="fa fa-spin fa-spinner"></i>&nbsp;&nbsp;Fetching Confessions</div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </li>';


        $$('#confessionList').html(loadingHTML);

        awsConnector.fetchConfessions('001', confessionsPage.confessionsReturned)

    },

    //******************************************************************************************************************
    confessionsReturned: function (success, data) {

        // When loading done, we need to reset pull to refresh UI
        myApp.pullToRefreshDone();

        if (!success){
            //data contains the error message
            console.log(data);

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
                '    </li>'

/*            var errorHTML = '<li class="item-content">\n' +
                '                        <div class="item-inner">\n' +
                '                            <div class="item-title-row">\n' +
                '                                <div class="item-title">Error Loading Confessions</div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="item-inner">\n' +
                '                            <a href="#" class="button">Try Again</a>\n' +
                '                        </div>\n' +
                '                    </li>';*/

            $$('#confessionList').html(errorHTML);

            return;
        }

        //data contains the array of confessions
        //console.log(data.length + ' confessions');

        //tell the user we are processing the confessions
        var processingConfessionsHTML = '<li class="item-content">\n' +
            '                        <div class="item-inner">\n' +
            '                            <div class="item-title-row">\n' +
            '                                <div class="item-title"><i class="fa fa-spin fa-spinner"></i>&nbsp;&nbsp;Processing Confessions</div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </li>';

        $$('#confessionList').html(processingConfessionsHTML);


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
    confess: function () {
       console.log('CONFESS clicked')
    }


    //******************************************************************************************************************
    //******************************************************************************************************************

};