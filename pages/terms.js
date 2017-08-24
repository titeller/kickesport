import React, { Component } from 'react'
import StandardLayout from '../components/layout/StandardLayout'

export default class Terms extends Component {
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
              <h2>TERMS OF SERVICE</h2>
              <p>Last updated: 2017, 25 January</p>
              <p>These terms of service ("Terms") apply to your access and use of kickesport.com application. Please read them carefully.</p>
            </div>

            <div>
              <h2>Accepting these Terms</h2>
              <p>If you access or use the Service, it means you agree to be bound by all of the terms below. So, before you use the Service, please read all of the terms. If you don't agree to all of the terms below, please do not use the Service. Also, if a term does not make sense to you, please let us know by e-mailing <a href="mailto:team@kickesport.com">team@kickesport.com</a></p>
            </div>

            <div>
              <h2>Changes to these Terms</h2>
              <p>We reserve the right to modify these Terms at any time. For instance, we may need to change these Terms if we come out with a new feature or for some other reason.</p>
              <p>Whenever we make changes to these Terms, the changes are effective immediately after we post such revised Terms (indicated by revising the date at the top of these Terms) or upon your acceptance if we provide a mechanism for your immediate acceptance of the revised Terms (such as a click-through confirmation or acceptance button). It is your responsibility to check Kickesport for changes to these Terms.</p>
              <p>If you continue to use the Service after the revised Terms go into effect, then you have accepted the changes to these Terms.</p>
            </div>

            <div>
              <h2>Privacy Policy</h2>
              <p>For information about how we collect and use information about users of the Service, please check out our privacy policy available at <a href="/privacy">Privacy Policy</a>.</p>
            </div>

            <div>
              <h2>Third-Party Services</h2>
              <p>From time to time, we may provide you with links to third party websites or services that we do not own or control. Your use of the Service may also include the use of applications that are developed or owned by a third party. Your use of such third party applications, websites, and services is governed by that party's own terms of service or privacy policies. We encourage you to read the terms and conditions and privacy policy of any third party application, website or service that you visit or use.</p>
            </div>

            <div>
              <h2>Creating Accounts</h2>
              <p>When you create an account or use another service to log in to the Service, you agree to maintain the security of your password and accept all risks of unauthorized access to any data or other information you provide to the Service.</p>
              <p>If you discover or suspect any Service security breaches, please let us know as soon as possible.</p>
            </div>

            <div>
              <h2>Kickesport Materials</h2>
              <p>We put a lot of effort into creating the Service including, the logo and all designs, text, graphics, pictures, information and other content (excluding your content). This property is owned by us or our licensors and it is protected by U.S., TH, SG, and international copyright laws. We grant you the right to use it.</p>
              <p>However, unless we expressly state otherwise, your rights do not include: (i) publicly performing or publicly displaying the Service; (ii) modifying or otherwise making any derivative uses of the Service or any portion thereof; (iii) using any data mining, robots or similar data gathering or extraction methods; (iv) downloading (other than page caching) of any portion of the Service or any information contained therein; (v) reverse engineering or accessing the Service in order to build a competitive product or service; or (vi) using the Service other than for its intended purposes. If you do any of this stuff, we may terminate your use of the Service.</p>
            </div>

            <div>
              <h2>Hyperlinks and Third Party Content</h2>
              <p>You may create a hyperlink to the Service. But, you may not use, frame or utilize framing techniques to enclose any of our trademarks, logos or other proprietary information without our express written consent.</p>
              <p>Kickesport makes no claim or representation regarding, and accepts no responsibility for third party websites accessible by hyperlink from the Service or websites linking to the Service. When you leave the Service, you should be aware that these Terms and our policies no longer govern.</p>
              <p>If there is any content on the Service from you and others, we don't review, verify or authenticate it, and it may include inaccuracies or false information. We make no representations, warranties, or guarantees relating to the quality, suitability, truth, accuracy or completeness of any content contained in the Service. You acknowledge sole responsibility for and assume all risk arising from your use of or reliance on any content.</p>
            </div>

            <div>
              <h2>Unavoidable Legal Stuff</h2>
              <p>THE SERVICE AND ANY OTHER SERVICE AND CONTENT INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICE ARE PROVIDED TO YOU ON AN AS IS OR AS AVAILABLE BASIS WITHOUT ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND. WE DISCLAIM ANY AND ALL WARRANTIES AND REPRESENTATIONS (EXPRESS OR IMPLIED, ORAL OR WRITTEN) WITH RESPECT TO THE SERVICE AND CONTENT INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICE WHETHER ALLEGED TO ARISE BY OPERATION OF LAW, BY REASON OF CUSTOM OR USAGE IN THE TRADE, BY COURSE OF DEALING OR OTHERWISE.</p>
              <p>IN NO EVENT WILL Kickesport BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY SPECIAL, INDIRECT, INCIDENTAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES OF ANY KIND ARISING OUT OF OR IN CONNECTION WITH THE SERVICE OR ANY OTHER SERVICE AND/OR CONTENT INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICE, REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR ARE AWARE OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ALL CAUSES OF ACTION AND UNDER ALL THEORIES OF LIABILITY WILL BE LIMITED TO THE AMOUNT YOU PAID TO Kickesport. THIS SECTION WILL BE GIVEN FULL EFFECT EVEN IF ANY REMEDY SPECIFIED IN THIS AGREEMENT IS DEEMED TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.</p>
              <p>You agree to defend, indemnify and hold us harmless from and against any and all costs, damages, liabilities, and expenses (including attorneys' fees, costs, penalties, interest and disbursements) we incur in relation to, arising from, or for the purpose of avoiding, any claim or demand from a third party relating to your use of the Service or the use of the Service by any person using your account, including any claim that your use of the Service violates any applicable law or regulation, or the rights of any third party, and/or your violation of these Terms.</p>
            </div>

            <div>
              <h2>Feedback</h2>
              <p>Please let us know what you think of the Service, these Terms and, in general, kickesport.com / Kickesport application. When you provide us with any feedback, comments or suggestions about the Service, these Terms and, in general, kickesport.com / Kickesport application, you irrevocably assign to us all of your right, title and interest in and to your feedback, comments and suggestions.</p>
            </div>

            <div>
              <h2>Questions & Contact Information</h2>
              <p>Questions or comments about the Service may be directed to us at the email address <a href="mailto:team@kickesport.com">team@kickesport.com</a></p>
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
