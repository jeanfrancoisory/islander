import {Undoable} from '../interface/undoable';
import {Commande} from '../interface/commande';
import {Game} from '../interface/game';
import {GameService} from '../../service/game.service';
import {Grass} from './grass';
import {Circus} from './circus';
import {Fountain} from './fountain';
import {House} from './house';
import {WindTurbine} from './wind-turbine';
import {Tree} from './tree';

export class PutBlock implements Undoable, Commande{

  // Variables memento qui stockent l'état précédent
  previousScore: number;
  previousLimit: number;
  previousX: number;
  previousY: number;
  previousType: string;
  // Utile pour controler que l'on clique un fois seule fois sur Undo, update après Redo ou nouveau coup
  undoClicked: boolean;
  private _x: number;
  private _y: number;

  constructor(public gameService: GameService) {
    this.previousLimit = 0;
    this.previousScore = 0;
    this.previousX = 0;
    this.previousY = 0 ;
    this.previousType = '';
    this.undoClicked = false;
    this._x = -1;
    this._y = -1;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

// Cette fonction va mettre la block choisi à la place de la tile d'herbe, va mettre à jour les mementos,
  // va appeler les fonctions de mise à jour du score
  do(): void {
    // Vérification que l'on clique sur de l'herbe même si seul ce type de tile est cliquable
    if (!this.gameService.game.map.tileList[this.x * 10 + this.y].type.localeCompare('grass')) {
      // Mise à jour des mementos
      this.previousX = this.x;
      this.previousY = this.y;
      this.previousLimit = this.gameService.game.limite;
      this.previousScore = this.gameService.game.score;
      this.undoClicked = false;
      // Choix de l'action en fonction du blok qui a été choisi
      if (this.gameService.circusClicked) {
        const tmp = new Grass();
        // Redéfinition du type de la tile
        tmp.block = new Circus();
        tmp.type = 'circus';
        // On remplace l'ancienne tile par le nouvelle
        this.gameService.game.map.tileList[this.x * 10 + this.y] = tmp;
        // On défini cette tile comme occupée pour l'éventuelle fin de partie
        this.gameService.game.map.tileList[this.x * 10 + this.y].isOccipued = true;
        this.gameService.circusClicked = false;
        // On diminue la quantité dans le menu bes blocks
        this.gameService.game.circusAvailable--;
        // Appel de la fonction qui met à jour le score à la limite
        this.gameService.game.computeScoreCircus(this.x, this.y);
      }
      if (this.gameService.fountainClicked) {
        const tmp = new Grass();
        tmp.block = new Fountain();
        tmp.type = 'fountain';
        this.gameService.game.map.tileList[this.x * 10 + this.y] = tmp;
        this.gameService.game.map.tileList[this.x * 10 + this.y].isOccipued = true;
        this.gameService.fountainClicked = false;
        this.gameService.game.fountainAvailable--;
        this.gameService.game.computeScoreFountain(this.x, this.y);
      }
      if (this.gameService.houseClicked) {
        const tmp = new Grass();
        tmp.block = new House();
        tmp.type = 'house';
        this.gameService.game.map.tileList[this.x * 10 + this.y] = tmp;
        this.gameService.game.map.tileList[this.x * 10 + this.y].isOccipued = true;
        this.gameService.houseClicked = false;
        this.gameService.game.houseAvailable--;
        this.gameService.game.computeScoreHouse(this.x, this.y);
      }
      if (this.gameService.windTurbineClicked) {
        const tmp = new Grass();
        tmp.block = new WindTurbine();
        tmp.type = 'wind-turbine';
        this.gameService.game.map.tileList[this.x * 10 + this.y] = tmp;
        this.gameService.game.map.tileList[this.x * 10 + this.y].isOccipued = true;
        this.gameService.windTurbineClicked = false;
        this.gameService.game.windTurbineAvailable--;
        this.gameService.game.computeScoreWindTurbine(this.x, this.y);
      }
    }
  }

  // Fonction de redo
  redo(): void {
    if (this.undoClicked){
      // On inverse la score actuel et le score précédent
      const tmp = this.gameService.game.score;
      this.gameService.game.score = this.previousScore;
      this.previousScore = tmp;
      // On inverse le limite actuelle et la limite précédente
      const tmp2 = this.gameService.game.limite;
      this.gameService.game.limite = this.previousLimit;
      this.previousLimit = tmp2;
      // On replace la tile précédente avec la bon type
      const previousTile = new Grass();
      previousTile.type = this.previousType;
      this.gameService.game.map.tileList[this.previousX * 10 + this.previousY] = previousTile;
      this.gameService.game.map.tileList[this.previousX * 10 + this.previousY].isOccipued = true;
      // Appel de la fonction qui met à jour les quantités des block dans le menu
      this.redoListBlock(this.previousType);
      this.undoClicked = false;
    }
  }

  // Fonction d'undo
  undo(): void {
    // On vérifie que le bouton a été cliqué et qu'il y a quelque chose à undo
    if (!this.undoClicked && !(this.gameService.game.score === 0)){
      // On inverse la score actuel et le score précédent
      const tmp = this.gameService.game.score;
      this.gameService.game.score = this.previousScore;
      this.previousScore = tmp;
      // On inverse le limite actuelle et la limite précédente
      const tmp2 = this.gameService.game.limite;
      this.gameService.game.limite = this.previousLimit;
      this.previousLimit = tmp2;
      // On stock le type de la tile que l'on enlève
      this.previousType = this.gameService.game.map.tileList[this.previousX * 10 + this.previousY].type;
      // On remet de l'herbe
      const grass = new Grass();
      this.gameService.game.map.tileList[this.previousX * 10 + this.previousY] = grass;
      // Appel de la fonction qui met à jour les quantités des block dans le menu
      this.undoListBlock(this.previousType);
      this.undoClicked = true;
    }
  }
  // Fonction qui met à jour les quantités des block dans le menu
  undoListBlock(type: string): void {
    // Calcul de la quantité a enlever
    const dim = Math.abs(this.gameService.game.limite - this.previousLimit) / 10;
    let dim2 = dim - 1;
    if (dim === 0) { dim2 = 0; }
    // On adapte en fonction du block enlevé
    switch (type){
      case 'circus': {
        this.gameService.game.houseAvailable -= dim;
        this.gameService.game.fountainAvailable -= dim;
        this.gameService.game.windTurbineAvailable -= dim;
        this.gameService.game.circusAvailable -= dim2;
        break;
      }
      case 'house': {
        this.gameService.game.circusAvailable -= dim;
        this.gameService.game.fountainAvailable -= dim;
        this.gameService.game.windTurbineAvailable -= dim;
        this.gameService.game.houseAvailable -= dim2;
        break;
      }
      case 'fountain': {
        this.gameService.game.circusAvailable -= dim;
        this.gameService.game.houseAvailable -= dim;
        this.gameService.game.windTurbineAvailable -= dim;
        this.gameService.game.fountainAvailable -= dim2;
        break;
      }
      case 'wind-turbine': {
        this.gameService.game.circusAvailable -= dim;
        this.gameService.game.fountainAvailable -= dim;
        this.gameService.game.houseAvailable -= dim;
        this.gameService.game.windTurbineAvailable -= dim2;
        break;
      }
    }
  }
  redoListBlock(type: string): void {
    const dim = Math.abs(this.gameService.game.limite - this.previousLimit) / 10;
    let dim2 = dim - 1;
    if (dim === 0) { dim2 = 0; }
    switch (type){
      case 'circus': {
        this.gameService.game.houseAvailable += dim;
        this.gameService.game.fountainAvailable += dim;
        this.gameService.game.windTurbineAvailable += dim;
        this.gameService.game.circusAvailable += dim2;
        break;
      }
      case 'house': {
        this.gameService.game.circusAvailable += dim;
        this.gameService.game.fountainAvailable += dim;
        this.gameService.game.windTurbineAvailable += dim;
        this.gameService.game.houseAvailable += dim2;
        break;
      }
      case 'fountain': {
        this.gameService.game.circusAvailable += dim;
        this.gameService.game.houseAvailable += dim;
        this.gameService.game.windTurbineAvailable += dim;
        this.gameService.game.fountainAvailable += dim2;
        break;
      }
      case 'wind-turbine': {
        this.gameService.game.circusAvailable += dim;
        this.gameService.game.fountainAvailable += dim;
        this.gameService.game.houseAvailable += dim;
        this.gameService.game.windTurbineAvailable += dim2;
        break;
      }
    }
  }
}
