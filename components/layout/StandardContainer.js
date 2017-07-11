export default ({ children }) => (
  <div>
    { children }
    <style jsx>{`
    div {
      max-width: 1200px;
      margin: auto;
    }
    `}</style>
  </div>
)