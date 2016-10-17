// Yichang
//inti tooltip function
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



var layouts = alasql('SELECT * FROM layout', []);


for (i = 0; i<layouts.length; i++){
	var layout = layouts[i];
	var li = $('<li class="opt-layout"><a href="#">'+layout.name+'</a></li>');
	$('#layout-list').parent().append(li);
}
var layout_menu = $('.opt-layout');
layout_menu.eq(0).addClass('list-group-item-info'); //current layout

layout_menu.click(function () {
	$(this).parent().find('.list-group-item-info').removeClass('list-group-item-info');
	$(this).addClass('list-group-item-info');
});