#pragma strict
import System.Collections.Generic; 

var testObj1:GameObject;
var testObj2:GameObject;

class ChemBondGeom {
	var bondingDomains:int;
	var nonbondingDomains:int;
	
	var moGeomName:String; // molecular geometry name
	
	function ChemBondGeom(bd:int,nbd:int,mgn:String){
		this.bondingDomains = bd;
		this.nonbondingDomains = nbd;
		this.moGeomName = mgn;
	}
}

var chemBondGeom:List.<ChemBondGeom>;

function DefineChemBondGeom(){
	chemBondGeom = new List.<ChemBondGeom>([
		new ChemBondGeom(2,0,"Linear"),//0
		new ChemBondGeom(3,0,"Trigonal Planar"),//1
		new ChemBondGeom(2,1,"Trigonal Planar Bent"),//2
		new ChemBondGeom(4,0,"Tetrahedral"),//3
		new ChemBondGeom(3,1,"Tetrahedral Trigonal Pyramidal"),//4
		new ChemBondGeom(2,2,"Tetrahedral Bent"),//5
		new ChemBondGeom(5,0,"Trigonal Bipyramidal"),//6
		new ChemBondGeom(4,1,"Trigonal Bipyramidal Seesaw"),//7
		new ChemBondGeom(3,2,"Trigonal Bipyramidal T-Shaped"),//8
		new ChemBondGeom(2,3,"Trigonal Bipyramidal Linear")//9
	]);

}

static function GetChemBondGeomPos(bd:int,nbd:int){
	var positions:Vector3[];
	positions = new Vector3[bd];
	var totalbonds:int = bd + nbd;
	if(totalbonds == 2){
		if(bd == 2 && nbd == 0){
			// Linear 
			positions[0] = Vector3(1,0,0);
			positions[1] = Vector3(-1,0,0);
		}
	}else if(totalbonds == 3){
		if(bd == 3 && nbd == 0){ // Trigonal -------------------------------
			// Trigonal Planar
			positions[0] = Vector3(0,-1,0);
			positions[1] = Vector3(0.8660,0.5,0);
			positions[2] = Vector3(-0.8660,0.5,0);
		}else if(bd == 2 && nbd == 1){
			// Trigonal Planar Bent
			positions[0] = Vector3(0.8660,0.5,0);
			positions[1] = Vector3(-0.8660,0.5,0);		
		}
	}else if(totalbonds == 4){
		if(bd == 4 && nbd == 0){ // Tetrahedral -----------------------------
			// Tetrahedral
			positions[0] = Vector3(0,0,1);
			positions[1] = Vector3(0.943,0,-0.333);
			positions[2] = Vector3(-0.471,0.816,-0.333);
			positions[3] = Vector3(-0.471,-0.816,-0.333);
		}else if(bd == 3 && nbd == 1){
			// Tetrahedral trigonal pyramidal
			positions[0] = Vector3(0.943,0,-0.333);
			positions[1] = Vector3(-0.471,0.816,-0.333);
			positions[2] = Vector3(-0.471,-0.816,-0.333);
		}else if(bd == 2 && nbd == 2){
			// Tetrahedral bent
			positions[0] = Vector3(-0.471,0.816,-0.333);
			positions[1] = Vector3(-0.471,-0.816,-0.333);
		}
	}else if(totalbonds == 5 ){ // Trigonal Bipyramidal
		if(bd == 5 && nbd == 0){
			positions[0] = Vector3(0,-1,0);
			positions[1] = Vector3(0.8660,0.5,0);
			positions[2] = Vector3(-0.8660,0.5,0);
			positions[3] = Vector3(0,0,1);
			positions[4] = Vector3(0,0,-1);			
		}else if(bd == 4 && nbd == 1){ // Seesaw
			positions[0] = Vector3(0.8660,0.5,0);
			positions[1] = Vector3(-0.8660,0.5,0);
			positions[2] = Vector3(0,0,1);	
			positions[3] = Vector3(0,0,-1);	
		}else if(bd == 3 && nbd == 2){ // t-shaped
			positions[0] = Vector3(0,-1,0);
			positions[1] = Vector3(0,0,1);	
			positions[2] = Vector3(0,0,-1);	
		}else if(bd == 2 && nbd == 3){ // linear
			positions[0] = Vector3(0,0,1);	
			positions[1] = Vector3(0,0,-1);	
		}
	}
	return positions;
}

function RenderBondsTesting(name:String,loc:Vector3[],parent:GameObject,child:GameObject){ // testing GetChemBondGeomPos only. does not conserve mass.
	var p:GameObject = Instantiate(parent,Vector3(0,0,0),Quaternion.identity);
	p.name = name;
	var pt:Transform = p.transform;
	for(var i:int=0;i<loc.length;i++){
		var c:GameObject = Instantiate(child,Vector3(0,0,0),Quaternion.identity);
		c.transform.parent = pt;
		c.transform.position = loc[i]; 

	}
}

/*
function Start(){
	DefineChemBondGeom();
	var type:int = 8;
	var bonds = GetChemBondGeomPos(chemBondGeom[type].bondingDomains,chemBondGeom[type].nonbondingDomains);
	RenderBondsTesting(chemBondGeom[type].moGeomName,bonds,testObj1,testObj2);
}*/