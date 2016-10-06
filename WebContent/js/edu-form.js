var id = parseInt($.url().param('id'));
if (id) {
	// read data from database
	var edu = alasql('SELECT * FROM edu WHERE id=?', [ id ])[0];
	$('#school input').val(edu.school);
	$('#major input').val(edu.major);
	$('#grad input').val(edu.grad);
}

// update image and name
var empid = edu ? edu.emp : parseInt($.url().param('emp'));
var emp = alasql('SELECT * FROM emp WHERE id=?', [ empid ])[0];
$('#img-emp').attr('src', 'img/' + emp.id + '.jpg');
$('#div-name').text(emp.name);
$('#div-number').text(emp.number);
$('#nav-emp').attr('href', 'emp.html?id=' + empid).text(emp.name);

// save
function update() {
	var edu = [];
	edu.push($('#school input').val());
	edu.push($('#major input').val());
	edu.push($('#grad input').val());

	if (id) {
		edu.push(id);
		alasql('UPDATE edu SET \
				school = ?, \
				major = ?, \
				grad = ? \
				WHERE id = ?', edu);
	} else {
		edu.unshift(empid);
		id = alasql('SELECT MAX(id) + 1 as id FROM edu')[0].id;
		edu.unshift(id);
		alasql('INSERT INTO edu(\
				id, \
				emp, \
				school, \
				major, \
				grad) \
				VALUES(?,?,?,?,?);',
				edu);
	}
	window.location.assign('emp.html?id=' + empid);
}