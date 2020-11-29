init()

function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
}

function pastLabel(iHr) {
    if (iHr < 6) { return "12amForm" }
    if (iHr < 12) { return "6pmForm" }
    if (iHr < 18) { return "12pmForm" }
    return "6pmForm"
}
function futureLabel(iHr) {
    if (iHr < 6) { return "6amForm" }
    if (iHr < 12) { return "12pmForm" }
    if (iHr < 18) { return "6pmForm" }
    return "12amForm"
}

function timeIndicator(iHr, iMin, iSec) {
    var iCurSec = ((iHr % 6) * 3600) + (iMin * 60) + iSec;
    var iTotSec = 6 * 3600;
    return iCurSec / iTotSec;
}

function curColElm(iHr, iMin, iSec, sElm) {
    var nPast = Number(document.forms[pastLabel(iHr)][sElm].value);
    var nFuture = Number(document.forms[futureLabel(iHr)][sElm].value);
    var nDiff = nFuture - nPast;
    var nIndicator = timeIndicator(iHr, iMin, iSec);
    var iElmVal = Math.round(nPast + nDiff * nIndicator);
    if (iElmVal < 0) {
        if (sElm = "h") {
            iElmVal += 360;
        }
        else {
            iElmVal += 100;
        }
    }
    return iElmVal
}

function ChangeHue(iHr, iMin, iSec) {
    var h = curColElm(iHr, iMin, iSec, "h")
    var s = curColElm(iHr, iMin, iSec, "s")
    var l = curColElm(iHr, iMin, iSec, "l")
    document.body.style.backgroundColor = hsl(h, s, l);
    document.getElementById("clock").style.backgroundColor = hsl(h, s, 95);
    document.getElementById("display").style.color = hsl(h, s, 15);
}

function updateContainerColor(sContainer, sFormID, sLabID) {
    var h = document.forms[sFormID]["h"].value;
    var s = document.forms[sFormID]["s"].value;
    var l = document.forms[sFormID]["l"].value;
    var lLabel;
    if (l > 50) {
        lLabel = 20;
    }
    else {
        lLabel = 80;
    }

    document.getElementById(sContainer).style.backgroundColor = hsl(h, s, l);
    document.getElementById(sContainer).style.borderColor = hsl(h, s, lLabel);
    document.getElementById(sLabID).style.color = hsl(h, s, lLabel);
    updateTick();
}

function padZero(sHost, iDigits) {
    var ilen = sHost.length;
    var sOut = "";
    var iDif = iDigits - ilen;
    for (let i = 0; i < iDif; i++) {
        sOut += "0";
    }
    sOut += sHost;
    return sOut;
}


function updateTime(iHour, iMin, iSec) {
    var d = new Date();
    var sDisplay, sAMPM, sMin, sSec;
    var iHour;

    iHour = d.getHours();
    sMin = padZero(iMin.toString(), 2);
    sSec = padZero(iSec.toString(), 2);
    if (iHour >= 12) {
        sAMPM = "PM";
    }
    else {
        sAMPM = "AM";
    }
    if (iHour == 0) {
        iHour = 12;
    }
    if (iHour > 12) {
        iHour -= 12;
        
    }

    sDisplay = iHour + ":" + sMin + ":" + sSec + " " + sAMPM;
    
    document.getElementById("display").innerHTML = sDisplay;
}

function updateTick() {
    var d = new Date();
    var iHour = d.getHours();
    var iMin = d.getMinutes();
    var iSec = d.getSeconds();
    updateTime(iHour, iMin, iSec);
    ChangeHue(iHour, iMin, iSec);
}

function init() {
    updateTick();
    setInterval(updateTick, 1000);
    updateContainerColor('6amCont', '6amForm', '6amLab')
    updateContainerColor('6pmCont', '6pmForm', '6pmLab')
    updateContainerColor('12amCont', '12amForm', '12amLab')
    updateContainerColor('12pmCont', '12pmForm', '12pmLab')
}