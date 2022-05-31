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
    var secondtrue = "a";
    var thirdtrue = "a";
    var fourthtrue = "a";
    var fifthtrue = "a";
    var sixthtrue = "a";
    var seventhtrue = "a";
    var eighthtrue = "a";
    var ninthtrue = "a";
    
    var rlytrue = 0;
    var rlyfalse = 0;
    
    var maxval = arguments[0];
    
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    
    if (first == firsttrue) {
        var firstreallytrue = "✅";
        var rlytrue = rlytrue + 1;
    } else {
        var firstreallytrue = "❌";
    }
    if (second == secondtrue) {
        var secondreallytrue = "✅";
        var rlytrue = rlytrue + 1;
    } else {
        var secondreallytrue = "❌";
    }
    if (third == thirdtrue) {
        var thirdreallytrue = "✅";
        var rlytrue = rlytrue + 1;
    } else {
        var thirdreallytrue = "❌";
    }
    if (fourth == fourthtrue) {
        var fourthreallytrue = "✅";
        var rlytrue = rlytrue + 1;
    } else {
        var fourthreallytrue = "❌";
    }
    if (fifth == fifthtrue) {
        var fifthreallytrue = "✅";
        var rlytrue = rlytrue + 1;
    } else {
        var fifthreallytrue = "❌";
    }
    if (sixth == sixthtrue) {
        var sixthreallytrue = "✅";
        var rlytrue = rlytrue + 1;
    } else {
        var sixthreallytrue = "❌";
    }
    if (seventh == seventhtrue) {
        var seventhreallytrue = "✅";
        var rlytrue = rlytrue + 1;
    } else {
        var seventhreallytrue = "❌";
    }
    if (eighth == eighthtrue) {
        var eighthreallytrue = "✅";
        var rlytrue = rlytrue + 1;
    } else {
        var eighthreallytrue = "❌";
    }
    if (ninth == ninthtrue) {
        var ninthreallytrue = "✅";
        var rlytrue = rlytrue + 1;
    } else {
        var ninthreallytrue = "❌";
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