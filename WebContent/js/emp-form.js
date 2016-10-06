// options: gender
var sexes = DB.choices('sex');
for (var i = 0; i < sexes.length; i++) {
	var sex = sexes[i];
	$('<option>').attr('value', sex.id).text(sex.text).appendTo($('#sex select'));
}

// options: type of lending
var rentals = DB.choices('rental');
for (var i = 0; i < rentals.length; i++) {
	var rental = rentals[i];
	$('<option>').attr('value', rental.id).text(rental.text).appendTo($('#rental select'));
}

var id = parseInt($.url().param('id'));
if (id) {
	// read data from database
	var emp = alasql('SELECT * FROM emp WHERE id=?', [ id ])[0];
	$('#number input').val(emp.number);
	$('#name input').val(emp.name);
	$('#sex select').val(emp.sex);
	$('#birthday input').val(emp.birthday);
	$('#tel input').val(emp.tel);
	$('#ctct_name input').val(emp.ctct_name);
	$('#ctct_addr input').val(emp.ctct_addr);
	$('#ctct_tel input').val(emp.ctct_tel);
	$('#pspt_no input').val(emp.pspt_no);
	$('#pspt_date input').val(emp.pspt_date);
	$('#pspt_name input').val(emp.pspt_name);
	$('#rental select').val(emp.rental);

	// update image and name
	$('#img-emp').attr('src', 'img/' + emp.id + '.jpg');
	$('#div-name').text(emp.name);
	$('#div-number').text(emp.number);
	$('#nav-name').text(emp.name);
	$('#nav-emp').attr('href', 'emp.html?id=' + id).text(emp.name);
}

// save
function update() {
	var emp = [];
	emp.push($('#number input').val());
	emp.push($('#name input').val());
	emp.push(parseInt($('#sex select').val()));
	emp.push($('#birthday input').val());
	emp.push($('#tel input').val());
	emp.push($('#ctct_name input').val());
	emp.push($('#ctct_addr input').val());
	emp.push($('#ctct_tel input').val());
	emp.push($('#pspt_no input').val());
	emp.push($('#pspt_date input').val());
	emp.push($('#pspt_name input').val());
	emp.push(parseInt($('#rental select').val()));

	if (id) {
		emp.push(id);
		alasql(
				'UPDATE emp SET \
				number = ?, \
				name = ?, \
				sex = ?, \
				birthday = ?, \
				tel = ?, \
				ctct_name = ?, \
				ctct_addr = ?, \
				ctct_tel = ?, \
				pspt_no = ?, \
				pspt_date = ?, \
				pspt_name = ?, \
				rental = ? \
				WHERE id = ?',
				emp);
	} else {
		id = alasql('SELECT MAX(id) + 1 as id FROM emp')[0].id;
		emp.unshift(id);
		alasql(
				'INSERT INTO emp(\
				id, \
				number, \
				name, \
				sex, \
				birthday, \
				tel, \
				ctct_name, \
				ctct_addr, \
				ctct_tel, \
				pspt_no, \
				pspt_date, \
				pspt_name, \
				rental) \
				VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);',
				emp);
	}
	window.location.assign('emp.html?id=' + id);
}