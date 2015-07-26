function Main(){}
Main.display_canvas;
Main.display_ctx;

Main.workspaces = [];
Main.curr_workspace;

function InitializeTabs(){
	function tabClickHandler(e){
		var divs = document.getElementsByClassName("blocklyDiv");
		for (var i = 0; i < divs.length; i++){
			divs[i].style.display = "none";
		}
		
		var tabs = document.getElementsByClassName("tab");
		for (var i = 0; i < tabs.length; i++){
			tabs[i].className = "tab";
		}
		this.className += " selected";
		
		document.getElementById("blocklyDiv_" + this.id).style.display = "";
		var index_text = this.id.slice(3, 4);
		var index = Number(index_text);
		
		Main.curr_workspace = Main.workspaces[index];
	}
	
	var tabs = document.getElementsByClassName("tab");
	for (var i = 0; i < tabs.length-1; i++){
		tabs[i].onclick = tabClickHandler;
	}
	
	document.getElementById("new_tab").onclick = function(e){
		var tabs = document.getElementsByClassName("tab");
		var index = tabs.length-1;
		var new_tab = document.createElement("span");
		new_tab.id = "tab" + index;
		new_tab.className = "tab";
		new_tab.innerHTML = "object" + index;
		new_tab.onclick = tabClickHandler;		
		this.parentNode.insertBefore(new_tab, this);
		
		var new_div = document.createElement("div");
		new_div.className = "blocklyDiv";
		new_div.id = "blocklyDiv_tab" + index;		
		
		var old_div = document.getElementById("new_blocklyDiv");
		old_div.parentNode.insertBefore(new_div, old_div);
			
		Blockly.inject(new_div, {toolbox: document.getElementById('toolbox')});
		Main.workspaces.push(Blockly.mainWorkspace);
		Main.curr_workspace = Blockly.mainWorkspace;
		
		new_tab.onclick(e);
	}
}
  
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

Main.LoadBlocks = function(defaultXml){
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
}