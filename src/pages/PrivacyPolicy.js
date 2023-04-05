import React from 'react';
import UserLayout from '../components/UserLayout';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="">
                  <div className="comn-title-main">
                    <h1 className="mb-0">Privacy Policy</h1>
                  </div>
                  <div className="privacy-class my-3 p-3">
                    <p>
                      We appreciate your trust in our products and services. In
                      order to provide the CAMEO® marketplace platform through
                      our website (cameo.com), mobile application, and through
                      the services we provide (collectively, the website,
                      application, and services referred to as our "Site"), and
                      continue to make them better, Baron App, Inc. dba Cameo
                      ("Cameo," "we," "us," or "our") collects information from
                      you. If you're a resident of California or Nevada or
                      visiting us from the European Economic Area ("EEA"), you
                      should read this policy and the applicable sections below
                      for residents of California and Nevada and visitors from
                      the the UK and EEA.
                    </p>

                    <p>
                      This Privacy Policy explains how Cameo collects, stores,
                      uses, transfers, and discloses your information.
                    </p>

                    <p>
                      From time to time, Cameo may revise this Privacy Policy.
                      We will give you notice by posting the revised Privacy
                      Policy on our Site and updating the "Last Updated and
                      Effective" date at the top of this Privacy Policy; we may
                      also notify you in other ways, such as through the contact
                      information you have provided or via a pop-up notification
                      on our Site. Any changes to this Privacy Policy will be
                      effective immediately on posting the updated Privacy
                      Policy unless otherwise stated or as required by
                      applicable law (for example, a different form of notice
                      and your opt-in or opt-out consent, etc.). By continuing
                      to use our Site, you agree to the revised Privacy Policy
                      to the fullest extent permitted by applicable law.
                    </p>

                    <p>
                      Please also review the applicable Terms of Service, which
                      also apply to use of our Site. Terms that are defined in
                      the Terms of Service have the same meaning in this Privacy
                      Policy.
                    </p>

                    <p>
                      You should read the policy in full, but here are a few key
                      things:
                    </p>

                    <p>
                      When you use our Site, even if you're just browsing, we
                      receive some information from you, such as the type of
                      device you’re using and your IP address. You can choose to
                      share additional information with us, such as your email
                      address, by creating an account, making purchases, or
                      providing content to our Site. If you have questions about
                      this policy, how we collect or process your personal data,
                      or anything else related to our privacy practices, we want
                      to hear from you.
                    </p>

                    <div className="table-content-ol mt-3">
                      <h4 className="my-4">Table of Contents</h4>
                      <div>
                        <ol>
                          <li>
                            <Link to="#">Scope of Cameo Privacy Policy</Link>
                          </li>
                          <li>
                            <Link to="#">Information We Collect</Link>
                          </li>
                          <li>
                            <Link to="#">
                              Cookies and Tracking Technologies
                            </Link>
                          </li>
                          <li>
                            <Link to="#">How We Use Information</Link>
                          </li>
                          <li>
                            <Link to="#">How We Share Information</Link>
                          </li>
                          <li>
                            <Link to="#">Children and Parents</Link>
                          </li>
                          <li>
                            <Link to="#">Your Choices</Link>
                          </li>
                          <li>
                            <Link to="#">Accessing Personal Information and Retention Period</Link>
                          </li>
                          <li>
                            <Link to="#">Data Security</Link>
                          </li>
                          <li>
                            <Link to="#">Notice to UK And EEA Users</Link>
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


