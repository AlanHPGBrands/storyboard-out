import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import UploadInput from "./uploadInput.jsx";
import Step from "./step.jsx";
import CopyLink from "./copyLink.jsx";
import aiLogo from "./pics/comps/ai-pholder.png";
import CatInput from "./catalogsWithInput.jsx";
import CatalogCovers from "./thumbs";
import bkLogo from "./pics/ballPointAnim.gif";

function Formy({ details, setInput, regEmail }) {
  return (
    <Row>
      <Col>
        <img src={bkLogo} height="50px" alt="book logo" />
        <br />
        <br />
        <Form>
          {[
            ["Email Address", "email", true],
            ["Your Name", "fullname", true],
            ["Phone", "phone", false],
          ].map((field, f) => {
            return (
              <Form.Group
                key={f + "fgrp"}
                controlId={"exampleForontrolInput" + f}
              >
                <br />
                <Form.Label
                  id={field[1] + "id"}
                  style={{
                    letterSpacing: ".1rem",
                  }}
                >
                  {field[0]}
                  {!field[2] && (
                    <span
                      style={{ fontSize: ".8rem", letterSpacing: ".05rem" }}
                    >
                      &nbsp;[optional]
                    </span>
                  )}
                </Form.Label>
                <Form.Control
                  style={{
                    color:
                      /email/i.test(field[1]) && !regEmail.test(details.email)
                        ? "red"
                        : "#32363a",
                    maxWidth: "400px",
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onChange={(event) => {
                    setInput(field[1], event.target.value);
                  }}
                  type={field[1]}
                  placeholder={
                    /email/i.test(field[1]) ? "name@example.com" : field[0]
                  }
                  size="md"
                />
              </Form.Group>
            );
          })}
        </Form>
      </Col>
    </Row>
  );
}

const AllSubmitted = () => (
  <div
    style={{
      width: "80vw",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "30px",
      textAlign: "center",
      alignContent: "center",
    }}
  >
    Your custom catalogs are on the way!
    <br />
    <br />
    <span style={{ fontSize: ".9rem" }}>
      The pages are being processed right now and you will receive an email
      within 24 hours to download them when they're ready.
    </span>
  </div>
);

const AllSubmitted2 = () => (
  <div
    style={{
      width: "80vw",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "30px",
      textAlign: "center",
      alignContent: "center",
    }}
  >
    <br />
    Logos displayed on catalogs are approximations only, please contact your
    supplier for print-ready proofs.
    <br />
    <br />
    <br />
    <br />
    <Button
      style={{
        padding: ".2rem .35rem",
        display: "block",
        marginTop: "5px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      variant="dark"
      className="overidepurp btn-tranny overidepurp"
      onClick={() => {
        window.location.reload();
      }}
    >
      {`CUSTOMIZE MORE`}
    </Button>
  </div>
);

export default function Catalogs(props) {
  const {
    allSubmitted,
    details,
    allBrands,
    setInput,
    setEarlyImg,
    cobos,
    regEmail,
    topSubmitAll,
    handleSwitchClick,
    catChecked,
    bkLogo,
    linkIds,
  } = props;

  const pearl = window.location.href;

  var urlyPearl = pearl[pearl.length - 1] === "/" ? pearl : pearl + "/";

  if (/inky/i.test(pearl)) {
    urlyPearl = urlyPearl.replace("/?inky", "");
  }

  return (
    <Col>
      <Row>
        <Col key={"keyprops"}>
          <Row>
            <Col>
              {!allSubmitted && (
                <UploadInput
                  setEarlyImg={setEarlyImg}
                  mult={"multiple"}
                  step={"Step 1"}
                  stepMessage={
                    !allSubmitted
                      ? details.imageys.length < 1
                        ? "Upload your company logo(s)."
                        : "Change logo(s)."
                      : ""
                  }
                  setInput={setInput}
                  // setPred={ setPred }
                  details={details}
                  subset={"imageys"}
                  allSubmitted={allSubmitted}
                  name_id="ploder"
                />
              )}
              <br />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        {details.imageys.length > 0 && !allSubmitted && (
          <Col>
            <CatInput
              details={details}
              subset={"imageys"}
              setInput={setInput}
            />
          </Col>
        )}
      </Row>
      <Row>
        {!allSubmitted && (
          <Col key={"keyprops"}>
            <Step
              step={"Step 2"}
              stepMessage={"Select one or multiple catalogs to customize."}
            />
          </Col>
        )}
      </Row>
      
      
      
      
      
      
      
{/* CATALOG LIST !!!!! */}
{/* CATALOG LIST !!!!! */}
{!allSubmitted && (
        <>
          <Row
            style={{
              borderBottom: "1px solid lightgray",
              height: "10px",
            }}
          >
            <Col style={{ opacity: 0 }}>.</Col>
          </Row>

          <Row>
            <Col
              style={{
                marginTop: ".85rem",
                fontSize: "1.2rem",
                fontWeight: 700,
                letterSpacing: ".08rem",
              }}
            >
              {"New - 2022 Holiday Lookbooks"}
            </Col>
          </Row>
        </>
      )}
      <Row>
        <CatalogCovers
          handleSwitchClick={handleSwitchClick}
          coversArray={cobos.filter((f) => /hol/i.test(f[0]))}
          allBrands={allBrands}
          allSubmitted={allSubmitted}
        />
      </Row>
{/* CATALOG LIST !!!!! */}
{/* CATALOG LIST !!!!! */}
      
      
      
      
      
      
      
      
      
      
      
  {/* CATALOG LIST !!!!! */}
  {/* CATALOG LIST !!!!! */}
      {!allSubmitted && (
        <>
          <Row
            style={{
              borderBottom: "1px solid lightgray",
              height: "10px",
            }}
          >
            <Col style={{ opacity: 0 }}>.</Col>
          </Row>
          <Row>
            <Col
              style={{
                marginTop: ".85rem",
                fontSize: "1.2rem",
                fontWeight: 700,
                letterSpacing: ".08rem",
              }}
            >
              {"2022 Lookbooks"}
            </Col>
          </Row>
        </>
      )}
      <Row>
        <CatalogCovers
          handleSwitchClick={handleSwitchClick}
          coversArray={cobos.filter((f) => /22/i.test(f[0]))}
          allBrands={allBrands}
          allSubmitted={allSubmitted}
        />
      </Row>
{/* CATALOG LIST !!!!! */}
{/* CATALOG LIST !!!!! */}















{/* CATALOG LIST !!!!! */}
{/* CATALOG LIST !!!!! 
      {!allSubmitted && (
        <>
          <Row
            style={{
              borderBottom: "1px solid lightgray",
              height: "10px",
            }}
          >
            <Col style={{ opacity: 0 }}>.</Col>
          </Row>

          <Row>
            <Col
              style={{
                marginTop: ".85rem",
                fontSize: "1.2rem",
                fontWeight: 700,
                letterSpacing: ".08rem",
              }}
            >
              {"2021 Lookbooks"}
            </Col>
          </Row>
        </>
      )}
      <Row>
        <CatalogCovers
          handleSwitchClick={handleSwitchClick}
          coversArray={cobos.filter((f) => !/hol|22/i.test(f[0]))}
          allBrands={allBrands}
          allSubmitted={allSubmitted}
        />
      </Row>
 CATALOG LIST !!!!! */}
{/* CATALOG LIST !!!!! */}














      <Row>
        {!allSubmitted && (
          <Col>
            <Row>
              <Col>
                <Step
                  step={"Step 3"}
                  stepMessage={
                    "Enter your information and your custom catalog will be emailed to you!"
                  }
                />
                <br />
              </Col>
            </Row>

            <Row>
              <Col>
                <Formy
                  step={"Step 4"}
                  bkLogo={bkLogo}
                  setInput={setInput}
                  regEmail={regEmail}
                  details={details}
                />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <br />
      <Row>
        <Col>
          <Row
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {details.fullname.length < 1 ||
            details.email.length < 3 ||
            !catChecked ||
            details.imageys.length < 1 ? (
              <> </>
            ) : allSubmitted ? (
              <AllSubmitted />
            ) : (
              <>
                <Button
                  style={{ padding: ".5rem .75rem" }}
                  variant="dark"
                  className="overidepurp btn-tranny overidepurp"
                  onClick={() => {
                    topSubmitAll(details);
                  }}
                >
                  {`CUSTOMIZE`}
                </Button>
              </>
            )}
          </Row>
        </Col>
      </Row>
      <Row>
        {allSubmitted && Array.isArray(linkIds) && linkIds.length > 0 ? (
          <Col>
            <Row
              style={{
                fontSize: ".9rem",
                marginTop: "1rem",
                justifyContent: "center",
              }}
            >
              <Col xs={10}>
                If you do not receive an email -{" "}
                {linkIds.length > 1 ? "these are" : "this is"} the{" "}
                {linkIds.length > 1 ? "links" : "link"} for your{" "}
                {linkIds.length > 1 ? "catalogs" : "catalog"}, which will be
                displayed there within 24 hours.
              </Col>
            </Row>

            {linkIds.map((a, b) => (
              <Row
                key={b.toString() + "randomKeyThought"}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "85vw",
                  marginTop: "20px",
                  borderBottom: "1px gray solid",
                }}
              >
                <Col
                  className="hoverCursor"
                  key={b.toString() + a.toString() + "_id"}
                  onClick={() => {
                    window.open("./?id=" + a.id, "_blank");
                  }}
                  style={{
                    paddingBottom: ".75rem",
                  }}
                >
                  {/pdf/i.test(a.ext) ? (
                    <object
                      aria-label="hiFromAria"
                      style={{ maxHeight: "120px", maxWidth: "120px" }}
                      data={a.img}
                    />
                  ) : /ai/i.test(a.ext) || /eps/i.test(a.ext) ? (
                    <img
                      src={aiLogo}
                      style={{ maxHeight: "120px", maxWidth: "120px" }}
                      alt={"logo" + a.img.substring(a.img.length - 13)}
                    />
                  ) : (
                    <img
                      src={a.img}
                      style={{ maxHeight: "120px", maxWidth: "120px" }}
                      alt={"logo" + a.img.substring(a.img.length - 13)}
                    />
                  )}
                </Col>

                {cobos
                  .filter((a) => allBrands[a[0]])
                  .map((c, d) => (
                    <Col
                      xs={12} sm={6} md={4} lg={3} xl={3}
                      key={"dGroup" + d.toString()}
                      style={{
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        marginBottom: "15px",
                      }}
                    >
                      <CardGroup
                        key={"cGroup" + d.toString()}
                        style={{
                          padding: ".5rem",
                          backgroundColor: allBrands[c[0]]
                            ? "#e0d7fc"
                            : "inherit",
                          borderRadius: "5px",
                          border: allBrands[c[0]]
                            ? "2px solid #5310fe"
                            : "none",
                        }}
                      >
                        <Card
                          variant="dark"
                          style={{
                            paddingBottom: "5px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            maxWidth: "200px",
                            fontFamily: "Montserrat",
                            lineHeight: "1.4rem",
                            letterSpacing: ".03rem",
                            backgroundColor: !allBrands[c[0]]
                              ? "#fff"
                              : "#5310fe",
                            fontSize: allBrands[c[0]] ? "1.1rem" : "1.075rem",
                            fontWeight: allBrands[c[0]] ? "600" : "400",
                            color: !allBrands[c[0]] ? "#464646" : "white",
                          }}
                          onClick={() => {
                            handleSwitchClick({ target: { name: c[0] } });
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src={c[1]}
                            alt={"logo" + c[0]}
                          />
                          <Card.ImgOverlay></Card.ImgOverlay>
                          {c[2]}
                        </Card>
                      </CardGroup>
                    </Col>
                  ))}

                <CopyLink linky={urlyPearl + "?id=" + a.id} />
              </Row>
            ))}
          </Col>
        ) : (
          <Col></Col>
        )}

        {allSubmitted && <AllSubmitted2 />}

      </Row>
    </Col>
  );
}
