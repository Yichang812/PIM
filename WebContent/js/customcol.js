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



function setCol(col,vals){
    for(var i = 0; i<vals.length; i++){
        alasql('INSERT INTO emp ? VALUES (?)',[col,vals[i]]);
    }
}

function getColVal(col){
    var vals = [];
    var dbName = findColDB(findColId(col));
    var data = alasql('SELECT * FROM emp',[]);
    for(var i = 0;i<data.length; i++){
        vals.push(data[i][dbName]);
    }
    return vals;
}

function getSum(v1, v2, format){
    var result = [];
    for(var i = 0; i<v1.length; i++){
        var num1 = parseFloat(v1[i]);
        var num2 = parseFloat(v2[i]);

        result.push(num1 + num2);
    }
    return result;
}

function getDifference(v1, v2, format){
    var result = [];
    for(var i = 0; i<v1.length; i++){
        var num1 = parseFloat(v1[i]);
        var num2 = parseFloat(v2[i]);

        result.push(num1 - num2);
    }
    return result;
}

function getProduct(v1, v2, format){
    var result = [];
    for(var i = 0; i<v1.length; i++){
        var num1 = parseFloat(v1[i]);
        var num2 = parseFloat(v2[i]);

        result.push(num1 * num2);
    }
    return result;
}

function getQuotient(v1, v2){
    var result = [];
    for(var i = 0; i<v1.length; i++){
        var num1 = parseFloat(v1[i]);
        var num2 = parseFloat(v2[i]);

        result.push(num1 / num2);
    }
    return result;
}

function setMetric(col1, col2, op, format, col){
    var vals_1 = getColVal(col1);
    var vals_2 = getColVal(col2);
    var result = [];
    switch (op){
        case 0://plus
            result = getSum(vals_1,vals_2);
            break;
        case 1://minus
            result = getDifference(vals_1,vals_2);
            break;
        case 2://multiply
            result = getProduct(vals_1,vals_2);
            break;
        case 3://divide
            result = getQuotient(vals_1,vals_2);
            break;
    }
    fillCol(result,format,col);
}

function fillCol(content,format,col){
    for(var i = 0; i<content.length; i++){
        alasql('UPDATE emp SET '+col+' =? WHERE ');
    }
}


$('#btn-save-col').click(function () {
    createCol('test','CPF');
});

