/**
 * Created by li_yi-pc on 10/13/2016.
 */

var q1 = $.url().param('q1');
$('input[name="q1"]').val(q1);
var q2 = $.url().param('q2');
$('input[name="q2"]').val(q2);




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
var layout_input = $('#new-layout-name');
var clonet = $('#tbl-clone');
var cloneh = $('#tbl-clone thead tr');
var layout_menu = $('.opt-layout');
var d_alert = $('#overlay,#dialog');
var format = $('#format').find('li');
var operation = $('#operation').find('input');



//Tools
function findIdByName(name){
    var id = alasql('SELECT id FROM layout WHERE name=?',[name])[0];
    return id.id;
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
    var colId = alasql('SELECT id FROM colname WHERE web=?',[name])[0];
    console.log(colId);
    return colId.id;
}

function getColList(name){
    var colList = [];
    var selected_col = alasql('SELECT c_id FROM colLayout WHERE l_id=?',[findIdByName(name)]);
    for(var i = 0; i<selected_col.length; i++){
        colList.push(selected_col[i].c_id);
    }
    return colList;
}

function getAddress(e_id){
    var addr = alasql('SELECT * FROM addr WHERE emp=?',[e_id])[0];
    //zip STRING, state STRING, city STRING, street STRING, bldg STRING, house INT
    return addr.street+addr.bldg+', '+addr.house+', '+addr.city+', '+addr.state+', '+addr.zip;
}

function getFamily(e_id){
    var fams = alasql('SELECT * FROM family WHERE emp=?',[e_id]);
    var result = "";
    for(var i = 0; i<fams.length; i++){
        var fam = fams[i];
        if(fam){
            //name STRING, sex INT, birthday STRING, relation STRING, cohabit INT, care INT
            result+= fam.relation +': '+fam.name+', B-day: '+fam.birthday+', Cohabitation:'+DB.choice(fam.cohabit)+', Dependent: '+DB.choice(fam.care)+'<br>';
        }
        break;
    }
    return result;
}

function getEdu(e_id){
    var edu = alasql('SELECT * FROM edu WHERE emp=?', [e_id])[0];
    //school STRING, major STRING, grad STRING
    if(edu){
        return 'School: '+edu.school+', Major: '+edu.major+', Graduation: '+edu.grad;
    }else{
        return '';
    }
}

function updateColLayout(l_id,cols) {
    var n = alasql('SELECT MAX(id) + 1 as id FROM colLayout')[0].id;
    for(var i = 0; i<cols.length; i++){
        alasql('INSERT INTO colLayout VALUES (?,?,?)',[n.toString(),l_id.toString(),cols[i].toString()]);
        n++;
    }
}

var tool4view = {
    fillTable : function (cols) {
        for(var i = 0; i<cols.length; i++){
            theader.append('<th>'+findColName(cols[i])+'</th>');
            cloneh.append('<th>'+findColName(cols[i])+'</th>');
        }
        for (var i = 0; i < emps.length; i++) {
            var emp = emps[i];
            var row = $('<tr id="'+emp.id+'"></tr>');
            for (var n = 0; n < cols.length; n++) {
                switch (cols[n]) {
                    case 1:
                        row.append('<td><img height=40 class="img-circle" src="img/' + emp.id + '.jpg"></td>');
                        break;
                    case 4:
                        row.append('<td>' + DB.choice(emp.sex) + '</td>');
                        break;
                    case 19:
                        row.append('<td>' + getAddress(emp.id) + '</td>');
                        break;
                    case 20:
                        row.append('<td>' + getFamily(emp.id) + '</td>');
                        break;
                    case 21:
                        row.append('<td>' + getEdu(emp.id) + '</td>');
                        break;
                    default:
                        row.append('<td>' + emp[findColDB(cols[n])] + '</td>');
                }//switch
            }//for each record
            row.appendTo('#tbody-emps');
        }
    },
    highlightActive : function (name) {
        layout_menu.each(function () {
            var opt = $(this).text();
            if(opt==name){
                $(this).parent().find('.list-group-item-info').removeClass('list-group-item-info');
                $(this).addClass('list-group-item-info');
            }
        });
    },
    getFirstLay : function () {
        var first_lay = alasql('SELECT * FROM layout',[])[0];
        return first_lay.name;
    },
    getActiveLay : function () {
        var active_lay = alasql('SELECT * FROM layout WHERE active=?',["true"])[0];
        return active_lay.name;
    },
    setActiveLay : function (name) {
        alasql('UPDATE layout SET active="false" WHERE active="true"',[]);
        alasql('UPDATE layout SET active="true" WHERE name=?',[name]);
        this.highlightActive(name);
    },
    resetTable : function (layout) {
        theader.children('th').remove();
        trecords.children('tr').remove();
        cloneh.children('th').remove();
        this.setActiveLay(layout);
        this.fillTable(getColList(layout));
    },
    init : function () {
        this.fillTable(getColList(this.getActiveLay()));
        this.highlightActive(this.getActiveLay());
    }
};

//=====================functions for setup modal contents============================
//layout modal
for (var i = 0; i<my_db.layouts.length; i++){
    var layout = my_db.layouts[i];
    var l_op = $('<option>'+layout.name+'</option>');
    layout_name.append(l_op);
}

for (var i = 0; i<my_db.colNames.length; i++){
    var colName = my_db.colNames[i];
    var c_op = $('<option>'+colName.web+'</option>');
    c_op.attr('value',colName.id);
    col_name_new.append(c_op);
    col_name_edit.append(c_op.clone());
}

var colList = getColList(tool4view.getActiveLay());
for(var i = 0; i<colList.length; i++){
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

//custom column modal


var metric_def = {
    symbol : 0,
    format : 1
};

format.click(function(){
    $('#format-text').text($(this).text());
    metric_def.format = $(this).attr('value')
});

operation.change(function () {
    metric_def.symbol = $(this).val();
    updateMetricDef(metric_def);
});

$('#col1').find('li').click(function () {
    metric_def['col1'] = $(this).text();
    updateMetricDef(metric_def);
});

$('#col2').find('li').click(function () {
    metric_def['col2'] = $(this).text();
    updateMetricDef(metric_def);
});

function updateMetricDef(ob){
    var symbols = ['&#43','&#45','&#215','&#247'];
    var oper = $('<button class="btn btn-default disabled" style="margin-right: 10px">'+symbols[ob.symbol]+'</button>');
    if(ob.col1){
        var c1 = $('<button class="btn btn-default disabled" style="margin-right: 10px">'+ob.col1+'</button>');
    }
    if(ob.col2){
        var c2 = $('<button class="btn btn-default disabled" style="margin-right: 10px">'+ob.col2+'</button>');
    }

    $('#def-panel').empty().append(c1).append(oper).append(c2);
}

//===============functions for column layout=====================


//init table content
tool4view.init();


$('tr').click(function () {
    window.location.href = 'emp.html?id=' + $(this).attr('id');
});
//update table
layout_menu.click(function () {
    tool4view.resetTable( $(this).text());
});

//Read
layout_name.change(function () {
    col_name_edit.multipleSelect("setSelects",getColList($(this).val()));
});

//Create
$('#btn-create-lay').click(function () {
    var l_id = alasql('SELECT MAX(id) + 1 as id FROM layout')[0].id;
    var name = layout_input.val();
    if(name!=='') {
        alasql('INSERT INTO layout VALUES (?,?,?)', [l_id.toString(), name, "false"]);
        tool4view.setActiveLay(name);
        tool4view.fillTable(getColList(name));
        var cols = $('#col-name-new').val();
        updateColLayout(l_id, cols);
        new_modal.modal('hide');
        location.reload(true);//refresh
    }else{
        $('.name-inputor').attr('class','has-error');
        layout_input.after('<span class="help-block">Please fill in the name of the layout</span>');
    }
});

//Delete
$('#btn-delete-lay').click(function(){
    var deleteLay = layout_name.val();
    $('#delete-lay').text(deleteLay);

    edit_modal.modal('hide');
    d_alert.show();

    $('#btn-yes').click(function () {
        alasql("DELETE FROM colLayout WHERE l_id=?",[findIdByName(deleteLay)]);
        alasql("DELETE FROM layout WHERE name=?",[deleteLay]);
        tool4view.resetTable(tool4view.getFirstLay());
        d_alert.hide();
        location.reload(true);
    });
    $('#btn-no').click(function(){
        d_alert.hide();
    });

});

//edit layout
$('#btn-edit-lay').click(function () {
    var editName = layout_name.val();
    var cols = $('#col-name-edit').val();
    var editId = findIdByName(editName);

    alasql("DELETE FROM colLayout WHERE l_id=?",[editId]);

    updateColLayout(editId,cols);
    tool4view.resetTable(editName);
    edit_modal.modal('hide');
    location.reload(true);//refresh page
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


// ===========functions for custom column=============
