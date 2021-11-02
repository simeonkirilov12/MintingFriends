import makeStyles from '@material-ui/core/styles/makeStyles';

import frame from "../assets/about/bush-frame.png";
import gif from "../assets/RIZK.gif";

const tokenSlider = () => {
  const classes = UseStyles();

  return (
    <div className={classes.container}>
      <img src={frame} alt="frame" className={classes.frame} />
      <img src={gif} alt="frame" className={classes.img} />
    </div>
  )
}

const UseStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '50%',
    zIndex: '3',
    // [theme.breakpoints.up(474)]: {
    //   top: '-25px'
    // },
    [theme.breakpoints.down(473)]: {
      width: '100%',
    },
  },
  frame: {
    width: '110%',
    position: 'absolute',
    zIndex: 1,
    
  },
  img: {
    width: '60%',
    position: 'relative', 
    left: '5px'
  }
}));

export default tokenSlider;