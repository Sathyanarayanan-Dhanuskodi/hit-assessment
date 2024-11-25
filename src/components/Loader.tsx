import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-20 h-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a3"
            cx="0.66"
            cy="0.313"
            fx="0.66"
            fy="0.313"
            gradientTransform="scale(1.5)">
            <stop offset="0" stopColor="#1B9AFF"></stop>
            <stop offset="0.3" stopColor="#1B9AFF" stopOpacity="0.9"></stop>
            <stop offset="0.6" stopColor="#1B9AFF" stopOpacity="0.6"></stop>
            <stop offset="0.8" stopColor="#1B9AFF" stopOpacity="0.3"></stop>
            <stop offset="1" stopColor="#1B9AFF" stopOpacity="0"></stop>
          </radialGradient>
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="url(#a3)"
            strokeDasharray="200 1000"
            strokeLinecap="round"
            strokeWidth="15"
            transform-origin="center">
            <animateTransform
              attributeName="transform"
              calcMode="spline"
              dur="2"
              keySplines="0 0 1 1"
              keyTimes="0;1"
              repeatCount="indefinite"
              type="rotate"
              values="360;0"></animateTransform>
          </circle>
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#1B9AFF"
            strokeLinecap="round"
            strokeWidth="15"
            opacity="0.2"
            transform-origin="center"></circle>
        </svg>
      </div>
    </div>
  );
}

export default Loader;
