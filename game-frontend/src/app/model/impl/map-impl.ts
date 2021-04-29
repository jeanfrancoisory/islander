import {Map} from '../interface/map';
import {Tile} from '../interface/tile';
import {Block} from '../interface/block';
import {Score} from '../interface/score';

export class MapImpl implements Map{
  private _nameMap: string;
  private _listTile: Array<Tile>;
  private _scoreList: Array<Score>;

  constructor() {
    this._nameMap = 'Carte au trésor';
    this._listTile = new Array<Tile>();
    this._scoreList = new Array<Score>();
  }

  get scoreList(): Array<Score> {
    return this._scoreList;
  }

  set scoreList(value: Array<Score>) {
    this._scoreList = value;
  }

  get tileList(): Array<Tile> {
    return this._listTile;
  }

  set tileList(value: Array<Tile>) {
    this._listTile = value;
  }

  get name(): string {
    return this._nameMap;
  }

  set name(value: string) {
    this._nameMap = value;
  }
}
