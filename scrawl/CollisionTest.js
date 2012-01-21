
var master:CollisionTest = null;
var myMaster;

function Start(){
	myMaster=this;
}

function OnCollisionEnter(collision:Collision)
{
    var other:CollisionTest = collision.gameObject.GetComponent(CollisionTest);
    if (other != null)
    {
        if (other.master == null)                   // No master yet?
        {
            master = myMaster;                          // Make this one master
            other.master = this;                    // Tell the other
            other.rigidbody.isKinematic = true;
            collision.transform.parent = transform; // make the other a child of this one.
            Debug.Log("i am the master "+name+" "+other.gameObject.name);
        }
        else                                        // We already have a master
        {
            master = other.master;                  // So we also use the master
            rigidbody.isKinematic = true;           // and make us a child of the master
            transform.parent = master.transform;
            Debug.Log("existing is my master "+name+" "+other.gameObject.name);
            myMaster = master;
        }
    }
}