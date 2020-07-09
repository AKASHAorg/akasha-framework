import React from 'react';

const Following = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#949EB3"
      strokeLinecap="round"
      transform="translate(1 1)"
    >
      <path d="M5.04201681,13.4453782 C0.106584985,13.4453782 0,12.5212544 0,12.5212544 C0,8.60836241 4.62184874,9.39094081 4.62184874,7.82578401 C4.62184874,7.82578401 4.71053553,6.78658296 4.20114078,6.26062721 C3.56655512,5.60869306 3.08123249,4.82509302 3.08123249,3.5216028 C3.08123249,1.57667528 4.46074727,0 6.16246499,0 C7.8641827,0 9.24369748,1.57667528 9.24369748,3.5216028 C9.24369748,4.80673444 8.77106637,5.60760024 8.10850656,6.26062721 C7.62441881,6.77339332 7.70308123,7.82578401 7.70308123,7.82578401 C7.70308123,8.48729575 8.5286916,8.72942672 9.48202576,9.08392933" />
      <g transform="translate(8.403 10.084)">
        <line x1="3.922" x2="6.723" y2="2.801" />
        <line x1="3.922" x2="6.723" y1="2.801" y2="5.602" transform="matrix(1 0 0 -1 0 8.403)" />
        <line x2="6.723" y1="2.801" y2="2.801" />
      </g>
    </g>
  </svg>
);

export default Following;
