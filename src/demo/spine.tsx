import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import "@pixi/unsafe-eval";
let app: any = null;
export const SpineDemo = () => {
  const domRef = useRef<any>(null);
  const init = async () => {
    if (app) {
      return;
    }
    const dom = domRef?.current;
    app = new PIXI.Application({
      width: 2000,
      height: 1000,
      backgroundColor: 0xffffff, // 白色
    });
    console.log(666999, dom);
    dom.appendChild(app.view);

    const resource = await PIXI.Assets.load("/yazu/animation.json");
    const spine = new Spine(resource.spineData);
    const spine1 = new Spine(resource.spineData);
    app.stage.addChild(spine);
    app.stage.addChild(spine1);
    spine.position.set(app.renderer.width * 0.1, 80);
    spine1.position.set(app.renderer.width * 0.25, spine.height);
    spine.state.setAnimation(0, "idle", true);
    spine1.state.setAnimation(0, "idle", true);

    /// you can hide code under this line
    const height = 80;
    const proportion = spine.width / spine.height;
    spine.width = height * proportion;
    spine.height = height;

    const resource1 =await PIXI.Assets.load("/buzhuo/animation.json");
    console.log(resource1)
    const spine3 = new Spine(resource1.spineData);
    const spine4 = new Spine(resource.spineData);
    app.stage.addChild(spine3);
    spine3.position.set(app.renderer.width * 0.8, spine3.height + 50);
    spine3.state.setAnimation(0, "get3", true);
    spine3.skeleton.findSlot('petcontainer').currentMesh.addChild(spine4)

    const spine5 = new Spine(resource1.spineData);
    app.stage.addChild(spine5);
    spine5.position.set(app.renderer.width * 0.1, spine3.height + 300);
    spine5.state.setAnimation(0, "roll2", true);
  };
  useEffect(() => {
    init();
  }, []);
  return <div ref={domRef}></div>;
};
