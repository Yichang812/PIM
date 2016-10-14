// parse request params
var q1 = $.url().param('q1');
$('input[name="q1"]').val(q1);
var q2 = $.url().param('q2');
$('input[name="q2"]').val(q2);

// read data from database
var emps;
if (q1) {
	emps = alasql('SELECT * FROM emp WHERE number LIKE ?', [ '%' + q1 + '%' ]);
} else if (q2) {
	emps = alasql('SELECT * FROM emp WHERE name LIKE ?', [ '%' + q2 + '%' ]);
} else {
	emps = alasql('SELECT * FROM emp', []);
}

// create employee list
var tbody = $('#tbody-emps');
var i;
for (i = 0; i < emps.length; i++) {
	var emp = emps[i];
	var tr = $('<tr></tr>');
	tr.append('<td><img height=40 class="img-circle" src="img/' + emp.id + '.jpg"></td>');
	tr.append('<td><a href="emp.html?id=' + emp.id + '">' + emp.number + '</a></td>');
	tr.append('<td>' + emp.name + '</td>');
	tr.append('<td>' + DB.choice(emp.sex) + '</td>');
	tr.append('<td>' + emp.birthday + '</td>');
	tr.append('<td>' + emp.tel + '</td>');
	tr.appendTo(tbody);
}

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
	var li = $('<li class="name-layout"><a href="#">'+layout.name+'</a></li>');
	$('#layout-list').parent().append(li);
}
var layout_menu = $('.name-layout');
layout_menu.eq(0).addClass('list-group-item-info'); //current layout

layout_menu.click(function (index) {
	console.log(index);
	$(this).parent().find('.list-group-item-info').removeClass('list-group-item-info');
	$(this).addClass('list-group-item-info');
});