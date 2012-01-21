import System.Collections.Generic;

// given element name, get valence electrons

static var chartValence = new Dictionary.<String,int>();
static var chartCol = new Dictionary.<String,int>();

static function DefineVals(){
chartValence["H"]  = 1;
chartValence["Li"] = 1;
chartValence["Na"] = 1;
chartValence["K"]  = 1;
chartValence["Rb"] = 1;
chartValence["Cs"] = 1;
chartValence["Fr"] = 1;

chartValence["He"] = 2;
chartValence["Be"] = 2;
chartValence["Mg"] = 2;
chartValence["Ca"] = 2;
chartValence["Sr"] = 2;
chartValence["Ba"] = 2;
chartValence["Ra"] = 2;

chartValence["B"]  = 3;
chartValence["Al"] = 3;
chartValence["Ga"] = 3;
chartValence["In"] = 3;
chartValence["Tl"] = 3;

chartValence["C"]  = 4;
chartValence["Si"] = 4;
chartValence["Ge"] = 4;
chartValence["Sn"] = 4;
chartValence["Pb"] = 4;

chartValence["N"]  = 5;
chartValence["P"]  = 5;
chartValence["As"] = 5;
chartValence["Sb"] = 5;
chartValence["Bi"] = 5;

chartValence["O"]  = 6;
chartValence["S"]  = 6;
chartValence["Se"] = 6;
chartValence["Te"] = 6;
chartValence["Po"] = 6;

chartValence["F"]  = 7;
chartValence["Cl"] = 7;
chartValence["Br"] = 7;
chartValence["I"]  = 7;
chartValence["At"] = 7;


chartCol = chartValence;
chartCol["C"]  = 14;
chartCol["Si"] = 14;
chartCol["Ge"] = 14;
chartCol["Sn"] = 14;
chartCol["Pb"] = 14;

chartCol["N"]  = 15;
chartCol["P"]  = 15;
chartCol["As"] = 15;
chartCol["Sb"] = 15;
chartCol["Bi"] = 15;

chartCol["O"]  = 16;
chartCol["S"]  = 16;
chartCol["Se"] = 16;
chartCol["Te"] = 16;
chartCol["Po"] = 16;

chartCol["F"]  = 17;
chartCol["Cl"] = 17;
chartCol["Br"] = 17;
chartCol["I"]  = 17;
chartCol["At"] = 17;

}



static function getChartValence(key:String){
	return chartValence[key];
}

static function getChartCol(key:String){
	return chartCol[key];
}

//function Start(){Debug.Log(chartValence["O"]);}