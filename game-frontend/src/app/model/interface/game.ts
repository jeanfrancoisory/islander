import {Player} from './player';
import {Map} from './map';
import {Block} from './block';

export interface Game {
  score: number;
  limite: number;
  player: Player;
  map: Map;
  circusAvailable: number;
  houseAvailable: number;
  fountainAvailable: number;
  windTurbineAvailable: number;
  nbGrass: number;

  computeScoreCircus(x: number, y: number): void;
  computeScoreHouse(x: number, y: number): void;
  computeScoreFountain(x: number, y: number): void;
  computeScoreWindTurbine(x: number, y: number): void;
  isLimitReached(): boolean;
  endGame(): void;
}
