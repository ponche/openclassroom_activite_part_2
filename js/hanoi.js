var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");

// classe de l'objet étage
function EtageHanoi(numero)
{
	this.hauteur = 40;
	this.largeur = 25 * numero;
	this.numero = numero;
	
	this.dessinerEtageHanoi = function(x, y)
	{
		switch(this.numero)
		{
			case 1 :
				context.fillStyle = "brown" ;
				break;
			case 2 : 
				context.fillStyle = "red" ; 
				break;
			case 3 : 
				context.fillStyle = "orange" ; 
				break;
			case 4 :
				context.fillStyle = "yellow" ; 
				break;
			case 5 : 
				context.fillStyle = "green" ; 
				break;
			case 6 : 
				context.fillStyle = "blue" ; 
				break;
			case 7 : 
				context.fillStyle = "purple";
				break;
			case 8 : 
				context.fillStyle = "gray" ;
				break;
			case 9 : 
				context.fillStyle = "black" ; 
				break;
			case 10 :
				context.fillStyle = "silver" ; 
				break;
			case 11 : 
				context.fillStyle = "turquoise" ; 
				break;
			default : 
				context.fillStyle = "gold" ; 
				break;
		}	
		context.fillRect(x - (this.largeur / 2), y, this.largeur, this.hauteur);
	}
} 
// namespace score
gestionScores = 
{
	deplacement : 0,
	fautes : 0
}
var selectionPinces = null;

//création des colones
var ColonesGauche = [];
var ColonesMilieu = [];
var ColonesDroite = [];

//Création fondation
ColonesGauche.push(new EtageHanoi(999));
ColonesMilieu.push(new EtageHanoi(999));
ColonesDroite.push(new EtageHanoi(999));

//remplisage Colone Gauche
for(var i = 6; i != 0; i--)
{
	ColonesGauche.push(new EtageHanoi(i));
}
// desine les colones
function dessineColone(Colonne, x)
{
	for(var i=0; i < Colonne.length; i++)
	{
		if(i == 0)
			continue;
		Colonne[i].dessinerEtageHanoi(x, 500 - Colonne[i].hauteur * i);
	}
}
function deplacementEtage(ColoneDepart, ColoneArriver)
{
	var etageVoyageur = ColoneDepart[ColoneDepart.length - 1];
	var etageBase = ColoneArriver[ColoneArriver.length - 1];
	if(etageVoyageur.numero < etageBase.numero)
	{
		//deplacement autoriser
		gestionScores.deplacement++;
		ColoneArriver.push(etageVoyageur);
		ColoneDepart.pop();
	}
	else
	{
		alert("déplacement interdit");
		gestionScores.fautes++;
	}
}
function dessineEcran()
{
	dessineColone(ColonesGauche, 200);
	dessineColone(ColonesMilieu, 500);
	dessineColone(ColonesDroite, 800);
}
function effaceEcran()
{
	context.fillStyle = "white";
	context.fillRect(0, 0 , 1000, 500);
}

// dessinne indicateur
function dessinnePinces(zonePince)
{
	context.fillStyle = "blue";
	switch(zonePince)
	{
		case ColonesGauche :
			// dessine pince à gauche
			context.fillRect(195, 0, 10, 10);
			break;
		case ColonesMilieu : 
			// dessine pince au millieu
			context.fillRect(495, 0, 10, 10);
			break;
		case ColonesDroite:
			// dessine pince à droite
			context.fillRect(795, 0, 10, 10);
			break;
		default :
			break;
	}
}
// fonction des touches
function appuyeToucheGauche()
{
	if(selectionPinces == null)
	{
		selectionPinces = ColonesGauche;
		dessinnePinces(ColonesGauche);
	}
	else
	{
		deplacementEtage(selectionPinces, ColonesGauche);
		selectionPinces = null;
		programmeJeu();
	}	
}
function appuyeToucheMilieu()
{
	if(selectionPinces == null)
	{
		selectionPinces = ColonesMilieu;
		dessinnePinces(ColonesMilieu);
	}
	else
	{
		deplacementEtage(selectionPinces, ColonesMilieu);
		selectionPinces = null;
		programmeJeu();
	}
}
function appuyeToucheDroite()
{
	if(selectionPinces == null)
	{
		selectionPinces = ColonesDroite;
		dessinnePinces(ColonesDroite);
	}
	else
	{
		deplacementEtage(selectionPinces, ColonesDroite);
		selectionPinces = null;
		programmeJeu();
	}
}
function verificationLevelTerminer()
{
	if(ColonesGauche.length == 1 && ColonesMilieu.length == 1 )
		return true;
	else
		return false;
}

function programmeJeu()
{
	effaceEcran();
	dessineEcran();
	if(verificationLevelTerminer())
	{
		alert("Bravo niveau terminer");
	}
}
//setInterval(programmeJeu, 100);
programmeJeu();
