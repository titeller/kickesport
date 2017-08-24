export default ({ size = '24px' }) => (
  <div className="loader">
    <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style={{ fontSize: size }} />
    <span className="sr-only">Loading...</span>
    <style jsx>{`
      .loader {
        display: inline-block;
      }
      i {
        color: #d80157;
      }
    `}</style>
  </div>
)