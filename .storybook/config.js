import { configure } from "@storybook/react";

configure(() => {
  const iconWrapper = document.createElement("div");
  iconWrapper.innerHTML = SVG_ICONS;
  document.body.appendChild(iconWrapper);

  require("../examples/main.scss");

  require("../examples/stories");
}, module);
