export default ({ src = '/static/images/member/avatar.png' }) => (
  <div>
    <img src={src} alt="avatar"/>
    <style jsx>{`
      div {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin: 0 8px 0 0;
        overflow: hidden;
        text-align: center;
        position: relative;
        vertical-align: middle;
      }
      img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `}</style>
  </div>
)