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
        $('#tbl-download').excelexportjs({
            containerid: "tblDownload"
            , datatype: 'table'
        });
    });

    $('#edit-dropdown').tooltip();

    downloadBtn.tooltip();

    $('#btn-format').popover({
        trigger:'hover',
        placement:'right',
        container: 'body',
        content:'Choose the kind of formatting you\' like for the column contents'
    });



});
// function initOption(){
//     for (var i = 0; i<my_db.layouts.length; i++) {
//         var layout = my_db.layouts[i];
//         var li = $('<li class="opt-layout"><a>' + layout.name + '</a></li>');
//         $('#layout-list').parent().append(li);
//     }
// }
// initOption();

d_dialog.css({top:dialog.height,left:dialog.width});