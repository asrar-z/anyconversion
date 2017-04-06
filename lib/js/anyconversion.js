unit_hash = {};
init_units();
var fromSelect = {};
var toSelect = {};
$(document).ready(function() {
	fromSelect = $('#convert_from').immybox()[0];
	toSelect = $('#convert_to').immybox()[0];
	bindEvents();
	loadFrom("index");
});

function bindEvents(){
	$('#convert_from').on("update", fromChanged);
	$('#convert_to').on("update", toChanged);
    $('#swap').on("click",swap);
	$('#value').on("keyup",calculateResult);
	$('#convert_from').focus(function() {
		$('#convert_from').attr("placeholder", "Type to search");
	});
	$('#convert_from').focusout(function() {
		$('#convert_from').attr("placeholder", "Select Unit");
	});
	$('#convert_to').focus(function() {
		$('#convert_to').attr("placeholder", "Type to search");
	});
	$('#convert_to').focusout(function() {
		$('#convert_to').attr("placeholder", "Select conversion unit");
	});
	$(document).on("categoryChange",categoryChanged);
};

function fromChanged(event, fromValue) {
	if(isNullorEmpty(fromValue)){
		$('#result').val('');
		return;
	}
	var fromCategory = categoryOf(fromValue, true);
	var toValue = toSelect.getValue();
	if (!isNullorEmpty(toValue)) {
		var toCategory = categoryOf(toValue, true);
		if (toCategory.toLowerCase() === fromCategory.toLowerCase()) {
			calculateResult();
			return;
		}
	}
	var units = [];
	$.each(unit_hash[fromCategory], function(unit) {
		units.push({
			text : unit,
			value : unit + '-' + fromCategory
		});
	});
	toSelect.setChoices(units);
};

function toChanged(event, toValue){
	if(toValue==null || toValue==""){
		return;
	}
	calculateResult();
};

function swap(event){
    var from = fromSelect.getValue();
    var to = toSelect.getValue();

    fromSelect.setValue(to);
    toSelect.setValue(from);
};


function categoryChanged(event,hash){
	clearAll();
	loadFrom(hash);
};

function calculateResult() {
	var fromValue = fromSelect.getValue();
	var toValue = toSelect.getValue();
	var fromCategory = categoryOf(fromValue, true);
	var toCategory = categoryOf(toValue, true);
	var value = $('#value').val();
	$('#result').val('');
	if (isNullorEmpty(fromValue) || isNullorEmpty(toValue) || isNullorEmpty(value)
			|| toCategory.toLowerCase() !== fromCategory.toLowerCase()) {
		return;
	}
	input = unit_hash[fromCategory][categoryOf(fromValue, false)];
	output = unit_hash[toCategory][categoryOf(toValue, false)];
	var result = ((value - input[1]) * output[0] / input[0]) + output[1];
	$('#result').val(result);

};

function loadFrom(hash){
	var units = [];
	if(hash!=='index'){
		$.each(unit_hash[hash], function(unit) {
			units.push({
				text : unit,
				value : unit + '-' + hash
			});
		});
	}else{
		$.each(unit_hash, function(category) {
			$.each(unit_hash[category], function(unit) {
				units.push({
					text : unit,
					value : unit + "-" + category
				});
			});

		});	
	}
	fromSelect.setChoices(units);
};

function categoryOf(value, category) {
	if (isNullorEmpty(value)) {
		return value;
	}
	var arr = value.split('-');
	if (arr[1] != null && category === true) {
		return arr[1];
	} else if (arr[0] != null && category === false) {
		return arr[0];
	}
	return value;
};

function isNullorEmpty(value) {
	if (value != null && value !== '') {
		return false;
	}
	return true;
};

function clearAll(){
$('#value').val('');
$('#convert_from').val('');
$('#convert_to').val('');
$('#result').val('');
};