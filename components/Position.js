export default ({ name }) => (
  <div className={`position ${name.toLowerCase()}`}>
    <span>{name}</span>
    <style jsx>{`
      .position {
        background: #999999;
        font-size: 14px;
        display: inline-block;
        padding: 2px 4px;
        border-radius: 2px;
        margin: 4px;
        color: #ffffff;
      }
      .support {
        background: #5AAC56;
      }
      .carry,.dps {
        background: #801815;
      }
      .offlane,.tank {
        background: #152B55;
      }
      .midlane,.mage {
        background: #806015;
      }
    `}</style>
  </div>
)