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
var colNames =  alasql('SELECT * FROM colname', []);

for (i = 0; i<layouts.length; i++){
	var layout = layouts[i];
	var li = $('<li><a href="#">'+layout.name+'</a></li>');
	$('#layoutList').after(li);
	var l_op = $('<option>'+layout.name+'</option>');
	$('#layout-name').append(l_op);
}
$('#layout-name').append('<option id="newLayout">'+'+ Add a new layout'+'</option>');






$('#layout-name').change(function(){
	var id = $(this).children(':selected').attr("id");
	console.log(id);
	if(id=='newLayout'){
		$('.name-inputor').toggle();
		$('.layout-selector').hide();
		$('.col-selector').show();
	}else{
		$('.col-selector').toggle();
	}

});


for (i = 0; i<colNames.length; i++){
	var colName = colNames[i];
	var c_op = $('<option>'+colName.web+'</option>');
	$('#col-name').append(c_op);
}

//add a tag if user select a column
var selected_cols = ["Number"]; // a temp storage
$('#col-name').change(function(){
	var selected_col = $(this).val();
	if(selected_cols.push(selected_col)){
		$('#col-tag').append('<a href="#" class="btn btn-info btn-xs col-name-tag">'+selected_col+' '+'X'+'</a>');
	}
});
$('.col-name-tag').click(function(){
	var col_name = $(this).text().replace(' X','');
	console.log('hi');

	var index = selected_cols.indexOf(col_name);
	selected_cols.splice(index,1);
	console.log(selected_cols);
});
