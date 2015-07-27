function Main(){};

Main.workspaces = [];
Main.curr_workspace;

function InitializeTabs(){
	function tabClickHandler(e){
		var tabs = document.getElementsByClassName("tab");
		for (var i = 0; i < tabs.length; i++){
			tabs[i].className = "tab";
		}
		this.className += " selected";
		
		var index_text = this.id.slice(3, 4);
		var index = Number(index_text);
		
		//save the xml of the current workspace obj from the mainWorkspace
		Main.curr_workspace.xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
		
		//select the newly selected workspace object
		Main.curr_workspace = Main.workspaces[index];
		
		//load the xml of the newly selected workspace
		Blockly.mainWorkspace.clear();
		Main.LoadBlocks(Main.curr_workspace.xml);
		
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
		
		Main.workspaces.push({id: Main.workspaces.length, xml: ''});
		
		new_tab.onclick(e);
	}
	
	Main.curr_workspace = {
		id: 0,
		xml: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace))
	};
	Main.workspaces = [Main.curr_workspace];
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