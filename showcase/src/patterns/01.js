import React, { useState, Component } from "react";
import styles from "./index.css";

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false,
};

/**
 * Higher Order Component
 */

const withClapAnimation = (WrappedComponent) => {
  class withClapAnimation extends Component {
    animate = () => {
      console.log("animating");
    };
    render() {
      return <WrappedComponent {...this.props} animate={this.animate} />;
    }
  }

  return withClapAnimation;
};

const MediumClap = ({ animate }) => {
  const MAXIMUM_CLAP = 50;
  const [clapState, setClapState] = useState(initialState);
  const { count, countTotal, isClicked } = clapState;

  const handleClapClick = () => {
    animate();
    setClapState((prevState) => ({
      isClicked: true,
      count: Math.min(prevState.count + 1, MAXIMUM_CLAP),
      countTotal: count < MAXIMUM_CLAP ? prevState.countTotal + 1 : prevState.countTotal,
    }));
  };

  return (
    <button className={styles.clap} onClick={handleClapClick}>
      <ClapIcon isClicked={isClicked} />
      <ClapCount count={count} />
      <ClapTotal countTotal={countTotal} />
    </button>
  );
};

/**
 * subcomponents
 */

const ClapIcon = ({ isClicked }) => {
  return (
    <span>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100.08 125'
        className={`${styles.icon} ${isClicked && styles.checked}`}
      >
        <path d='M77.704 12.876a8.1 8.1 0 012.264 4.053c.367-.27.756-.503 1.158-.706.971-1.92.654-4.314-.964-5.891a5.056 5.056 0 00-7.151.091l-.216.222c1.844.174 3.568.927 4.909 2.231zM48.893 26.914c.407.885.687 1.93.791 3.057l16.478-16.928c.63-.648 1.364-1.144 2.145-1.545 1.006-1.93.712-4.367-.925-5.96-2.002-1.948-5.213-1.891-7.155.108L44.722 21.575c2.321 2.261 3.098 3.024 4.171 5.339zM10.041 66.626c-.118-8.864 3.219-17.24 9.396-23.584l18.559-19.064c.727-2.031.497-4.076-.076-5.319-.843-1.817-1.314-2.271-3.55-4.451L13.501 35.645C2.944 46.489 2.253 63.277 11.239 74.94c-.729-2.681-1.161-5.462-1.198-8.314z' />
        <path d='M21.678 45.206l20.869-21.437c2.237 2.18 2.708 2.634 3.55 4.451.837 1.819.994 5.356-1.607 8.05L32.642 48.514a1.194 1.194 0 00.028 1.689 1.195 1.195 0 001.686-.019l34.047-34.976c1.941-1.999 5.153-2.056 7.155-.108 1.998 1.944 2.03 5.159.089 7.155L50.979 47.584c-.452.464-.437 1.224.038 1.688a1.195 1.195 0 001.689-.009l28.483-29.28a5.055 5.055 0 017.15-.09 5.052 5.052 0 01.097 7.144L59.944 56.308a1.194 1.194 0 00.038 1.688 1.193 1.193 0 001.678-.015l24.66-25.336c1.942-1.995 5.15-2.061 7.15-.113 2.003 1.949 2.043 5.175.101 7.17l-24.675 25.32a1.194 1.194 0 00.038 1.688c.47.457 1.231.453 1.682-.014l14.56-14.973a5.067 5.067 0 017.159-.107 5.052 5.052 0 01.09 7.164L64.792 87.17c-11.576 11.892-30.638 12.153-42.54.569-11.903-11.588-12.149-30.644-.574-42.533' />
      </svg>
    </span>
  );
};

const ClapCount = ({ count }) => {
  return <span className={styles.count}>+ {count}</span>;
};

const ClapTotal = ({ countTotal }) => {
  return <span className={styles.total}>{countTotal}</span>;
};

export default withClapAnimation(MediumClap);
