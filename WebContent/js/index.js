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
for (var i = 0; i < emps.length; i++) {
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
