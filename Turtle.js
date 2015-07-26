
function degToRad(degrees){
	return degrees * (Math.PI / 180);
}

function Turtle(){}
Turtle.canvas;
Turtle.ctx;
Turtle.paint_ctx;
Turtle.paint_canvas;
Turtle.speedRange;

Turtle.color;
Turtle.angle;
Turtle.x = 0;
Turtle.y = 0;
Turtle.r = 20;
Turtle.pen_down;
Turtle.visible;
Turtle.lineWidth;
Turtle.command_queue;
Turtle.execute_id = null;

Turtle.Reset = function(){
	Turtle.x = Turtle.canvas.width/2;
	Turtle.y = Turtle.canvas.height/2;
	Turtle.color = "#ffffff";
	Turtle.angle = 0;
	Turtle.lineWidth = 3;
	Turtle.visible = true;
	Turtle.pen_down = true;
	Turtle.command_queue = [];
	if (Turtle.execute_id !== null)
		window.clearTimeout(Turtle.execute_id);
	Turtle.execute_id = null;
	
	Turtle.ResetPaintCanvas();
}

Turtle.ResetPaintCanvas = function(){
	Turtle.paint_ctx.fillStyle = "#000000";
	Turtle.paint_ctx.fillRect(0, 0, Turtle.paint_canvas.width, Turtle.paint_canvas.height);
}

Turtle.DrawTurtle = function(){
	Turtle.ctx.clearRect(0, 0, Turtle.canvas.width, Turtle.canvas.height);
	if (!Turtle.visible) return;
	
	var r = Turtle.r * 1.8;
	var h = 10;
	var s = 10;
	var ctx = Turtle.ctx;
	//DRAW THE CIRCLE
	ctx.beginPath();
	ctx.arc(Turtle.x, Turtle.y, Turtle.r, 0, 2*Math.PI);
	
	ctx.strokeStyle = Turtle.color;
	ctx.lineWidth = 3;
	ctx.stroke();
	
	//DRAW THE TRIANGLE
	ctx.lineWidth = 1;
	ctx.fillStyle = Turtle.color;
	ctx.beginPath();
	var x = Turtle.x + r*Math.sin(degToRad(Turtle.angle));
	var y = Turtle.y - r*Math.cos(degToRad(Turtle.angle));
	ctx.moveTo(x, y);
	var x1 = x - (s/2)*Math.cos(degToRad(Turtle.angle)) - (h)*Math.sin(degToRad(Turtle.angle));
	var y1 = y + (h)*Math.cos(degToRad(Turtle.angle)) - (s/2)*Math.sin(degToRad(Turtle.angle));
	ctx.lineTo(x1, y1);
	x1 = x + (s/2)*Math.cos(degToRad(Turtle.angle)) - (h)*Math.sin(degToRad(Turtle.angle));
	y1 = y + (h)*Math.cos(degToRad(Turtle.angle)) + (s/2)*Math.sin(degToRad(Turtle.angle));
	ctx.lineTo(x1, y1);;
	ctx.fill();
}

Turtle.moveForward = function(value, block_id){
	var command = {command: 'moveForward', value: value, block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_moveForward = function(value){
	var ctx = Turtle.paint_ctx;
	if (Turtle.pen_down){
		ctx.beginPath();
		ctx.moveTo(Turtle.x, Turtle.y);
	}
	
	Turtle.x += value*Math.sin(degToRad(Turtle.angle));
	Turtle.y -= value*Math.cos(degToRad(Turtle.angle));
	
	if (Turtle.pen_down){
		ctx.lineTo(Turtle.x, Turtle.y);
		ctx.strokeStyle = Turtle.color;
		ctx.lineWidth = Turtle.lineWidth;
		ctx.stroke();
	}
}

Turtle.moveBackward = function(value, block_id){
	var command = {command: 'moveBackward', value: value, block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_moveBackward = function(value){
	var ctx = Turtle.paint_ctx;
	if (Turtle.penDown){
		ctx.beginPath();
		ctx.moveTo(Turtle.x, Turtle.y);
	}
	
	Turtle.x -= value*Math.sin(degToRad(Turtle.angle));
	Turtle.y += value*Math.cos(degToRad(Turtle.angle));
	
	if (Turtle.penDown){
		ctx.lineTo(Turtle.x, Turtle.y);
		ctx.strokeStyle = Turtle.color;
		ctx.lineWidth = Turtle.lineWidth;
		ctx.stroke();
	}
}

Turtle.turnRight = function(value, block_id){
	var command = {command: 'turnRight', value: value, block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_turnRight = function(value){
	Turtle.angle += value;
	if (Turtle.angle > 360)
		Turtle.angle = Turtle.angle - 360;
}

Turtle.turnLeft = function(value, block_id){
	var command = {command: 'turnLeft', value: value, block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_turnLeft = function(value){
	Turtle.angle -= value;
	if (Turtle.angle < 0)
		Turtle.angle = 360 + Turtle.angle;
}

Turtle.penWidth = function(width, block_id){
	var command = {command: 'penWidth', width: width, block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_penWidth = function(width){
	Turtle.lineWidth = width;
}

Turtle.penDown = function(block_id){
	var command = {command: 'penDown', block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_penDown = function(){
	Turtle.pen_down = true;
}

Turtle.penUp = function(block_id){
	var command = {command: 'penUp', block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_penUp = function(){
	Turtle.pen_down = false;
}

Turtle.penColour = function(colour, block_id){
	var command = {command: 'penColour', colour: colour, block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_penColour = function(colour){
	Turtle.color = colour;
}

Turtle.hideTurtle = function(block_id){
	var command = {command: 'hideTurtle', block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_hideTurtle = function(){
	Turtle.visible = false;
}

Turtle.showTurtle = function(block_id){
	var command = {command: 'showTurtle', block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_showTurtle = function(){
	Turtle.visible = true;
}

Turtle.drawPrint = function(text, block_id){
	var command = {command: 'drawPrint', text: text};
	Turtle.command_queue.push(command);
}
Turtle.exe_drawPrint = function(text){
	Turtle.paint_ctx.fillStyle = Turtle.color;
	Turtle.paint_ctx.save();
	Turtle.paint_ctx.translate(Turtle.x, Turtle.y);
	Turtle.paint_ctx.rotate(2 * Math.PI * (Turtle.angle - 90) / 360);
	Turtle.paint_ctx.fillText(text, 0, 0);
	Turtle.paint_ctx.restore();
}

Turtle.drawFont = function(font, size, style, block_id){
	var command = {command: 'drawFont', font: font, size: size, style: style, block_id: block_id};
	Turtle.command_queue.push(command);
}
Turtle.exe_drawFont = function(font, size, style){
	Turtle.paint_ctx.font = style + ' ' + size + 'pt ' + font;
}

Turtle.execute = function(){
	var command = Turtle.command_queue.shift();
	//no more commands on the queue
	if (command === undefined) return;
	var block_id = command.block_id;
	if (block_id !== null){
		Blockly.mainWorkspace.highlightBlock(block_id);
	}
	
	switch (command.command){
		case 'moveForward':
			Turtle.exe_moveForward(command.value);
			break;
		case 'moveBackward':
			Turtle.exe_moveBackward(command.value);
			break;
		case 'turnRight':
			Turtle.exe_turnRight(command.value);
			break;
		case 'turnLeft':
			Turtle.exe_turnLeft(command.value);
			break;
		case 'penWidth':
			Turtle.exe_penWidth(command.width);
			break;
		case 'penUp':
			Turtle.exe_penUp();
			break;
		case 'penDown':
			Turtle.exe_penDown();
			break;
		case 'penColour':
			Turtle.exe_penColour(command.colour);
			break;
		case 'hideTurtle':
			Turtle.exe_hideTurtle();
			break;
		case 'showTurtle':
			Turtle.exe_showTurtle();
			break;
		case 'drawPrint':
			Turtle.exe_drawPrint(command.text);
			break;
		case 'drawFont':
			Turtle.exe_drawFont(command.font, command.size, command.style);
			break;
		default: break;
	}
	
	Main.Redraw();
	
	var speedRange = Turtle.speedRange.value;
	var waitTime = 50000 / (speedRange + 1);
	
	Turtle.execute_id = window.setTimeout(function(){ Turtle.execute(); }, waitTime);
}