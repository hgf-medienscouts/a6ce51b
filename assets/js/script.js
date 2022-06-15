// Get vars function.
function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}


// Calculate results function.
function get_results(maxval,first,second,third,fourth,fifth,sixth,seventh,eighth,ninth)
{
	var all = ""+arguments[1]+arguments[2]+arguments[3]+arguments[4]+arguments[5]+arguments[6]+arguments[7]+arguments[8]+arguments[9]+"";
	
	var firsttrue = "a";
	var secondtrue = "b";
	var thirdtrue = "a";
	var fourthtrue = "c";
	var fifthtrue = "d";
	var sixthtrue = "b";
	var seventhtrue = "c";
	var eighthtrue = "a";
	var ninthtrue = "d";
	
	var rlytrue = 0;
	var rlyfalse = 0;
	
	var maxval = arguments[0];

	const correct_icon = '<span class="material-symbols-outlined correct">check</span>';
	const incorrect_icon = '<span class="material-symbols-outlined incorrect">dangerous</span>';
	
	var a = 0;
	var b = 0;
	var c = 0;
	var d = 0;
	
	if (first == firsttrue) {
		var firstreallytrue = correct_icon;
		var rlytrue = rlytrue + 1;
	} else {
		var firstreallytrue = incorrect_icon;
	}
	if (second == secondtrue) {
		var secondreallytrue = correct_icon;
		var rlytrue = rlytrue + 1;
	} else {
		var secondreallytrue = incorrect_icon;
	}
	if (third == thirdtrue) {
		var thirdreallytrue = correct_icon;
		var rlytrue = rlytrue + 1;
	} else {
		var thirdreallytrue = incorrect_icon;
	}
	if (fourth == fourthtrue) {
		var fourthreallytrue = correct_icon;
		var rlytrue = rlytrue + 1;
	} else {
		var fourthreallytrue = incorrect_icon;
	}
	if (fifth == fifthtrue) {
		var fifthreallytrue = correct_icon;
		var rlytrue = rlytrue + 1;
	} else {
		var fifthreallytrue = incorrect_icon;
	}
	if (sixth == sixthtrue) {
		var sixthreallytrue = correct_icon;
		var rlytrue = rlytrue + 1;
	} else {
		var sixthreallytrue = incorrect_icon;
	}
	if (seventh == seventhtrue) {
		var seventhreallytrue = correct_icon;
		var rlytrue = rlytrue + 1;
	} else {
		var seventhreallytrue = incorrect_icon;
	}
	if (eighth == eighthtrue) {
		var eighthreallytrue = correct_icon;
		var rlytrue = rlytrue + 1;
	} else {
		var eighthreallytrue = incorrect_icon;
	}
	if (ninth == ninthtrue) {
		var ninthreallytrue = correct_icon;
		var rlytrue = rlytrue + 1;
	} else {
		var ninthreallytrue = incorrect_icon;
	}
	
	for (i = 0; i <= maxval; i++) {
		if (all[i] == "a") {
			a++
		} else if (all[i] == "b") {
			b++
		} else if (all[i] == "c") {
			c++
		} else if (all[i] == "d") {
			d++
		}
	}


	var rlyfalse = maxval - rlytrue;

	return[a,b,c,d,rlytrue,rlyfalse,firstreallytrue,secondreallytrue,thirdreallytrue,fourthreallytrue,fifthreallytrue,sixthreallytrue,seventhreallytrue,eighthreallytrue,ninthreallytrue,maxval];
}