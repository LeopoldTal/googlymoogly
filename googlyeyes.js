function googlyEye(canvasId, posX, posY, relSize)
{
	var eyeContainer = document.getElementById("eyesContainer");
	eyeContainer.style.setProperty("position", "relative");
	
	var canvas = document.createElement("canvas");
	canvas.id = canvasId;
	canvas.width = relSize/100 * eyeContainer.clientWidth;
	canvas.height = canvas.width;
	canvas = eyeContainer.appendChild(canvas);
	
	var canvasStyle = canvas.style;
	var context = canvas.getContext("2d");
	
	var halfWidth = canvas.width/2;
	
	canvasStyle.setProperty("position", "absolute");
	canvasStyle.setProperty("top", Math.floor(eyeContainer.clientWidth*(posY-relSize/2)/100) + "px");
	canvasStyle.setProperty("left", Math.floor(eyeContainer.clientWidth*(posX-relSize/2)/100) + "px");
	
	var eyeLineWidth = 0.2 * halfWidth;
	var eyeRadius  = halfWidth - eyeLineWidth/2;
	var pupilRadius = 0.25 * eyeRadius;
	var sideEyeRatio = 0.4; // How far the pupil can sink into the line around the eye
	
	function drawWhite()
	{
		// Clear all
		canvas.width = canvas.width;
		
		// Eye white
		context.beginPath();
		context.arc(halfWidth, halfWidth, eyeRadius, 0, 2*Math.PI, false);
		context.fillStyle = "#ffffff";
		context.fill();
		context.lineWidth = eyeLineWidth;
		context.strokeStyle = "#000000";
		context.stroke();
	}
	
	function d(x,y)
	{
		return Math.sqrt(x*x + y*y);
	}
	function relDistFromCentre(x, y)
	{
		var r = d(x,y);
		return (eyeRadius-pupilRadius-(1-sideEyeRatio)*eyeLineWidth) * (1 - Math.exp( -r/(3*eyeRadius) )) / r;
	}
	
	function drawEye(x, y)
	{
		var r = relDistFromCentre(x, y);
		
		drawWhite();
		// Pupil
		context.beginPath();
		context.arc(halfWidth+r*x, halfWidth+r*y, pupilRadius, 0, 2*Math.PI, false);
		context.fillStyle = "#000000";
		context.fill();
		context.lineWidth = 0;
		context.strokeStyle = "#000000";
		context.stroke();
	}
	
	window.addEventListener("mousemove", function(mousePos){
		var x = mousePos.pageX - canvas.offsetLeft - halfWidth;
		var y = mousePos.pageY - canvas.offsetTop - halfWidth;
		drawEye(x, y);
	}, false);
}
