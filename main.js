var HEXDIGS = "abcdef";
var chipArray = [];
var numHistory = 0;

function addHistoryChip(is, os) {
	console.log(os);
	if (os == "" || os == "Input Cannot Be Converted!") {
		return;
	}
	if (chipArray.length > 15) {
		chipArray.shift();
	}
	var toPush = "<span class='mdl-chip historyChip' style='margin-right 4px; margin-left: 4px;' id='" + "historyChip" + numHistory + "' onclick='copyHistory(\"historyChip" + numHistory + "val\")'><span class='mdl-chip__text' id='historyChip" + numHistory + "val'>" + os + "</span></span>";
	chipArray.push(toPush);
	var historyChipCollection = "";
	for (var i = chipArray.length - 1; i >= 0; i--) {
		historyChipCollection += chipArray[i];
	}
	document.getElementById("historyGroup").innerHTML = historyChipCollection;
	numHistory++;
}

function removeLabel() {
	if (this.document.getElementById("outputText").value == "") {
		this.document.getElementById("outputTextLabel").innerHTML = "Output";
	}
	else {
		this.document.getElementById("outputTextLabel").innerHTML = "";
	}
}

function wrongInput() {
	return "Input Cannot Be Converted!";
}


function isHexDig(char) {
	console.log(char);
	for (var i = 0; i < HEXDIGS.length; i++) {
		if (char == HEXDIGS[i]) {
			console.log("is hex dig");
			return true;
		}
	}
	if (char == " ") {
		return false;
	}
	else if (!isNaN(char)) {
		console.log("is not not a number");
		return true;
	}
	console.log(false);
	return false;
}

function cleanUpInput(it) {
	var clean = "";
	it = it.toLowerCase();
	for (var i = 0; i < it.length; i++) {
		if (isHexDig(it[i])) {
			clean += it[i];
		}
	}
	console.log(clean);
	return clean;
}

function checkBiInput(it) {
	for (var i = 0; i < it.length; i++) {
		if (it[i] != 0 && it[i] != 1) {
			return false;
		}
	}
	return true;
}

function checkDecInput(it) {
	for (var i = 0; i < it.length; i++) {
		if (isNaN(it[i])) {
			return false;
		}
	}
	return true;
}

function dec2hexDig(digit) {
	var rdig = "";
	switch (digit) {
		case 10:
			rdig = 'a';
			break;
		case 11:
			rdig = 'b';
			break;
		case 12:
			rdig = 'c';
			break;
		case 13:
			rdig = 'd';
			break;
		case 14:
			rdig = 'e';
			break;
		case 15:
			rdig = 'f';
			break;
		default:
			rdig = "" + digit;
			break;
	}
	return rdig;
}

function hex2decDig(digit) {
	var decval;
	switch (digit) {
		case 'a':
			decval = 10;
			break;
		case 'b':
			decval = 11;
			break;
		case 'c':
			decval = 12;
			break;
		case 'd':
			decval = 13;
			break;
		case 'e':
			decval = 14;
			break;
		case 'f':
			decval = 15;
			break;
		default:
			decval = digit;
			break;
	}
	return decval;
}

function getRadio(name) {
	var radios = this.document.getElementsByName(name);
	var radio_value;
	for(var i = 0; i < radios.length; i++){
		if(radios[i].checked){
			radio_value = radios[i].value;
			this.console.log(radio_value);
			return radio_value
		}
	}
}

function dec2hex(it) {
	var convertedString = "";
	var dec = it;
	var counter = 0;
	while (dec > 0 && counter < 30) {
		counter++;
		console.log(dec)
		var dig = dec % 16
		console.log(dig);
		convertedString = dec2hexDig(dig) + convertedString;
		dec = dec/16;
		dec = Math.floor(dec);
		console.log(convertedString);
	}
	return convertedString;
}

function dec2bi(it) {
	var convertedString = "";
	var dec = it;
	var counter = 0;
	while (dec > 0 && counter < 30) {
		counter++;
		console.log(dec)
		var bidig = dec % 2
		// bidig = "" + bidig;
		console.log(bidig);
		convertedString = bidig + convertedString;
		dec = dec/2;
		dec = Math.floor(dec);
		console.log(convertedString);
	}
	return convertedString;
}

function hex2dec(it) {
	it = it.toLowerCase();
	var decNum = 0;
	for (var i = 0; i < it.length; i++) {
		decNum += hex2decDig(it[i]) * Math.pow(16,it.length - 1 - i);
	}
	return decNum;
}

function hex2bi(it) {
	return dec2bi(hex2dec(it));
}

function bi2dec(it) {
	var decNum = 0;
	for (var i = 0; i < it.length; i++) {
		decNum += it[i] * Math.pow(2,it.length - 1 - i);
	}
	return decNum;
}

function bi2hex(it) {
	return dec2hex(bi2dec(it));
}

function same2same(it) {
	return it;
}

function convert() {
	var inputFormat = getRadio("input");
	var outputFormat = getRadio("output");
	var inputText = cleanUpInput(this.document.getElementById("inputText").value);
	var outputString = "";
	switch(inputFormat) {
		case "fromDec":
			if (!checkDecInput(inputText)) {
				outputString = wrongInput();
				break;
			}
			if (outputFormat == "toHex") {
				outputString = dec2hex(inputText);
			} 
			else if (outputFormat == "toBi") {
				outputString = dec2bi(inputText);
			}
			else {
				outputString = same2same(inputText);
			}
			break;
		case "fromHex":
			if (outputFormat == "toDec") {
				outputString = hex2dec(inputText);
			} 
			else if (outputFormat == "toBi") {
				outputString = hex2bi(inputText);
			}
			else {
				outputString = same2same(inputText);
			}
			break;
		case "fromBi":
			if (!checkBiInput(inputText)) {
				outputString = wrongInput();
				break;
			}
			if (outputFormat == "toDec") {
				outputString = bi2dec(inputText);
			} 
			else if (outputFormat == "toHex") {
				outputString = bi2hex(inputText);
			}
			else {
				outputString = same2same(inputText);
			}
			break;
		default:
			same2same(inputText);
			break;
	}
	this.document.getElementById("outputText").value = outputString;
	removeLabel();
	addHistoryChip(inputText, outputString);
}

function copyHistory(hid) {
	console.log(hid);
	console.log("'"+ hid + "'");
	console.log(document.getElementById(hid).innerHTML);
	document.getElementById("outputText").value = document.getElementById(hid).innerHTML;
	copyToClip();
}
function copyToClip() {
	var snackbarContainer = document.querySelector('#demo-toast-example');
	var copyTextarea = document.querySelector('#outputText');
	copyTextarea.focus();
	copyTextarea.select();
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);
	} catch (err) {
		console.log('Oops, unable to copy');
	} snackbarContainer.MaterialSnackbar.showSnackbar({message:"Copied to Clipboard!"});
}

function showHelp() {
	var dialog = document.querySelector('dialog');
	if (! dialog.showModal) {
		dialogPolyfill.registerDialog(dialog);
	}
	dialog.showModal();
	dialog.querySelector('.closeDialog').addEventListener('click', function() {
		dialog.close();
	});
}