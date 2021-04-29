import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Game} from '../model/interface/game';
import {GameImpl} from '../model/impl/game-impl';
import {Grass} from '../model/impl/grass';
import {Tree} from '../model/impl/tree';
import {Water} from '../model/impl/water';
import {Router} from '@angular/router';
import {PutBlock} from '../model/impl/put-block';
import {Map} from '../model/interface/map';
import {Test} from 'tslint';
import {Subscriber} from 'rxjs';
import {MapImpl} from '../model/impl/map-impl';
import {Score} from '../model/interface/score';
import {ChangeNamePlayer} from '../model/impl/change-name-player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: Game;
  // Variables utilisées pour savoir sur quel block du menu on a cliqué
  private _circusClicked: boolean;
  private _fountainClicked: boolean;
  private _houseClicked: boolean;
  private _windTurbineClicked: boolean;
  putblock: PutBlock;
  // Stockage du nom des carte du back
  private _names: string[];
  // Utile pour la réception de la carte choisie
  mapPlayed: Map;
  // Liste des top scores d'une map
  scoreList: Array<Score>;
  // Commande pour changer le nom du joueur
  changeName: ChangeNamePlayer;

  constructor(private router: Router, private http: HttpClient) {
    this._names = [];
    this.scoreList = new Array<Score>();
    this.game = new GameImpl(router);
    this.getMapNames();
    this.mapPlayed = new MapImpl();
    this._circusClicked = false;
    this._fountainClicked = false;
    this._houseClicked = false;
    this._windTurbineClicked = false;
  }

  // Communication avec la back pour connaitre le nom des cartes
  getMapNames(): void {
    this.http.get<string[]>('game/maps', {})
      .subscribe(returnedData => returnedData.forEach(s => {
        this.names.push(s);
      }));
  }
  // On récupère la carte choisie et on la stock directement
  getMapPlayed(map: string): Promise<Map>{
    return this.http.get<Map>(`game/name/${map}`, {}).toPromise();
  }

  // A la fin de la partie on met le score dans le back
  putScore(): void {
    this.http.post(`game/${this.game.map.name}/${this.game.player.name}/${this.game.score}`, {}, {})
      .subscribe(returnedData => console.log(returnedData));
  }

  // On récupère le top 5 des scores d'une carte
  getScore(): void {
    this.http.get<Array<Score>>(`game/${this.game.map.name}/scores`, {})
      .subscribe(returnedData => {
        this.scoreList = [];
        returnedData.forEach(score => {
          this.scoreList.push(score);
        });
      });
  }

  get names(): string[] {
    return this._names;
  }

  set names(value: string[]) {
    this._names = value;
  }

  get fountainClicked(): boolean {
    return this._fountainClicked;
  }

  set fountainClicked(value: boolean) {
    this._fountainClicked = value;
  }

  get houseClicked(): boolean {
    return this._houseClicked;
  }

  set houseClicked(value: boolean) {
    this._houseClicked = value;
  }

  get windTurbineClicked(): boolean {
    return this._windTurbineClicked;
  }

  set windTurbineClicked(value: boolean) {
    this._windTurbineClicked = value;
  }

  get circusClicked(): boolean {
    return this._circusClicked;
  }

  set circusClicked(value: boolean) {
    this._circusClicked = value;
  }

  get game(): Game {
    return this._game;
  }

  set game(value: Game) {
    this._game = value;
  }

}
