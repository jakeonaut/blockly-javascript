/**
 * Blockly Apps: Turtle Graphics Blocks
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Blockly's Turtle Graphics application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['turtle_move'] = {
  // Block for moving forward or backwards.
  init: function() {
    var DIRECTIONS =
        [['move forward', 'moveForward'],
         ['move backward', 'moveBackward']];
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Moves the turtle forward or backward by the specified amount.');
  }
};

Blockly.JavaScript['turtle_move'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + block.getFieldValue('DIR') +
      '(' + value + ', \'block_id_' + block.id + '\');\n';
};


Blockly.Blocks['turtle_turn'] = {
  // Block for turning left or right.
  init: function() {
    var DIRECTIONS =
        [['right by ', 'turnRight'],
         ['left by ', 'turnLeft']];
    // Append arrows to direction messages.
    DIRECTIONS[0][0] += ' \u21BB';
    DIRECTIONS[1][0] += ' \u21BA';
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Turns the turtle left or right by the specified number of degrees.');
  }
};

Blockly.JavaScript['turtle_turn'] = function(block) {
  // Generate JavaScript for turning left or right.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + block.getFieldValue('DIR') +
      '(' + value + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['turtle_width'] = {
  // Block for setting the width.
  init: function() {
    this.setColour(160);
    this.appendValueInput('WIDTH')
        .setCheck('Number')
        .appendField('set width to');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Changes the width of the pen.');
  }
};

Blockly.JavaScript['turtle_width'] = function(block) {
  // Generate JavaScript for setting the width.
  var width = Blockly.JavaScript.valueToCode(block, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';
  return 'Turtle.penWidth(' + width + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['turtle_pen'] = {
  // Block for pen up/down.
  init: function() {
    var STATE =
        [['pen up', 'penUp'],
         ['pen down', 'penDown']];
    this.setColour(160);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(STATE), 'PEN');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Lifts or lowers the pen, to stop or start drawing.');
  }
};

Blockly.JavaScript['turtle_pen'] = function(block) {
  // Generate JavaScript for pen up/down.
  return 'Turtle.' + block.getFieldValue('PEN') +
      '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['turtle_colour'] = {
  // Block for setting the colour.
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendField('set colour to');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Changes the colour of the pen.');
  }
};

Blockly.JavaScript['turtle_colour'] = function(block) {
  // Generate JavaScript for setting the colour.
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Turtle.penColour(' + colour + ', \'block_id_' +
      block.id + '\');\n';
};

Blockly.Blocks['turtle_visibility'] = {
  // Block for changing turtle visiblity.
  init: function() {
    var STATE = [
        ['hide turtle', 'hideTurtle'], ['show turtle', 'showTurtle']];
    this.setColour(160);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(STATE), 'VISIBILITY');
    this.setTooltip('Makes the turtle (circle and arrow) invisible or visible.');
  }
};

Blockly.JavaScript['turtle_visibility'] = function(block) {
  // Generate JavaScript for changing turtle visibility.
  return 'Turtle.' + block.getFieldValue('VISIBILITY') +
      '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['turtle_print'] = {
  // Block for printing text.
  init: function() {
    this.setColour(160);
    this.appendValueInput('TEXT')
        .appendField('print');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Draws text in the turtle's direction at its location.");
  }
};

Blockly.JavaScript['turtle_print'] = function(block) {
  // Generate JavaScript for printing text.
  var argument0 = String(Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'');
  return 'Turtle.drawPrint(' + argument0 + ', \'block_id_' +
      block.id + '\');\n';
};

Blockly.Blocks['turtle_font'] = {
  // Block for setting the font.
  init: function() {
    var FONTLIST = // Common font names (intentionally not localized)
        [['Arial', 'Arial'], ['Courier New', 'Courier New'], ['Georgia', 'Georgia'],
         ['Impact', 'Impact'], ['Times New Roman', 'Times New Roman'],
         ['Trebuchet MS', 'Trebuchet MS'], ['Verdana', 'Verdana']];
    var STYLE =
        [['normal', 'normal'],
         ['italic', 'italic'],
         ['bold', 'bold']];
    this.setColour(160);
    this.appendDummyInput()
        .appendField('font')
        .appendField(new Blockly.FieldDropdown(FONTLIST), 'FONT');
    this.appendDummyInput()
        .appendField('font size')
        .appendField(new Blockly.FieldTextInput('18',
                     Blockly.FieldTextInput.nonnegativeIntegerValidator),
                     'FONTSIZE');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(STYLE), 'FONTSTYLE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Sets the font used by the print block.');
  }
};

Blockly.JavaScript['turtle_font'] = function(block) {
  // Generate JavaScript for setting the font.
  return 'Turtle.drawFont(\'' + block.getFieldValue('FONT') + '\',' +
      Number(block.getFieldValue('FONTSIZE')) + ',\'' +
      block.getFieldValue('FONTSTYLE') + '\', \'block_id_' +
      block.id + '\');\n';
};
