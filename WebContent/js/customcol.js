/**
 * Created by li_yi-pc on 10/13/2016.
 */

function createCol(col,lay){
    var c = alasql('SELECT MAX(id) + 1 as id FROM colname')[0].id;
    var l = alasql('SELECT MAX(id) + 1 as id FROM colLayout')[0].id;
    alasql('INSERT INTO colname VALUES(?,?,?)',[c.toString(),col.toLowerCase(),col]);
    alasql('ALTER TABLE emp ADD COLUMN ? DECIMAL',[col]); //how to add a column that does not have a fixed name
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

function getSum(v1, v2){

}

function getDifference(v1, v2){

}

function getProduct(v1, v2){

}

function getQuotient(v1, v2){

}

function fillMetric(col1, col2, op, format){
    var vals_1 = getColVal(col1);
    var vals_2 = getColVal(col2);
    var result = [];
    switch (op){
        case 1://plus
            result = getSum(vals_1,vals_2);
            break;
        case 2://minus
            result = getDifference(vals_1,vals_2);
            break;
        case 3://multiply
            result = getProduct(vals_1,vals_2);
            break;
        case 4://divide
            result = getQuotient(vals_1,vals_2);
    }
    switch (format){
        case 1://int
            break;
        case 2://percent
            break;
        case 3://currency
            break;
    }
}

