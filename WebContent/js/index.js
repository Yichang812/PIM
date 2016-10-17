// Yichang
//inti tooltip function
var layouts = alasql('SELECT * FROM layout', []);
var layout_menu = $('.opt-layout');

$(function () {
	$('#edit-dropdown').tooltip()
});


//download table as Excel
$(document).ready(function () {
	$('#btn-download').click(function () {
		$('#tbl-download').excelexportjs({
			containerid: "tblDownload"
			, datatype: 'table'
		});
	});

});



for (i = 0; i<layouts.length; i++){
	var layout = layouts[i];
	var li = $('<li class="opt-layout"><a href="#">'+layout.name+'</a></li>');
	$('#layout-list').parent().append(li);
}

layout_menu.eq(0).addClass('list-group-item-info'); //current layout

