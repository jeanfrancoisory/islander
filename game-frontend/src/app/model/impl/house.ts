import {Block} from '../interface/block';

export class House implements Block{
  clicked: boolean;

  constructor() {
    this.clicked = false;
  }
}
