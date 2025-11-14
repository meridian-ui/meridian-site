import { CustomOverviewType, ItemViewTypeConfig, OverviewTypeConfig } from "meridian/src/renderer/renderer.defaults";
import { ItemViewBuilderTemplate } from "./builder-template-item-view";
import { OverviewBasicList } from "meridian/src/components/overviews/overview-basic-list";
import { ItemViewBuilderFreeform } from "./builder-freeform-item-view";
import { mapDefault, OverviewMap } from "./map-overview";

export const customOverviews: OverviewTypeConfig<CustomOverviewType>[] = [
  {
    type: "list",
    view: OverviewBasicList,
    defaultSpec: {
      itemView: {
        type: "builder-template",
        // type: 'builder-freeform',
      },
      detailViews: [
        {
          type: "basic",
          openIn: "pop-up",
          openFrom: ["title"],
          openBy: "click",
          showAttributes: "all",
        },
      ],
    },
  },
  {
    type: "map",
    view: OverviewMap,
    defaultSpec: mapDefault,
  },
];

export const customItemViews: ItemViewTypeConfig[] = [
  {
    type: "builder-template",
    view: ItemViewBuilderTemplate,
  },
  {
    type: "builder-freeform",
    view: ItemViewBuilderFreeform,
  }
];