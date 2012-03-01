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
			currentPoint = (e.target) ? e.target : e.srcElement;
			img.onmousemove = dragPoint;
			document.onmouseup = mouseUp;
		}
	}

	function dragPoint(e){
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
			currentPoint.style.left = (e.offsetX || e.layerX) - 2 + "px";
			currentPoint.style.top = (e.offsetY || e.layerY) - 2 + "px";
			currentPoint.dragged = true;
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
			img.onmousemove = null;
			document.onmouseup = null;
			if ( currentPoint && currentPoint.dragged ){  // after draging clear variable
				currentPoint.dragged = false;
				currentPoint = null;
			}
			else showEditForm(e);  // there was click event;
		}
	}

	function showEditForm(e){
		//currentPoint = (e.target) ? e.target : e.srcElement;
		var name = document.getElementById("name");
		var description = document.getElementById("description")
		if (currentPoint.paramName){name.value = currentPoint.paramName;}
		if (currentPoint.paramDesc){description.value = currentPoint.paramDesc;}
		buttonSave.onclick = saveDetails;
		deleteButton.onclick = deletePoint;
		editForm.style.display = "block";
	}

	function saveDetails(e){
		var name = document.getElementById("name");
		currentPoint.paramName = name.value;
		name.value = "";
		var description = document.getElementById("description")
		currentPoint.paramDesc = description.value;
		description.value = "";
		currentPoint = null;
		editForm.style.display = "none";
	}

	function deletePoint(e){
		content.removeChild(currentPoint);
		editForm.style.display = "none";
		var name = document.getElementById("name");
		name.value = "";
		var description = document.getElementById("description")
		description.value = "";
	}

	var img = document.getElementById("img"); // fuck FF! even IE6 creates pointers with name as elements id.
	var content = document.getElementById("content");
	img.onclick = function(e){
		if( !e ) { e = event; }
		var point = document.createElement("div");
		point.className = "point";
		point.style.left = (e.offsetX || e.layerX) - 2 + "px";
		point.style.top = (e.offsetY || e.layerY) - 2 + "px" ;
		point.onmousedown = prepareDrag;
		point.ondragstart = function(e){   // in IE and FF div is draggable. And this function is clear default action
			if( !e ) { e = event; }
			if(e.preventDefault) { e.preventDefault(); } //FF
			e.returnValue = false;//IE
		}

		content.appendChild(point);
	}
	var editForm = document.createElement("div");
	editForm.setAttribute("id", "editform");
	editForm.style.display = "none";
	editForm.innerHTML =
	'<div><label>Name:</label><input id="name" type="text" value="" /></div>'+
	'<div><label>Description:</label></br>'+
	'<textarea id="description" cols="35" rows="5"></textarea></div>';
	var buttonSave = document.createElement("input");
	buttonSave.type = "button";
	buttonSave.value = "Save";
	editForm.appendChild(buttonSave);
	var deleteButton = document.createElement("input");
	deleteButton.type = "button";
	deleteButton.value = "Delete";
	editForm.appendChild(deleteButton);
	document.getElementById("container").appendChild(editForm);
}