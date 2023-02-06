// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const clipboard = require('clipboardy');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function reformat(string) {
	var inputValue = string.toString();
  
	// Brand sierotki
	// var brandName = document.getElementById("brand").value;
  
	// const brandRegex = new RegExp(brandName);
	// console.log(brandRegex);
  
	// const space = / /g;
	// var reformatedBrand = brandName.replace(space, "&nbsp;");
	// console.log(reformatedBrand);
  
	// var reformated = inputValue.replace(brandRegex, reformatedBrand);
  
	const sierotki =
	/ i | a | z | w | oraz | lub | u | I | A | Z | W | ORAZ | LUB | U | o | O | od | do | OD | DO | to | TO |[0-9] | za | ZA /g;
	const literka_a = /, a |, A /g;
	const short_dash = /-/g;
	const long_dash_space = / – /g;
  
	var reformated = inputValue.replace(sierotki, (t1) => {
	  var val = t1.slice(0, -1);
	  return `${val}&nbsp;`;
	});
  
	reformated = reformated.replace(short_dash, (t2) => {
	  var val = t2.slice(0, -1);
	  return `${val}&#8209;`;
	});
  
	reformated = reformated.replace(long_dash_space, "&nbsp;&mdash;&nbsp;");
  
	reformated = reformated.replace(literka_a, (t2) => {
	  var val = t2.slice(0, -1);
	  return `${val}&nbsp;`;
	});
  
	// For strong use @@some text@@
	var occurances = [...reformated.matchAll(/\@{2}(.*?)\@{2}/g)]
	occurances.forEach(occurance => {
	  reformated = reformated.replace(occurance[0], `<strong>${occurance[1]}</strong>`)
	})
  
	return reformated;
  }

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "text-formater" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('text-formater.helloWorld', function () {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from Text Formater!');
	// });

	// context.subscriptions.push(disposable);
	
	let disposable = vscode.commands.registerTextEditorCommand('text-formater.textFormater', (editor, edit) => {
		
		// The code you place here will be executed every time your command is executed
		var text = clipboard.readSync()
		
		editor.selections.forEach((selection) => {
			edit.replace(selection, reformat(text));  // insert at current cursor
		})
		// var text = "0"
		// Display a message box to the user
		vscode.window.showInformationMessage(`Wklejono sformatowany tekst.`);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
