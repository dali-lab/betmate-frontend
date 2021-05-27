import { connect } from 'react-redux';
import { RootState } from 'types/state';

import MoveOptions from 'components/wagerFormComponents/MoveOptions/component';
import '../style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
});

export default connect(mapStateToProps, { })(MoveOptions);
