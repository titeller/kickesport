export default ({ name }) => (
  <div className={`position ${name.toLowerCase()}`}>
    <span>{name}</span>
    <style jsx>{`
      .position {
        background: #999999;
        font-size: 10px;
        display: inline-block;
        padding: 2px 4px;
        border-radius: 2px;
        margin: 4px;
        color: #ffffff;
      }
      .support {
        background: #5AAC56;
      }
      .carry {
        background: #801815;
      }
      .offlane {
        background: #152B55;
      }
      .midlane {
        background: #806015;
      }
    `}</style>
  </div>
)