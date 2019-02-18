function drawSVG(data,svg){
	// 容器宽高
	var totalWidth = svg.clientWidth;
	var totalHeight = svg.clientHeight;
	// 轴标签字号
	var fontSize = 12;
	// x、y轴标签、系列名
	var xAxis = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
	var yAxis = [];
	var series = [];
	// padding（图形与容器间隔、轴冗余）
	var pad = 10;
	// 原点坐标
	var ox = pad+fontSize*2;
	var oy = totalHeight-pad-fontSize*1.1;
	var yDegree = 0;
	// 矩形宽度
	var barW = 10; 
	// 间隔宽度
	var gapW = ((totalWidth-ox-pad)/(xAxis.length+1)).toFixed(2);
	// 数据中最大值
	var maxData = 0;
	// 高度比例
	var hRate = 0;
	// 轴标签颜色
	var axisColor = "#333";
	var seriesColor = ["#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83","#ca8622","#bda29a","#6e7074"];
	// 获取数据中最大数值
	for(var i=0; i<data.length; i++){
		var temp = Math.max.apply(null,data[i].sale);
		if(temp>maxData){
			maxData = temp;
		}
	}
	hRate = ((totalHeight-pad*2-fontSize*1.1-pad)/maxData).toFixed(2);
	// 获取x轴，此示例数据结构中没有设置月份名称，手动添加

	// 获取y轴刻度
	if(maxData<=10){
		yDegree = 1;
	}else if(maxData>10 && maxData<=100){
		yDegree = 10;
	}else{
		yDegree = 100;
	}
	// 获取系列
	for(var i=0; i<data.length; i++){
		series.push(data[i].product+"-"+data[i].region);
	}
	// 计算系列柱子宽度
	barW = (gapW*0.8/series.length).toFixed(2);
	
	svg.innerHTML = '';
	// 绘制坐标轴
	svg.appendChild(createLine({startx:ox,endx:ox,starty:oy,endy:pad,color: axisColor}));
	svg.appendChild(createLine({startx:ox,endx:totalWidth-pad,starty:oy,endy:oy,color: axisColor}));

	// 绘制x轴
	for(var i=0; i<xAxis.length; i++){
		svg.appendChild(createText({x:ox+(i+1)*gapW,y:totalHeight-pad,color:axisColor,size:fontSize,text:xAxis[i]}));
	}
	// 绘制y轴
	for(var i=1; i<Math.floor(maxData/yDegree)+1; i++){
		svg.appendChild(createText({x:ox-fontSize*2,y:totalHeight-pad-fontSize*1.2/2-i*yDegree*hRate,color:axisColor,size:fontSize,text:i*yDegree}));
		svg.appendChild(createLine({startx:ox-5,endx:ox,starty:totalHeight-pad-fontSize*1.1-i*yDegree*hRate,endy:totalHeight-pad-fontSize*1.1-i*yDegree*hRate,color: axisColor}));
	}
	// 绘制柱子
	for(var i=0; i<series.length; i++){
		for(var j=0; j<data[i].sale.length; j++){
			svg.appendChild(createRect({x:ox+(j+1)*gapW-barW*series.length/2+i*barW,y:oy-data[i].sale[j]*hRate,width:barW,height:data[i].sale[j]*hRate,color:seriesColor[i]}));
		}
	}
}
// 生成文本
function createText(t) {
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('x', t.x);
    text.setAttribute('y', t.y);
    text.setAttribute('stroke', t.color);
    text.setAttribute('font-size', t.size);
    text.setAttribute('text-anchor', "middle");
    text.innerHTML = t.text;
    return text;
}
// 生成线
function createLine(l) {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute('x1', l.startx);
    line.setAttribute('x2', l.endx);
    line.setAttribute('y1', l.starty);
    line.setAttribute('y2', l.endy);
    line.setAttribute('stroke', l.color);
    line.setAttribute('stroke-width', 1);
    return line;
}
// 生成矩形
function createRect(r) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute('x', r.x);
    rect.setAttribute('y', r.y);
    rect.setAttribute('width', r.width);
    rect.setAttribute('height', r.height);
    rect.setAttribute('fill', r.color);
    return rect;
}