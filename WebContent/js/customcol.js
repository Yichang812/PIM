/**
 * Created by li_yi-pc on 10/13/2016.
 */

function createCol(col,lay){
    var c = alasql('SELECT MAX(id) + 1 as id FROM colname')[0].id;
    var l = alasql('SELECT MAX(id) + 1 as id FROM colLayout')[0].id;
    alasql('INSERT INTO colname VALUES(?,?,?)',[c.toString(),col.toLowerCase(),col]);
    alasql('ALTER TABLE emp ADD COLUMN `'+col+'` STRING'); //``is used to prevent the name of the column is number of keywords in alasql
    alasql('INSERT INTO colLayout VALUES(?,?,?)',[l.toString(),findIdByName(lay).toString(),c.toString()]);
    return c;
}
function existCName(name){
    var colnames = my_db.colNames;
    for(var i = 0; i<colnames.length; i++){
        if(colnames[i].web === name){
            //the name exists
            return true;
        }
    }
    return false;
}


function setMetric(col1, col2, op, col){

    var c1 = findColDB(findColId(col1));
    var c2 = findColDB(findColId(col2));
    var ops = ['+','-','*','/'];
    var query = 'UPDATE emp SET `'+col+'` = '+c1+ops[op]+c2;
    alasql(query);

}

var custom_col_modal = $('#custom-col');
var custom_col_name = $('#custom-col-name');
var col_name_input = $('.col-name-input');

$('#btn-save-col').click(function () {
    console.log(my_db.colTypes);
    var name = custom_col_name.val();
    var layout = getActiveLay();
    if(name===''){
        col_name_input.attr('class','has-error');
        $('#col-help').text('The column name CANNOT be empty!');
    }else if(existCName(name)){
        col_name_input.attr('class','has-error');
        $('#col-help').text('The column name you inputted exists!');
    }else if(metric_def.col1&&metric_def.col2){
        createCol(name,layout);
        setMetric(metric_def.col1,metric_def.col2,metric_def.symbol,name);
        custom_col_modal.modal('hide');
        location.reload(true);//refresh
    }


});

