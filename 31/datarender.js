// 渲染表格
function renderTable(table,data) {
    // 输出表头：商品、地区、1月、2月、…… 12月
    var t_column = 14;
    var string;
    var rowspan = 0;
    if(tempRegion.length == 1 && tempProduct.length>1){
        string = "<table border=\"1\"><thead><tr><th>地区</th><th>商品</th>";
    }else{
        string = "<table border=\"1\"><thead><tr><th>商品</th><th>地区</th>";
    }
    for (var i = 0; i < t_column - 2; i++) {
        string = string.concat("<th>" + (i + 1) + "月" + "</th>");
    }
    string = string.concat("</tr></thead>");
    string = string.concat("<tbody>");

    if(tempRegion.length == 1 && tempProduct.length>1){
        rowspan = tempProduct.length;
        for (var i = 0; i < data.length; i++) {
            string = string.concat("<tr index="+i+">");
            if(i==0){
                string = string.concat("<td rowspan=\""+rowspan+"\">" + data[i].region + "</td>");
            }
            string = string.concat("<td>" + data[i].product + "</td>");
            for (var j = 0; j < t_column - 2; j++) {
                string = string.concat("<td>" + data[i].sale[j] + "</td>");
            }
            string = string.concat("</tr>");
        }
    }else{
        rowspan = tempRegion.length;
        for (var i = 0; i < data.length; i++) {
            string = string.concat("<tr index="+i+">");
            if(i%rowspan == 0){
                string = string.concat("<td rowspan=\""+rowspan+"\">" + data[i].product + "</td>");
            }
            string = string.concat("<td>" + data[i].region + "</td>");
            for (var j = 0; j < t_column - 2; j++) {
                string = string.concat("<td>" + data[i].sale[j] + "</td>");
            }
            string = string.concat("</tr>");
        }
    }
    string = string.concat("</tbody>");
    string = string.concat("</table>");
    // 把生成的HTML内容赋给table-wrapper
    table.innerHTML = string;
}


function renderTable2(data) {
	var table = document.getElementById("table-wrapper");
    // 输出表头：商品、地区、1月、2月、…… 12月
    var t_column = 14;
    var string = "<table border=\"1\"><thead><tr><th>商品</th><th>地区</th>";
    for (var i = 0; i < t_column - 2; i++) {
        string = string.concat("<th>" + (i + 1) + "月" + "</th>");
    }
    string = string.concat("</tr></thead>");
    string = string.concat("<tbody>");
    for (var i = 0; i < data.length; i++) {
        string = string.concat("<tr>");
        string = string.concat("<td>" + data[i].product + "</td>");
        string = string.concat("<td>" + data[i].region + "</td>");
        for (var j = 0; j < t_column - 2; j++) {
            string = string.concat("<td>" + data[i].sale[j] + "</td>");
        }
        string = string.concat("</tr>");
    }
    string = string.concat("</tbody>");
    string = string.concat("</table>");
    // 把生成的HTML内容赋给table-wrapper
    table.innerHTML = string;
}
