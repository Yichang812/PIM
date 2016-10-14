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

var saveLayout = alasql.compile('INSERT INTO layout VALUES (?,?)');
var saveColLay = alasql.compile('INSERT INTO colLayout VALUES (?,?,?)');
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

    //var lay =[];
    var l_id = alasql('SELECT MAX(id) + 1 as id FROM layout')[0].id;
    var name = $('#new-layout-name').val();
    saveLayout(l_id.toString(),name);

    //save to colLayout
    var n = alasql('SELECT MAX(id) + 1 as id FROM colLayout')[0].id;
    var cols= $('#col-name-new').val();
    for(i = 0; i<cols.length; i++){
        alasql(n,l_id,cols[i]);
        n++;
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