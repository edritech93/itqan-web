import { connect } from 'react-redux';
import { showAlert, } from '../actions/app';
import Screen from '../screens/dashboard';

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAlert: (args) => dispatch(showAlert(args)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
