/**
 * 复杂的交互制作该怎么办？----- 状态机
 * 状态机设计是一个中间状态
 * 状态机（State Machine）：一种带有状态的机器，可以用来抽象世界中带有状态的现象。（抽象产品的方式）
 * 组成：
 *  - state集合{ opened, closed }
 *  - action集合 { open, close }
 *  - 状态转移函数集合：{ open_door(), close_door() }
 *     - 函数参数：状态转移条件
 *     - 函数返回值：新的状态
 * 正则表达式就是用状态机实现的
 */

enum States {
  Start,
  DragStart,
  Moving,
  Stoped,
  Selected,
}

enum Actions {
  AUTO,
  EvtDragStart,
  EvtDrag,
  EvtDragEnd,
}

type StateTransferFunction = () => void;
class StateMachine<S extends number, A extends number> {
  s!: S;
  table!: Map<S, Map<A, [StateTransferFunction, S]>>;

  register(from: S, to: S, action: A, fn: StateTransferFunction) {
    if (!this.table.has(from)) {
      this.table.set(from, new Map());
    }
    const abjTable = this.table.get(from);
    abjTable?.set(action, [fn, to]);
  }

  dispatch(action: A): boolean {
    const abjTable = this.table.get(this.s);
    if (!abjTable) return false;
    const entry = abjTable.get(action);
    if (!entry) return false;
    const [fn, nextS] = entry;
    fn();
    this.s = nextS;
    while (this.dispatch(0 as A));
    return true;
  }
}
