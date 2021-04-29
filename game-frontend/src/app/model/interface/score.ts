import {Player} from './player';
import {PlayerImpl} from '../impl/player-impl';

export interface Score {
  player: Player;
  score: number;
}
