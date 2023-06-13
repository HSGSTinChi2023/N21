const numberArray = [8,3,4,6,0,5,0,1,2,2,7,4,7,8,7,5,7,0,7,7,6,3,0,8,7,7,1,2,5,3,5,4,7,0,7,7,7,2,7,4,4,4,4,6,4,4,6,9,2,3,3,5,7,4,7,6,1,9,7,1,2,4,7,5,7,7,2,7,7,0,1,4,4,5,4,4,7,7,1,3,1,4,6,5,7,7,4,7,2,0,7,1,0,4,6,9,4,6,4,6];
const validString = ["62726400","16475625","447216","34310306","876543211","122150","6446444","88064555","64649640","2540750","7799220","22105064","343445444","17744544"];
var savestring ="";
let ar =[];
let direct = [0,1,2,3,4,5,6,7];
let directVal = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]];
let curdir = -1;
let prepx ,prepy;
let ok = 1;
let t1 = 3;
let t2 = 15;
setInterval(Ti,1000);
let cnt= 0;
function Ti(){
	var temp = document.querySelector("#time");
	if(t2 == 0){
		t2 = 59;
		if(t1 == 0){
			window.alert("you lose!!");
			for( let i = 0 ; i <= 9 ;i++){
				for( let j = 0 ; j <= 9 ;j++){
					document.querySelector("#grid" + (i*10+j).toString()).style.backgroundColor = "white";
					document.querySelector("#grid" + (i*10+j).toString()).style.backgroundColor.used = 0;
					
				}
			}
			t1 = 3;
			t2 = 15;
			temp.style.color = "black";
			reset();
			start();
		}
		else t1--;
		if(t1 == 0){
			temp.style.color = "Red";
		}
	}
	else t2--;
	temp.innerHTML = t1.toString() + ":" + (t2 < 10 ? "0" : "")+t2.toString();
}
function init(){
	for( let i = 0 ; i <= 9 ; i++){
		for( let j = 0 ; j <= 9 ;j++){
			let cell = document.createElement("div");
			cell.className = "grid-item";
			cell.id = "grid" + (i*10+j).toString();
			cell.value = numberArray[i*10+j];
			cell.cor = [i,j];
			cell.used = 0;
			cell.addEventListener("click", process);
			document.querySelector("#grid").appendChild(cell);		
		}
	}
	for(var i = 0; i < validString.length; i++) {
		var pos = "q" + (i + 1).toString();
		document.getElementById(pos).style.color = "black";
	}
	for( let i = 0 ; i <= 9 ;i++){
		for( let j = 0 ; j <= 9 ;j++){
			document.querySelector("#grid" + (i*10+j).toString()).style.backgroundColor = "white";
			document.querySelector("#grid" + (i*10+j).toString()).style.backgroundColor.used = 0;
			
		}
	}
}
function start(){
	init();
	for( let i = 0 ; i <= 99; i++){
		var temp = document.querySelector("#grid" + i.toString());
		temp.innerHTML = temp.value;
	}
}
function reset(){
	savestring= "";
	ar = [];
	curdir = -1;
	ok = 1;

}
function process(){
	savestring += this.value.toString();
	this.style.backgroundColor = "lightblue";
	ar.push([this.cor[0],this.cor[1]]);
    if(ar.length >= 2) {
		if(ar[ar.length - 2][0] == ar[ar.length - 1][0] && ar[ar.length - 2][1] == ar[ar.length - 1][1]) {
			ar.pop();
			var alt_string = "";
			for(var i = 0; i < savestring.length - 1; i++) {
				alt_string += savestring[i];
			}
			savestring = alt_string;
		}
	}
	if(ar.length == 2){
		for(let i = 0 ; i <= 7 ; i++){
			if(ar[0][0] + directVal[i][0] == ar[1][0] && ar[0][1] + directVal[i][1] == ar[1][1]){
				curdir = i;
				break;
			}
		}
		
		prepx = ar[0][0] - ar[1][0];
		prepy = ar[0][1]- ar[1][1];
		if( Math.abs(prepx) > 1 || Math.abs(prepy) > 1){
			ok = 0;
		}	
		console.log(prepx);
		console.log(prepy);
		if(curdir >= 0 && (this.cor[0] + directVal[curdir][0] < 0 || this.cor[0] + directVal[curdir][0] > 9 || this.cor[1] + directVal[curdir][1] < 0 || this.cor[1] + directVal[curdir][1] > 9)){
			ok = 0;
		}
	}
	if(ar.length > 2){
		var tempx = ar[ar.length-2][0] - ar[ar.length-1][0];
		var tempy = ar[ar.length-2][1] - ar[ar.length-1][1];
		if( Math.abs(tempx) > 1 || Math.abs(tempy) > 1){
			ok = 0;
		}	
		if(prepx*tempy != prepy*tempx){
			ok = 0;
		}
		console.log(tempx);
		console.log(tempy);
	}
	if(!ok){
		window.alert("you fool!");
		for(let i = 0 ; i < ar.length;i++){
			var temp = document.querySelector("#grid" + (ar[i][0]*10 + ar[i][1]).toString());
			if(!temp.used) temp.style.backgroundColor = "white";
			else temp.style.backgroundColor = "lightgreen";
			
		}
		ok = 1;
		reset();
		return;
	}
	if(check()){
		window.alert("congrat!!!");
		for(let i = 0 ; i < ar.length;i++){
			var temp = document.querySelector("#grid" + (ar[i][0]*10 + ar[i][1]).toString());
			temp.style.backgroundColor = "lightgreen";
			temp.used = 1;
		}
        for(var i = 0; i < validString.length; i++) {
			if(validString[i] == savestring) {
				var pos = "q" + (i + 1).toString();
                console.log(pos);
				document.getElementById(pos).style.color = "lightgreen";
			}
		}
        cnt = 0;
        for(var i = 0; i < 14; i++) {
            var id = "q" + (i + 1).toString();
            if(document.getElementById(id).style.color == "lightgreen") cnt++;
        }
        if(cnt == 13) {
            window.alert("YOU WON!!!");
            reset();
            start();
        }
        console.log(cnt);
		reset();
		
		return;
	}
	if(curdir >= 0 && (this.cor[0] + directVal[curdir][0] < 0 || this.cor[0] + directVal[curdir][0] > 9 || this.cor[1] + directVal[curdir][1] < 0 || this.cor[1] + directVal[curdir][1] > 9)){
		ok = 0;
	}
	if(!ok){
		window.alert("you fool!");
		for(let i = 0 ; i < ar.length;i++){
			var temp = document.querySelector("#grid" + (ar[i][0]*10 + ar[i][1]).toString());
			if(!temp.used) temp.style.backgroundColor = "white";
			else temp.style.backgroundColor = "lightgreen";
			
		}
		ok = 1;
		reset();
		return;
	}
}
function check(){
	for(let i = 0 ; i < validString.length;i++){
		if(validString[i] == savestring){
			return true;
		}
	}
	return false;
}

start();
