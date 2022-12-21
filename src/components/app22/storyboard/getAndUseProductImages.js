import { getBackgrounds } from "./getImagesForProduct";


export async function getBgFromBucket(currProdNum, currBrand) {

    try {
      let allProdsBgsEtcForItem = await getBackgrounds({
        currProdNum: currProdNum,
        brand: currBrand,
      });
      if (
        !allProdsBgsEtcForItem[0] ||
        !allProdsBgsEtcForItem[0].pensFromBucket
      ) {
        return null;
      }
      let multipleImprintsFromBucket;
      if (allProdsBgsEtcForItem.length > 1) {
        multipleImprintsFromBucket = allProdsBgsEtcForItem.map(
          ({ pensFromBucket }) => pensFromBucket[0]
        );
      }
      if (typeof multipleImprintsFromBucket !== "undefined") {
      }
      let { pensFromBucket, backgroundsFromBucket , verticals } =
        allProdsBgsEtcForItem[0];
      let colorsForItemNumber = pensFromBucket.filter(
        (f) => f.productColorHex && typeof f.productColorHex !== "undefined"
      );
      let overlaysFromBucket = pensFromBucket.filter((f) =>
        /k=OVERLAY/i.test(f.name)
      );
      pensFromBucket = pensFromBucket.map((pen) =>
        pen.imprintLogoVersionDefault &&
        typeof pen.imprintLogoVersionDefault !== "undefined"
          ? pen
          : { ...pen, imprintLogoVersionDefault: "SP1W" }
      );
      pensFromBucket=pensFromBucket.map(m=>({...m,verticals:verticals}))
      pensFromBucket = pensFromBucket.filter(
        (f) => !/k=OVERLAY/i.test(f.name)
      );
      backgroundsFromBucket = backgroundsFromBucket.filter(
        (f) => !/k=OVERLAY/i.test(f.name)
      );
      return {
        multipleImprints: multipleImprintsFromBucket,
        productImages: pensFromBucket,
        backgroundImages: backgroundsFromBucket,
        overlayImages: overlaysFromBucket,
        colorsForItemNumber: colorsForItemNumber,
        verticals: verticals,
      };
    } catch (e) {
      console.log(currProdNum);
      console.log(e);
    }
  };
