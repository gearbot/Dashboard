import AuthUserContext from './AuthUserContext';

const withAuthentication = Component => {
    class WithAuthentication extends Component {
        constructor(props) {
            super(props);
            this.state = {
                user: JSON.parse(localStorage.getItem('user')),
            };
        }

        componentDidMount() {
            //TODO: user authentification checking

            // this.listener = this.props.firebase.onAuthChange(
            //     user => {
            //         localStorage.setItem("user", JSON.stringify(user));
            //         this.setState({ user: user })
            //     },
            //     () => {
            //         localStorage.removeItem("user")
            //         this.setState({ user: undefined })
            //     }
            // );
        }

        componentWillUnmount() {
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.user}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }

    return WithAuthentication;
};

export default withAuthentication;