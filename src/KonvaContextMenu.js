import Konva from "konva";

const handleClick = e => {
  e.evt.preventDefault(true);
  e.target.parent.remove();
  e.target.parent.destroy();
};

const handleMouseIn = e => {
  e.target.attrs.fill = "#99999";
  e.target.draw();
};

const handleMouseOut = e => {
  e.target.attrs.fill = "#55555";
  e.target.draw();
};

const optionText = (x, y, text) =>
  new Konva.Text({
    x: x,
    y: y,
    text: text,
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#55555",
    width: 200,
    padding: 10,
    align: "left"
  });

const flatBodyWithShadow = (x, y, height) =>
  new Konva.Rect({
    x: x,
    y: y,
    stroke: "#f2f2f2",
    strokeWidth: 0,
    fill: "#f2f2f2",
    width: 200,
    height: height,
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffset: [10, 10],
    shadowOpacity: 0.25,
    cornerRadius: 0.2
  });

const contextMenuBody = (e, options) => {
  const mousePosition = e.target.getStage().getPointerPosition();
  const x = mousePosition.x;
  const y = mousePosition.y;

  const decoratedOptions = options.map(option => {
    return {
      callback: option.callback,
      option: optionText(x, y, option.text)
    };
  });

  let totalOffsetY = 0;

  for (let i = 0; i <= decoratedOptions.length - 1; i++) {
    totalOffsetY = totalOffsetY + 25;

    if (decoratedOptions[i].option.attrs.text.length > 19)
      totalOffsetY = totalOffsetY + 17;
  }

  // array item count X menu item offset + padding (top & bottom) - 5 for good luck
  const menuHeight = totalOffsetY + 20 - 5;

  const blankBody = flatBodyWithShadow(x, y, menuHeight);

  const layer = new Konva.Layer();

  layer.name = "Konva-Context-Menu";
  layer.on("click", handleClick);
  layer.add(blankBody);

  let offsetY = 0;

  for (let i = 0; i <= decoratedOptions.length - 1; i++) {
    decoratedOptions[i].option.attrs.y =
      decoratedOptions[i].option.attrs.y + offsetY;
    offsetY = offsetY + 25;

    if (decoratedOptions[i].option.attrs.text.length > 19)
      offsetY = offsetY + 17;

    layer.on("click", decoratedOptions[i].callback);
    layer.on("mouseover", handleMouseIn); // NB!!! event name (the string) is case sensitive
    layer.on("mouseout", handleMouseOut);
    layer.add(decoratedOptions[i].option);
  }

  return layer;
};

export default (e, options = []) => {
  if (!e || !options || options.length === 0) return;

  //  Todo: remove all layers called 'Konva-Context-Menu' to avoid duplicate context menus. Then create the new one.

  const stage = e.target.getStage();
  stage.add(contextMenuBody(e, options));
};
