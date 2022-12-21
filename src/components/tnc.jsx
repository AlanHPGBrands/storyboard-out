import React        from 'react';
import hpgwhite     from './pics/comps/hpg_white_md.png'
import {
    Button ,
    Card ,
    Col ,
    Row ,
}                   from 'react-bootstrap';




const wordses = [
    { 
        header : `1.	Any image you upload to the Service must meet the requirements listed below and be in good taste in HPG’s sole discretion. HPG has the sole discretion to accept or deny, or to remove, any image.` , 
        letter : `a.	By submitting, uploading, or otherwise making an image available, you warrant and represent that you have the legal right and necessary permission(s) to do so, and that your action does not violate any copyright, trademark, publicity right, privacy right, or any other right of any third party.
                                
    b.	By uploading an image, you hereby grant HPG, its affiliates, subsidiaries, assigns, licensees, designees and legal representatives the irrevocable, perpetual, worldwide digital and other right to use, reproduce, edit, market, store, distribute, have distributed, publicly and privately display, communicate, transmit, have transmitted, create derivative works based upon, and promote the image (as such may be edited and modified by HPG in its sole discretion) for the Service. 

    c.	By uploading an image, you hereby accept and agree that the image will be maintained in HPG’s logo library and available for use by HPG and others as part of the Service.  Users of the Service may not download an image itself from HPG’s logo library, but any image may be virtually displayed as part of the Service.  You acknowledge and agree that HPG may track which users upload images and which users select, display, and download virtual representations from the Service.

    d.	HPG respects intellectual property rights and follows intellectual property laws.  HPG is committed to following appropriate legal procedures to remove infringing content from the Service, and any content you upload may be removed for any reason, without notice.  You hereby agree, and represent and warrant, that you own all rights to any image you upload, including any copyright image, any trademarks, service marks, trade dress and trade names incorporated into any image you upload, or that you have express authority and written permission to use and reproduce any image you upload for the purposes of the Service.`  } ,

    { 
        header : `2.	By downloading, copying, screenshotting, sharing, posting, disclosing or otherwise making an image available from the Service, you warrant and represent that you have the legal right and necessary permission to do so.` ,
        letter : `
        a.	You hereby agree that the any image created by the Service is for demonstration purposes only, and does not serve as a printing proof for any corresponding order of product.  In the event that, after use of the Service, you submit an order for a product to go to print, a separate print-ready proof will be created, which may not exactly replicate the image created by the Service.
        
        b.	In the event that you use an image created by the Service in a way that violates any third party rights, you assume sole and complete responsibility for the violation.  You shall immediately inform HPG if you receive any notice that content created as part of the Service violates any third party rights.`
    } , { 
        header : `3.	To the fullest extent permitted by law you will defend, indemnify, and hold HPG harmless from any claim or demand made by any third party (including, but not limited to, your customer), as well as any and all damages, losses, liabilities, judgments, costs, reasonable attorneys' fees, and other expenses of every kind and nature, known and unknown, incurred or suffered HPG, relating to or arising out of (a) your breach of these Terms, (b) your use (or misuse) of our Service, (c) any image you upload, or (d) the infringement by any image you upload or any content downloaded from the Service of someone else’s intellectual property or other rights, (d) your violation of any law or the rights of a third party.  We reserve the right to handle our legal defense however we see fit, even if you are indemnifying us, in which case you agree to cooperate with us so we can execute our strategy.`

    } , { 
        header : `4.	In no event will HPG be liable for any damages (including but not limited to direct, indirect, incidental, special, consequential, or punative damages) arising out of your use or inability to use the Service.  You hereby assume all risk for any damages, claims or injuries, and hereby acknowledge that this limitation of liability shall apply to all Services provided under the Terms.  HPG’s Services are provided “as is” without representations or warranties of any kind, either express or implied.  Without limitation, HPG makes no representation or warranty that your use of the Service will meet your requirements, be uninterrupted or free from error or defect, or that any Service will be corrected.`

    
    } , { 
        header : `5.	These Terms shall not be construed to establish an agency, joint venture, partnership or other business relationship between the parties. You may not assign any right or obligation under these Terms, and the Terms shall be binding upon your permitted successors and assigns.  HPG, in its own discretion, may transfer or assign these Terms or any right or obligation herein. Any delay by HPG to exercise its rights, remedies or privileges under these Terms will not constitute a waiver of such rights, remedies or privileges. If any provision of the Terms is found invalid or unenforceable, it will be struck and the remaining provisions remain enforceable.`
    } ,
];





export default function TNC( ) {

    return (

        <Card 
            style={ { 
                zIndex : 9999999999999 ,
                width : '90vw' ,
                textAlign : 'left' ,
                position : 'absolute' ,
            } }
            >

            <Card.Body>

                <Card.Title
                    style={ { 
                        backgroundColor : 'black' ,
                        color : 'white' ,
                    } }
                    >
                    <Row
                        style={ { 
                            paddingTop : '.5rem' ,
                            paddingBottom : '.5rem' ,
                        } }
                        >
                        <Col>
                            <img src={ hpgwhite } height={ 50 } alt='hpgwhitelogo' />
                        </Col>
                        
                        <Col>
                            HPG Terms and Conditions 
                        </Col>
                    </Row>
                </Card.Title>
                
                
                <Card.Text
                    style={ { 
                        fontSize : '.75rem' ,
                        lineHeight : 1.2 ,

                    } }
                    >
                        <Col
                            style={ {
                                textAlign : 'left' ,
                            } }
                            >
                            <Row>
                                <Col>
                                
                                    { 
                                    `By using this virtual customization tool (“Service”), you agree to be bound to the following terms and conditions (“Terms”), which constitute a legally binding contract between you (“you” or “your”) and Hub Promotional Group, including BCG Creations Inc., Beacon Promotions, Inc., Best Promotions U.S.A., LLC, Debco Bag Distributors ULC, Handstands Promo, LLC, Hub Pen Company, LLC, Webb Business Promotions, Inc. and Forty Four Group LLC dba Origaudio, and affiliates and subsidiaries of each, as well as the successor and assigns of each (collectively “HPG”).`
                                    }
                                </Col>
                            </Row>
                        
                        {
                            wordses.map( ( point , pIdx ) => {
                                return (
                        <Row
                            key={ 'point' + pIdx }
                            >

                            <Col
                            style={ {
                                textAlign : 'left' ,
                                padding : '1rem' ,
                            } }
                            >

                            <Row>
                                <Col
                                    style={ { 
                                        textAlign : 'left' ,
                                        padding : '1rem' ,
                                    } }
                                    >
                                    { typeof point.header !== 'undefined' ? point.header : '' }
                                </Col>
                            </Row>

                            <Row
                                style={ {
                                    textAlign : 'left' ,
                                    paddingLeft : '2rem' ,
                                    paddingRight : '2rem' ,
                                } }
                                >
                                { typeof point.letter !== 'undefined' ? point.letter : '' }
                            </Row>
                        </Col>

                    </Row>
                    ) } ) }
                </Col>

                </Card.Text>


            <Button variant="primary">
                Dismiss
            </Button>
        </Card.Body>
    </Card>
    )
};