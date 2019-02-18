window.onload = function(){
// 复选框
	// 获取checkbox容器
	var region2 =  document.getElementById("region-radio-wrapper");
	var product2 =  document.getElementById("product-radio-wrapper"); 
	product2.innerHTML = addRatioGroup("商品",checkBox1,"product");
	region2.innerHTML = addRatioGroup("地区",checkBox2,"region");
	// 获取图形容器
    var svg = document.getElementsByTagName("svg")[0];
    var canvas = document.getElementById("line");
    // 获取表格容器
    var table = document.getElementById("table-wrapper");

	// 绑定选项事件,选项间的逻辑
	region2.addEventListener("change", checkFunc);
	product2.addEventListener("change", checkFunc);
	// 绑定选项事件,渲染表格,绘制图表
	region2.addEventListener("change", function(){
		renderTable(table,getData2());
        drawSVG(getData2(),svg);
        drawCan(getData2(),canvas);
        console.log(getData2());
	});
	product2.addEventListener("change", function(){
		renderTable(table,getData2());
        drawSVG(getData2(),svg);
        drawCan(getData2(),canvas);
        console.log(getData2());
	});

// 下拉框
	var region =  document.getElementById("region-select");
	var product =  document.getElementById("product-select");
	region.onchange = function () {
        renderTable2(getData());
    };
    product.onchange = function () {
        renderTable2(getData());
    }
// 表格鼠标移入事件
	table.addEventListener("mouseover",function(){
		var tData = [];
		tData.push(getData2(hover()));
        drawSVG(tData,svg);
        drawCan(tData,canvas);
	})
	table.addEventListener("mouseout",function(){
		drawSVG(getData2(),svg);
        drawCan(getData2(),canvas);
	})
}