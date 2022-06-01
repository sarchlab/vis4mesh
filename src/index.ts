import "../public/index.scss";
import Controller from "controller/controller";
import { Component, Module } from "global";

import { RenderTimebar } from "./timebar/timebar";
import { RenderFilterbar } from "./filterbar/filterbar";
import { RenderTopbar } from "topbar/topbar";
import { MainView } from "./graph/graph";

const port = Component.port;

const chooseDirButton = document.querySelector("#open-directory-btn")!;

chooseDirButton.addEventListener("click", async () => {
  try {
    const meta = await port.init();
    console.log(meta);

    const graph = new MainView(meta["width"], meta["height"]);

    let c = new Controller(port, graph).loadModules([
      Module.filterMsg,
      Module.setTime,
    ]);

    Component.ticker.setMaxTime(+meta["elapse"]).bindController(c);

    // c.requestDataPort(); // render initial view

    RenderTopbar();
    RenderTimebar();
    RenderFilterbar();
  } catch (err) {
    console.error(err);
  }
});
