import System.Collections.Generic;

static var chartColors = new Dictionary.<String,Color>();

static function DefineDefaultVals(){
	chartColors["O"]=Color(0,1,0,1);
	chartColors["C"]=Color(1,0,0,1);
}  

static function assignColor (key:String,val:Color) {
	chartColors[key];
}

static function getColor(key:String){
	var ini:Color=Color(0,0,0,0);
	if(chartColors.TryGetValue(key,ini)){
		return chartColors[key];
	}else return Color(0,0,0,0);
}