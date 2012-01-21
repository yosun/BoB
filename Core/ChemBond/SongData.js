#pragma strict
import System.Collections.Generic;

enum Note {a,b,csharp}

public class SongDataClass{
	var note:Note;
	var time:float;
	
	function SongDataClass(n:Note,t:float){
		this.note = n;
		this.time = t;
	}
}

var songValues:List.<SongDataClass>;

function Reset(){
	songValues=new List.<SongDataClass>([
		new SongDataClass(Note.a,1),
		new SongDataClass(Note.csharp,2),
		new SongDataClass(Note.b,1)
	]);
}

function Start () {
	Reset();
	songValues.Add(new SongDataClass(Note.a,2));
	Debug.Log(songValues[0].note);
}