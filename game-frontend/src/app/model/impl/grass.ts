import {Tile} from '../interface/tile';
import {Block} from '../interface/block';

export class Grass implements Tile{
  private _type: string;
  // attribut pas forcement utile car inutilisé
  private _block: Block;
  private _isOccipued: boolean;

  constructor() {
    this._type = 'grass';
    this._block = null;
    this._isOccipued = false;
  }

  get isOccipued(): boolean {
    return this._isOccipued;
  }

  set isOccipued(value: boolean) {
    this._isOccipued = value;
  }

  get block(): Block {
    return this._block;
  }

  set block(value: Block) {
    this._block = value;
  }

  isNull(): boolean{
    return this._block === null;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }


}
