// 定义checkbox项
var checkBox1 = [{
	value:1,
	text: "手机"
},{
	value:2,
	text: "笔记本"
},{
	value:3,
	text: "智能音箱"
}];
var checkBox2 = [{
	value:1,
	text: "华东"
},{
	value:2,
	text: "华北"
},{
	value:3,
	text: "华南"
}];

// 生成checkbox的dom结构
function addRatioGroup(group,data,cls){
	var temp = "<p>"+group+"\：";
	for(var i=0; i<data.length; i++){
		temp = temp.concat("<label><input type=\"checkbox\" class=\""+cls+"\" value=\""+data[i].value+"\"/> "+data[i].text+"</label>");
	};
	temp = temp.concat("<label><input type=\"checkbox\" class=\""+cls+"\" value=\"0\" /> 全部</label></p>");
	return temp;
}
// 设置选项间的逻辑
function checkFunc(e){
	var e = e || window.event;
    var target = e.target || e.srcElement;
    var groupName = "\."+target.getAttribute("class");
	var targetInput = document.querySelectorAll(groupName);
	// 单选项的数量
	var count = 0;
	// 是否全选
	var checkAll = false;
	for(var m=0;m<targetInput.length-1;m++){
		if(targetInput[m].checked){
			count++;
		}
	};
	// 单选全部选中，全选自动勾选
	if(count == targetInput.length-1){
		checkAll = true;
	};
	// 全选按钮的点击
    if (target.getAttribute("type") == "checkbox"){
    	if(target.getAttribute("value") == 0){
    		if (target.checked) {
    			checkAll = true;
    			count = targetInput.length-1;
    		}else {
    			checkAll = false;
    			count = 0;
    		}
    	}
    };
    // 根据checkAll属性渲染选项的勾选显示
    if(checkAll){
    	for(var n=0; n<targetInput.length; n++){
    		targetInput[n].checked = true;
    	}
    }else{
    	if(count == 0){
    		for(var n=0; n<targetInput.length; n++){
        		targetInput[n].checked = false;
        	}
    	}else{
    		targetInput[targetInput.length-1].checked = false;
    	}
    }
}