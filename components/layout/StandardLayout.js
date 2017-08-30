import Head from '../Head'
import Header from '../header/Header'
import Footer from '../footer/Footer'

export default ({ member, displayHeader = true, displayFooter = true, headerBackground = true, children }) => (
  <div>
      <Head />
      {
          displayHeader ? <Header member={member} headerBackground={headerBackground} /> : null
      }
      <div className="container">{ children }</div>
      {
          displayFooter ? <Footer /> : null
      }
      <style jsx>{`
        .container {
          min-height: 100vh;
        }
      `}</style>
  </div>
)