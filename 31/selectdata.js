// 用于下拉框的，根据当前选项筛选数据
function getData(){
	var region =  document.getElementById("region-select");
	var index = region.selectedIndex;
	var currentRegion = region.options[index].value;
	var product =  document.getElementById("product-select");
	var index2 = product.selectedIndex;
	var currentProduct = product.options[index2].value;
	var tempData = [];
	var tempData2 = [];
	for(var i=0; i<sourceData.length;i++){
		switch (currentRegion) {
	        case "1":
	            if (sourceData[i].region== '华东') {
	                tempData[i] = sourceData[i];
	            }
	            break;
	        case "2":
	            if (sourceData[i].region== '华北') {
	                tempData[i] = sourceData[i];
	            }
	            break;
	        case "3":
	            if (sourceData[i].region== '华南') {
	                tempData[i] = sourceData[i];
	            }
	            break;
	        default:
	            tempData[i] = sourceData[i];
	            break;
	    }
	}
	cleanData(tempData);
	for(var j=0; j<tempData.length;j++){
		switch (currentProduct) {
	        case "1":
	            if (tempData[j].product== '手机') {
	                tempData2[j] = tempData[j];
	            }
	            break;
	        case "2":
	            if (tempData[j].product== '笔记本') {
	                tempData2[j] = tempData[j];
	            }
	            break;
	        case "3":
	            if (tempData[j].product== '智能音箱') {
	                tempData2[j] = tempData[j];
	            }
	            break;
	        default:
	            tempData2[j] = tempData[j];
	            break;
	    }
	}
	cleanData(tempData2);
    return tempData2;
}

// 踢除数据中的空值
function cleanData(data){
	for (var i = 0; i < data.length; i++) {
	    if (typeof data[i] == "undefined" || data[i] == null) {
	        data.splice(i, 1);
	        i--;
	    }
	}
}
// 用于多重选择的获取数据函数
// 
var tempRegion = [];
var tempProduct = [];
function getData2(index){
	var region =  document.querySelectorAll(".region");
	var product =  document.querySelectorAll(".product");
	var tempData = [];
	tempRegion.length = 0;
	tempProduct.length = 0;
	for (var i = 0; i<region.length-1; i++) {
		if(region[i].checked){						
			tempRegion.push(checkBox2[i].text);
		}
	}
	for (var i = 0; i<product.length-1; i++) {
		if(product[i].checked){						
			tempProduct.push(checkBox1[i].text);
		}
	}
	for(var i=0; i<tempProduct.length;i++){
		for (var j = 0; j<tempRegion.length; j++) {
			for(var n=0; n<sourceData.length; n++){
				if (sourceData[n].region==tempRegion[j] && sourceData[n].product==tempProduct[i]) {
					tempData.push(sourceData[n]);
				}
			}
		}
	}
	if(index){
		return tempData[index];
	}
    else return tempData;
}