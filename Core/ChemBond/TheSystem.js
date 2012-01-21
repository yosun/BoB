import System.Collections.Generic;

static var objAtom:GameObject;
static var objAtomT:Transform;
static var objValve:GameObject;
static var objValveT:Transform;

static var totalMolecules:int=0;
static var arrElements = new Dictionary.<String,int>();

static var totalPressure:float=0;
static var totalVolume:float=0;
static var temperature:float=0; // K

static var startingLocation:Vector3;
static var startingStrength:float=500;

static function init(){
	objAtom = GameObject.Find("Atom");
	objAtomT = objAtom.transform;
	
	objValve = GameObject.Find("TheValve");
	objValveT = objValve.transform;
}

// updates total N molecules count
static function countUp(elementName:String){
	totalMolecules++;
	var ini:int=0;
	if(!arrElements.TryGetValue(elementName,ini))
		arrElements[elementName] = 1;
	else arrElements[elementName] = arrElements[elementName] + 1;
}
static function countDown(elementName:String){
	totalMolecules--;
	arrElements[elementName] = arrElements[elementName] - 1;	
}

static function shoot(elementName:String){
	var o:GameObject = Instantiate(objAtom,objValveT.position,Quaternion.identity);
	o.name = elementName;
	o.GetComponent(ChemBondDetect).init();
	
	// add type
	countUp(elementName);
			
	// assign motion!
	o.rigidbody.AddForce(startingStrength * Vector3(Random.Range(0,0.99),Random.Range(-0.99,0.99),Random.Range(-0.49,0.49)));
}