import Repository from './Repository'
import Code from './Code'
import Commit from './Commit'
import Issue from './Issue'
import Label from './Label'
import Topic from './Topic'
import User from './User'

const HMenu = () => {
  var hlist = GithubCategories.map((gs, i) => (
      <NavLink key={`${gs[0]}-{i}`} to={gs[1]} title={gs[0]}>
        {gs[0]}{" | "}
      </NavLink>
    )
  )
  return (
    <div className="grid s-btn-group js-filter-btn">
      {hlist}
    </div>
  )
}

export default {
  Repository,
  Code,
  Commit,
  Issue,
  Label,
  Topic,
  User
}