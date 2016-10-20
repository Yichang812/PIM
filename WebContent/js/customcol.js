/**
 * Created by li_yi-pc on 10/13/2016.
 */

function createCol(col,lay){
    var c = alasql('SELECT MAX(id) + 1 as id FROM colname')[0].id;
    var l = alasql('SELECT MAX(id) + 1 as id FROM colLayout')[0].id;
    alasql('INSERT INTO colname VALUES(?,?,?)',[c.toString(),col.toLowerCase(),col]);
    alasql('ALTER TABLE emp ADD COLUMN '+col+' STRING');
    alasql('INSERT INTO colLayout VALUES(?,?,?)',[l.toString(),findIdByName(lay).toString(),c.toString()]);
    return c;
}


function setMetric(col1, col2, op, col){

    var c1 = findColDB(findColId(col1));
    var c2 = findColDB(findColId(col2));
    var ops = ['+','-','*','/'];
    var query = 'UPDATE emp SET '+col+' = '+c1+ops[op]+c2;
    alasql(query);

}

var custom_col_modal = $('#custom-col');

$('#btn-save-col').click(function () {
    var name = $('#custom-col-name').val();
    console.log(name);
    var layout = tool4view.getActiveLay();
    if(metric_def.col1&&metric_def.col2){
        createCol(name,layout);
        setMetric(metric_def.col1,metric_def.col2,metric_def.symbol,name);
    }
    custom_col_modal.modal('hide');
    location.reload(true);//refresh

});

