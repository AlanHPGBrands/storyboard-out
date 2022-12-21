import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

export default function Ids(props) {
  const {
    idFromUrl,
    idRedoUrl,
    brandCoversOjet,
    listBuckets,
    searchin,
    queryListForIds,
  } = props;
  const [matchingIds, setMatchingIds] = useState([]);
  const [weAGo, setWeAGo] = useState(false);
  const one23 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
    78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
    88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
    98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
    108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
  ];

  useEffect(() => {
    function scanFinalsBucketsRoute(givenListBuckets, givenOne23) {
      if (idFromUrl) {
        const g = new RegExp(idFromUrl);
        let tempState = [];
        let bempState = {};
        let hh = [];
        let queryBuckets = [];
        Object.keys(givenListBuckets).forEach((a) => {
          if (
            typeof givenListBuckets[a]["range"] !== "undefined" &&
            Array.isArray(givenListBuckets[a].range) &&
            givenListBuckets[a].range.length > 1
          ) {
            givenOne23
              .slice(givenListBuckets[a].range[0], givenListBuckets[a].range[1])
              .forEach((c) => {
                var bucketFolder = "FINALS/CATALOGS/" + a + c;
                queryBuckets.push(bucketFolder);
              });
          }
        });

        tempState = queryBuckets.map((q) => Storage.list(q));
        Promise.all(tempState)
          .then((y) => {
            y.forEach((yy, by) => {
              var gee =
                typeof yy[1] !== "undefined"
                  ? "y" + yy[1].key.split("/").slice(-2, -1)
                  : "y" + by.toString();
              bempState[gee] = yy;
              yy.forEach((e) => {
                var idFromKey = /-(.+)pdf/i.test(e.key)
                  ? e.key.substring(
                      e.key.lastIndexOf("-") + 1,
                      e.key.lastIndexOf(".")
                    )
                  : "asdf";
                if (g.test(e.key)) {
                  if (idFromKey.toString().trim() === idFromUrl.toString().trim()) {
                    hh.push(e.key);
                  }
                }
              });

              if (hh.length > 0) {
                setMatchingIds(hh);
                setWeAGo(true);
              }
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }

    function redoScanBuckets(givenListBuckets, givenOne23, iiddd) {
      if (iiddd) {
        const g = new RegExp(iiddd);
        let bempState = {};
        let hh = [];
        let tempState = givenListBuckets.map((q) => Storage.list(q));

        Promise.all(tempState)
          .then((y) => {
            y.forEach((yy, by) => {
              var gee =
                typeof yy[1] !== "undefined"
                  ? "y" + yy[1].key.split("/").slice(-2, -1)
                  : "y" + by.toString();
              bempState[gee] = yy;
              yy.forEach((e) => {
                var idFromKey = /-(.+)pdf/i.test(e.key)
                  ? e.key.substring(
                      e.key.lastIndexOf("-") + 1,
                      e.key.lastIndexOf(".")
                    )
                  : "asdf";
                if (g.test(e.key)) {
                  if (idFromKey.toString().trim() === iiddd.toString().trim()) {
                    hh.push(e.key);
                  }
                }
              });
              if (hh.length > 0) {
                setMatchingIds(hh);
                setWeAGo(true);
              }
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
    async function gqlQueryResultIdFunction(resultId) {
      let res1;
      let dbMatchcGetFiles = [];
      let idReg =
        typeof idFromUrl !== "undefined" ? new RegExp(idFromUrl) : /asdf/;
      const queryList = queryListForIds;
      try {
        let starter = queryList[0];
        let atKeyQwerty = starter[0];
        let bigQwery = await API.graphql(
          graphqlOperation(queries[atKeyQwerty], { [starter[1]]: resultId })
        );
        res1 = bigQwery.data[atKeyQwerty].items[0];
        if (
          res1 &&
          res1["proc_by"] &&
          typeof res1["proc_by"] !== "undefined" &&
          /FINALS/i.test(res1["proc_by"])
        ) {
          let arrayOfFinals = JSON.parse(res1["proc_by"]);
          dbMatchcGetFiles = arrayOfFinals;
        } else {
          if (Object.keys(res1).length > 0) {
            let bucketPathSplit = res1.img_cloud_url_o.split("/");
            let finalsBucket = bucketPathSplit;
            finalsBucket.pop();
            finalsBucket.shift();
            finalsBucket = finalsBucket.join("/");
            var newqry = await Storage.list("FINALS/CATALOGS/" + finalsBucket);
            newqry.forEach((a) => {
              if (idReg.test(a.key)) {
                dbMatchcGetFiles.push(a.key);
              }
            });
          }
        }
      } catch (sec) {
        console.log(sec);
      }

      if (dbMatchcGetFiles.length > 0) {
        setMatchingIds(dbMatchcGetFiles);
        setWeAGo(true);
      } else {
        scanFinalsBucketsRoute(listBuckets, one23); // S E C ON d o P C I on ! ## 2 # 2
      }
    }

    if (idRedoUrl) {
      redoScanBuckets(
        ["FINALS/CATALOGS/GHOSTSCRIPT/" + idRedoUrl + "/"],
        one23,
        idRedoUrl
      );
    } else {
      try {
        gqlQueryResultIdFunction(idFromUrl);
      } catch (e) {
        scanFinalsBucketsRoute(listBuckets, one23);
      }
    }
  }, []);

  const titleStyles = [
      {  fontWeight: 700,  display: "inline",  color: "#636b73",},
      {  fontWeight: 700,  display: "inline",  color: "#636b73",},
      {  fontWeight: 400,  display: "inline",  fontSize: "1.2rem",},
      {  fontWeight: 700,  display: "inline",},
      {  fontWeight: 700,  display: "inline",},
      {  fontWeight: 700,  display: "inline",},
      {  fontWeight: 400,  display: "inline",  fontSize: "1.2rem",},
      {  fontWeight: 700,  display: "inline",  fontSize: "1rem",},
      {  fontWeight: 400,  display: "inline",  fontSize: "1.2rem",},
      {  fontWeight: 700,  display: "inline",  fontSize: "1.2rem",},
      {  fontWeight: 400,  display: "inline",  fontSize: "1.2rem",},
  ];

  return (
    <Col>
      <Row>
        <Col xs={1}></Col>
        <Col
          xs={10}
          style={{ textAlign: "center", fontSize: "1rem" }}
        >
          <br />
          Your catalogs will display as they are processed.
          <br /><br />
        </Col>
        <Col xs={1}></Col>
      </Row>

      <Row>
        {weAGo ? (
          matchingIds.map((aa, bb) => {
            if (!/https/.test(aa)) {
              aa ="https://plodes-bucket20445-dev.s3.amazonaws.com/public/" + aa;
            }
            const fn = aa.toString().substring(0, aa.indexOf(".pdf") + 4);
            const fn2 = fn.substring(fn.lastIndexOf("/") + 1);
            const title = fn2.slice(0, fn2.length - 4).split("-");
            const fn3 = fn2.substring(0, fn2.indexOf("-")).toLowerCase() + "_lb21";
            const hite = 250;
            if (typeof brandCoversOjet[fn3] === "undefined") {
              return null;
            }

            return (
              <Col
                key={bb.toString() + "colLingk"}
                style={{ textAlign: "center" }}
              >
                <Row
                  key={bb.toString() + "rowLingk" + bb.toString()}
                  style={{
                    padding: ".25rem",
                    textAlign: "center",
                  }}
                >
                  <Col style={{ marginRight: "auto", marginLeft: "auto" }}>
                    {title.map((a, b) => (
                      <span
                        key={"resTitle" + b.toString()}
                        style={titleStyles[b]}
                      >
                        { /22/.test(title[0]) && /2021lookbook/i.test(a) ? "": a}{" "}
                      </span>
                    ))}
                  </Col>
                </Row>

                <Row style={{ marginBottom: "2rem" }}>
                  <Col>
                    <a
                      href={aa.toString()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image height={hite} src={brandCoversOjet[fn3][1]} />
                    </a>
                  </Col>
                </Row>
              </Col>
            );
          })
        ) : (
          <Col>
            <h4>Looking for your catalogs ...</h4>
            <br /><br />
            <Image src={searchin} width="180" alt="searchin icon" />
            <br /><br /><br />
          </Col>
        )}
      </Row>

      <Row style={{ marginTop: "1rem" }}>
        <Col xs={1} ></Col>
        <Col
          xs={10}
          sm={10}
          md={10}
          lg={10}
          xl={10}
          style={{ textAlign: "center", fontSize: "1rem" }}
        >
          <br />
          <br />
          Your catalogs will be available here for 7 days from submission.
          <br />
          <br />
        </Col>
        <Col xs={1}></Col>
      </Row>

      <Row style={{ marginTop: "20px" }}>
        <Col>Thanks!</Col>
      </Row>

      {idFromUrl && (
        <Row
          style={{
            marginTop: "80px",
          }}
        >
          <span
            style={{
              fontWeight: "400",
              fontSize: ".8rem",
            }}
          >
            Logo I.D. : &nbsp;&nbsp;
          </span>

          <span
            style={{
              fontWeight: "600",
              fontSize: "1.05rem",
            }}
          >
            {idFromUrl}
          </span>
        </Row>
      )}

      <Row>
        <Col>
          <a
            style={{
              fontSize: ".5rem",
              color: "#5310fe",
              position: "fixed",
              opacity: ".5",
              textDecoration: "none",
              bottom: "0px",
              right: "0px",
              width: "60px",
              height: "60px",
            }}
            className="hiddenLink"
            href={"./?ird=" + idFromUrl}
          >
            .
          </a>
        </Col>
      </Row>
    </Col>
  );
}
