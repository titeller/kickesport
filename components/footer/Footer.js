export default () => (
  <footer>
    <div className="footer-container">
      <img src="/static/images/kickesport-tranparent.png" className="header-logo" />
    </div>
    <style jsx>{`
    footer {
      background: #292c2f;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #f5f5f5;
    }
    .footer-container {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }
    .header-logo {
      width: 100%;
      max-width: 128px;
      display: inline-block;
      vertical-align: middle;
    }
    `}</style>
  </footer>
)