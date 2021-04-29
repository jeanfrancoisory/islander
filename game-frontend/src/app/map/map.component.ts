import {AfterViewInit, Component} from '@angular/core';
import { OnInit } from '@angular/core';
import {GameService} from '../service/game.service';
import {Player} from '../model/interface/player';
import {PlayerImpl} from '../model/impl/player-impl';
import {Game} from '../model/interface/game';
import {Circus} from '../model/impl/circus';
import {Grass} from '../model/impl/grass';
import {Fountain} from '../model/impl/fountain';
import {House} from '../model/impl/house';
import {WindTurbine} from '../model/impl/wind-turbine';
import {PutBlock} from '../model/impl/put-block';
import {OverlayService} from '../service/overlay.service';
import {TopscoreComponent} from '../topscore/topscore.component';
import {PlayernameComponent} from '../playername/playername.component';
import {ChangeNamePlayer} from '../model/impl/change-name-player';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {

  putblock: PutBlock;

  constructor(public gameService: GameService, public overlay: OverlayService) {
  }

  ngOnInit(): void{
    // On initialise l'objet qui va servir à effectuer les action
    this.putblock = new PutBlock(this.gameService);
    // On initialise la commande qui va permettre de changer de nom
    this.gameService.changeName = new ChangeNamePlayer(this.gameService);
  }

  ngAfterViewInit(): void {
  }

  // Toutes ces fonctions "is" sont utilisées dans la html pour afficher la bonne image :
  // pour chaque tile de la liste que l'on parcourt on adapte l'affiche selon son type
  isGrass(x: number, y: number): boolean{
    // On vérifie le type de le tile et si elle n'est pas déjà occupée
    if (!'grass'.localeCompare(this.gameService.game.map.tileList[x * 10 + y].type)
      && !this.gameService.game.map.tileList[x * 10 + y].isOccipued){
      return true;
    }
    return false;
  }
  isTree(x: number, y: number): boolean{
    if (!'tree'.localeCompare(this.gameService.game.map.tileList[x * 10 + y].type)){
      return true;
    }
    return false;
  }
  isWater(x: number, y: number): boolean{
    if (!'water'.localeCompare(this.gameService.game.map.tileList[x * 10 + y].type)){
      return true;
    }
    return false;
  }
  isCircus(x: number, y: number): boolean{
    if (!'circus'.localeCompare(this.gameService.game.map.tileList[x * 10 + y].type)
      && this.gameService.game.map.tileList[x * 10 + y].isOccipued){
      return true;
    }
    return false;
  }
  isFountain(x: number, y: number): boolean{
    if (!'fountain'.localeCompare(this.gameService.game.map.tileList[x * 10 + y].type)
      && this.gameService.game.map.tileList[x * 10 + y].isOccipued){
      return true;
    }
    return false;
  }
  isHouse(x: number, y: number): boolean{
    if (!'house'.localeCompare(this.gameService.game.map.tileList[x * 10 + y].type)
      && this.gameService.game.map.tileList[x * 10 + y].isOccipued){
      return true;
    }
    return false;
  }
  isWindTurbine(x: number, y: number): boolean{
    if (!'wind-turbine'.localeCompare(this.gameService.game.map.tileList[x * 10 + y].type)
      && this.gameService.game.map.tileList[x * 10 + y].isOccipued){
      return true;
    }
    return false;
  }
  // On appel l'éxécutant
  onGrassCick(x: number, y: number): void {
    this.putblock.x = x;
    this.putblock.y = y;
    this.putblock.do();
  }
  onUndo(): void{
    this.putblock.undo();
  }
  onRedo(): void{
    this.putblock.redo();
  }
  onTopScore(): void {
    this.gameService.getScore();
    this.overlay.open(TopscoreComponent, true);
  }
  onEditNamePlayer(): void {
    this.overlay.open(PlayernameComponent, false);
  }
}
