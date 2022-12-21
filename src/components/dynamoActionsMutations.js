import API from "@aws-amplify/api";
import {graphqlOperation} from "aws-amplify";
import * as mutations from "../graphql/mutations";

export const createProIdEmail = async (mutant, email, resultid) => {
  return new Promise(async (res, rej) => {
    const forProIdEmail = {
      email: email,
      resultid: resultid,
    };
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations[mutant], { input: forProIdEmail })
      );
      res(response);
    } catch (error) {
      console.log(error);
      rej(false);
    }
  });
};


export const mutateNamed = async ({
  mutationName,
  uid,
  validInputName,
  resultId,
  validImageName,
  resultKey,
  qResultKey,
  logoName,
  email,
  fromCatalogsOrVirtualsPage,
}) => {
  let xdd = new Date();
  let createdAtDayFlt = xdd.setHours(0, 0, 0, 0) / 1000;
  return new Promise(async (res, rej) => {
    let processing =
      fromCatalogsOrVirtualsPage === "virtuals" ? "true" : "false";
    let processed =
      fromCatalogsOrVirtualsPage === "virtuals" ? "true" : "false";
    let vectorized =
      fromCatalogsOrVirtualsPage === "virtuals" ? "true" : "false";

    const forAPI = {
      createdAt: new Date().toISOString(),
      id: uid,
      created_at_flt: Math.round(Date.now() / 1000),
      created_at_flt_day: Math.round(createdAtDayFlt),
      email: email,
      input_name: validInputName,
      result_id: resultId,
      user_name: "un" + resultId,
      img_orig_filename: validImageName,
      img_cloud_url_o: resultKey,
      img_cloud_url: qResultKey,
      named: logoName.toLowerCase(),
      misc_0: logoName.toLowerCase(),
      misc_2: fromCatalogsOrVirtualsPage,
      vectorized: vectorized,
      static: "static",
      processed: processed,
      processing: processing,
    };

    let response;
    try {
      let finalFormatForGraphQL = {
        query: mutations[mutationName],
        variables: { input: forAPI },
      };
      console.log("final: ");
      console.log(finalFormatForGraphQL);
      console.log("ritb4:");
      response = await API.graphql(
        graphqlOperation(mutations[mutationName], { input: forAPI })
      );
      console.log("rit after");
      console.log(response);
      console.log("that was sucxfl resp");
      res(response);
    } catch (error) {
      console.log("ayruh");
      console.log(error);
      console.log("ayruh");
      rej(false);
    }
  });
};


export const createInkLogo = async (
  mutant,
  uid,
  email,
  madeFnNameInput,
  resultId,
  fromPage,
  brandsString,
  madeFnPhone,
  madeFnOrigFn,
  rKey,
  logoName
) => {
  return new Promise(async (res, rej) => {
    const forAPI = {
      id: uid,
      created_at_flt: Math.round(Date.now() / 1000),
      processing_file: "false",
      processed_file: "false",
      proc_at: "String",
      proc_by: "String",
      email: email,
      email2: "webbcustomcatalog@gmail.com",
      input_name: madeFnNameInput,
      result_id: resultId,
      brand: fromPage,
      category: "lb_21",
      brands: brandsString,
      phone: madeFnPhone,
      user_name: resultId,
      img_orig_filename: madeFnOrigFn,
      img_cloud_url_o: rKey,
      logo_named: "wasNamed",
      logo_name: logoName,
      tesseract: "tesseract",
    };
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations[mutant], { input: forAPI })
      );
      res(response);
    } catch (error) {
      console.log(error);
      rej(false);
    }
  });
};

export const updateEarlyStuffs2 = async (
  mutant,
  gqlId,
  email,
  madeFnNameInput,
  brandsString,
  madeFnPhone,
  logoName
) => {
  return new Promise(async (res, rej) => {
    const forAPI = {
      id: gqlId,
      email: email,
      email2: "webbcustomcatalog@gmail.com",
      input_name: madeFnNameInput,
      category: "lb_21",
      brands: brandsString,
      phone: madeFnPhone,
      logo_named: "wasNamed",
      logo_name: logoName,
    };

    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations[mutant], { input: forAPI })
      );
      res(response);
    } catch (error) {
      console.log(error);
      rej(false);
    }
  });
};
