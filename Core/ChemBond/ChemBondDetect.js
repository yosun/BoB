// the center atom (one instigating the bonds)

public var myCol:int=0;
var myName:String="";
var myValence:int = 0;
var myBondingDomains:int = 0;
var myNonBondingDomains:int = 0;
var myElectronsShared:int = 0;

var firstCollision:int = -1;

//var objEncyclopedia:GameObject;
//var refChemBond:ChemBond;
//var refValenceShells:zValenceShells;

//var t2:GameObject;// test


function Awake(){
	// assign reference
	//refChemBond = objEncyclopedia.GetComponent(ChemBond);
	//refValenceShells = objEncyclopedia.GetComponent(zValenceShells);
}

function init(){
	

	// a center bonding atom is born. discover self
	myName = this.name;
	myValence = lookupValence(myName);
	myCol = lookupCol(myName);
	myNonBondingDomains = 8 - myValence;
	
	this.renderer.material.color = zAtomColor.getColor(myName);
	
	
}

function OnCollisionEnter(collision:Collision){

	var otherElementName:String = collision.gameObject.name ; 
	
	if(myBondingDomains >= 0 && otherElementName!="TheValve"){ 
		if(firstCollision<0){
			firstCollision++;
		}
		
		var otherElementValence:int = lookupValence(otherElementName);
		//Debug.Log(otherElementName+" "+otherElementValence);
		var otherattached:int=0;
		if(otherElementValence>-1){
			if( (myCol > 13 && myCol < collision.gameObject.GetComponent(ChemBondDetect).myCol) ) { // if less electronegative
			// set other kinematic
			collision.gameObject.rigidbody.isKinematic=true;
			while(otherElementValence>0 && otherElementValence!=2 && otherElementValence!=8 ){
				if(myElectronsShared ==0 || myNonBondingDomains>0){
				
					if(otherattached<1){
						attachOther(collision.gameObject);
						otherattached++;
					}
				
					myNonBondingDomains--;
					myBondingDomains++;
					
					myElectronsShared++;
					otherElementValence++;
					
				}else break;
				/*
				 test:		NBD		BD 		ES 		oE
				 	
				 	1) CH4
				 		H1:	4		0		0		1
				 			3		1		1		2
				 		H2:	
				 			2		2		2		2
				 		H3:
				 			1		3		3		2
				 		H4:
				 			0		4		4		2
				 	2) H2O
				 		H1:	2		0		0		1
				 			1		1		1		2
				 		H2: 
				 			0		2		2		2
				 	3) O3 :-(
				 		O1: 2		0		0		6
				 			1		1		1		7
				 			0		2		2		8
				 	4) CCl4
				 		Cl1:4		0		0		7
				 			3		1		1		8
				 		Cl2:
				 			2		2		2		8
				 		Cl3:
				 			1		3		3		8
				 		Cl4:
				 			0		4		4		8
				*/
			}
			
			
			
			// ozone exception
			if(otherElementName == "O" && myName == "O_O"){
					// attach the thing 
					attachOther(collision.gameObject);
					
			}
			
			// position the attached atoms properly based on BD and NBD
			var pos:Vector3[] = new Vector3[myBondingDomains];
			pos = ChemBond.GetChemBondGeomPos(myBondingDomains,myNonBondingDomains);
			var i:int=0;
			for(var child : Transform in transform){
				Debug.Log(pos[i]+" "+i+" "+myBondingDomains+" "+myName+" "+child.name);
				child.transform.position = Vector3(1,0,0);// pos[i];
				i++;
			}
		}
		}
	}
	
}

function attachOther(obj:GameObject){


		appendName(obj.name); //(and notify system)
		obj.transform.parent = transform;
		obj.AddComponent(FixedJoint);
		obj.GetComponent(FixedJoint).connectedBody = rigidbody;
		obj.rigidbody.isKinematic=true;
	
	
}

function lookupValence(element:String){
	var ini:int=0;
	if(zValenceShells.chartValence.TryGetValue(element,ini))
		return zValenceShells.getChartValence(element); // refValenceShells.chartValence[element];
	else return -1;
}

function lookupCol(element:String){
	var ini:int=0;
	if(zValenceShells.chartCol.TryGetValue(element,ini))
		return zValenceShells.getChartCol(element); // refValenceShells.chartValence[element];
	else return -1;
}

function appendName(appendstring:String){
	TheSystem.countDown(appendstring);
	TheSystem.countDown(myName);
	myName += "_"+appendstring;
	TheSystem.countUp(myName);
	this.name = myName;
}

// test
/*function Update(){
	var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	var hit : RaycastHit;
	if (Physics.Raycast (ray, hit, 100)) {
		var o:GameObject = Instantiate(t2,hit.transform.position,Quaternion.identity);
		
	}
}*/

/*
function OnMouseDown(){
	var o:GameObject = Instantiate(t2,transform.position+Vector3(0,0.95,0),Quaternion.identity);
	var n:String = o.gameObject.name;
	o.gameObject.name = n.Replace("(Clone)","");
	o.rigidbody.useGravity = true;
}*/