import { Component, PropTypes } from 'react';
import Roles from 'roles-client';

class RoleCheck extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    group: PropTypes.string.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      hasAccess: false,
    };
  }
  async componentDidMount() {
    const { roles, group } = this.props;
    // TODO Catch and handle promise error
    let hasAccess = false;
    if (roles && group) {
      hasAccess = await Roles.userIsInRole(roles, group);
    } else if (group) {
      hasAccess = await Roles.userIsInGroup(group);
    }
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isLoading: false,
      hasAccess,
    });
  }
  render() {
    return this.state.hasAccess && this.props.children;
  }
}

export default RoleCheck;
