function hover(e){
	var e = e || window.event;
    var target = e.target || e.srcElement;
   	var index = target.parentNode.getAttribute("index");
   	return index;
}