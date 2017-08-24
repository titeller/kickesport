export default ({ children, noPadding = false }) => (
  <div className={`card ${noPadding ? 'no-padding' : ''}`}>
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
    `}</style>
  </div>
)