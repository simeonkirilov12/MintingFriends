import { roadmapData } from '../utils';
import styled from "styled-components";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import 'react-vertical-timeline-component/style.min.css';
import {
  VerticalTimeline,
  VerticalTimelineElement, 
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import StarIcon from '@material-ui/icons/Star';
import title from '../assets/roadmap/title-roadmap.png';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Icon = ({ img, transform}) => {
  return <img src={img} alt='icon' style={{ width: '100%', transform: transform?'scaleX(-1)':''}} />;
};

// import mountainTop from '../assets/roadmap/mountain-top.png';
// import mountainTopWide from '../assets/roadmap/mountain-top-wide.png';
// import mountainRightTop from '../assets/roadmap/mountain-right-top.png';
// import mountainLeft from '../assets/roadmap/mountain-left.png';
// import mountainRightBottom from '../assets/roadmap/mountain-right-bottom.png';

const Roadmap = () => {
  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.up(1169));
  const classes = useStyles();
  
  return (
    <Box className={classes.root}>
      <Box className={classes.heading}>
        <img src={title} alt="title" className={classes.title} />
      </Box>
      <Box className={classes.steps}>
        <Background></Background>
      <VerticalTimeline className={classes.timeline}>
        {roadmapData.map((item, index) => {
          return (
          <VerticalTimelineElement
            key={index}
            contentStyle={contentStyle}
            contentArrowStyle={contentArrowStyle}
            iconStyle={iconStyle}
          >
            <Typography variant='h6' color='textSecondary'>
              {item?.heading}
            </Typography>
            <Typography variant='body1' color='textSecondary'>
              {index === roadmapData.length-1? item?.description1:item?.description}
            </Typography>
            {
              index === roadmapData.length-1 &&
              <Typography variant='body1' color='textSecondary'>{item?.description2}</Typography>
            }
          </VerticalTimelineElement>
        )})}

        <VerticalTimelineElement
          iconStyle={endIcon}
          icon={<StarIcon />}
        ></VerticalTimelineElement>
      </VerticalTimeline>
      </Box>
    </Box>
  );
};

const iconStyle = { background: 'rgb(255,255,255)' };
const endIcon = { background: '#FFF', color: '#2d4d83' };
const contentStyle = { background: '#000000a0', borderRadius: '12px' };
const contentArrowStyle = { borderRight: '7px solid #1D2D3C' };

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(20),
    paddingTop: theme.spacing(35),
    [theme.breakpoints.down(1025)]: {
      marginTop: theme.spacing(35),
      paddingTop: theme.spacing(15),
    },
    [theme.breakpoints.down(473)]: {
      marginTop: theme.spacing(0),
      paddingTop: theme.spacing(35),
    },
  },
  timeline: {
    marginTop: theme.spacing(25),
  },
  heading: {
    display: 'flex',
    marginBottom: theme.spacing(5),
    justifyContent: 'center',
  },
  title: {
    maxWidth: '100%',
    [theme.breakpoints.down(473)]: {
      width: '75%',
      objectFit: 'contain'
    },
  },
  mountains: {
    width: '100vw',
    left: '-70px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: 'auto',
    [theme.breakpoints.down(1025)]: {
      width: '125%',
      height: '90vh'
    },
    [theme.breakpoints.down(473)]: {
      top: '145px',
      height: '67.5vh'
    },
  },
  steps: {
    position: 'relative',
    // top: '300px',
    // marginTop: '150px',
    paddingBottom: '50px',
    width: '100%',
    [theme.breakpoints.down(473)]: {
      paddingBottom: '0',
    },
  }, 
  content: {
    position: 'relative',
    zIndex: '5',
    textAlign: 'center',
    maxWidth: '15%',
    [theme.breakpoints.down(473)]: {
      maxWidth: '35%',
    },
  },
  content_first: {
    position: 'relative',
    zIndex: '5',
    textAlign: 'center',
    maxWidth: '15%',
    paddingTop: '100px',
    [theme.breakpoints.down(473)]: {
      paddingTop: '0',
    },
  },
  step: {
    position: 'relative',
    zIndex: '5',
    whiteSpace: 'pre-wrap',
    [theme.breakpoints.down(473)]: {
      fontSize: '12px',
    },
  },
  mountain1: {
    [theme.breakpoints.down(473)]: {
      width: '60% !important',
      left: '-50px !important;'
    },
  },
  mountain2: {
    [theme.breakpoints.down(473)]: {
      width: '121% !important',
      position: 'absolute !important',
      left: '-17.5% !important',
      top: '-145px !important'
    },
  },
  mountain3: {
    [theme.breakpoints.down(473)]: {
      width: '60% !important',
      position: 'absolute !important',
      right: '-28% !important',
      top: '-100px !important'
    },
  },
  mountain4: {
    [theme.breakpoints.down(473)]: {
      width: '75% !important',
      position: 'absolute !important',
      right: '-19% !important',
      top: '-5px !important'
    },
  },
  mountain5: {
    [theme.breakpoints.down(473)]: {
      width: '75% !important',
      position: 'absolute !important',
      left: '0 !important',
      top: '130px !important'
    },
  },
  mountain6: {
    [theme.breakpoints.down(473)]: {
      width: '75% !important',
      position: 'absolute !important',
      right: '-30% !important',
      top: '225px !important'
    },
  }
}));

export default Roadmap;

const Background = styled.div`
  position: absolute;
  left: -50%;
  bottom: 0;
  width: 250%;
  height: 83.5%;
  background: #3879D6;
  z-index: -1;
/* 
  @media (min-width: 1381px) {
    top: 200px;
  }

  @media (max-width: 1380px) {
    top: 125px;
  }

  @media (max-width: 473px) {
    top: 0;
  } */
`
