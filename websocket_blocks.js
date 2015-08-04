//TODO need to set up a JavaScript.WEBSOCKETS object kind of like VARIABLES
//that will populate itself with every new websocket created
//and the send and close methods search from this websocket variable dropdown

//also need to make socket ready state block???

Blockly.Blocks['websocket_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("create websocket");
    this.appendDummyInput()
        .appendField("    called")
        .appendField(new Blockly.FieldTextInput("websocket1"), "ID");
    this.appendValueInput("SERVER")
        .setCheck("String")
        .appendField("    server address");
    this.appendStatementInput("ONOPEN")
        .setCheck(null)
        .appendField("on open");
    this.appendStatementInput("ONMESSAGE")
        .setCheck(null)
        .appendField("on message");
    this.appendStatementInput("ONCLOSE")
        .setCheck(null)
        .appendField("on close");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.contextMenuType_ = 'variables_get';
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function(){
    return [this.getFieldValue('ID')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName){
    if (Blockly.Names.equals(oldName, this.getFieldValue('ID'))){
      this.setFieldValue(newName, 'ID');
    }
  },
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
   customContextMenu: function(options){
     var option = {enabled: true};
     var name = this.getFieldValue('ID');
     option.text = this.contextMenuMsg_.replace('%1', name);
     var xmlField = goog.dom.createDom('field', null, name);
     xmlField.setAttribute('name', 'ID');
     var xmlBlock = goog.dom.createDom('block', null, xmlField);
     xmlBlock.setAttribute('type', this.contextMenuType_);
     option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
     options.push(option);
   }
};
Blockly.JavaScript['websocket_create'] = function(block) {
  var id = block.getFieldValue('ID');
  var server = Blockly.JavaScript.valueToCode(block, 'SERVER', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_onopen = Blockly.JavaScript.statementToCode(block, 'ONOPEN');
  var statements_onmessage = Blockly.JavaScript.statementToCode(block, 'ONMESSAGE');
  var statements_onclose = Blockly.JavaScript.statementToCode(block, 'ONCLOSE');

  var code = 'var websocket_' + id + " = new WebSocket(" + server + ");\n";
  code += "websocket_" + id + ".onopen = function(){\n" + statements_onopen + "\n}\n";
  code += "websocket_" + id + ".onmessage = function(){\n" + statements_onmessage + "\n}\n";
  code += "websocket_" + id + ".onclose = function(){\n" + statements_onclose + "\n}\n";
  return code;
};


Blockly.Blocks['websocket_send'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("websocket id")
        .appendField(new Blockly.FieldDropdown([["websocket1", "websocket1"]]), "ID");
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .appendField("                      send message");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.contextMenuType_ = "variables_set";
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function(){
    return [this.getFieldValue('ID')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName){
    if (Blockly.Names.equals(oldName, this.getFieldValue('ID'))){
      this.setFieldValue(newName, 'ID');
    }
  },
  customContextMenu: Blockly.Blocks['websocket_create'].customContextMenu
};
Blockly.JavaScript['websocket_send'] = function(block) {
  var id = block.getFieldValue('ID');
  var message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = 'websocket_' + id + ".send(" + message + ");";
  return code;
};


Blockly.Blocks['websocket_close'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("close websocket")
        .appendField("id")
        .appendField(new Blockly.FieldDropdown([["websocket1", "websocket1"]]), "ID");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.contextMenuType_ = 'variables_set';
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function(){
    return [this.getFieldValue('ID')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName){
    if (Blockly.Names.equals(oldName, this.getFieldValue('ID'))){
      this.setFieldValue(newName, 'ID');
    }
  },
  customContextMenu: Blockly.Blocks['websocket_create'].customContextMenu
};
Blockly.JavaScript['websocket_close'] = function(block) {
  var id = block.getFieldValue('ID');
  
  var code = 'websocket_' + id + ".close();";
  return code;
};