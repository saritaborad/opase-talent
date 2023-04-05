import React from "react";
import UserLayout from "../components/UserLayout";
import { Link } from "react-router-dom";

export default function TermsConditions() {
  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="">
                  <div className="comn-title-main">
                    <h1 className="mb-0">Terms & conditions</h1>
                  </div>
                  <div className="term-condition-class my-3 p-3">
                    <p>This Site Terms of Service Agreement (“Terms”) governs your use of the OPASE® marketplace platform offered by Baron App, Inc., doing business as Opase (“we”, “us”, or “Opase”), including our website (opase.com), mobile application (“App”), and services we provide through them (collectively, the website, App, and services referred to as our “Site”). “You” refers to you as a user of the Site.</p>

                    <p>These Terms apply to users of, including visitors to, our Site. Use of our Site is also subject to our current Acceptable Use Policy and Community Guidelines. Your use of our Site as a Talent User (defined below) is governed by the Talent Terms of Service. (“Talent Terms”).</p>

                    <p>From time to time, Cameo may revise this Privacy Policy. We will give you notice by posting the revised Privacy Policy on our Site and updating the "Last Updated and Effective" date at the top of this Privacy Policy; we may also notify you in other ways, such as through the contact information you have provided or via a pop-up notification on our Site. Any changes to this Privacy Policy will be effective immediately on posting the updated Privacy Policy unless otherwise stated or as required by applicable law (for example, a different form of notice and your opt-in or opt-out consent, etc.). By continuing to use our Site, you agree to the revised Privacy Policy to the fullest extent permitted by applicable law.</p>

                    <div>
                      <span>PLEASE READ THESE TERMS CAREFULLY.</span>
                      <p>By using our Site or otherwise indicating your acceptance (for example, by agreeing when creating or logging into your account, clicking “I Agree,” etc.), you represent and warrant that you have read, understand, and agree to be bound by these Terms. If you do not agree, do not access or use our Site.</p>
                    </div>

                    <div className="table-content-ol mt-3">
                      <h4 className="my-4">Table of contents</h4>
                      <div>
                        <ol>
                          <li>
                            <Link to="#">OPASE videos</Link>
                          </li>
                          <li>
                            <Link to="#">Acknowledgement</Link>
                          </li>
                          <li>
                            <Link to="#">Additional terms</Link>
                          </li>
                          <li>
                            <Link to="#">Eligibility</Link>
                          </li>
                          <li>
                            <Link to="#">Fees & payment</Link>
                          </li>
                          <li>
                            <Link to="#">Ownership</Link>
                          </li>
                          <li>
                            <Link to="#">Copyright and intellectual property policy</Link>
                          </li>
                          <li>
                            <Link to="#">Privacy</Link>
                          </li>
                          <li>
                            <Link to="#">Third party content and interactions</Link>
                          </li>
                          <li>
                            <Link to="#">Indemnification</Link>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
