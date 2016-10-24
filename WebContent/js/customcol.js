/**
 * Created by li_yi-pc on 10/13/2016.
 */

// function getNumColList(){
//     var cols = alasql('SHOW COLUMNS FROM emp');
//     var list = [];
//     for(var i = 0; i< cols.length; i++){
//         if(cols[i].dbtypeid=='INT'||cols[i].dbtypeid=='FLOAT'){
//             if(cols[i].columnid!='id'&&cols[i].columnid!='sex'){
//                 list.push(cols[i].columnid);
//             }
//         }
//     }
//     return list;
// }
//
// function existCName(name){
//     var colnames = my_db.colNames;
//     for(var i = 0; i<colnames.length; i++){
//         if(colnames[i].web === name){
//             //the name exists
//             return true;
//         }
//     }
//     return false;
// }
//
// function getColVals(col){
//     col = findColDB(findColId(col));
//     var result = alasql('COLUMN OF SELECT '+col+' FROM emp');
//     if(isNaN(parseFloat(result))){
//         return false;
//     }
//     return result;
// }
//
// function reformat(result,format){
//     switch (format){
//         case '1':
//             return result;
//         case '2':
//             for(var i = 0; i<result.length; i++){
//                 result[i] = (result[i]*100).toFixed(2)+'%';
//             }
//             return result;
//         case '3':
//             for(var i = 0; i<result.length; i++){
//                 result[i] = '$'+result[i];
//             }
//             return result;
//         default:
//             console.log('Wrong format code'+format);
//     }
// }
//
// function getSum(col1,col2){
//     var result = [];
//     for(var i=0;i<col1.length;i++){
//         result.push(col1[i]+col2[i]);
//     }
//     console.log(result);
//     return result;
// }
// function getDiff(col1,col2){
//     var result = [];
//     for(var i=0;i<col1.length;i++){
//         result.push(col1[i]-col2[i]);
//     }
//     return result;
// }
// function getProduct(col1,col2){
//     var result = [];
//     for(var i=0;i<col1.length;i++){
//         result.push(col1[i]*col2[i]);
//     }
//     return result;
// }
// function getQuotient(col1,col2){
//     var result = [];
//     for(var i=0;i<col1.length;i++){
//         result.push(col1[i]/col2[i]);
//     }
//     return result;
// }
// function getResult(col1, col2, op, format){
//     var result = [];
//         switch(op){
//             case '0':
//                 result = reformat(getSum(col1,col2),format);
//                 break;
//             case '1':
//                 result = reformat(getDiff(col1,col2),format);
//                 break;
//             case '2':
//                 result = reformat(getProduct(col1,col2),format);
//                 break;
//             case '3':
//                 result = reformat(getQuotient(col1,col2),format);
//                 break;
//             default:
//                 console.log('Wrong op code:'+op);
//         }
//     return result;
// }
//
// function fillCol(col1,col2, op, col, format){
//     var td;
//     theader.append('<th>'+col+'</th>');
//     cloneh.append('<th>'+col+'</th>');
//     var result = getResult(col1, col2, op, format);
//     $('tbody tr').each(function(index){
//         td = $('<td>'+result[index]+'</td>');
//         $(this).append(td);
//     });
// }
//
// function updateMetricDef(ob){
//     var symbols = ['&#43','&#45','&#215','&#247'];
//     var oper = $('<button class="btn btn-default disabled" style="margin-right: 10px">'+symbols[parseInt(ob.symbol)]+'</button>');
//     if(ob.col1){
//         var c1 = $('<button class="btn btn-default disabled" style="margin-right: 10px">'+ob.col1+'</button>');
//     }
//     if(ob.col2){
//         var c2 = $('<button class="btn btn-default disabled" style="margin-right: 10px">'+ob.col2+'</button>');
//     }
//
//     $('#def-panel').empty().append(c1).append(oper).append(c2);
// }


// var colList = getNumColList();
// for(var i = 0; i<colList.length; i++){
//     var op = $('<li><a href="#">'+findNameByDB(colList[i])+'</a></li>');
//     $('#col1,#col2').append(op);
// }
// $(document).ready(function () {
//
//     var custom_col_modal = $('#custom-col');
//     var custom_col_name = $('#custom-col-name');
//     var col_name_input = $('.col-name-input');
//
//
//     var metric_def = {
//         symbol : '0',
//         format : '1'
//     };
//
//
//     $('#col1').find('li').click(function () {
//         metric_def['col1'] = $(this).text();
//         updateMetricDef(metric_def);
//     });
//
//     $('#col2').find('li').click(function () {
//         metric_def['col2'] = $(this).text();
//         updateMetricDef(metric_def);
//     });
//
//
//     format.click(function(){
//         $('#format-text').text($(this).text());
//         metric_def.format = $(this).attr('value')
//     });
//
//     operation.change(function () {
//         metric_def.symbol = $(this).val();
//         updateMetricDef(metric_def);
//     });
//
//     $('#btn-save-col').click(function () {
//         var name = custom_col_name.val();
//         var layout = getActiveLay();
//         var c1 = getColVals(metric_def.col1);
//         var c2 = getColVals(metric_def.col2);
//         if(name===''){
//             col_name_input.attr('class','has-error');
//             $('#col-help').text('The column name CANNOT be empty!');
//         }else if(existCName(name)){
//             col_name_input.attr('class','has-error');
//             $('#col-help').text('The column name you inputted exists!');
//         }else if(!c1||!c2){
//
//         }
//         fillCol(c1,c2,metric_def.symbol,name,metric_def.format);
//         custom_col_modal.modal('hide');
//
//         //add col to layout
//     });
//
// });
