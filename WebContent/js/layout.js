/**
 * Created by li_yi-pc on 10/13/2016.
 */
var layouts = alasql('SELECT * FROM layout', []);
var colNames = alasql('SELECT * FROM colname', []);




var layout_name = $('#layout-name');
var col_name_edit = $('#col-name-edit');
var col_name_new = $('#col-name-new');
var alert = $('.delete-alert');
var edit_modal = $('#edit-layout');
var new_modal = $('#new-layout');
var i;




//find the displayed column by layout name
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





//load layout
layout_name.change(function () {
    col_name_edit.multipleSelect("setSelects",getColList($(this).val()));
});

//save new layout
$('#new-layout-form').submit(function () {

    var lay ={};
    var name = $('#new-layout-name').val();
    lay.push(name);
    var id = alasql('SELECT MAX(id) + 1 as id FROM layout')[0].id;
    lay.unshift(id);
    //save to layout table
    alasql(
        'INSERT INTO layout(\
        id, \
        name) \
        VALUES(?,?);',
        lay);
    //save to colLayout
    var col_lay = {};
    id = alasql('SELECT MAX(id) + 1 as id FROM colLayout')[0].id;
    col_lay.push(id);
    col_lay.push(findIdByName(name));
    var cols= $('#col-name-new').val();
    for(i = 0; i<cols.length; i++){
        col_lay.push(cols[i]);
        alasql(
            'INSERT INTO colLayout(\
            id, \
            l_id,\
            c_id) \
            VALUES(?,?,?);',
            col_lay);
        col_lay.pop();
    }

});




//delete layout
// $('#btn-delete-lay').click(function(){
//     $('#edit-layout').modal('hide');
//     var currentLay = layout_name.val();
//     alert.find('#delete-name').text();
//     alert.toggle();
// });
//
// $('#btn-del-confirm').click(function () {
    //get selected layout
    //get layout id
    //delete from col colLayout WHERE
// });


// $("#setSelectsBtn").click(function() {
//     $("select").multipleSelect("setSelects", [1, 3]);
// });
// $("#getSelectsBtn").click(function() {
//     alert("Selected values: " + $("select").multipleSelect("getSelects"));
//     alert("Selected texts: " + $("select").multipleSelect("getSelects", "text"));
// });

// $('#layout-name').change(function(){
//     var id = $(this).children(':selected').attr("id");
//     console.log(id);
//     if(id=='newLayout'){
//         $('.name-inputor').toggle();
//         $('.layout-selector').hide();
//         $('.col-selector').show();
//     }else{
//         $('.col-selector').toggle();
//     }
//
// });