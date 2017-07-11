import Menu from './Menu'
import Content from './Content'
import StandardLayout from '../layout/StandardLayout'

export default ({ children, member }) => (
  <StandardLayout displayHeader={false} displayFooter={false} member={member} >
    <div className="dashboard-container">
      <Menu />
      <Content member={member}>{children}</Content>
    </div>
    <style jsx>{`
      .dashboard-container {
        position: relative;
        width: 100%;
        min-height: 100vh;
      }
    `}</style>
  </StandardLayout>
)