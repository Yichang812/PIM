// gender
var sexes = DB.choices('sex');
for (var i = 0; i < sexes.length; i++) {
	var sex = sexes[i];
	$('<option>').attr('value', sex.id).text(sex.text).appendTo($('#sex select'));
}

// type of cohabitation
var cohabits = DB.choices('cohabit');
for (var i = 0; i < cohabits.length; i++) {
	var cohabit = cohabits[i];
	$('<option>').attr('value', cohabit.id).text(cohabit.text).appendTo($('#cohabit select'));
}

// type of dependent
var cares = DB.choices('care');
for (var i = 0; i < cares.length; i++) {
	var care = cares[i];
	$('<option>').attr('value', care.id).text(care.text).appendTo($('#care select'));
}

var id = parseInt($.url().param('id'));
if (id) {
	// read data from database
	var family = alasql('SELECT * FROM family WHERE id=?', [ id ])[0];
	$('#name input').val(family.name);
	$('#sex select').val(family.sex);
	$('#birthday input').val(family.birthday);
	$('#relation input').val(family.relation);
	$('#cohabit select').val(family.cohabit);
	$('#care select').val(family.care);
}

// update image and name
var empid = family ? family.emp : parseInt($.url().param('emp'));
var emp = alasql('SELECT * FROM emp WHERE id=?', [ empid ])[0];
$('#img-emp').attr('src', 'img/' + emp.id + '.jpg');
$('#div-name').text(emp.name);
$('#div-number').text(emp.number);
$('#nav-name').text(emp.name);
$('#nav-emp').attr('href', 'emp.html?id=' + empid).text(emp.name);

// save
function update() {
	var family = [];
	family.push($('#name input').val());
	family.push(parseInt($('#sex select').val()));
	family.push($('#birthday input').val());
	family.push($('#relation input').val());
	family.push(parseInt($('#cohabit select').val()));
	family.push(parseInt($('#care select').val()));

	if (id) {
		family.push(id);
		alasql(
				'UPDATE family SET \
				name = ?, \
				sex = ?, \
				birthday = ?, \
				relation = ?, \
				cohabit = ?, \
				care = ? \
				WHERE id = ?',
				family);
	} else {
		family.unshift(empid);
		id = alasql('SELECT MAX(id) + 1 as id FROM family')[0].id;
		family.unshift(id);
		alasql(
				'INSERT INTO family(\
				id, \
				emp, \
				name, \
				sex, \
				birthday, \
				relation, \
				cohabit, \
				care) \
				VALUES(?,?,?,?,?,?,?,?);',
				family);
	}
	window.location.assign('emp.html?id=' + empid);
}