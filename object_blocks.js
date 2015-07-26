//Object definition
Blockly.Blocks['object_define'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("object define:")
        .appendField(new Blockly.FieldTextInput("object_name"), "NAME");
    this.appendStatementInput("properties")
        .setCheck(null)
        .appendField("properties");
    this.appendStatementInput("procedures")
        .setCheck(null)
        .appendField("procedures");
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.JavaScript['object_define'] = function(block) {
  var object_name = block.getFieldValue('NAME');
  var statements_properties = Blockly.JavaScript.statementToCode(block, 'properties');
  var statements_procedures = Blockly.JavaScript.statementToCode(block, 'procedures');
  
  var code = 'var ' + object_name + ' = function(){';
	  code+= '';
  return code;
};