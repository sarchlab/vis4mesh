import * as d3 from "d3";
import { ColoredCheckbox } from "../widget/colorcheckbox";
import { MsgGroupsDomain, NumMsgGroups } from "../data/classification";
import Ticker from "../timebar/ticker";

const div = d3.select("#filterbar");
let SelectedMsgGroup = MsgGroupsDomain.reduce(
  (a, group) => ({ ...a, [group]: true }),
  {}
);

export class FilterEventListener {
  protected updaterMsgGroup: Array<(g: string[]) => any>;
  protected ticker: Ticker;

  constructor(ticker: Ticker) {
    this.updaterMsgGroup = new Array<(g: string[]) => any>();
    this.ticker = ticker; // use signal `pause` and `still` of ticker
  }

  AppendForMsgGroup(updater: (g: string[]) => any) {
    this.updaterMsgGroup.push(updater);
  }

  FireEventForMsgGroup(g: string[]) {
    this.ticker.signal["state"]("pause");
    this.updaterMsgGroup.forEach((updater) => {
      updater(g);
    });
    this.ticker.signal["state"]("still");
  }
}

export default function RenderFilterBar(ev: FilterEventListener) {
  let f = new FilterBar(ev);
  f.renderFilterMsgGroup();
}

class FilterBar {
  protected ev: FilterEventListener;

  constructor(ev: FilterEventListener) {
    this.ev = ev;
  }

  // Msg group filter
  renderFilterMsgGroup() {
    MsgGroupsDomain.forEach((group, i) => {
      let box = new ColoredCheckbox()
        .append({
          label: group,
          color: d3.schemeSpectral[NumMsgGroups][i],
        })
        .event((val) => this.updateMsgGroup(group, val))
        .static(true);
      div.append(() => box.node());
    });
  }

  updateMsgGroup(group: string, checked: boolean) {
    SelectedMsgGroup[group] = checked;
    let groups = MsgGroupsDomain.filter((g) => SelectedMsgGroup[g]);
    console.log(groups);
    this.ev.FireEventForMsgGroup(groups);
  }
}

// Data/Command checkbox

// Traffic congestion filter
