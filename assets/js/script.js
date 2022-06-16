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
function get_results(vars, correct_answers) {
	var rlytrue = 0;
	
	var maxval = vars.length-1;

	var a = 0;
	var b = 0;
	var c = 0;
	var d = 0;
	
	var trueslist = []
	for(var i = 0; i < maxval; i++){
		if (vars[i+1] == correct_answers[i]) {
			trueslist.push(1);
			rlytrue++;
		} else {
			trueslist.push(0);
		}
		if (vars[i+1] == "a") {
			a++;
		} else if (vars[i+1] == "b") {
			b++;
		} else if (vars[i+1] == "c") {
			c++;
		} else if (vars[i+1] == "d") {
			d++;
		}
	}

	var rlyfalse = maxval - rlytrue;

	return [ a,b,c,d,rlytrue,rlyfalse,maxval ];
}
