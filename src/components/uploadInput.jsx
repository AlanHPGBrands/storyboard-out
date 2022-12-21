import React, { useState } from "react";
import Step from "./step.jsx";
import { Row, Col } from "react-bootstrap";
import nineLoading from "./pics/nineloading4.gif";

export default function UploadInput(props) {
  const { setInput, details, step, stepMessage, subset, mult, name_id, hh } =
    props;
  const deatailsPropertyName = subset;
  const [isThinking, setIsThinking] = useState(false);

  function handleFileSelection(event) {
    setIsThinking(true);
    let feels = JSON.parse(JSON.stringify(event.target.files));
    let feels2 = event.target.files;
    let oKFeels = Object.keys(feels);
    if (oKFeels.length < 1) {
      return [];
    } else {
      let p = oKFeels.map((k) => ({ file: feels2[k] }));
      setInput(
        deatailsPropertyName,
        p.map((q) => q.file)
      );
      setIsThinking(false);
    }
  }

  return (
    <>
      <Step step={step} stepMessage={stepMessage} />

      {!isThinking ? (
        <>
          <Row style={{ marginTop: ".5rem", height: "70px" }}>
            <Col>
              <label
                id={"cloud" + name_id}
                htmlFor={name_id}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  alignContents: "center",
                  marginBottom: "10px",
                }}
              >
                <svg
                  className="svgcloud"
                  style={{
                    cursor: "pointer",
                    height:
                      details[deatailsPropertyName].length < 1
                        ? typeof hh !== "undefined"
                          ? hh
                          : "65px"
                        : typeof hh !== "undefined"
                        ? hh / 2
                        : "35px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 266.51 201.7"
                >
                  <g>
                    <path
                      d="M7284.58-7216c0-.84.13-1.68.13-2.52,0-45.52-30.82-82.36-68.84-82.36-27.43,0-51,19.19-62.06,46.92a31.1,31.1,0,0,0-16-4.55c-17.54,0-32.18,15.34-35,35.37-21.06,8.54-36.1,32.28-36.1,60.23,0,35.16,23.85,63.73,53.25,63.73h61v-56h-28.69l47.73-58.62,47.73,58.55H7219v56h65.63c26.89,0,48.6-26.26,48.6-58.41S7311.48-7215.84,7284.58-7216Z"
                      transform="translate(-7066.75 7300.85)"
                    />
                  </g>
                </svg>
                <div id="cloudText" className="letadd"></div>
              </label>
            </Col>
          </Row>

          <input
            name={name_id}
            id={name_id}
            type="file"
            accept="image/*,.pdf,.ai,.eps"
            multiple={mult}
            className="visually-hidden"
            onChange={handleFileSelection}
          />
        </>
      ) : (
        <>
          <div
            style={{
              height:
                details[deatailsPropertyName].length < 1
                  ? typeof hh !== "undefined"?hh:"65px":typeof hh !== "undefined" ? hh / 2 : "35px",
            }}
          >
            <img
              src={nineLoading}
              alt="thinking"
              height={
                details[deatailsPropertyName].length<1
                  ?typeof hh!=="undefined"?hh:"65px"
                  :typeof hh!=="undefined"?hh/2:"35px"}
            />
          </div>
        </>
      )}
    </>
  );
}
