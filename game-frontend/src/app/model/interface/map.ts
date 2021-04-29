import {Tile} from './tile';
import {Score} from './score';

export interface Map {
  name: string;
  tileList: Array<Tile>;
  scoreList: Array<Score>;
}
