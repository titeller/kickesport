export default ({ rov_name }) => (
  <div>
    <span>{rov_name}</span>
    <style jsx>{`
      div {
        display: inline-block;
      }
      span {
        background: #3e4148;
        font-size: 14px;
        display: inline-block;
        padding: 2px 4px;
        border-radius: 2px;
        margin: 4px;
        color: #fff;
      }
    `}</style>
  </div>
)