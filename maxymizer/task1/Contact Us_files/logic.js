window.onload = function(){

// Why IE doesn't support these functions? :'(
function firstElementChild_of(element){
	return element.children[0];
}
function lastElementChild_of(element){
	return element.children[element.children.length - 1];
}

function previousElementSibling( element ) {
    if( element.previousElementSibling ) {
        return element.previousElementSibling;
    } else {
        while( element = element.previousSibling ) {
            if( element.nodeType == 1 ) return element;
        }
    }
}

function nextElementSibling( element ) {
    if( element.nextElementSibling ) {
        return element.nextElementSibling;
    } else {
        while( element = element.nextSibling ) {
            if( element.nodeType == 1 ) return element;
        }
    }
}

function getFirstElementByClass(tagName, className, parent){
	var children=parent.getElementsByTagName(tagName), e, i=0, result;
	do {
		e = children[i];
		if (e.className.indexOf(className) > -1) { result = e; }
		i++
	}
	while ( "undefined" == typeof result || i == children.length )
	return result;
}

	var content_wrap = document.getElementById("content-wrap");
	var grid_4 = getFirstElementByClass( 'div', 'grid_4', content_wrap );
	var grid_8 = getFirstElementByClass( 'div', 'grid_8', content_wrap );
	content_wrap.insertBefore(grid_4, lastElementChild_of(content_wrap));
	grid_4.style.width = "100%";
	firstElementChild_of(grid_4).style.cssText = "border-right: 1px solid #E2E2E2; padding-right: 30px; float: left;";
	lastElementChild_of(grid_4).style.cssText = "margin-top: 0px; margin-left: 30px; float: left;";
	var germany = lastElementChild_of(lastElementChild_of(grid_4));
	germany.style.cssText = "margin-top: 34px; float: left; width: 95px;"
	previousElementSibling( germany ).style.width = "290px";
	grid_4.appendChild(germany);

	grid_8.style.cssText = "display: block; width: auto; top: -30px;";
	var fields = document.getElementsByTagName('td')[0];
	fields.style.width = "";
	// inserting br to adjust fields with the text area.
	fields.insertBefore(document.createElement("br"), firstElementChild_of(fields));
	var labels = fields.getElementsByTagName('dt');
	var inputs = fields.getElementsByTagName('dd');
	for (var i=0; i<4; i++){
		inputs[i].style.display = "inline-block";
		labels[i].style.display = "inline-block";
		labels[i].style.width = "115px";
		// inline-block huck IE ;)
		if (navigator.appName == 'Microsoft Internet Explorer'){
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if ( re.exec(ua) != null && parseFloat( RegExp.$1 ) < 8){
				labels[i].style.display = "inline";
				labels[i].style.zoom = "1";
				inputs[i].style.display = "inline";
				inputs[i].style.zoom = "1";
			}
		}
		//inputs[i].style.width = "160px";
	}
	var message_area = document.getElementsByName('message')[0];
	message_area.style.width = "590px";
	message_area.style.height = "132px";
	var btn = document.getElementById("btn_holder");
	btn.style.cssText = "float: right";
	previousElementSibling(btn).style.cssText = "float: left; position: relative; left: 290px;";
	var item = firstElementChild_of(document.getElementById("updates"));
	item.style.width = "195px";
	lastElementChild_of(item).style.cssText = "float: right; width: 170px;";
	nextElementSibling( firstElementChild_of(grid_8) ).style.marginTop = "-60px";
	var form = document.getElementById("wpcf7-f1-p637-o1")
	form.appendChild( nextElementSibling(firstElementChild_of(grid_8)) );
	form.appendChild( nextElementSibling(firstElementChild_of(grid_8)) );
}