// read personal info
var id = parseInt($.url().param('id'));
var emp = alasql('SELECT * FROM emp WHERE id=?', [ id ])[0];
$('#number').text(emp.number);
$('#name').text(emp.name);
$('#sex').text(DB.choice(emp.sex));
$('#birthday').text(emp.birthday);
$('#tel').text(emp.tel);
$('#ctct_name').text(emp.ctct_name);
$('#ctct_addr').text(emp.ctct_addr);
$('#ctct_tel').text(emp.ctct_tel);
$('#pspt_no').text(emp.pspt_no);
$('#pspt_date').text(emp.pspt_date);
$('#pspt_name').text(emp.pspt_name);
$('#rental').text(DB.choice(emp.rental));

// set image and name
$('#img-emp').attr('src', 'img/' + emp.id + '.jpg');
$('#div-name_kanji').text(emp.name);
$('#div-number').text(emp.number);
$('#nav-emp').text(emp.name);
$('#form-emp').attr('href', 'emp-form.html?id=' + id);

// read address info
var addrs = alasql('SELECT * FROM addr WHERE emp=?', [ id ]);
for (var i = 0; i < addrs.length; i++) {
	var addr = addrs[i];
	var tr = $('<tr>').appendTo('#tbody-addr');
	tr.append('<td>' + addr.zip + '</td>');
	tr.append('<td>' + addr.state + '</td>');
	tr.append('<td>' + addr.city + '</td>');
	tr.append('<td>' + addr.street + '</td>');
	tr.append('<td>' + addr.bldg + '</td>');
	tr.append('<td>' + DB.choice(addr.house) + '</td>');
	var td = $('<td class="text-right">').appendTo(tr);
	$('<a href="addr-form.html?id=' + addr.id + '" class="btn btn-xs btn-primary">').html(
			'<span class="glyphicon glyphicon-pencil"></span> Edit').appendTo(td);
	$('<span> </span>').appendTo(td);
	$('<a class="btn btn-xs btn-danger">').html('<span class="glyphicon glyphicon-remove"></span> Delete').appendTo(td);
}
$('#ins-addr').attr('href', 'addr-form.html?emp=' + id);

// read family info
var families = alasql('SELECT * FROM family WHERE emp=?', [ id ]);
for (var i = 0; i < families.length; i++) {
	var family = families[i];
	var tr = $('<tr>').appendTo('#tbody-family');
	tr.append('<td>' + family.name + '</td>');
	tr.append('<td>' + DB.choice(family.sex) + '</td>');
	tr.append('<td>' + family.birthday + '</td>');
	tr.append('<td>' + family.relation + '</td>');
	tr.append('<td>' + DB.choice(family.cohabit) + '</td>');
	tr.append('<td>' + DB.choice(family.care) + '</td>');
	var td = $('<td class="text-right">').appendTo(tr);
	$('<a href="family-form.html?id=' + family.id + '" class="btn btn-xs btn-primary">').html(
			'<span class="glyphicon glyphicon-pencil"></span> Edit').appendTo(td);
	$('<span> </span>').appendTo(td);
	$('<a class="btn btn-xs btn-danger">').html('<span class="glyphicon glyphicon-remove"></span> Delete').appendTo(td);
}
$('#ins-family').attr('href', 'family-form.html?emp=' + id);

// read academic history
var edus = alasql('SELECT * FROM edu WHERE emp=?', [ id ]);
for (var i = 0; i < edus.length; i++) {
	var edu = edus[i];
	var tr = $('<tr>').appendTo('#tbody-edu');
	tr.append('<td>' + edu.school + '</td>');
	tr.append('<td>' + edu.major + '</td>');
	tr.append('<td>' + edu.grad + '</td>');
	var td = $('<td class="text-right">').appendTo(tr);
	$('<a href="edu-form.html?id=' + edu.id + '" class="btn btn-xs btn-primary">').html(
			'<span class="glyphicon glyphicon-pencil"></span> Edit').appendTo(td);
	$('<span> </span>').appendTo(td);
	$('<a class="btn btn-xs btn-danger">').html('<span class="glyphicon glyphicon-remove"></span> Delete').appendTo(td);
}
$('#ins-edu').attr('href', 'edu-form.html?emp=' + id);

// delete employee
function destroy() {
	if (window.confirm('are you sure to delete employee?')) {
		alasql('DELETE FROM emp WHERE id=?', [ id ]);
		window.location.assign('index.html');
	}
}
