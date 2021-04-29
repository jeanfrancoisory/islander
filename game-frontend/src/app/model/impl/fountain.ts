import {Block} from '../interface/block';

export class Fountain implements Block{
  clicked: boolean;

  constructor() {
    this.clicked = false;
  }
}
