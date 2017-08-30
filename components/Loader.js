export default ({ size = '24px', color = '#d80157' }) => (
  <div className="loader">
    <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style={{ fontSize: size, color: color }} />
    <span className="sr-only">Loading...</span>
    <style jsx>{`
      .loader {
        display: inline-block;
      }
    `}</style>
  </div>
)