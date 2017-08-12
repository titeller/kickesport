export default ({ children }) => (
  <div className="card">
    {children}
    <style jsx>{`
      .card {
        background: #ffffff;
        border: solid 1px #e9e9e9;
        padding: 12px;
        margin: 8px 0;
      }
    `}</style>
  </div>
)