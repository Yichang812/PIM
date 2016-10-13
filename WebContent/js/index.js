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
	$('#editDropdown').tooltip()
});


//download table as Excel
$(document).ready(function () {
	$('#btnDownload').click(function () {
		$('#tblDownload').excelexportjs({
			containerid: "tblDownload"
			, datatype: 'table'
		});
	});
});


var layouts = alasql('SELECT * FROM layout', []);

for (i = 0; i<layouts.length; i++){
	var layout = layouts[i];
	var li = $('<li><a href="#">'+layout.name+'</a></li>');
	$('#layoutList').after(li);
}
//display column selector
$('#layout-name').change(function(index){
	$('.col-selector').toggle();
});

//get all column names
var colNames =  alasql('SELECT * FROM colname', []);
var colList = $('#col-name');
for (i = 0; i<colNames.length; i++){
	var colName = colNames[i];
	var op = $('<option></option>');
	op.text(colName.web);
	op.appendTo(colList);
}

//add a tag if user select a column
var selected_cols = ["Number"]; // a temp storage
$('#col-name').change(function(){
	var selected_col = $(this).val();
	if(selected_cols.push(selected_col)){
		$('#col-tag').append('<a class="btn btn-info btn-xs col-name-tag">'+selected_col+' '+'X'+'</a>');
	}
});