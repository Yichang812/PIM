// options: type of house
var houses = DB.choices('house');
for (var i = 0; i < houses.length; i++) {
	var house = houses[i];
	$('<option>').attr('value', house.id).text(house.text).appendTo($('#house select'));
}

var id = parseInt($.url().param('id'));
if (id) {
	// read data from database
	var addr = alasql('SELECT * FROM addr WHERE id=?', [ id ])[0];
	$('#zip input').val(addr.zip);
	$('#state input').val(addr.state);
	$('#city input').val(addr.city);
	$('#street input').val(addr.street);
	$('#bldg input').val(addr.bldg);
	$('#house select').val(addr.house);
}

// update image and name
var empid = addr ? addr.emp : parseInt($.url().param('emp'));
var emp = alasql('SELECT * FROM emp WHERE id=?', [ empid ])[0];
$('#img-emp').attr('src', 'img/' + emp.id + '.jpg');
$('#div-name').text(emp.name);
$('#div-number').text(emp.number);
$('#nav-name').text(emp.name);
$('#nav-emp').attr('href', 'emp.html?id=' + empid).text(emp.name);

// save
function update() {
	var addr = [];
	addr.push($('#zip input').val());
	addr.push($('#state input').val());
	addr.push($('#city input').val());
	addr.push($('#street input').val());
	addr.push($('#bldg input').val());
	addr.push(parseInt($('#house select').val()));

	if (id) {
		addr.push(id);
		alasql(
				'UPDATE addr SET \
				zip = ?, \
				state = ?, \
				city = ?, \
				street = ?, \
				bldg = ?, \
				house = ? \
				WHERE id = ?',
				addr);
	} else {
		addr.unshift(empid);
		id = alasql('SELECT MAX(id) + 1 as id FROM addr')[0].id;
		addr.unshift(id);
		alasql(
				'INSERT INTO addr(\
				id, \
				emp, \
				zip, \
				state, \
				city, \
				street, \
				bldg, \
				house) \
				VALUES(?,?,?,?,?,?,?,?,?);',
				addr);
	}
	window.location.assign('emp.html?id=' + empid);
}