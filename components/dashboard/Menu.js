export default ({ children }) => (
  <div className="dashboard-menu">
    <a href="/dashboard">
      <div className="dashboard-logo">
        <img src="/static/images/kickesport-tranparent.png" className="header-logo" />
      </div>
    </a>
    <ul>
      <li><a className="active" href="/dashboard">หาผู้เล่น & หาทีม</a></li>
      {/*<li><a href="#news">หาทีมซ้อม</a></li>*/}
      {/*<li><a href="#contact">Tournament</a></li>*/}
    </ul>
    <style jsx>{`
       .dashboard-menu {
         position: fixed;
         float: left;
         width: 260px;
         height: 100vh;
         background: #444546;
         -webkit-background-size: cover;
         -moz-background-size: cover;
         -o-background-size: cover;
         background-size: cover;
         background-position: center center;
         color: #ffffff;
         z-index: 2;
       }
       .dashboard-logo {
         text-align: center;
         vertical-align: middle;
         height: 60px;
         line-height: 60px;
         border-bottom: solid 1px rgba(255, 255, 255, 0.2);
       }
       .header-logo {
         width: 100%;
         max-width: 128px;
         display: inline-block;
         vertical-align: middle;
       }

       ul {
            list-style-type: none;
            margin: 16px 0 0;
            padding: 12px;
       }

       li a {
            display: block;
            color: #ffffff;
            padding: 16px 24px;
            margin: 6px 0;
            text-decoration: none;
            border-radius: 4px;
            font-size: 12px;
        }

        li a.active {
            background-color: rgba(225, 2, 90, 0.5);
        }

        li a:hover:not(.active) {
            background-color: rgba(255,255,255,0.2);
        }

        @media only screen and (max-width: 768px) {
          .dashboard-menu {
            display: none;
          }
        }
      }
    `}</style>
  </div>
)