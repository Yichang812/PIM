// Yichang
//inti tooltip function
var layouts = alasql('SELECT * FROM layout', []);

$(function () {
	$('#edit-dropdown,#btn-download').tooltip()
});


//download table as Excel
$(document).ready(function () {
	var downloadBtn = $('#btn-download');
	downloadBtn.click(function () {
		$('#tbl-download').excelexportjs({
			containerid: "tblDownload"
			, datatype: 'table'
		});
	});

	downloadBtn.mouseover(function () {

	});


});

for (i = 0; i<layouts.length; i++) {
	var layout = layouts[i];
	var li = $('<li class="opt-layout"><a href="#">' + layout.name + '</a></li>');
	$('#layout-list').parent().append(li);
}

$("#btn-yes").addClass("btn btn-danger btn-lg");
$("#btn-no").addClass("btn btn-default btn-lg");
var height = window.innerHeight / 2 - $('#dialog').height() / 2;
var width = window.innerWidth / 2 - $('#dialog').width() / 2;
$("#dialog").css({top:height,left:width});