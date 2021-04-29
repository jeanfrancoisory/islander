import {Game} from '../interface/game';
import {Player} from '../interface/player';
import {Map} from '../interface/map';
import {PlayerImpl} from './player-impl';
import {MapImpl} from './map-impl';
import {Block} from '../interface/block';
import {Tile} from '../interface/tile';
import {Router} from '@angular/router';

export class GameImpl implements Game{

  private _limite: number;
  private _score: number;
  private _player: Player;
  private _map: Map;
  private _circusAvailable: number;
  private _houseAvailable: number;
  private _fountainAvailable: number;
  private _windTurbineAvailable: number;
  nbGrass: number;

  constructor(private router: Router) {
    this._player = new PlayerImpl();
    this._limite = 10;
    this._score = 0;
    this._map = new MapImpl();
    this._houseAvailable = 1;
    this._circusAvailable = 0;
    this._fountainAvailable = 0;
    this._windTurbineAvailable = 0;
    this.nbGrass = 0;
  }

  get circusAvailable(): number {
    return this._circusAvailable;
  }

  set circusAvailable(value: number) {
    this._circusAvailable = value;
  }

  get houseAvailable(): number {
    return this._houseAvailable;
  }

  set houseAvailable(value: number) {
    this._houseAvailable = value;
  }

  get fountainAvailable(): number {
    return this._fountainAvailable;
  }

  set fountainAvailable(value: number) {
    this._fountainAvailable = value;
  }

  get windTurbineAvailable(): number {
    return this._windTurbineAvailable;
  }

  set windTurbineAvailable(value: number) {
    this._windTurbineAvailable = value;
  }

  get limite(): number {
    return this._limite;
  }

  set limite(value: number) {
    this._limite = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  get player(): Player {
    return this._player;
  }

  set player(value: Player) {
    this._player = value;
  }

  get map(): Map {
    return this._map;
  }

  set map(value: Map) {
    this._map = value;
  }

  // Toutes les fonctions "compute" mettent à jour le score selon le block qui a été posé
  computeScoreCircus(x: number, y: number): void {
    // Selon le rayon des blocks on crée une liste contenant toutes les tiles contenues dans ce rayon
    const rad: Array<Tile> = new Array<Tile>();
    let i = 0;
    while (i < 100){
      if (Math.abs(i % 10 - y) <= 3 && Math.abs(Math.trunc(i / 10 ) - x) <= 3 && i != (x * 10 + y)) {
        rad.push(this.map.tileList[i]);
      }
      i++;
    }
    // Mise à jour du score
    this.score += 10 + (-20) * (rad.filter(tile => !tile.type.localeCompare('circus')).length)
      + 10 * (rad.filter(tile => !tile.type.localeCompare('house')).length);
    // Appel de la fonction qui met à jour la limite et boucle dessus pour les passages de limite multiples
    while (this.isLimitReached()) {}
    // On vérifie si c'est la fin de la partie
    this.endGame();
  }

  computeScoreFountain(x: number, y: number): void {
    const rad: Array<Tile> = new Array<Tile>();
    let i = 0;
    while (i < 100){
      if (Math.abs(i % 10 - y) <= 1 && Math.abs(Math.trunc(i / 10 ) - x) <= 1 && i != (x * 10 + y)) {
        rad.push(this.map.tileList[i]);
      }
      i++;
    }
    this.score += 4 + 4 * (rad.filter(tile => !tile.type.localeCompare('tree')).length)
      + 5 * (rad.filter(tile => !tile.type.localeCompare('house')).length)
      + 6 * (rad.filter(tile => !tile.type.localeCompare('circus')).length);
    while (this.isLimitReached()) {}
    this.endGame();
  }

  computeScoreHouse(x: number, y: number): void {
    const rad: Array<Tile> = new Array<Tile>();
    let i = 0;
    while (i < 100){
      if (Math.abs(i % 10 - y) <= 1 && Math.abs(Math.trunc(i / 10 ) - x) <= 1 && i != (x * 10 + y)) {
        rad.push(this.map.tileList[i]);
      }
      i++;
    }
    this.score += 5 + 4 * (rad.filter(tile => !tile.type.localeCompare('tree')).length)
      + 5 * (rad.filter(tile => !tile.type.localeCompare('house')).length)
      + 8 * (rad.filter(tile => !tile.type.localeCompare('circus')).length)
      + 10 * (rad.filter(tile => !tile.type.localeCompare('fountain')).length)
      + (-10) * (rad.filter(tile => !tile.type.localeCompare('wind-turbine')).length);
    while (this.isLimitReached()) {}
    this.endGame();
  }

  computeScoreWindTurbine(x: number, y: number): void {
    const rad: Array<Tile> = new Array<Tile>();
    let i = 0;
    while (i < 100){
      if (Math.abs(i % 10 - y) <= 1 && Math.abs(Math.trunc(i / 10 ) - x) <= 1 && i != (x * 10 + y)) {
        rad.push(this.map.tileList[i]);
      }
      i++;
    }
    this.score += 8 + (-5) * (rad.filter(tile => !tile.type.localeCompare('tree')).length)
      + (-7) * (rad.filter(tile => !tile.type.localeCompare('house')).length)
      + 8 * (rad.filter(tile => !tile.type.localeCompare('water')).length);
    while (this.isLimitReached()) {}
    this.endGame();
  }

  isLimitReached(): boolean {
    // Si le score actuel est plus grand que la limite on augmente ce qu'il faut augmenter
    if (this._score >= this._limite) {
      this.limite += 10;
      this.windTurbineAvailable++;
      this.fountainAvailable++;
      this.circusAvailable++;
      this.houseAvailable++;
      return true;
    }
    return false;
  }

  endGame(): void {
    // Si il n'y a plus de block disponible
    if ((this.houseAvailable + this.circusAvailable + this.fountainAvailable + this.windTurbineAvailable) === 0){
      setTimeout(() => {
        this.router.navigate(['endgame']);
      }, 1000);
    }
    // Si toute l'herbe est occupée
    if (this.nbGrass === this._map.tileList.filter(tile => tile.isOccipued).length) {
      setTimeout(() => {
        this.router.navigate(['endgame']);
      }, 1000);
    }
  }
}
