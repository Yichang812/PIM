/**
 * Created by li_yi-pc on 10/13/2016.
 */

var q1 = $.url().param('q1');
$('input[name="q1"]').val(q1);
var q2 = $.url().param('q2');
$('input[name="q2"]').val(q2);



var layouts = alasql('SELECT * FROM layout', []);
var colNames = alasql('SELECT * FROM colname', []);
var emps;
if (q1) {
    emps = alasql('SELECT * FROM emp WHERE number LIKE ?', [ '%' + q1 + '%' ]);
} else if (q2) {
    emps = alasql('SELECT * FROM emp WHERE name LIKE ?', [ '%' + q2 + '%' ]);
} else {
    emps = alasql('SELECT * FROM emp', []);
}



var layout_name = $('#layout-name');
var col_name_edit = $('#col-name-edit');
var col_name_new = $('#col-name-new');
var alert = $('.delete-alert');
var edit_modal = $('#edit-layout');
var new_modal = $('#new-layout');
var trecords = $('#tbl-download tbody');
var theader = $('#tbl-download thead tr');
var layoutInput = $('#new-layout-name');
var clonet = $('#tbl-clone');
var cloneh = $('#tbl-clone thead tr');
var layout_menu = $('.opt-layout');
var d_alert = $('#overlay,#dialog');
var format = $('#format').find('li');
var operation = $('#operation').find('input');
var i;



//Tools
function getColList(name){
    var colList = [];
    var selected_col = alasql('SELECT c_id FROM colLayout WHERE l_id=?',[findIdByName(name)]);
    for(i = 0; i<selected_col.length; i++){
        colList.push(selected_col[i].c_id);
    }
    return colList;
}

function findIdByName(name){
    var id = alasql('SELECT id FROM layout WHERE name=?',[name])[0];
    return id.id;
}
function getFirstLay(){
    var first_lay = alasql('SELECT * FROM layout',[])[0];
    return first_lay.name;

}

function findColName(c_id){
    var name = alasql('SELECT web FROM colname WHERE id=?',[c_id])[0];
    return name.web;
}
function findColDB(c_id){
    var coldb = alasql('SELECT db_name FROM colname WHERE id=?',[c_id])[0];
    return coldb.db_name;
}
function findColId(name){
    var colId = alasql('SELECT id FROM colname WHERE name=?',[name])[0];
    return colId.id;
}
function findAddrById(e_id){
    var addr = alasql('SELECT * FROM addr WHERE emp=?',[e_id])[0];
    //zip STRING, state STRING, city STRING, street STRING, bldg STRING, house INT
    return addr.street+addr.bldg+', '+addr.house+', '+addr.city+', '+addr.state+', '+addr.zip;
}
function findFamById(e_id){
    var fams = alasql('SELECT * FROM family WHERE emp=?',[e_id]);
    var result = "";
    for(var x = 0; x<fams.length; x++){
        var fam = fams[x];
        if(fam){
            //name STRING, sex INT, birthday STRING, relation STRING, cohabit INT, care INT
            result+= fam.relation +': '+fam.name+', B-day: '+fam.birthday+', Cohabitation:'+DB.choice(fam.cohabit)+', Dependent: '+DB.choice(fam.care)+'<br>';
        }
        break;
    }
    return result;
}
function findEduById(e_id){
    var edu = alasql('SELECT * FROM edu WHERE emp=?', [e_id])[0];
    //school STRING, major STRING, grad STRING
    if(edu){
        return 'School: '+edu.school+', Major: '+edu.major+', Graduation: '+edu.grad;
    }else{
        return '';
    }
}
function setActiveLay(name){
    alasql('UPDATE layout SET active="false" WHERE active="true"',[]);
    alasql('UPDATE layout SET active="true" WHERE name=?',[name]);
    highlightActive(name);

}
function getActiveLay(){
    var active_lay = alasql('SELECT * FROM layout WHERE active=?',["true"])[0];
    return active_lay.name;
}
function updateColLayout(l_id,cols){
    var n = alasql('SELECT MAX(id) + 1 as id FROM colLayout')[0].id;
    for(i = 0; i<cols.length; i++){
        alasql('INSERT INTO colLayout VALUES (?,?,?)',[n.toString(),l_id.toString(),cols[i].toString()]);
        n++;
    }
}
function fillTable(cols){

    for(i=0; i<cols.length; i++){
        theader.append('<th>'+findColName(cols[i])+'</th>');
        cloneh.append('<th>'+findColName(cols[i])+'</th>');
    }
    for (i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var row = $('<tr></tr>');
        for (var n = 0; n < cols.length; n++) {
            switch (cols[n]) {
                case 1:
                    row.append('<td><img height=40 class="img-circle" src="img/' + emp.id + '.jpg"></td>');
                    break;
                case 2:
                    row.append('<td><a href="emp.html?id=' + emp.id + '">' + emp.number + '</a></td>');
                    break;
                case 4:
                    row.append('<td>' + DB.choice(emp.sex) + '</td>');
                    break;
                case 19:
                    row.append('<td>' + findAddrById(emp.id) + '</td>');
                    break;
                case 20:
                    row.append('<td>' + findFamById(emp.id) + '</td>');
                    break;
                case 21:
                    row.append('<td>' + findEduById(emp.id) + '</td>');
                    break;
                default:
                    row.append('<td>' + emp[findColDB(cols[n])] + '</td>');
            }//switch
        }//for each record
        row.appendTo('#tbody-emps');
    }
}

function highlightActive(name){
    layout_menu.each(function () {
        var opt = $(this).text();
        if(opt==name){
            $(this).parent().find('.list-group-item-info').removeClass('list-group-item-info');
            $(this).addClass('list-group-item-info');
        }
    });
}

function resetTable(layout){
    theader.children('th').remove();
    trecords.children('tr').remove();
    cloneh.children('th').remove();
    setActiveLay(layout);
    fillTable(getColList(layout));
}
//==================================================================

//setup modal content
for (i = 0; i<layouts.length; i++){
    var layout = layouts[i];
    var l_op = $('<option>'+layout.name+'</option>');
    layout_name.append(l_op);
}

for (i = 0; i<colNames.length; i++){
    var colName = colNames[i];
    var c_op = $('<option>'+colName.web+'</option>');
    c_op.attr('value',colName.id);
    col_name_new.append(c_op);
    col_name_edit.append(c_op.clone());
}


var colList = getColList(getActiveLay());
for(i = 0; i<colList.length; i++){
    var op = $('<li><a href="#">'+findColName(colList[i])+'</a></li>');
    $('#col1,#col2').append(op);
}


$('#btn-edit').click(function () {
    new_modal.modal('hide');
    edit_modal.modal('show');
    var currentLay = layout_name.val();
    col_name_edit.multipleSelect("setSelects",getColList(currentLay));
});

$(function() {
    col_name_new.multipleSelect({
        width: '100%'
    });
    col_name_edit.multipleSelect({
        width: '100%'
    });

});

//=========================================================================


//set table content
fillTable(getColList(getActiveLay()));
highlightActive(getActiveLay());


//load layout setting
layout_name.change(function () {
    col_name_edit.multipleSelect("setSelects",getColList($(this).val()));
});

//save new layout
$('#btn-create-lay').click(function () {
    var l_id = alasql('SELECT MAX(id) + 1 as id FROM layout')[0].id;
    var name = layoutInput.val();
    if(name!='') {
        alasql('INSERT INTO layout VALUES (?,?,?)', [l_id.toString(), name, "false"]);
        setActiveLay(name);
        fillTable(getColList(name));
        var cols = $('#col-name-new').val();
        updateColLayout(l_id, cols);
        new_modal.modal('hide');
    }else{
        $('.name-inputor').attr('class','has-error');
        layoutInput.after('<span class="help-block">Please fill in the name of the layout</span>');
    }
});

//delete layout
$('#btn-delete-lay').click(function(){
    edit_modal.modal('hide');
    var deleteLay = layout_name.val();
    $('#delete-lay').text(deleteLay);
    d_alert.toggle();

    $('#btn-yes').click(function () {
        alasql("DELETE FROM colLayout WHERE l_id=?",[findIdByName(deleteLay)]);
        alasql("DELETE FROM layout WHERE name=?",[deleteLay]);
        resetTable(getFirstLay());
        d_alert.toggle();
    });
    $('#btn-no').click(function(){
        d_alert.toggle();
    });

});

//update table
layout_menu.click(function () {
    resetTable( $(this).text());
});

//edit layout
$('#btn-edit-lay').click(function () {
    var editName = layout_name.val();
    var editId = findIdByName(editName);
    alasql("DELETE FROM colLayout WHERE l_id=?",[editId]);
    var cols = $('#col-name-edit').val();
    updateColLayout(editId,cols);
    resetTable(editName);
    $('#edit-layout').modal('hide');
});

//sticky header
$(window).scroll(function () {
    if(window.scrollY>=200){
        clonet.show();
        clonet.width(theader.width());
    }else{
        clonet.hide();
    }
});

var col1, col2;
var symbol = 0;

format.click(function(){
    console.log($(this).attr('value'));
});

operation.change(function () {
    symbol = $(this).val();
    updateMetricDef(col1,symbol,col2);
});

$('#col1 li').click(function () {
    col1 = $(this).text();
    updateMetricDef(col1,symbol,col2);
});

$('#col2 li').click(function () {
    col2 = $(this).text();
    updateMetricDef(col1,symbol,col2);
});

function updateMetricDef(col1, op, col2){
    var symbols = ['&#43','&#45','&#215','&#247'];
    if(col1){
        var c1 = $('<button class="btn btn-default disabled" style="margin-right: 10px">'+col1+'</button>');
    }
    if(col2){
        var c2 = $('<button class="btn btn-default disabled" style="margin-right: 10px">'+col2+'</button>');
    }
    if(op){
        var oper = $('<button class="btn btn-default disabled" style="margin-right: 10px">'+symbols[op]+'</button>')
    }
    $('#def-panel').empty().append(c1).append(oper).append(c2);
}