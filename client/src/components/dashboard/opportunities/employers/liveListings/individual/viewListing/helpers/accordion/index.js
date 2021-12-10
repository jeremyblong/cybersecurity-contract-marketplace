import React,{ Fragment, useState } from 'react';
import { CardBody } from 'reactstrap';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

const AccordionWithOpenandCloseIcon = (props) => {
    console.log("PROPS! : ", props);

    const { experienceAndCost, disclosureVisibility, maxNumberOfApplicants, requiredRankToApply, tokensRequiredToApply, applicants } = props.data;
    return (
        <Fragment>
            <Accordion>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className="btn btn-link txt-white">
                            <i className="icofont icofont-info-alt-2"></i>Experience Rewarded To Winner(s)
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <CardBody>
                            {"Winner(s) of this requested hack will be rewarded approximately "}<strong style={{ color: "blue" }}>{`${experienceAndCost.experience}`}</strong>{" XP points upon successful verification & completion of the listed gig."}
                        </CardBody>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className="btn btn-link txt-white">
                            <i className="icofont icofont-info-alt-2"></i>Disclosure Policy/Proceedures
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <CardBody>
                            {"This company would like to keep any disclosures as a "}<strong style={{ color: "blue" }}>{`"${disclosureVisibility.label}"`}</strong>{". It is expected that you comply and follow procedure in order for you to recieve full compensation and experience points."}
                        </CardBody>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className="btn btn-link txt-white">
                            <i className="icofont icofont-info-alt-2"></i>Maximum Number Of Hackers Requested
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <CardBody>
                            {"This employer has requested "}<strong style={{ color: "blue" }}>{`${maxNumberOfApplicants.value}`}</strong>{" hackers for this gig."}
                        </CardBody>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className="btn btn-link txt-white">
                            <i className="icofont icofont-info-alt-2"></i>Preferred Applicant Rank
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <CardBody>
                            {"This employer would prefer to hire hackers in the rank/level ranges of "}<strong style={{ color: "blue" }}>{`${requiredRankToApply.value}`}</strong>{" but you may still apply, however the employer will see you do not meet the requirements and may disregard your application."}
                        </CardBody>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className="btn btn-link txt-white">
                            <i className="icofont icofont-info-alt-2"></i>Tokens Required To Apply
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <CardBody>
                            {"This gig/job costs "}<strong style={{ color: "blue" }}>{`${tokensRequiredToApply.value}`}</strong>{" tokens to apply. You may need to purchase these from our subscription/token page if you run out of the free credits given to each account upon initial registration."}
                        </CardBody>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className="btn btn-link txt-white">
                            <i className="icofont icofont-info-alt-2"></i>Previous/Pending Applicants That've Applied
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <CardBody>
                            {"This listing already has roughly "}<strong style={{ color: "blue" }}>{`${applicants.length}`}</strong>{" applicants/people that have already applied to this listing. This is consistently updating and is a live accurate number of competition."}
                        </CardBody>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </Fragment>
  );
}
export default AccordionWithOpenandCloseIcon;