import Head from '../Head'
import Header from '../header/Header'
import Footer from '../footer/Footer'

export default ({ member, displayHeader = true, displayFooter = true, headerBackground = true, children }) => (
  <div>
      <Head />
      {
          displayHeader ? <Header member={member} headerBackground={headerBackground} /> : null
      }
      <div>{ children }</div>
      {
          displayFooter ? <Footer /> : null
      }
  </div>
)