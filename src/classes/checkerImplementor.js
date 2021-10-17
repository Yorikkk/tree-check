import { Checker } from "./checker.js";

export class CheckerImplementor {
  children = [];

  checker = new Checker('checker');

  constructor() {
    // Need to link current children
    this.checker.setChildren(this.children);
  }

  addChild(child) {
    this.children.push(child);
  }
}
