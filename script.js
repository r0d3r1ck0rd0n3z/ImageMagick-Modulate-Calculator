var origHueValue, midpoint, modInputFromUser, newHueValue;
var Q1starting, Q2ending, Q3starting, Q4ending;
var HSLinputFromUser, extract, cleanedInputs;

var genButton = document.getElementById('generateButton');
var trgButton = document.getElementById('getTargButton');
var resultDIV = document.getElementById('result');

genButton.addEventListener('click', computeNewColor);
trgButton.addEventListener('click', computeTargetColor);

function cleanupUserInput(fromTextBox) {

  cleanedInputs = document.getElementById(fromTextBox).value;
  cleanedInputs = cleanedInputs.replace(/\t/,'').replace(' ','');
  return cleanedInputs;
}

function getInputFromHslBox(fromTextBox) {
  
  HSLinputFromUser = cleanupUserInput(fromTextBox);

  if ( !HSLinputFromUser.includes('hsl')) { 
    alert('Invalid format');
    HSLinputFromUser = '';
    return; 
  }

  if( !/hsl\(\d+,\d+,\d+\)/.test(HSLinputFromUser.replace(/\%/g,'').replace(' ',''))) { 
    alert('Invalid format');
    return; 
  }

  extract = HSLinputFromUser.split(',');
  userInputHSL = extract[0].replace(/hsl\(/,"").replace(/hsla\(/,"");
  origHueValue = userInputHSL * 1; 
  return userInputHSL;

}

function getInputPercentBox() {

  percInputs = cleanupUserInput('inputPerc');
  percInputs = percInputs.replace(/\%/,'');
  if( percInputs > 200 ) { alert('❗ Value must not exceed 200.'); return; }
  if( percInputs < 0   ) { alert('❗ Value must be greater than 0.'); return; }
  if( percInputs === '') { document.getElementById('inputPerc').value = 0; }
  if( percInputs === 0 ) { document.getElementById('inputPerc').value = 0; }
  modInputFromUser = percInputs * 1;
  return modInputFromUser;
  
} 

var right = [];
var left  = [];

function createColorListing( origHueValue ) {

  // clear previous values  
  right.length = 0;
  left.length  = 0;  
  
  // convert extracted string to a number  
  origHueValue = getInputFromHslBox('inputHSL') * 1;
  
if ( origHueValue > 181) {

  midpoint = 180 + origHueValue - 360;
  Q1starting = 360 - origHueValue;
  Q2ending = midpoint;
  Q3starting = origHueValue - midpoint;
  Q4ending = 0;   
  
} else {
  
  midpoint = 180 + origHueValue; 
  Q1starting = midpoint - origHueValue; 
  Q2ending = 0; 
  Q3starting = 360 - midpoint; 
  Q4ending = origHueValue; 

}

// create array for color options

for (let step = 0; step < Q1starting+1 ; step++) {
  right.push(origHueValue + step); 
}

for (let step = 0; step < Q2ending+1 ; step++) {
  if(Q2ending != 0) { right.push(step); }   
}

for (let step = 0; step < Q3starting+1 ; step++) {
  left.push(midpoint + step); 
}

for (let step = 0; step < Q4ending+1 ; step++) {
  if(Q4ending != 0) { left.push(step); }  
}

}

function findHvalueofNewColor( modulatePercent ) {

// clear previous values
newHueValue = '';
i = '';
  
// compute for the new hue value

if (modulatePercent > 100) { 
  let i = (modulatePercent - 100) * 0.01;
  i = i * 180;
  i = Math.round(i);
  newHueValue = right[i];  
}

if (modulatePercent < 100) { 
  let i = modulatePercent * 0.01;
  i = i * 180;
  i = Math.round(i);
  newHueValue = left[i];
}

if (modulatePercent == 100 ) { 
  newHueValue = origHueValue; 
}
  
  return newHueValue;
}

function computeNewColor() {

  if( checkForValidHSL( 'inputHSL' ) === 0 ) { return; }

  modInputFromUser = getInputPercentBox();
  if( modInputFromUser == null ) { return; }

  setRotationOfColorWheel( 0 , 0 );
  createColorListing( origHueValue );
  findHvalueofNewColor( modInputFromUser );
  HSLinputFromUser = cleanupUserInput('inputHSL');
    
  var oldV = HSLinputFromUser.replace(/\s/gm,'').replace(/hsla/gm,'hsl');   
  var newV = oldV.replace(/hsl\((\d+),/gm, 'hsl\(' + newHueValue + ',' );
  var modC = "";

  document.getElementById('inputTarg').value = newV;

 
  if( oldV != "" ) { 
    modC =   "<span>⇣</span><tt>convert input.png -modulate 100,100," 
           +  modInputFromUser
           + " output.png</tt>";
    }
  
  showMeTheResults( oldV , modC, newV, newHueValue );

}

function computeTargetColor() {

  if( checkForValidHSL( 'inputHSL'  ) === 0 ) { return; }
  if( checkForValidHSL( 'inputTarg' ) === 0 ) { return; }

  getInputPercentBox();
  setRotationOfColorWheel( 0 , 0 );
  createColorListing( origHueValue );
  
  var i;
  var targetHue = getInputFromHslBox('inputTarg');
  targetHue = targetHue * 1;
  
  if(right.includes(targetHue)) {
    
    var whatIsTheIndex = right.indexOf(targetHue);
    
    i = whatIsTheIndex * 1 - 1 ;  
    i = i / 180 ;    
    i = i / 0.01 ;   
    i = Math.round(i) + 100 ;   
    
  }
 
  if(left.includes(targetHue)) {
    
    var whatIsTheIndex = left.indexOf(targetHue);
    
    i = whatIsTheIndex * 1 - 1 ;  
    i = i / 180 ;    
    i = i / 0.01 ;   
    i = Math.round(i) + 1 ;

  }  

  document.getElementById('inputPerc').value = i;
  HSLinputFromUser = cleanupUserInput('inputHSL');
  if( !i || !HSLinputFromUser ) { return; }
  
  var oldV = HSLinputFromUser.replace(/\s/gm,'');   
  var newV = oldV.replace(/hsl\((\d+),/gm, 'hsl\(' + targetHue + ',' );
  var modC = "";
  
  if(oldV > 360) { return; }
  if(oldV != "") { 
    modC =   "<span>⇣</span><tt>convert input.png -modulate 100,100," 
           +  i
           + " output.png</tt>";
    }
  
  showMeTheResults( oldV , modC, newV, targetHue );

}

function circularText(txt, radius, classIndex) {
  txt = txt.split(""),
    classIndex = document.getElementsByClassName("circTxt")[classIndex];

  var deg = 360 / txt.length,
    origin = 175;

  txt.forEach((ea) => {
    ea = `<p style='height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 100%'>${ea}</p>`;
    classIndex.innerHTML += ea;
    origin += deg;
  });
}

circularText("20 010 020 030 040 050 060 070 080 090 100 110 120 130 140 150 160 170 180 190 ", 90, 0);

function setRotationOfColorWheel( a, b ) {
  document.getElementById("gridInside").style.transform = "rotate(" + a +"deg)";
  document.getElementById("targetHue" ).style.transform = "rotate(" + b +"deg)";
}

function showMeTheResults( oldV , modC, newV, a ) {

  var summary = 
          "<br/> <span style=background-color:" + oldV + ">&nbsp;</span>" + oldV 
        + "<br/>" + modC 
        + "<br/> <span style=background-color:" + newV  + ">&nbsp;</span>" + newV;
  
  resultDIV.innerHTML = summary;  
  
  origHueValue = getInputFromHslBox('inputHSL') * 1;
  setRotationOfColorWheel( origHueValue , a );

}

function checkForValidHSL( thisInputBox ) {

  var userInpHSL = getInputFromHslBox( thisInputBox ) * 1;
  if( userInpHSL > 360 ) { alert('❗ Hue value must not exceed 360.'); return 0 ; }
  if( !Number.isInteger( userInpHSL ) ) { alert('❗ Unrecognized character or format.'); return 0 ; }
  return 1;

}
