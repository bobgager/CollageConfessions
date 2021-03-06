
myApp.onPageInit('confessions', function (page) {

    //watch for the Pull To Refresh event

    var ptrContent = $$('.pull-to-refresh-content');

    ptrContent.on('ptr:refresh', function (e) {
        confessionsPage.loadConfessions();
    });


});

myApp.onPageBeforeAnimation('confessions', function(page) {

    confessionsPage.loadConfessions();

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


        //filter the list of confessions if needed
        if (globals.confessionSchoolFilter !== '000'){
            //we need to filter

            data = data.filter(function (school) {
                return school.schoolID === globals.confessionSchoolFilter;
            });

        }

        //hide the reported confessions if needed
        if (globals.hideReported){
            //we need to filter

            data = data.filter(function (confession) {
                return !confession.reported ;
            });

        }

        //filter out the confessions this user has explicitly marked as hidden

        data = data.filter(function (confession) {
            return    globals.hiddenConfessions.indexOf(confession.itemID) === -1    ;
        });

        //filter out the users this user has explicitly blocked

        data = data.filter(function (confession) {
            return    globals.blockedUsers.indexOf(confession.userGUID) === -1    ;
        });



        if (data.length === 0){
            //tell the user there are no confessions
            var noConfessionsHTML = '' +
                '                    <li>' +
                '                       <!-- Inset content block -->\n' +
                '                       <div class="content-block inset">\n' +
                '                           <div class="content-block-inner">\n' +
                '                               <p>Sorry, there are no confessions posted for your school.<br><br>Tap the CONFESS button below to be the first to confess.</p>\n' +
                '                           </div>\n' +
                '                       </div>' +
                '                    </li>';

            $$('#confessionList').html(noConfessionsHTML);

            return;
        }


        //sort descending by the create time
        data.sort(function(a, b){
            var createTimeA=a.createTime, createTimeB=b.createTime
            if (createTimeA > createTimeB) //sort  descending
                return -1
            if (createTimeA < createTimeB)
                return 1
            return 0 //default return value (no sorting)
        });

        //store the confessions so we can use them in other functions
        globals.confessions = data;

        var confessionListHTML = '';

        for (i = 0; i < data.length; i++) {

            //filter down to the school for this confession
            var selectedSchoolArray = globals.cc_schools.filter(function (school) {
                return school.itemID === data[i].schoolID;
            });
            //if selectedSchoolArray is empty, it means a school was added after the last time globals.cc_schools was updated
            //and a confession for that school was entered
            //which results in a hang below when trying to display the schoolName for a school that is localy undefined.
            //need to re-read the schools in this case, and then re-load the confessions

            if (selectedSchoolArray.length === 0){
                //need to refresh the schools

                //fetch the list of schools

                myApp.showPreloader('Refreshing Schools')
                setTimeout(function () {
                    myApp.hidePreloader();
                }, 1000);

                awsConnector.fetchSchools(confessionsPage.schoolsReturned);
                break;
            }

            confessionListHTML += confessionsPage.confessionItemHTML(data[i], selectedSchoolArray[0].schoolName);

        }

        $$('#confessionList').html(confessionListHTML);

    },

    //******************************************************************************************************************
    schoolsReturned: function (success, data) {
        if (!success){
            //data contains the error message
            //console.log(data);

            //tell the user about the error

            myApp.alert('There was an error loading the list of schools from The Cloud.<br>Please make sure you are connected to the internet and click OK to try again.<br>' + data, 'Error Loading Schools!', function () {
                awsConnector.fetchSchools(confessionsPage.schoolsReturned);
            });

            return;
        }

        //save the schools locally so we can use them later
        globals.cc_schools = data;

        //reload the confessions
        confessionsPage.loadConfessions();
    },

    //******************************************************************************************************************
    confessionItemHTML: function (confession, schoolName) {

        //TODO: can get rid of this once all the confessions without user names have been recyled
        if (!confession.userName){
            confession.userName = 'Anonymous';
        }

        confessionItemHTML = '' +
            '<li id="confession' + confession.itemID + '" class="card facebook-card black-border margin-r-l-0 " style="background-color: rgba(153,153,153,0.3)">\n' +
            '  <div class="card-header ' + confessionsPage.headerClass(confession, false) + ' " >\n' +
            '    <div class="facebook-avatar"><img src="img/anonymous.png" width="34" height="34"></div>\n' +
            '    <div class="facebook-name row">'+ confession.userName +'<span class="facebook-date">' + cobaltfireUtils.daysAgo(confession.createTime) + '</span></div>\n' +
            '    <div class="facebook-date">' + schoolName + '</div>\n' +
            '  </div>\n' +
            confessionsPage.headerClass(confession, true) +
            '  <div class="card-content ">\n' +
            '       <div>' + confession.confession + '</div>\n' +
            '   </div>\n' +
            '  <div class="card-footer ">\n' +
            '    <a href="#" class="link forgive-color" onclick="confessionsPage.incrementCount(&#39;forgiveCount&#39;,&#39;' + confession.itemID + '&#39;,' + confession.forgiveCount + ')">Forgive&nbsp;&nbsp;<span       class="forgive-count">' + confession.forgiveCount + '</span></a>\n' +
            '    <a href="#" class="link condem-color"  onclick="confessionsPage.incrementCount(&#39;condemCount&#39;,&#39;'  + confession.itemID + '&#39;,' + confession.condemCount + ')">Condem&nbsp;&nbsp;<span  class="condem-count">'  + confession.condemCount + '</span></a>\n' +
            '    <a href="#" class="link bs-color"      onclick="confessionsPage.incrementCount(&#39;bsCount&#39;,&#39;'      + confession.itemID + '&#39;,' + confession.bsCount + ')">Bull Shit&nbsp;&nbsp;<span class="bs-count">'      + confession.bsCount + '</span></a>\n' +
            '    <a id="moreLink' + confession.itemID + '" href="#"  style="color: white"      onclick="confessionsPage.moreLinkClicked(&#39;' + confession.itemID + '&#39;)">&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-ellipsis-h">&nbsp;</i></a>\n' +
            '  </div>\n' +
            '</li>';

        return confessionItemHTML;

    },

    //******************************************************************************************************************
    headerClass: function (confession, triangle) {

        var countArray = [  {countHeader: 'forgive-header', headerTriangle: 'forgive-triangle', count: confession.forgiveCount},
                            {countHeader: 'condem-header',  headerTriangle: 'condem-triangle', count: confession.condemCount},
                            {countHeader: 'bs-header',      headerTriangle: 'bs-triangle', count: confession.bsCount}     ];


        countArray.sort(function(a, b){
            var countA=a.count, countB=b.count
            if (countA < countB) //sort  descending
                return 1
            if (countA > countB)
                return -1
            return 0 //default return value (no sorting)
        });


        if (triangle){

            //see if the two top counts are equal
            if (countArray[0].count === countArray[1].count){
                //if they are, return an normal triangle
                return '  <div class="normal-triangle" ></div>\n';
            }

            return '  <div class="' + countArray[0].headerTriangle + '" ></div>\n';
        }

        //see if the two top counts are equal
        if (countArray[0].count === countArray[1].count){
            //if they are, return an empty string
            return '';
        }



        return countArray[0].countHeader;

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

        //see if the user has selected a school
        //if not, force them to select a school first
        if(globals.userSchool === '000'){
            mainView.router.loadPage({url: 'pages/schools.html', animatePages: true});
            return;
        }

        globals.confessionSchoolFilter = globals.userSchool.itemID;

        $$('#showAllConfessionsBTN').removeClass('active');
        $$('#showMySchoolConfessionsBTN').addClass('active');

        confessionsPage.loadConfessions();

    },

    //******************************************************************************************************************
    confess: function () {

        globals.confessing = true;

        //test to see if a school has been set
        if (globals.userSchool === '000'){

            mainView.router.loadPage({url: 'pages/schools.html', animatePages: true});

        }
        else {
            mainView.router.loadPage({url: 'pages/confess.html', animatePages: true});
        }
    },

    //******************************************************************************************************************
    incrementCount: function (countName, itemID, currentCount) {

        //TODO put in a mechanism to make sure this user can't vote on a single confession more than once in a session

        awsConnector.updateConfessionCount(countName, itemID, currentCount, confessionsPage.countUpdated);


    },

    //******************************************************************************************************************
    countUpdated:function (countName, itemID, success, data) {

        if (!success){
            //the count update failed to post
            myApp.modal({
                title:  'DOH!',
                text: 'There was an error communicating with The Cloud.<br><br>Please check that you are connected to the internet and try again.<br><br>(Error Code: cu_001)<br>' + data,
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

        //update successful

        //get the edited confession from the local cache
        var filteredConfessions = globals.confessions.filter(function (confession) {
            return confession.itemID === itemID;
        });

        //update the local count
        switch(countName) {
            case 'forgiveCount':
                filteredConfessions[0].forgiveCount ++;
                break;
            case 'condemCount':
                filteredConfessions[0].condemCount ++;
                break;
            case 'bsCount':
                filteredConfessions[0].bsCount ++;
                break;
            default:
                //code block
        }



        //filter down to the school for this confession
        var selectedSchoolArray = globals.cc_schools.filter(function (school) {
            return school.itemID === filteredConfessions[0].schoolID;
        });
        //if selectedSchoolArray is empty, it means a school was added after the last time globals.cc_schools was updated
        //and a confession for that school was entered
        //which results in a hang below when trying to display the schoolName for a school that is localy undefined.
        //need to re-read the schools in this case, and then re-load the confessions

        if (selectedSchoolArray.length === 0){
            //need to refresh the schools

            //fetch the list of schools

            myApp.showPreloader('Refreshing Schools')
            setTimeout(function () {
                myApp.hidePreloader();
            }, 1000);

            awsConnector.fetchSchools(confessionsPage.schoolsReturned);
            return;
        }





        //get some freshly formatted html
        var updatedElement = confessionsPage.confessionItemHTML(filteredConfessions[0],selectedSchoolArray[0].schoolName);

        //replace the html in the DOM
        var oldElementID = '#confession' + itemID

        $(oldElementID).replaceWith(updatedElement);


    },

    //******************************************************************************************************************
    moreLinkClicked: function (itemID) {

        var popoverHTML = '' +
            '<div class="popover ">'+
                '<div class="popover-inner">'+
                    '<div class="list-block">'+
                        '<ul>'+
                            '<li><a href="#" class="item-link list-button" onclick="confessionsPage.blockUser(&#39;' + itemID + '&#39;)">Block User</li>'+
                            '<li><a href="#" class="item-link list-button" onclick="confessionsPage.hideConfession(&#39;' + itemID + '&#39;)">Hide Confession</li>'+
                            '<li><a href="#" class="item-link list-button" onclick="confessionsPage.reportConfession(&#39;' + itemID + '&#39;)">Report Confession</li>'+
                        '</ul>'+
                    '</div>'+
                '</div>'+
            '</div>';

        myApp.popover(popoverHTML, $$('#moreLink' + itemID));
    },

    //******************************************************************************************************************
    reportConfession: function (itemID) {

        myApp.closeModal();

        myApp.confirm('Are you sure you want to report this confession?</br>By reporting a confession, you are indicating that it violates the Terms of Use.', 'Report Confession?', function () {
            awsConnector.reportConfession(itemID, confessionsPage.confessionReported)
        });

    },

    //******************************************************************************************************************
    hideConfession: function (itemID) {

        myApp.closeModal();

        myApp.confirm('Are you sure you want to hide this confession?</br>By hiding a confession, it will be removed from your Confession Feed and you will never see it again.', 'Hide Confession?', function () {

            globals.hiddenConfessions.push(itemID)
            globals.setPersistentGlobal('hiddenConfessions', globals.hiddenConfessions);

            //and now hide it in the UI
            $('#confession' + itemID).fadeOut(2000);

        });

    },

    //******************************************************************************************************************
    blockUser: function (itemID) {

        myApp.closeModal();

        myApp.confirm('Are you sure you want to block this user?</br>By blocking a user, all of their confessions will be removed from your Confession Feed.', 'Block User?', function () {

            //filter down to this confession
            var selectedConfessionArray = globals.confessions.filter(function (confession) {
                return confession.itemID === itemID;
            });


            globals.blockedUsers.push(selectedConfessionArray[0].userGUID);
            globals.setPersistentGlobal('blockedUsers', globals.blockedUsers);

            confessionsPage.loadConfessions();

        });

    },

    //******************************************************************************************************************
    confessionReported: function (success, data) {

        if (!success){
            //the confession reporting call failed
            myApp.modal({
                title:  'DOH!',
                text: 'There was an error communicating with The Cloud.<br><br>Please check that you are connected to the internet and try again.<br><br>(Error Code: cr_001)<br>' + data ,
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

        //confession successfully reported

        var popupHTML = '' +
            '<div class="popup">'+
                '<div class="content-block">' +
                    '<div class="center-wrapper">\n' +
                        '<div class="centered-div" style="color: black">\n' +

                            '<h2>Confession Reported</h2>'+

                            '<p>Thank you for reporting this confession. We&#39;ll take a look and take apropriate action.</p>'+

                            '<p>If you want, you can choose to hide all reported confessions from your Confession Feed</p>'+

                        '      <div class="item-content">\n' +
                        '        <div class="item-inner">\n' +
                        '          <div class="item-title label">Hide Reported Confessions: </div>\n' +
                        '          <div class="item-input">\n' +
                        '            <label class="label-switch">\n' +
                        '              <input id="hideReportedCBX" onchange="confessionsPage.setHideReported()" type="checkbox">\n' +
                        '              <div class="checkbox"></div>\n' +
                        '            </label>\n' +
                        '          </div>\n' +
                        '        </div>\n' +
                        '      </div>'+

                             '<p><a href="#" class="close-popup button">Done</a></p>'+

                        '</div>\n' +
                    '</div>'+

                '</div>'+
            '</div>'
        myApp.popup(popupHTML);

        //set the Hide Reported checkbox of the popup
        $$('#hideReportedCBX').prop('checked', globals.hideReported);

    },

    //******************************************************************************************************************
    setHideReported: function () {
        if ($('#hideReportedCBX').is(":checked")) {
            // it is checked
            globals.setPersistentGlobal('hideReported', true);

            confessionsPage.loadConfessions();
        }
        else {
            globals.setPersistentGlobal('hideReported', false);
        }
    }


    //******************************************************************************************************************
    //******************************************************************************************************************

};