/**
 * Created by li_yi-pc on 10/13/2016.
 */
var layouts = alasql('SELECT * FROM layout', []);
var colNames = alasql('SELECT * FROM colname', []);



var layout_name = $('#layout-name');
var col_name_edit = $('#col-name-edit');
var col_name_new = $('#col-name-new');
var i;


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
    $('#new-layout').modal('hide');
    $('#edit-layout').modal('show');
});


//edit
$(function() {
    col_name_new.multipleSelect({
        width: '100%'
    });

});

$(function() {
    col_name_edit.multipleSelect({
        width: '100%'
    });

});




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