/* global jon, EJS*/
'use strict';

function main() {
    $('#signInForm').submit(login);
    fetchSidebar();
    $('#searchClick').click(openSearch);
    $('#uploadClick').click(openUploader);
}

function login(event) {
    event.preventDefault();

    $('#mainHeader').removeClass('noSidebar').addClass('withSidebar');
    $('#loginDiv').addClass('hidden');
    $('#sideBar').removeClass('hidden');
    $('#mainBodyDiv').removeClass('hidden noSidebar').addClass('withSidebar');
    openSearch();
}

function fetchSidebar() {
    var username = 'Jon Walker',
    result = new EJS({url: 'views/sidebar.ejs'}).render({username: username});
    $('#sideBar').append(result);
}

function openSearch(event) {
    if (event) {
        event.preventDefault();
    }
    var $body = $('#mainBodyDiv'),
    result;

    if ($('#searchDiv').length !== 0) {
        return;
    }
    $body.empty(); // Clear 'body' div
    result = new EJS({url: 'views/search.ejs'}).render();
    $body.append(result);
    loadSearch(); // From searchejs.js
}

function openUploader(event) {
    event.preventDefault();
    var $body = $('#mainBodyDiv'),
    result;

    if ($('#uploadDiv').length !== 0) {
        return;
    }
    $body.empty(); // Clear 'body' div
    result = new EJS({url: 'views/json.ejs'}).render();
    $body.append(result);
    loadUpload(); // From jsonejs.js
}

$(main);