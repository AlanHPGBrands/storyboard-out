import { help } from "../../help.js";
import Storage from "@aws-amplify/storage";
const convert = require("color-convert");

const getSvgTextFromId = ({ id, squarePrefix }) => {
  return new Promise((res, rej) => {
    function mapIdToVersionsAndFetch(iddyLizzerd, squarePrefix) {
      let doodoo = [
          [`public/LOGOS/svgapp/svgs/${iddyLizzerd}/${squarePrefix}newSvgSP1.svg`],
          [`public/LOGOS/svgapp/svgs/${iddyLizzerd}/${squarePrefix}newSvgUNDER.svg`]];

      let googoo = doodoo.map((d) =>
        fetch("https://plodes-bucket20445-dev.s3.amazonaws.com/" + d).then(
          (rr) => rr.text()
        )
      );

      Promise.all(googoo)
        .then((coocoo) => {
          res(coocoo);
        })
        .catch((ero) => {
          rej(console.log(ero));
        });
    }
    if (id &&typeof id !== "undefined" &&squarePrefix &&typeof squarePrefix !== "undefined")
      mapIdToVersionsAndFetch(id, squarePrefix);
  });
};

function getViewBoxFromFull(svgCont) {
  let try00 = /viewBox="([\s\-+.0-9]+?)"/i;
  if (try00.test(svgCont)) {
    return svgCont.match(try00)[1];
  } else if (/width/i.test(svgCont) && /height/i.test(svgCont)) {
    return `0 0 ${svgCont.match(/width="([0-9].+?)"/)[1]} ${
      svgCont.match(/height="([0-9].+?)"/)[1]
    } `;
  } else {
    return false;
  }
}

function getViewBoxFromSvgTag(svgTagCont) {
  if (
    /x="([0-9.]{1,7})"/i.test(svgTagCont) &&
    /y="([0-9.]{1,7})"/i.test(svgTagCont) &&
    /height="([0-9.]{1,7})"/i.test(svgTagCont) &&
    /width="([0-9.]{1,7})"/i.test(svgTagCont)
  ) {
    return [
      parseInt(svgTagCont.match(/x="([0-9.]{1,7})"/i)[1]),
      parseInt(svgTagCont.match(/y="([0-9.]{1,7})"/i)[1]),
      parseInt(svgTagCont.match(/width="([0-9.]{1,7})"/i)[1]),
      parseInt(svgTagCont.match(/height="([0-9.]{1,7})"/i)[1]),
    ];
  } else {
    console.log("no viewBox LIKE props gotten from xyhtwidth regex");
    return false;
  }
}

const maker = ({textySP1,textyUNDER,isMask})=>{
  return new Promise((res, rej)=>{
    let viewBoxyBoy;
    function onceTextyIsSet(text, nam, desc) {
      return new Promise((resolve) => {
        let groupsTexts = [...text.matchAll(/(<g[.\s"0-9\S]+?<\/g>)/g)].map(
          (g) => g[1]
        );
        let transformsFromGroups = groupsTexts.map((c, d) => {
          if (/transform="translate/i.test(c)) {
            return c.match(/transform="(translate\(.*?)"/)[1];
          } else {
            return false;
          }
        });
        let fillsFromGroups = groupsTexts.map((c) => {
          if (/fill="#([0-9a-zA-Z]{3,8})/.test(c)) {
            return c.match(/fill="#([0-9a-zA-Z]{3,8})/)[1];
          } else {
            return false;
          }
        });
        let dsFromGroupsTexts = groupsTexts.map((g, j) =>
          [...g.matchAll(/d="([-,.\s0-9a-zA-Z]+?)"/g)].map((m) => m[1])
        ); //console.log( dsFromGroupsTexts );

        let groupsPolys = [...text.matchAll(/<polygon(.+?)\/>/g)].map(
          (g) => g[1]
        );

        let topPolys = groupsPolys.map((m) => ({
          string: m,
          points: 0,
        }));

        groupsPolys.forEach(
          (g, j) =>
            (topPolys[j]["points"] = [
              ...g.matchAll(/points="([-,.\s0-9a-zA-Z]+?)"/g),
            ].map((m) => m[1])[0])
        );

        let groupsRects = [...text.matchAll(/<rect(.+?)\/>/g)].map((g) => g[1]);

        let topRects = groupsRects.map((m) => ({
          string: m,
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        }));

        groupsRects.forEach(
          (g, j) =>
            (topRects[j]["x"] = [
              ...g.matchAll(/x="([-,.\s0-9a-zA-Z]+?)"/g),
            ].map((m) => m[1])[0])
        );

        groupsRects.forEach(
          (g, j) =>
            (topRects[j]["y"] = [
              ...g.matchAll(/y="([-,.\s0-9a-zA-Z]+?)"/g),
            ].map((m) => m[1])[0])
        );

        groupsRects.forEach(
          (g, j) =>
            (topRects[j]["width"] = [
              ...g.matchAll(/width="([-,.\s0-9a-zA-Z]+?)"/g),
            ].map((m) => m[1])[0])
        );

        groupsRects.forEach(
          (g, j) =>
            (topRects[j]["height"] = [
              ...g.matchAll(/height="([-,.\s0-9a-zA-Z]+?)"/g),
            ].map((m) => m[1])[0])
        );

        let circsFromGroupsTexts = groupsTexts.map((c, j) => ({
          cx: [...c.matchAll(/cx="([-,.\s0-9a-zA-Z]+?)"/g)].map((m) => m[1])[0],
          cy: [...c.matchAll(/cy="([-,.\s0-9a-zA-Z]+?)"/g)].map((m) => m[1])[0],
          r: [...c.matchAll(/r="([-,.\s0-9a-zA-Z]+?)"/g)].map((m) => m[1])[0],
        }));

        let topAssGroups = dsFromGroupsTexts.map((a, b) => {
          return {
            type: "group",
            fill: fillsFromGroups[b],
            transform: transformsFromGroups[b],
            paths: dsFromGroupsTexts[b].map((c) => ({
              type: "path",
              d: c,
              fill: fillsFromGroups[b] ? fillsFromGroups[b] : false,
            })),
            circles: circsFromGroupsTexts,
          };
        });

        let flatDsFromGroupsTexts = [];

        dsFromGroupsTexts.forEach((g) => {
          g.forEach((i, j) => {
            flatDsFromGroupsTexts.push(i);
          });
        });
        let pathsTexts = [...text.toString().matchAll(/<path(.|\n)*?>/g)].map(
          (m) => m[0]
        );
        let dsFromPathsTexts = pathsTexts.map((p) =>
          /d="([-.\s0-9a-zA-Z]+?)"/.test(p)
            ? p.match(/d="([-.\s0-9a-zA-Z]+?)"/)[1]
            : "blank"
        );
        let filteredDsFromPathsTexts = dsFromPathsTexts.filter(
          (p) => !flatDsFromGroupsTexts.includes(p)
        );
        let viewboxer = getViewBoxFromFull(text)
          ? getViewBoxFromFull(text).split(" ")
          : getViewBoxFromSvgTag(text)
          ? getViewBoxFromSvgTag(text)
          : [];
        let aspectRatio = viewboxer[2] / viewboxer[3];
        let colors = fillsFromGroups
          .map((fill) => (fill[0] === "#" ? fill : "#" + fill))
          .reduce(
            (unique, item) =>
              unique.includes(item) ? unique : [...unique, item],
            []
          );
        let colorsCopyForLumSort = JSON.parse(JSON.stringify(colors));
        colors.push("#ffffff");
        colors.push("#000000");
        let colorsSortedByLuminence = colorsCopyForLumSort.sort((a, b) => {
          let hslOfA = convert.hex.hsl(a);
          let hslOfB = convert.hex.hsl(b);
          return hslOfA[2] > hslOfB[2] ? -1 : hslOfA[2] < hslOfB[2] ? 1 : 0;
        });
        let whitey =
          colorsSortedByLuminence.length > 2 &&
          convert.hex.hsl(colorsSortedByLuminence[0])[2] > 0.95
            ? colorsSortedByLuminence[1]
            : typeof colorsSortedByLuminence[0] !== "undefined"
            ? colorsSortedByLuminence[0]
            : "#f7f5f5";
        let blackey =
          colorsSortedByLuminence.length > 3 &&
          convert.hex.hsl(colorsSortedByLuminence[0])[2] > 0.95
            ? colorsSortedByLuminence[colorsSortedByLuminence.length - 2]
            : typeof colorsSortedByLuminence[
                colorsSortedByLuminence.length - 1
              ] !== "undefined"
            ? colorsSortedByLuminence[colorsSortedByLuminence.length - 1]
            : "#040404";
        colors = colorsCopyForLumSort;
        topAssGroups = topAssGroups.filter((f) => f.paths.length > 0);

        let name = typeof nam !== "undefined" ? nam : "generic";

        let retObj = {
          nm: name,
          dsc: typeof desc !== "undefined" ? desc : "generic",
          vb: viewboxer,
          grps: topAssGroups,
          circs:
            typeof circsFromGroupsTexts !== "undefined"
              ? circsFromGroupsTexts
              : false,
          pths: filteredDsFromPathsTexts,
          clrs: colors,
          nitClrs: colors,
          initClr: colors[0],
          whitest: whitey,
          blackest: blackey,
          aRatio: aspectRatio,
          rects: typeof topRects !== "undefined" ? topRects : false,
          polys: typeof topPolys !== "undefined" ? topPolys : false,
        };
        resolve(retObj);
      });
    }

    function transformFullColorToOneColor(ojt, theOneColor) {
      let tempOjt = JSON.parse(JSON.stringify(ojt));
      tempOjt.grps = tempOjt.grps.map((a, b) => ({
        ...a,
        fill: theOneColor,
        paths: tempOjt.grps[b].paths.map((c, d) => ({
          ...tempOjt.grps[b].paths[d],
          fill: theOneColor,
        })),
      }));
      return tempOjt;
    }

    function switchOneColorWithWhite(ojt, colorVrom) {
      let colorFrom = typeof colorVrom !== "undefined" ? colorVrom : "#d8d8d8";
      let tempOjt = JSON.parse(JSON.stringify(ojt));
      let sliceReggie = new RegExp(colorFrom.toString().slice(1), "i");
      tempOjt.grps = tempOjt.grps.map((a, b) => ({
        ...a,
        fill: sliceReggie.test(a.fill) ? "ffffff" : a.fill,
        paths: tempOjt.grps[b].paths.map((c, d) => ({
          ...tempOjt.grps[b].paths[d],
          fill: sliceReggie.test(a.fill) ? "ffffff" : a.fill,
        })),
      }));
      return tempOjt;
    }

    let svgsPropsArray2 = [
      {
        svgContent: textySP1,
        name: "SP1",
        description: "Multicolor on Light",
      },
      {
        svgContent: textySP1,
        name: "SP1W",
        description: "Multicolor on Dark",
      },
      {
        svgContent: textySP1,
        name: "SP1W2",
        description: "Multicolor on Dark 2",
      },
      {
        svgContent: textySP1,
        name: "1CPOP",
        description: "One Color on Light",
      },
      {
        svgContent: textySP1,
        name: "1CVIBE",
        description: "One Color on Dark",
      },
      {
        svgContent: textySP1,
        name: "1CW",
        description: "One Color White",
      },
      {
        svgContent: textySP1,
        name: "1CB",
        description: "One Color Black",
      },
      {
        svgContent: textyUNDER,
        name: "UNDER",
        description: "White Underlay",
      },
    ];
    const svgPM = {};
    svgsPropsArray2.forEach((s, t) => {
      svgPM[s.name] = t;
    });

    if (textySP1 && textyUNDER) {
      let processedSvgTexts = svgsPropsArray2.map((x) =>
        onceTextyIsSet(x.svgContent, x.name, x.description)
      );
      Promise.all(processedSvgTexts)
        .then((resultyWulties) => {
            if (isMask === "isMask") {
              resultyWulties = resultyWulties.map((m) =>
                transformFullColorToOneColor(m, "#ffffff")
              );
            }
            if (Array.isArray(resultyWulties) && resultyWulties.length > 0) {
                // SP1W
              if (
                typeof resultyWulties[svgPM["SP1W"]] !== "undefined" &&
                resultyWulties[svgPM["SP1W"]].blackest &&
                typeof resultyWulties[svgPM["SP1W"]].blackest !== "undefined"
              ) {
                resultyWulties[svgPM["SP1W"]] = switchOneColorWithWhite(
                  resultyWulties[svgPM["SP1W"]],
                  resultyWulties[svgPM["SP1W"]].blackest
                );
              }
                // SP1W2
                if (
                typeof resultyWulties[svgPM["SP1W2"]] !== "undefined" &&
                resultyWulties[svgPM["SP1W2"]].whitest &&
                typeof resultyWulties[svgPM["SP1W2"]].whitest !== "undefined"
              ) {
                console.log("BABABABABBBASDBFBASDBFSDBF");
                resultyWulties[svgPM["SP1W2"]] = switchOneColorWithWhite(
                  resultyWulties[svgPM["SP1W2"]],
                  resultyWulties[svgPM["SP1W2"]].whitest
                );
              }

                // 1CPOP
                if (typeof resultyWulties[svgPM["SP1"]] !== "undefined") {
                resultyWulties[svgPM["1CPOP"]] = transformFullColorToOneColor(
                  resultyWulties[svgPM["1CPOP"]],
                  resultyWulties[svgPM["1CPOP"]].blackest
                );
              }

                // 1CVIBE
                // 1CW
                // 1CB  (BLACK)
              if (
                typeof resultyWulties[svgPM["SP1W"]] !== "undefined" &&
                resultyWulties[svgPM["SP1W"]].whitest &&
                typeof resultyWulties[svgPM["SP1W"]].whitest !== "undefined"
              ) {
                resultyWulties[svgPM["1CVIBE"]] = transformFullColorToOneColor(
                  resultyWulties[svgPM["1CVIBE"]],
                  resultyWulties[svgPM["1CVIBE"]].whitest
                );
                resultyWulties[svgPM["1CW"]] = transformFullColorToOneColor(
                  resultyWulties[svgPM["1CW"]],
                  "#ffffff"
                );
                resultyWulties[svgPM["1CB"]] = transformFullColorToOneColor(
                  resultyWulties[svgPM["1CB"]],
                  "#000000"
                );
                resultyWulties[svgPM["SP1"]].mainColor =resultyWulties[svgPM["SP1W"]].blackest;
                resultyWulties[svgPM["SP1W"]].mainColor =resultyWulties[svgPM["SP1W"]].blackest;
                resultyWulties[svgPM["SP1W2"]].mainColor =resultyWulties[svgPM["SP1W2"]].whitest;

                resultyWulties[0].nitClrs.forEach((clr) => {
                  let elch=convert.hex.lch(clr);
                  console.log(
                    "%c Oh my heavens! " + clr + ' L:' +elch[0] + ' C:' +elch[1] + ' H:' +elch[2] ,
                    "background: " + clr + "; color: #fff"
                  );
                });

                let nextColor = resultyWulties[0].nitClrs.filter(
                  (f) =>
                    f !== "#ffffff" &&
                    f !== "#000000" &&
                    f !== resultyWulties[svgPM["SP1W"]].blackest &&
                    f !== resultyWulties[svgPM["SP1W2"]].whitest
                );

                if (nextColor.length > 0) {
                  resultyWulties.push({
                    ...switchOneColorWithWhite(
                      JSON.parse(JSON.stringify(resultyWulties[svgPM["SP1"]])),
                      nextColor[0]
                    ),
                    nm: "SP1W3",
                    dsc: "Multicolor on Dark 3",
                    mainColor: nextColor[0],
                  });
                  svgsPropsArray2.push({
                    ...svgsPropsArray2.filter((f) => f.name === "SP1W2")[0],
                    description: "Multicolor on Dark 3",
                    name: "SP1W3",
                  });
                }

                if (nextColor.length > 1) {
                  resultyWulties.push({
                    ...switchOneColorWithWhite(
                      JSON.parse(JSON.stringify(resultyWulties[svgPM["SP1"]])),
                      nextColor[1]
                    ),
                    nm: "SP1W4",
                    dsc: "Multicolor on Dark 4",
                    mainColor: nextColor[1],
                  });
                  svgsPropsArray2.push({
                    ...svgsPropsArray2.filter((f) => f.name === "SP1W2")[0],
                    description: "Multicolor on Dark 4",
                    name: "SP1W4",
                  });
                }

                resultyWulties[svgPM["1CPOP"]].mainColor =resultyWulties[svgPM["1CPOP"]].blackest;
                resultyWulties[svgPM["1CVIBE"]].mainColor =resultyWulties[svgPM["1CVIBE"]].whitest;
                resultyWulties[svgPM["1CW"]].mainColor = "#ffffff";
                resultyWulties[svgPM["1CB"]].mainColor = "#000000";

                
                let colorsToFilterOutLum = resultyWulties[0].nitClrs.filter(c=>convert.hex.lch(c)[0]<33);
                console.log('TAKING OUT COLORS BC LUM: ' + colorsToFilterOutLum);
                    
                const addingSp1lum=true;

                if (addingSp1lum) {
                    let tempy = JSON.parse(JSON.stringify(resultyWulties[svgPM["SP1"]]));
                    for (let i = 0; i < colorsToFilterOutLum.length; i++) {
                      let fe = colorsToFilterOutLum[i];
                      tempy = switchOneColorWithWhite(tempy, fe);
                    }
                    resultyWulties.push({
                        ...tempy,
                      nm: "SP1LUM",
                      dsc: "Multicolor on Dark No Darks",
                      mainColor: colorsToFilterOutLum.length>0?colorsToFilterOutLum[0]:'none',
                    });
                    svgsPropsArray2.push({
                      ...svgsPropsArray2.filter((f) => f.name === "SP1")[0],
                      description: "Multicolor on Dark No Darks",
                      name: "SP1LUM",
                    });
                  }


                viewBoxyBoy = [
                  resultyWulties[2].vb[2],
                  resultyWulties[2].vb[3],
                ];

        
                console.log(colorsToFilterOutLum);

                let sp1wResulties=JSON.parse(JSON.stringify(resultyWulties)).filter((f)=>/SP1W/i.test(f.nm));
                  
                        
// const replacements=[
//   {from:  /XXXBACKXXX/ig,           to:     obj.item_number.toUpperCase()             },
//   {from:  /XXXOVERLAYXXX/ig,        to:  `${obj.item_number.toUpperCase()}_OVER`      },
//   {from:  /XXXPENXXX_POPMATCH/ig,   to:  `${obj.item_number.toUpperCase()}_POPMATCH`  },
//   {from:  /XXXTITLEXXX/ig,          to:     obj.item_name                             },
//   {from:  /XXXNUMBERXXX/ig,         to:     obj.item_number.toUpperCase()             },
//   {from:  /XXXPATENTXXX/ig,         to:     obj.patent.toUpperCase()                  },
//   {from:  /XXXCATEGORYXXX/ig,       to:     obj.category                              },
//   {from:  /XXXLOGOXXX/ig,           to:     'SP1'},
// ];
// const replacementReducer = (accumulated, {from,to}) => accumulated.replace(from,to);
// let newFileContents120InitialValue=JSON.parse(JSON.stringify(newPlaceholderNORO));
// let newFileContents120=replacements.reduce(replacementReducer,newFileContents120InitialValue);
let genInitialSp1w=logoSvg=>JSON.parse(JSON.stringify(logoSvg));

const replacementReducer = (accumulated,colorToFilterOut) => switchOneColorWithWhite(accumulated,colorToFilterOut);

let sp1wResultiesSansDarks=sp1wResulties.map(m=>{
  let newFileContents120=colorsToFilterOutLum.reduce(replacementReducer,genInitialSp1w(m));
  return newFileContents120;
});

              // let abc=colorsToFilterOutLum.reduce(replacementReducer,initialSp1w);
                // let darkLumsToWhiteResulties = sp1wResulties
                //   .map((m) => {
                //     let tempy = JSON.parse(JSON.stringify(m));
                //     for (let i = 0; i < colorsToFilterOutLum.length; i++) {
                //       let fe = colorsToFilterOutLum[i];
                //       tempy = switchOneColorWithWhite(tempy, fe);
                //     }
                //     return tempy;
                //   });

                let nonSp1wResulties = JSON.parse(JSON.stringify(resultyWulties))
                  .filter(f=>!/SP1W/i.test(f.nm));
 
                let combinedSvgs = [
                  ...nonSp1wResulties,
                  //   ...darkLumsToWhiteResulties,
                  ...sp1wResultiesSansDarks,
                  // ...sp1wResulties,
                ];
                let resObj = {
                  svgs: combinedSvgs,
                  svgsPropsArray: svgsPropsArray2,
                  viewBoxy: viewBoxyBoy,
                  whiteUnderlay: resultyWulties.filter(
                    (g, h) => h === svgPM["UNDER"]
                  ),
                };
                res(resObj);
              }
            }
        })
        .catch((reo) => {
          console.log(reo);
          rej(reo);
        });
    }
  });
};

export async function getSvg(rid) {
  let svgFolderBucket = "LOGOS/svgapp/svgs/";
  let svgFilenameBucket = "unSquarenewSvgSP1";
  let getVersionsOfSvg = await Storage.list(svgFolderBucket + rid + "/");
  let regMatch = new RegExp(svgFilenameBucket, "i");
  let fileVersionsList = [];
  let latestVersionNumber;
  getVersionsOfSvg.forEach((file, idx) => {
    if (regMatch.test(file.key)) {
      if (/_v([0-9]{1,9})\.svg/i.test(file.key)) {
        fileVersionsList.push(
          parseInt(file.key.match(/_v([0-9]{1,9})\.svg/)[1])
        );
      }
      latestVersionNumber = fileVersionsList.includes(1)
        ? Math.max(...fileVersionsList)
        : undefined;
    }
  });
  return latestVersionNumber;
}

export async function getAndMakeInitial({
  id,
  setErrorMessage,
  setCurrentResultId,
}) {
  return new Promise(async (res, rej) => {
    let sp1Text, underText;
    console.log("DOING OLD GOOD VERSION : UNDER RETURNED FRIST");
    [sp1Text, underText] = await getSvgTextFromId({
      id: id,
      squarePrefix: "unSquare",
    });

    if (/The specified key does not exist/i.test(sp1Text)) {
      setErrorMessage("That logo is currently unavailable.");
      setCurrentResultId(null);
      setTimeout(()=>{setErrorMessage(null);},3000);
    } else {
      let madeSvgs;
      try {
        madeSvgs = await maker({
          textySP1: sp1Text,
          textyUNDER: underText,
          help: help,
        });
      } catch (e){
        console.log(e);
      }
      let filteredSvgs =
        madeSvgs.svgs.filter(
          (f) =>
            f.nm === "SP1" ||
            f.nm === "SP1W" ||
            f.nm === "SP1W2" ||
            f.nm === "SP1W3" ||
            f.nm === "SP1W4" ||
            f.nm === "SP1W5" ||
            f.nm === "1CVIBE" ||
            f.nm === "1CPOP" ||
            f.nm === "1CW" ||
            f.nm === "1CB" ||
            f.nm === "SP1LUM" ||
            f.nm === "1C" ||
            f.nm === "1CU"
        );
      let filteredSvgsPropsArray =
        madeSvgs.svgsPropsArray.filter(
          (f) =>
            f.name === "SP1" ||
            f.name === "SP1W" ||
            f.name === "SP1W2" ||
            f.name === "SP1W3" ||
            f.name === "SP1W4" ||
            f.name === "SP1W5" ||
            f.name === "1CVIBE" ||
            f.name === "1CPOP" ||
            f.name === "1CW" ||
            f.name === "1CB" ||
            f.name === "SP1LUM" ||
            f.name === "1C" ||
            f.name === "1CU"
        );
      let makingQuadrupleSvg = true;
      let svgPatternoPutos;
      if (makingQuadrupleSvg) {
        let quads_PLURAL = [];
        let quadSvg = {};
        let quadSvg2 = {};
        let quadSvgUnder = {};
        let startSvg = JSON.parse(JSON.stringify(filteredSvgs[0]));
        let startSvgWhiteUnderlay = JSON.parse(
          JSON.stringify(madeSvgs.whiteUnderlay[0])
        );
        let paddingBetweenEach = 0.2;
        let totalPaddingX =
        (paddingBetweenEach / 2) * parseInt(filteredSvgs[0].vb[2]) +
          paddingBetweenEach * parseInt(filteredSvgs[0].vb[2]);
        let initialGrpsObject = [{
            paths: [],
            transform: "",
          }];
        quadSvg2["grps"] = initialGrpsObject;
        quadSvgUnder["grps"] = [{
            paths: [],
            transform: "",
          }];
        let quadrantPattern = [1, 4];
        [1, 2, 3, 4].forEach((quadrant) => {
          let addMatrix = ([x, y], vbw, vbh) =>
            quadrant === 1
              ? [ x + 0 + (paddingBetweenEach / 2) * vbw,
                  y + 0 + (paddingBetweenEach / 2) * vbw]
              : quadrant === 2
              ? [x + vbw + paddingBetweenEach * vbw,
                 y + 0 + (paddingBetweenEach / 2) * vbw]
              : quadrant === 3
              ? [ x + 0 + (paddingBetweenEach / 2) * vbw,
                  y + vbh + paddingBetweenEach * vbw]
              : [ x + vbw + paddingBetweenEach * vbw,
                  y + vbh + paddingBetweenEach * vbw];
          function fromStartSvgToQuad(startSvg) {
            let svgQuadVersion = {};
            svgQuadVersion["grps"] = initialGrpsObject;
            startSvg.grps.forEach((grp, grpIdx) => {
              if (!quadrantPattern.includes(quadrant)) return;
              let tt = grp.transform;
              if (/translate\(([0-9-,.]{1,25})\)/i.test(tt)) {
                let pret = tt.match(/translate\(([0-9-,.]{1,25})\)/i)[1];
                let startTranslate = [
                  parseInt(pret.split(",")[0]),
                  parseInt(pret.split(",")[1]),
                ];
                let newScale = "";
                if (/scale\(([0-9-,.]{1,25})\)/i.test(tt)) {
                  newScale = tt.match(/scale\(([0-9-,.]{1,25})\)/i)[1];
                }
                let newTranslate = addMatrix(
                  startTranslate,
                  parseInt(filteredSvgs[0].vb[2]),
                  parseInt(filteredSvgs[0].vb[3])
                );
                let newQGroup = {
                  ...grp,
                  paths: grp.paths.map((m) => {
                    return {
                      ...m,
                      fill: m.fill,
                      origFill: m.fill,
                    };
                  }),
                  transform:
                    "translate(" +
                    newTranslate.join(",") +
                    ") scale(" +
                    newScale +
                    ")",
                };
                svgQuadVersion.grps.push(newQGroup);
              }
            });
            return svgQuadVersion;
          }
          quadSvg = fromStartSvgToQuad(startSvg);
          quads_PLURAL = ["#ffffff", ...filteredSvgs[0].nitClrs].map(
            (tickled, tIdx) => ({
              ...fromStartSvgToQuad(startSvg),
              name: "pattern" + tIdx,
              mainColor: tickled,
              vb: startSvg.vb.map(
                (m) => parseInt(m) * 2 + (m !== "0" ? totalPaddingX : "0")
              ),
              rects: [
                {
                  type: "rect",
                  width: parseInt(startSvg.vb[2]) * 2 + totalPaddingX,
                  height: parseInt(startSvg.vb[3]) * 2 + totalPaddingX,
                  fill: tickled,
                },
              ],
              grps: quadSvg2.grps.map((m) => ({
                ...m,
                fill: "#" + m.fill === tickled ? "ffffff" : m.fill,
                paths: m.paths.map((p) => ({
                  ...p,
                  fill: "#" + p.fill === tickled ? "ffffff" : p.fill,
                })),
              })),
            })
          );
        });
        quads_PLURAL = svgPatternoPutos;
      }
      let returnObject = {
        svgs: filteredSvgs,
        svgsPropsArray: filteredSvgsPropsArray,
      };
      console.log(returnObject);
      res(returnObject);
    }
  });
}
