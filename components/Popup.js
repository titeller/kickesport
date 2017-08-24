export default ({ children, title, titleIcon, closePopup }) => (
  <div className="overlay">
    <div className="popup-containers">
      <div className="popup-header">
        {
          titleIcon && (
            <i className={`fa ${titleIcon}`} aria-hidden="true" />
          )
        }
        <strong> {title}</strong>
        <div className="popup-close" onClick={closePopup}>
          <i className="fa fa-times" aria-hidden="true" />
        </div>
      </div>
      <div className="popup-content">{children}</div>
    </div>
    <style jsx>{`
      .overlay {
        z-index: 2;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
        padding-top: 80px;
      }
      .popup-containers {
        position: relative;
        margin: auto;
        width: 700px;
        padding: 0;
        outline: 0;
        box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
        border-radius: 2px;
      }
      .popup-header {
        padding: 0 12px;
        color: #fff;
        font-size: 18px;
        background: #444546;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        height: 40px;
        line-height: 40px;
      }
      .popup-content {
        padding: 12px 24px;
        font-size: 12px;
        background: #fff;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
      }
      .popup-close {
        float: right;
        cursor: pointer;
      }

      @media only screen and (max-width: 480px) {
        .popup-containers {
          margin: 0 10px;
          width: auto!important;
        }
      }
    `}</style>
  </div>
)