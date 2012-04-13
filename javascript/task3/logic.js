window.onload = function(){

	function prepareDrag(e){
		if( !e ) {e = event;} // IE and FF are antagonists;

		//crossbrowser determination of left button pressed
		var left = false;
		if ( 'which' in e ){
			if ( 1 == e.which ){
				left = true;
			}
		}
		else if (event.button & 1){
			left = true
		}

		if ( left ){
			currentSquare = (e.currentTarget) ? e.currentTarget : e.srcElement;
			currentSquare.offsetX = e.clientX - parseInt(currentSquare.style.left);
			currentSquare.offsetY = e.clientY - parseInt(currentSquare.style.top);
			document.onmousemove = dragSquare;
			document.onmouseup = mouseUp;
		}
	}

	function dragSquare(e){
		if( !e ) { e = event; }
		var left = false;
		if ( 'which' in e ){
			if ( 1 == e.which ){
				left = true;
			}
		}
		else if (event.button & 1){
			left = true
		}
		if ( left ){
			currentSquare.style.left = e.clientX - currentSquare.offsetX + "px";
			currentSquare.style.top = e.clientY - currentSquare.offsetY + "px";
		}
	}

	function mouseUp(e){
		if( !e ) { e = event; }

		var left = false;
		if ( 'which' in e ){
			if ( 1 == e.which ){
				left = true;
			}
		}
		else if (event.button & 1){
			left = true
		}
		if ( left ){
			document.onmousemove = null;
			currentSquare = null;
			currentCorner = null;
		}
	}

	function prepareResize(e){
		if( !e ){ e = event ;}
		var left = false;
		if ( 'which' in e ){
			if ( 1 == e.which ){
				left = true;
			}
		}
		else if (event.button & 1){
			left = true
		}
		if ( left ){
			currentCorner = (e.currentTarget) ? e.currentTarget : e.srcElement;
			currentSquare = currentCorner.parentElement;
			currentSquare.lastX = e.clientX;
			currentSquare.lastY = e.clientY;

			e.cancelBubble = true;   // to avoid running prepareDrag;
			if (e.stopPropagation) {
				e.stopPropagation();
				e.preventDefault();
			}

			document.onmousemove = resizeSquare;
			document.onmouseup = mouseUp;
		}
	}

	function resizeSquare(e){
		if( !e ){ e = event ;}
		var left = false;
		if ( 'which' in e ){
			if ( 1 == e.which ){
				left = true;
			}
		}
		else if (event.button & 1){
			left = true
		}
		if ( left ){
			var place = currentCorner.className.split("-")
			var dX = e.clientX - currentSquare.lastX;
			var dY = e.clientY - currentSquare.lastY;
			switch ( place[0] ){
				case "top":
					if ( !(e.clientY > parseInt(currentSquare.style.top) && 10 == currentSquare.clientHeight ) ){
						var newHeight = currentSquare.clientHeight - dY;
						var newTop = parseInt(currentSquare.style.top) + dY
						currentSquare.style.top = newHeight > 10 ? newTop + "px" : newTop + newHeight - 10 + "px";
						currentSquare.style.height = newHeight > 10 ? newHeight + "px" : "10px";
					}
					break;
				case "bottom":
					if ( !( (e.clientY < parseInt(currentSquare.style.top) + currentSquare.clientHeight) &&
						 10 == currentSquare.clientHeight) ){
						var newHeight = currentSquare.clientHeight + dY;
						currentSquare.style.height = newHeight > 10 ? newHeight + "px" : "10px";
					}
					break;
			}
			switch ( place[1] ){
				case "left":
					if ( !(e.clientX > parseInt(currentSquare.style.left) && 10 == currentSquare.clientWidth) ){
						var newWidth = currentSquare.clientWidth - dX;
						var newLeft = parseInt(currentSquare.style.left) + dX;
						currentSquare.style.left = newWidth > 10 ? newLeft + "px" : newLeft + newWidth - 10 + "px";
						currentSquare.style.width = newWidth > 10 ? newWidth + "px" : "10px";
					}
					break;
				case "right":
					if ( !( (e.clientX < parseInt(currentSquare.style.left) + currentSquare.clientWidth )
						 && 10 == currentSquare.clientWidth) ){
						var newWidth = currentSquare.clientWidth + dX;
						currentSquare.style.width = newWidth > 10 ? newWidth + "px" : "10px";
					}
					break;
			}
			currentSquare.lastX = e.clientX;
			currentSquare.lastY = e.clientY;
		}		
	}

	var css = document.createElement("style");
	var properties = "html, body {width: 100%; height: 100%; margin: 0px; padding: 0px; font-size:0px; -webkit-user-select: none;}"+ // Font-size is for IE6 div's height
	 "div {position: absolute; border: 1px solid #000000; background-color: white;}"+
	 ".wrap {top: 0; left: 0px; border: 0px;}"+
	 ".square {width: 150px; height: 150px; cursor: move;}"+
	 ".top-left {width: 5px; height: 5px; top: -3px; left: -3px; cursor: nw-resize;}"+
	 ".top-right {width: 5px; height: 5px; top: -3px; right: -3px; cursor: ne-resize;}"+
	 ".bottom-left {width: 5px; height: 5px; bottom: -3px; left: -3px; cursor: sw-resize;}"+
	 ".bottom-right {width: 5px; height: 5px; bottom: -3px; right: -3px; cursor: se-resize;}";
	css.setAttribute("type", "text/css");
	// Special for IE
	if (css.styleSheet){
    	css.styleSheet.cssText = properties;
	} else {
	    css.appendChild( document.createTextNode(properties) );
	}
	document.getElementsByTagName("head")[0].appendChild(css);

	var block = document.createElement("div");
	block.className = "square";
	var topleft = document.createElement("div");
	topleft.className = "top-left"
	var topright = document.createElement("div");
	topright.className = "top-right";
	var bottomleft = document.createElement("div");
	bottomleft.className = "bottom-left";
	var bottomright = document.createElement("div");
	bottomright.className = "bottom-right";
	block.appendChild(topleft);
	block.appendChild(topright);
	block.appendChild(bottomleft);
	block.appendChild(bottomright);

	var addBlockButton = document.createElement("input");
	addBlockButton.setAttribute("value", "Add");
	addBlockButton.setAttribute("type", "button");
	addBlockButton.onclick = function(){

		var clon = block.cloneNode(true);
		clon.onmousedown = prepareDrag;
		clon.ondragstart = function(e){   // in IE and FF div is draggable. And this function is clear default action
			if( !e ) { e = event; }
			if(e.preventDefault) { e.preventDefault(); } //FF
			e.returnValue = false;//IE
		}
		var x = Math.round(document.documentElement.clientWidth/2 - 100) + "px";
		var y = Math.round(document.documentElement.clientHeight/2 - 100) + "px";
		clon.style.left = x;
		clon.style.top = y;
		clon.childNodes[0].onmousedown = prepareResize;
		clon.childNodes[1].onmousedown = prepareResize;
		clon.childNodes[2].onmousedown = prepareResize;
		clon.childNodes[3].onmousedown = prepareResize;
		wrap.appendChild(clon);
	}

	var clearBlocksButton = document.createElement("input");
	clearBlocksButton.setAttribute("value", "Clear");
	clearBlocksButton.setAttribute("type", "button");
	clearBlocksButton.onclick = function(){
		wrap.innerHTML = "";
	}

	var wrap = document.createElement("div");
	wrap.className = "wrap";
	document.body.appendChild(addBlockButton);
	document.body.appendChild(clearBlocksButton);
	document.body.appendChild(wrap);
}