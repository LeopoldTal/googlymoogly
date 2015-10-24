function eyeDrawer()
{
	this.eyeContainer = undefined;
	this.firstEye = true;
	this.eyeNum = 0;
	
	this.x_px = undefined;
	this.y_px = undefined;
	this.r_px = undefined;

	function startDraw(mousePos)
	{
		this.x_px = mousePos.pageX - this.eyeContainer.offsetLeft;
		this.y_px = mousePos.pageY - this.eyeContainer.offsetTop;
	}
	
	function endDraw(mousePos)
	{
		if(this.firstEye)
		{
			var canvasId = "eye_" + this.eyeNum + "_1";
			
			var x = mousePos.pageX - this.eyeContainer.offsetLeft;
			var y = mousePos.pageY - this.eyeContainer.offsetTop;
			this.r_px = Math.sqrt( Math.pow(x-this.x_px,2) + Math.pow(y-this.y_px,2) );
			
			addEye(canvasId, this.x_px, this.y_px, this.r_px);
			this.firstEye = false;
		}
		else
		{
			var canvasId = "eye_" + this.eyeNum + "_2";
			addEye(canvasId, this.x_px, this.y_px, this.r_px);
			this.eyeNum += 1;
			this.firstEye = true;
		}
	}
	
	function addEye(canvasId, x_px, y_px, r_px)
	{
		var relSize = 2*100*r_px/eyeContainer.clientWidth;
		var posX = 100*x_px/eyeContainer.clientWidth;
		var posY = 100*y_px/eyeContainer.clientWidth;
		new googlyEye(canvasId, posX, posY, relSize);
		console.log("\"" + canvasId + "\"," + posX + "," + posY + "," + relSize);
	}
	
	function undoEye()
	{
		if(this.firstEye)
		{
			this.eyeNum -= 1;
			var e = document.getElementById("eye_" + this.eyeNum + "_2");
			e.parentNode.removeChild(e);
		}
		var e = document.getElementById("eye_" + this.eyeNum + "_1");
		e.parentNode.removeChild(e);
		this.firstEye = true;
	}
	
	window.addEventListener("DOMContentLoaded", function(){
			this.eyeContainer = document.getElementById("eyesContainer");
		}, false);
	window.addEventListener("mousedown", function(mousePos){
			startDraw(mousePos);
		}, false);
	window.addEventListener("mouseup", function(mousePos){
			endDraw(mousePos);
		}, false);
	window.addEventListener("keypress", function(){
			undoEye();
		}, false);
}
