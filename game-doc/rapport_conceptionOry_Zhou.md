# Rapport Conception


### Diagramme de classes
![D](classe.svg)

### Diagramme de séquences

##### Mise d'un block

![Diagramme 1](putblock.svg)

##### Déplacement d'un block

![Diagramme 2](moveoneblock.svg)

##### Route REST

![Diagramme 3](rest.svg)
### Routes REST

POST /{map}/{player}/{score}
Entrée JSON :
{
"score": 
}

GET /maps
Sortie JSON : 
{
"map1Name":
"map2Name":
}

GET /{map}
Sortie JSON :
{
"map": [
	{
	"name" :
	}
]
}


GET /{map}/scores
Sortie JSON :
{
"score1":
"score2":
}

### Mock-up

##### Accueil

![Accueil](accueil.svg)
##### Choix de la map

![Choix](choix.svg)

##### Map

![Map](carte.svg)
##### Fin de partie

![Fin](fin.svg)

