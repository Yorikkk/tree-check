export const CheckType = {
  All: "all",
  None: "none",
  Partial: "partial",
}

export class Checker {
  // Value for tree leaf
  _checked = false;

  children = [];

  constructor (checkerName = 'checker') {
    this.checkerName = checkerName;
  }

  get checked() {
    // Is it tree leaf or not?
    if (this.children.length) {
      return this.children
        // Create copy of array
        .slice(0)
        .reduce((currentType, child, index, arr) => {
            if (index === 0) {
              return child[this.checkerName].checked;
            }

            // If previous element is Partial then we can finish checkin
            if (currentType === CheckType.Partial) {
              // Cat array for stop checkin
              arr.slice(0, index);
              return CheckType.Partial;
            }

            return currentType === child[this.checkerName].checked
              ? currentType
              : CheckType.Partial;
          },
          CheckType.None
        );
    }

    return this._checked ? CheckType.All : CheckType.None;
  }

  setChecked(value) {
    // Is it tree leaf or not?
    if (this.children.length) {
      this.children.forEach((child) => child.checker.setChecked(value));
    } else {
      this._checked = value;
    }
  }

  setChildren(children) {
    this.children = children;
  }
}
