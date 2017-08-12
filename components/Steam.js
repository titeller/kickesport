export default ({ id }) => (
  <a href={id} className="steam">
    <span>Steam</span>
    <style jsx>{`
      .steam {
        background: #3e4148;
        font-size: 10px;
        display: inline-block;
        padding: 2px 4px;
        border-radius: 2px;
        margin: 4px;
        color: #fff;
      }
    `}</style>
  </a>
)