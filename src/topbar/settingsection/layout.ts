import { LabelBox } from "widget/labelbox";
import { SingleSlider } from "widget/singleslider";
import Event from "event";

const ev = {
  GridSpacingStep: "GridSpacingStep",
  GridSpacingCover: "GridSpacingCover",
};

export default function RenderSettingLayoutSection() {
  return new LabelBox("layout-setting").append([
    {
      label: "Grid layout",
      widgets: [
        new SingleSlider("spacing-step-slider")
          .append({
            min: 1,
            max: 100,
            default: 66,
            step: 1,
            label: "Node distance",
          })
          .event((v) => {
            Event.FireEvent(ev.GridSpacingStep, v);
          }),
        new SingleSlider("spacing-cover-slider")
          .append({
            min: 1,
            max: 100,
            default: 12,
            step: 1,
            label: "Node size",
          })
          .event((v) => {
            Event.FireEvent(ev.GridSpacingCover, v);
          }),
      ],
    },
  ]);
}
