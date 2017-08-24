import React, { Component } from 'react'
import StandardLayout from '../components/layout/StandardLayout'

export default class Privacy extends Component {
  static async getInitialProps ({ req }) {
    const { member } = req

    return { member }
  }

  render() {
    const { member } = this.props
    return (
      <StandardLayout displayFooter={false} member={member} >
        <div className="containers">
          <div className="content">
            <div>
              <h2>PRIVACY POLICY</h2>
              <p>Last updated: 2017, 25 January</p>
              <p>Our privacy policy applies to information we collect when you use or access our website, application, or just interact with us. We may change this privacy policy from time to time. Whenever we make changes to this privacy policy, the changes are effective immediately after we post the revised privacy policy (as indicated by revising the date at the top of our privacy policy). We encourage you to review our privacy policy whenever you access our services to stay informed about our information practices and the ways you can help protect your privacy.</p>
            </div>

            <div>
              <h2>Collection of Information</h2>
              <div>
                <strong>Information You Provide to Us</strong>
                <div>When you access or use our services, we automatically collect information about you, including:</div>
              </div>
              <div>
                <ul>
                  <li>
                    <p>
                      <strong>Log Information: </strong>
                      <span>We log information about your use of our services, including the type of browser you use, access times, pages viewed, your IP address and the page you visited before navigating to our services.</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Device Information: </strong>
                      <span>We collect information about the computer you use to access our services, including the hardware model, and operating system and version.</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Location Information: </strong>
                      <span>We may collect information about the location of your device each time you access or use one of our mobile applications or otherwise consent to the collection of this information.</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Information Collected by Cookies and Other Tracking Technologies: </strong>
                      <span>We use various technologies to collect information, and this may include sending cookies to your computer. Cookies are small data files stored on your hard drive or in your device memory that helps us to improve our services and your experience, see which areas and features of our services are popular and count visits. We may also collect information using web beacons (also known as "tracking pixels"). Web beacons are electronic images that may be used in our services or emails and to track count visits or understand usage and campaign effectiveness.</span>
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <strong>Information We Collect From Other Sources</strong>
                <div>In order to provide you with access to the Service, or to provide you with better service in general, we may combine information obtained from other sources (for example, a third-party service whose application you have authorized or used to sign in) and combine that with information we collect through our services.</div>
              </div>
            </div>

            <div>
              <h2>Use of Information</h2>
              <p>We use information about you for various purposes, including to:</p>
              <div>
                <ul>
                  <li>Provide, maintain and improve our services;</li>
                  <li>Provide services you request, process transactions and to send you related information;</li>
                  <li>Send you technical notices, updates, security alerts and support and administrative messages;</li>
                  <li>Respond to your comments, questions and requests and provide customer service;</li>
                  <li>Communicate with you about news and information related to our service;</li>
                  <li>Monitor and analyze trends, usage and activities in connection with our services; and</li>
                  <li>Personalize and improve our services.</li>
                </ul>
              </div>
              <p>By accessing and using our services, you consent to the processing and transfer of your information in and to the United States and other countries.</p>
            </div>

            <div>
              <h2>Sharing of Information</h2>
              <p>We may share personal information about you as follows:</p>
              <div>
                <ul>
                  <li>With third party vendors and other service providers who need access to your information to carry out work on our behalf,</li>
                  <li>If we believe disclosure is reasonably necessary to comply with any applicable law, regulation, legal process or governmental request;</li>
                  <li>To enforce applicable user agreements or policies, including our Terms of Service; and to protect us, our users or the public from harm or illegal activities;</li>
                  <li>In connection with any merger, sale of Kickesport assets, financing or acquisition of all or a portion of our business to another company; and</li>
                  <li>If we notify you through our services (or in our privacy policy) that the information you provide will be shared in a particular manner and you provide such information.</li>
                </ul>
              </div>
              <p>We may also share aggregated or anonymized information that does not directly identify you.</p>
            </div>

            <div>
              <h2>Third Party Analytics</h2>
              <p>We may allow third parties to provide analytics services. These third parties may use cookies, web beacons and other technologies to collect information about your use of the services and other websites, including your IP address, web browser, pages viewed, time spent on pages, links clicked and conversion information. This information may be used by us and third parties to, among other things, analyze and track data, determine the popularity of certain content and other websites and better understand your online activity. Our privacy policy does not apply to, and we are not responsible for, third party cookies, web beacons or other tracking technologies and we encourage you to check the privacy policies of these third parties to learn more about their privacy practices.</p>
            </div>

            <div>
              <h2>Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:team@kickesport.com">team@kickesport.com</a></p>
            </div>
          </div>
        </div>
        <style jsx>{`
          .containers {
            padding: 80px 0 40px;
            max-width: 1200px;
            margin: auto;
          }
          .content {
            background: #fff;
            border: solid 1px #fafafa;
            border-radius: 2px;
            padding: 48px;
            margin: 4px;
          }
        `}</style>
      </StandardLayout>
    )
  }
}
