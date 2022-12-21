import React, { useRef, useState, useEffect } from "react";
import { Alert, Row, Card, Col, Form, Button } from "react-bootstrap";
import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { rando, mkFilename, def } from "./helpers";
import { storeEarlyImage, dbEarly } from "../../utils/earlies";
import { mutateNamed } from "../dynamoActionsMutations.js";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "../../graphql/subscriptions";

const AddToLibrarySub = ({
  yesAdd,
  setYesAdd,
  totalProcessingTime,
  added,
  setLogoInputValue,
  handleAddLogo,
  logoInputValue,
  forNamedDb,
  setAdded,
}) => {
  if (!totalProcessingTime || added) { return null; }
  return (
    <div style={{ fontSize: ".9rem", fontWeight: 600 }}>
      {"Logo successfully processed!"}
      <br />
      {"Took " + totalProcessingTime + " seconds."}
      <br />
      <div style={{ fontSize: "1rem", color: "red" }}>
        {"Would you like to add your logo to the library for future visits?"}
        <br />
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label=""
            onChange={() => {
              setYesAdd(true);
              console.log("changedted dat");
            }}
          />
        </Form>
      </div>
      {yesAdd && (
        <Row>
          <Col>
            <Form.Group
              key={"versdtsNameinput"}
              controlId={"exampleFffoggrontrolInput" + "virt"}
            >
              <br />
              <Form.Label
                id={"virtnameinput" + "id"}
                style={{
                  letterSpacing: ".065rem",
                }}
              >
                {"Logo Name (Brand)"}
              </Form.Label>
              <Form.Control
                style={{
                  maxWidth: "400px",
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: ".9rem",
                  padding: ".2rem .3rem",
                }}
                onChange={(event) => {
                  setLogoInputValue(event.target.value);
                }}
                type={"logoname"}
                placeholder={"logo name"}
                size="md"
              />
            </Form.Group>
            <Button
              variant="outline-secondary btn-hpg"
              style={{
                fontSize: ".8rem",
                padding: ".15rem .25rem",
              }}
              onClick={() => {
                handleAddLogo(
                  JSON.parse(JSON.stringify(logoInputValue)),
                  forNamedDb,
                  setAdded
                );
              }}
            >
              {"Add Logo"}
            </Button>
          </Col>
        </Row>
      )}
    </div>);
};

const InputUploadForVirts = ({
  imageIsProcessing,
  totalProcessingTime,
  nameIdFromAbove,
  termsAccepted,
  multipleAttributeFromAbove,
  setImageIsProcessing,
  setProcessingStartTime,
  extraHandler,
  setEarlyImg,
  handleImageInput,
}) => {
  return (
    <Row>
      <Col>
        {!imageIsProcessing && !totalProcessingTime && (
          <label
            style={{ fontWeight: 600, opacity: termsAccepted ? 1 : 0.5 }}
            id={"cloud" + def(nameIdFromAbove) ? nameIdFromAbove : "X"}
            htmlFor={def(nameIdFromAbove) ? nameIdFromAbove : "X"}
          >
            <>
              <svg
                style={{
                  width: "30px",
                  cursor: termsAccepted ? "pointer" : "default",
                }}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Solid">
                  <path d="m182.461 155.48 49.539-49.539v262.059a24 24 0 0 0 48 0v-262.059l49.539 49.539a24 24 0 1 0 33.941-33.941l-90.509-90.51a24 24 0 0 0 -33.942 0l-90.509 90.51a24 24 0 1 0 33.941 33.941z" />
                  <path d="m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z" />
                </g>
              </svg>
              <br />
              {"Upload a New Logo"}
            </>
          </label>
        )}

        <input
          style={{
            fontWeight: 600,
            opacity: termsAccepted ? 1 : 0.2,
            color: termsAccepted ? "black" : "lightgray",
          }}
          name={def(nameIdFromAbove) ? nameIdFromAbove : "X"}
          id={def(nameIdFromAbove) ? nameIdFromAbove : "X"}
          type="file"
          accept="image/*,.pdf,.ai,.eps"
          className="visually-hidden"
          disabled={!termsAccepted}
          multiple={multipleAttributeFromAbove}
          onClick={() => {
            if (termsAccepted) {
              setImageIsProcessing(true);
            } else {
              console.log("need to accept terms");
            }
          }}
          onChange={(event) => {
            setProcessingStartTime(Date.now());
            if (Object.keys(event.target.files).length < 1) {
              return false;
            }
            let mappedFiles = event.target.files[0]
              ? Object.keys(event.target.files).map(
                  (k) => event.target.files[k]
                )
              : [];
            console.log(mappedFiles);
            if (typeof extraHandler !== "undefined") {
              extraHandler(mappedFiles);
            }
            setEarlyImg(mappedFiles);
            handleImageInput(mappedFiles);
          }}
        />
      </Col>
    </Row>
  );
};

const RealTimeBaby = ({ realtime, added }) => {
  if (!realtime || added) {
    return null;
  }

  return (
    <Row>
      {realtime && !added && (
        <Col
          style={{
            zIndex: 99999999999999999999,
            fontSize: ".9rem",
          }}
          key={realtime["id"]}
        >
          <br />
          <Row
            style={{
              zIndex: 99999999999999999999,
              color: realtime["processing_file"] === "true" ? "green" : "red",
            }}
            key={realtime["id"] + "111"}
          >
            <Col>{"PROCESSING : " + realtime["processing_file"]}</Col>
          </Row>
          <Row
            style={{
              zIndex: 99999999999999999999,
              color: realtime["processed_file"] === "true" ? "green" : "red",
            }}
            key={realtime["id"] + "2222"}
          >
            <Col>{"PROCESSED  : " + realtime["processed_file"]}</Col>
          </Row>
        </Col>
      )}
    </Row>
  );
};

function AlertDismissibleExample({ message }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    let timmyTimer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(timmyTimer);
    };
  }, []);

  if (show) {
    return (
      <Alert
        style={{
          position: "absolute",
          left: "0px",
          right: "0px",
          width: "200px",
          zIndex: 99999999999,
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: ".9rem",
          padding: ".25rem",
          paddingRight: "2rem",
        }}
        variant="success"
        onClose={() => setShow(false)}
        dismissible
        size={"sm"}
      >
        <div
          style={{
            fontWeight: 500,
          }}
        >
          {message}
        </div>
      </Alert>
    );
  }
  return null;
}

export default function Uploader(props) {
  const {
    multipleAttributeFromAbove,
    nameIdFromAbove,
    xsFromAbove,
    containerStyleFromAbove,
    extraHandler,
    qBuk,
    setCurrentResultId,
    imageIsProcessing,
    setImageIsProcessing,
    setTotalProcessingTime,
    totalProcessingTime,
    termsAccepted,
  } = props;

  const [random, setRandom] = useState(0);
  const [processingStartTime, setProcessingStartTime] = useState(null);
  const [processingEndTime, setProcessingEndTime] = useState(null);
  const [forNamedDb, setForNamedDb] = useState();
  const [yesAdd, setYesAdd] = useState(false);
  const [added, setAdded] = useState(false);
  const [logoInputValue, setLogoInputValue] = useState();
  const [realtime, setRealtime] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(false);

  const interimId = useRef();

  useEffect(() => {
    console.log("SUPSstrurt");
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onUpdateEarlyStuffs2)
    ).subscribe({
      next: ({ provider, value }) => {
        console.log(`{ provider , value }`);
        console.log({ provider, value });
        if (value.data.onUpdateEarlyStuffs2) {
          setRealtime(value.data.onUpdateEarlyStuffs2);
        }
      },
      error: (error) => console.warn(error),
    });
    console.log("SUPSeend");
    // return ( ) => { subscription.unscubscribe( ); }
  }, [setRealtime]);

  useEffect(() => {
    if (realtime) {
      longPollToBucket(interimId.current, setCurrentResultId);
    }
  }, [realtime, interimId, random]);

  async function longPollToBucket(id, handler) {
    let poll = await Storage.list("LOGOS/svgapp/svgs/" + id + "/"); //console.log( id )
    if (Array.isArray(poll) && poll.length > 1) {
      let mapk = poll.map((p) => p.key).filter((f) => /svgsp1/i.test(f));
      if (mapk.length > 0) {
        if (typeof handler !== "undefined") {
          setProcessingEndTime(Date.now());
          setImageIsProcessing(false);
          handler(id);
        }
      }
    } else {
      if (random < 30) {
        setTimeout(() => {
          setRandom(random + 1);
        }, 5000);
      }
    }
  }

  useEffect(() => {
    if (processingStartTime && processingEndTime) {
      let totulTime = Math.ceil(
        (processingEndTime - processingStartTime) / 1000
      );
      setTotalProcessingTime(totulTime);
    }
  }, [processingEndTime]);

  async function setEarlyImg(b) {
    let gs = b.map((c) => {
      if (typeof c.id === "undefined") {
        c["id"] = rando();
      }
      if (typeof c.gqlId === "undefined") {
        c["gqlId"] = uuidv4();
      }
      return c;
    });
    let imgsPre = gs.map(async (c) => {
      let prpz = {
        name: "a",
        fullname: "abc",
        resultid: c.id,
        brand: "brnd",
        image: c.name,
        phone: "",
        gqlId: c.gqlId,
      };
      let pun = mkFilename(prpz);
      let fnn = pun.filename;
      console.log(fnn);
      let berkUrl = await storeEarlyImage(c, fnn, qBuk);
      return {
        ...c,
        bucket_url: berkUrl,
        a: pun.proppers.validFullname,
        b: pun.proppers.p,
        c: pun.proppers.validName,
      };
    });
    interimId.current = gs[0].id;
    try {
      let imgs = await Promise.all(imgsPre);
      console.log(imgs);
      setForNamedDb(imgs[0]);
      let islogtin = "notLoggedIn";
      try {
        let dbImgs = await Promise.all(
          imgs.map(async (c) => await dbEarly(c, islogtin))
        );
        setUploadedImage(dbImgs);
      } catch (ur) {
        console.log(ur);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleAddLogo(inp, startedEntry, setAdded) {
    let resultid = startedEntry.id;
    let uid = startedEntry.gqlId;
    const madeFnNameInput = startedEntry.a;
    const madeFnOrigFn = startedEntry.c;
    let mutationName = "updateNamed";
    try {
      let fg = {
        mutationName: mutationName,
        uid: uid,
        validInputName: madeFnNameInput,
        resultId: resultid,
        validImageName: madeFnOrigFn,
        resultKey: startedEntry.bucket_url,
        qResultKey: startedEntry.bucket_url,
        logoName: inp,
        email: "virtsPage@pony.com",
        fromCatalogsOrVirtualsPage: "virtuals",
      };
      let f = await mutateNamed(fg);
      if (f && f["data"] && f["data"][mutationName]) {
        setAdded(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleImageInput(i, p, handler) {
    if (Array.isArray(p) && p.length > 0) {
      if (def(handler)) {
        handler(i, p);
      }
    }
  }

  const containerStyle = { padding: "5px" };

  if (def(containerStyleFromAbove)) {
    Object.assign(containerStyle, containerStyleFromAbove);
  }

  const [uploadSectionShow, setUploadSectionShow] = useState(true);

  return (
    <Col xs={def(xsFromAbove) ? xsFromAbove : 12}>
      <Row>
        <br />
        {[
          {
            title: "Upload a new logo.",
            supportingText:
              "Once it's processed, we'll give you the option to add it to the library for use later.",
            text: "upload" + (added ? "ed" : ""),
            specialShowCondition: uploadSectionShow,
            progressCondition:
              (!imageIsProcessing ||
                (imageIsProcessing &&
                  !uploadedImage &&
                  !totalProcessingTime)) &&
              !uploadedImage,
            completeCondition: uploadedImage,
            churldrins: (
              <InputUploadForVirts
                imageIsProcessing={imageIsProcessing}
                totalProcessingTime={totalProcessingTime}
                nameIdFromAbove={nameIdFromAbove}
                termsAccepted={termsAccepted}
                multipleAttributeFromAbove={multipleAttributeFromAbove}
                setImageIsProcessing={setImageIsProcessing}
                setProcessingStartTime={setProcessingStartTime}
                extraHandler={extraHandler}
                setEarlyImg={setEarlyImg}
                handleImageInput={handleImageInput}
              />
            ),
          },
          {
            text: "process" + (added ? "ed" : ""),
            progressCondition: imageIsProcessing && !totalProcessingTime,
            completeCondition: realtime,
            churldrins: <RealTimeBaby realtime={realtime} added={added} />,
          },
          {
            text: "add" + (added ? "ed" : "") + " to library",
            progressCondition: totalProcessingTime && !added,
            completeCondition: added,
            churldrins: (
              <AddToLibrarySub
                yesAdd={yesAdd}
                setYesAdd={setYesAdd}
                totalProcessingTime={totalProcessingTime}
                added={added}
                setLogoInputValue={setLogoInputValue}
                handleAddLogo={handleAddLogo}
                logoInputValue={logoInputValue}
                forNamedDb={forNamedDb}
                setAdded={setAdded}
              />
            ),
          },
        ].map((step, stepIdx, map_array) => (
          <Col key={"stepnum" + stepIdx} xs={12} style={{ fontSize: ".95rem" }}>
            <Row>
              <Col
                style={{
                  textAlign: "center",
                  fontWeight: step.progressCondition ? 600 : 400,
                  color: step.completeCondition ? "green" : "black",
                }}
              >
                <Card className="text-center">
                  <Card.Header style={{ padding: ".35rem .5rem" }}>
                    <Row>
                      <Col>
                        {stepIdx+1+". "+step.text[0].toUpperCase()+step.text.slice(1)}
                      </Col>

                      {step.completeCondition && (
                        <Col>
                          <svg
                            enableBackground="new 0 0 512.063 512.063"
                            viewBox="0 0 512.063 512.063"
                            height="30"
                            width="30"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <ellipse
                                cx="256.032"
                                cy="256.032"
                                fill="#00df76"
                                rx="255.949"
                                ry="256.032"
                              />
                              <path
                                d="m256.032 0c-.116 0-.231.004-.347.004v512.055c.116 0 .231.004.347.004 141.357 0 255.949-114.629 255.949-256.032s-114.592-256.031-255.949-256.031z"
                                fill="#00ab5e"
                              />
                              <path
                                d="m111.326 261.118 103.524 103.524c4.515 4.515 11.836 4.515 16.351 0l169.957-169.957c4.515-4.515 4.515-11.836 0-16.351l-30.935-30.935c-4.515-4.515-11.836-4.515-16.351 0l-123.617 123.615c-4.515 4.515-11.836 4.515-16.351 0l-55.397-55.397c-4.426-4.426-11.571-4.526-16.119-.226l-30.83 29.149c-4.732 4.475-4.837 11.973-.232 16.578z"
                                fill="#fff5f5"
                              />
                              <path
                                d="m370.223 147.398c-4.515-4.515-11.836-4.515-16.351 0l-98.187 98.187v94.573l145.473-145.473c4.515-4.515 4.515-11.836 0-16.352z"
                                fill="#dfebf1"
                              />
                            </g>
                          </svg>
                        </Col>
                      )}
                    </Row>
                  </Card.Header>

                  {termsAccepted && step.progressCondition && step.churldrins && (
                    <>
                      <Card.Body>
                        {step.title && <Card.Title>{step.title}</Card.Title>}
                        {step.supportingText && (
                          <Card.Text>{step.supportingText}</Card.Text>
                        )}

                        <div style={{backgroundColor: ["none", "none", "none", "none"][stepIdx]}} >
                          {step.churldrins}
                        </div>

                        {step.button && (
                          <Button variant="primary">{step.button}</Button>
                        )}
                      </Card.Body>

                      {stepIdx === map_array.length - 1 && (
                        <Card.Footer
                          className="text-muted"
                          style={{ fontSize: ".7rem" }}
                        >
                          2 days ago
                        </Card.Footer>
                      )}
                    </>
                  )}
                </Card>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>

      {uploadedImage && (
        <AlertDismissibleExample
          message={"Logo uploaded successfully. Processing."}
        />
      )}

      {yesAdd && added && (
        <AlertDismissibleExample
          message={
            (logoInputValue &&
            typeof logoInputValue !== "undefined" &&
            logoInputValue.length > 0
              ? logoInputValue.toLowerCase()
              : "Logo") + " successfully added to Library"
          }
        />
      )}
    </Col>
  );
}
