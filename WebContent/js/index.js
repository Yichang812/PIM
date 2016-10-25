// Yichang
var my_db = {
    layouts : alasql('SELECT * FROM layout', []),
    colNames : alasql('SELECT * FROM colname', []),
    colTypes : alasql('SHOW columns FROM emp')
};

var d_dialog = $('#dialog');
var dialog = {
    height : (window.innerHeight / 2 - d_dialog.height() / 2),
    width : (window.innerWidth / 2 - d_dialog.width() / 2)
};

//download table as Excel
$(document).ready(function () {
    var downloadBtn = $('#btn-download');

    downloadBtn.click(function () {
        $('#tbl-download').table2excel({
            sheetName: getActiveLay(),
            filename: getActiveLay(),
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true
        });
    });
    $('#edit-dropdown').tooltip();

    downloadBtn.tooltip();

    $('#btn-format').popover({
        trigger:'hover',
        placement:'right',
        container: 'body',
        content:'Choose the kind of formatting you\'d like for the column contents'
    });



});

d_dialog.css({top:dialog.height,left:dialog.width});
