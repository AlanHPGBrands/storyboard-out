import React from "react";

export default function RenderSvgPattern(props) {
  const {
    currentSvg,
    currSvgIndex,
    cursorStyleFromAbove,
    fillPatternId,
    patternLogoUrlId,
    patternWidthFromAbove,
  } = props;
  let patternWidth =
    patternWidthFromAbove && typeof patternWidthFromAbove !== "undefined"
      ? patternWidthFromAbove
      : 300;
  let eyedizzle =
    fillPatternId && typeof fillPatternId !== "undefined"
      ? fillPatternId
      : "iDizzle";

  return (
    <pattern
      className={eyedizzle}
      id={
        "pattern-logo" +
        (typeof patternLogoUrlId !== "undefined" ? patternLogoUrlId : "")
      }
      viewBox={currentSvg.vb}
      x="0"
      y="0"
      width={patternWidth}
      height={(patternWidth * currentSvg.vb[3]) / currentSvg.vb[2]}
      patternUnits="userSpaceOnUse"
    >
      {typeof currentSvg.rects !== "undefined" &&
        Array.isArray(currentSvg.rects) &&
        currentSvg.rects.length > 0 &&
        Object.keys(currentSvg.rects[0]).length > 0 &&
        currentSvg.rects.map((rect, cInd) => {
          return (
            <rect
              key={cInd + "cirddcKey"}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill={rect.fill}
            />
          );
        })}

      {currentSvg.grps.map((currentGroup, currGrpIndex) => (
        <g
          key={"svgGroup" + currGrpIndex}
          transform={
            currentGroup.transform ? currentGroup.transform : undefined
          }
        >
          {currentGroup.text && (
            <text
              x={currentGroup.text.x}
              y={currentGroup.text.y}
              className={"small"}
              style={{
                fontSize: currentGroup.text.fontsize,
                color: currentGroup.text.color,
              }}
            >
              {currentGroup.text.characters}
            </text>
          )}

          {currentGroup.paths &&
            currentGroup.paths.map((currentPath, currPathIndex) => {
              return (
                <a
                  id={[
                    "currentGroup",
                    currSvgIndex,
                    currGrpIndex,
                    currPathIndex,
                  ].join("-")}
                  key={"svgPath" + currGrpIndex + "-" + currPathIndex}
                  className="svgClickableA"
                  style={cursorStyleFromAbove}
                >
                  <path
                    stroke={
                      typeof currentPath.stroke !== "undefined"
                        ? currentPath.stroke
                        : ""
                    }
                    strokeWidth={
                      typeof currentPath.strokeWidth !== "undefined"
                        ? currentPath.strokeWidth
                        : ""
                    }
                    d={currentPath.d}
                    fill={
                      currentSvg &&
                      currentSvg.isMaskFillPattern &&
                      typeof currentSvg.isMaskFillPattern !== "undefined"
                        ? `url(#pattern-logo)`
                        : currentPath.fill === "none"
                        ? "none"
                        : currentPath.fill === "red"
                        ? "red"
                        : currentPath.fill &&
                          typeof currentPath.fill !== "undefined" &&
                          currentPath.fill[0] === "#"
                        ? currentPath.fill
                        : "#" + currentPath.fill
                    }
                    transform={
                      typeof currentPath.transform !== "undefined"
                        ? currentPath.transform
                        : ""
                    }
                  />
                </a>
              );
            })}
        </g>
      ))}
    </pattern>
  );
}
