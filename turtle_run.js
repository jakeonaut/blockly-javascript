Main.display_canvas;
Main.display_ctx;
  
window.onload = function(){
	Blockly.inject(document.getElementById('blocklyDiv_tab0'),
		{toolbox: document.getElementById('toolbox')});
		
	Main.workspaces.push(Blockly.mainWorkspace);
	Main.curr_workspace = Blockly.mainWorkspace;
		
	InitializeTabs();
	
	document.getElementById("runProgram").onclick = function(e){
		if (this.value === "Run Program"){
			this.value = "Reset Program";			
			Main.RunProgram();
		}
		else{
			this.value = "Run Program";	
			Main.ResetProgram();
		}
	};
	
	document.getElementById("exportBlocks").onclick = function(e){
		var textarea = document.getElementById("block_xml");
		var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		xml = Blockly.Xml.domToPrettyText(xml);
		textarea.value = xml;
	}
	document.getElementById("importBlocks").onclick = function(e){
		var textarea = document.getElementById("block_xml");
		var xml = textarea.value;
		Blockly.mainWorkspace.clear();
		Main.LoadBlocks(xml);
	}
	
	var xml ="<xml><block type='turtle_move' id='12' inline='false' x='90' y='89'><field name='DIR'>moveForward</field><value name='VALUE'><block type='math_number' id='13'><field name='NUM'>100</field></block></value></block></xml>";
	Main.LoadBlocks(xml);
	
	Main.display_canvas = document.getElementById("display");
	Turtle.canvas = document.getElementById("turtle");
	Turtle.paint_canvas = document.getElementById("paint");
	
	Main.display_ctx = Main.display_canvas.getContext("2d");
	Turtle.ctx = Turtle.canvas.getContext("2d");
	Turtle.paint_ctx = Turtle.paint_canvas.getContext("2d");
	
	Turtle.speedRange = document.getElementById("programSpeed");
	
	Turtle.Reset();
	
	Main.Redraw();
}

Main.Redraw = function(){
	Turtle.DrawTurtle();
	
	//Copy paint then turtle canvas onto display canvas
	Main.display_ctx.drawImage(Turtle.paint_canvas, 0, 0);
	Main.display_ctx.drawImage(Turtle.canvas, 0, 0);
}

Main.RunProgram = function(e){
	Blockly.mainWorkspace.traceOn(true);
	//Add this to prevent infinite loop crashing :D!!!
	window.loopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.loopTrap <= 0) throw "Infinity";\n';
	
	var jscode = Blockly.JavaScript.workspaceToCode(Main.curr_workspace);
	try {
		eval(jscode);
	}
	catch (e) {
		if (e !== "Infinity"){
			var e = document.createTextNode(e);
			console.log(jscode);
		}
	}
	Turtle.execute();
}

Main.ResetProgram = function(e){
	Turtle.Reset();
	Main.Redraw();
}