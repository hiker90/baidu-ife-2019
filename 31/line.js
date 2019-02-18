function drawCan(data,canvas){
	var ctx=canvas.getContext("2d");
	// 容器宽高
	var totalWidth = canvas.clientWidth;
	var totalHeight = canvas.clientHeight;
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
	// 清空画布，绘制坐标轴
	ctx.clearRect(0,0,totalWidth,totalHeight);
	drawLine(ctx,{startx:ox,starty:oy,endx:ox,endy:pad,color: axisColor});
	drawLine(ctx,{startx:ox,endx:totalWidth-pad,starty:oy,endy:oy,color: axisColor});
	
	// ctx.font="12px arial";
	ctx.textAlign='center';
	ctx.fillStyle='#333';
	// 绘制x轴标签
	for(var i=0; i<xAxis.length; i++){
		ctx.fillText(xAxis[i],ox+(i+1)*gapW,totalHeight-pad);
	}
	// 绘制y轴刻度、标签
	for(var i=1; i<Math.floor(maxData/yDegree)+1; i++){
		ctx.fillText(i*yDegree,ox-fontSize*2,totalHeight-pad-fontSize*1.2/2-i*yDegree*hRate);
		drawLine(ctx,{startx:ox-5,endx:ox,starty:totalHeight-pad-fontSize*1.1-i*yDegree*hRate,endy:totalHeight-pad-fontSize*1.1-i*yDegree*hRate,color: axisColor});
	}
	// 绘制柱子
	for(var i=0; i<series.length; i++){
		for(var j=0; j<data[i].sale.length; j++){
			drawCircle(ctx,{x:ox+(j+1)*gapW,y:oy-data[i].sale[j]*hRate,r:2,color:seriesColor[i]});
			drawLine(ctx,{startx:ox+(j+1)*gapW,endx:ox+(j+2)*gapW,starty:oy-data[i].sale[j]*hRate,endy:oy-data[i].sale[j+1]*hRate,color: seriesColor[i]});
		}
	}
}
function drawLine(ctx,line){
	ctx.beginPath();
    ctx.moveTo(line.startx, line.starty);
    ctx.lineTo(line.endx, line.endy);
    ctx.strokeStyle = line.color;
    ctx.stroke();
}
function drawCircle(ctx,cir) {
	ctx.beginPath();
	ctx.arc(cir.x,cir.y,cir.r,0,2*Math.PI);
	ctx.fillStyle=cir.color;
	ctx.fill();
	ctx.stroke();
}
