export default ({ children, noPadding = false, noMargin = false }) => (
  <div className={`card ${noPadding ? 'no-padding' : ''} ${noMargin ? 'no-margin' : ''}`}>
    {children}
    <style jsx>{`
      .card {
        background: #ffffff;
        border: solid 1px #e9e9e9;
        padding: 12px;
        margin: 8px 0;
      }
      .no-padding {
        padding: 0;
      }
      .no-margin {
        margin: 0;
      }
    `}</style>
  </div>
)