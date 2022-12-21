import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

export default function CatalogCovers({
  allSubmitted,
  allBrands,
  coversArray,
  handleSwitchClick,
  halfSize,
  popImage,
}) {
  let cornBos = coversArray;
  let [cxs, csm, cmd, clg, cxl] =
    halfSize === "true" ? [6, 6, 4, 3, 2] : [12, 6, 4, 3, 2];

  if (typeof allBrands === "undefined" || typeof coversArray === "undefined") {
    return null;
  }

  return (
    <Col>
      <Row
        className="justify-content-md-center"
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "30px",
          paddingRight: "30px",
          marginTop: "1rem",
        }}
      >
        {!allSubmitted && (
          <>
            {cornBos.map((c, d) => {
              let handler = () => {
                handleSwitchClick({ target: { name: c[0] } });
              };
              let bgColor = !allBrands[c[0]] ? "#fff" : "#5310fe";
              let textColor = !allBrands[c[0]] ? "#464646" : "white";
              return (
                <Col
                  xs={cxs}
                  sm={csm}
                  md={cmd}
                  lg={clg}
                  xl={cxl}
                  key={"dGroup" + d.toString()}
                  style={{ paddingLeft: "5px", paddingRight: "5px" }}
                >
                  {popImage && d === 2 && (
                    <div
                      style={{
                        width: "50%",
                        height: "110%",
                        position: "absolute",
                        bottom: "20px",
                        right: "0px",
                        zIndex: 999999,
                      }}
                    >
                      <img src={popImage} alt="8oz" style={{ width: "100%" }} />
                    </div>
                  )}
                  <CardGroup
                    key={"cGroup" + d.toString()}
                    style={{
                      padding: ".25rem",
                      backgroundColor: allBrands[c[0]] ? "#e0d7fc" : "inherit",
                      borderRadius: "5px",
                      border: allBrands[c[0]] ? "2px solid #5310fe" : "none",
                    }}
                  >
                    <Card
                      variant="dark"
                      style={{
                        paddingBottom: "5px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        maxWidth: "380px",
                        fontFamily: "Montserrat, sans-serif",
                        lineHeight: "1.4rem",
                        letterSpacing: ".03rem",
                        backgroundColor: bgColor,
                        fontSize: allBrands[c[0]] ? "1.1rem" : "1.075rem",
                        fontWeight: allBrands[c[0]] ? "600" : "500",
                        color: textColor,
                      }}
                      onClick={handler}
                    >
                      <Card.Img variant="top" src={c[1]} alt={"logo" + c[0]} />
                      <Card.ImgOverlay></Card.ImgOverlay>
                      {c[2]}
                    </Card>
                  </CardGroup>
                </Col>
              );
            })}
          </>
        )}
      </Row>
      <Row>
        <Col style={{ minHeight: "20px" }}>&nbsp;</Col>
      </Row>
    </Col>
  );
}
