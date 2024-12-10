import React from 'react';

const BellAlert = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.00001 2.5C6.06701 2.5 4.50001 4.067 4.50001 6L4.49988 6.5C4.49988 6.49996 4.49988 6.50004 4.49988 6.5C4.49985 7.90627 4.05278 9.20909 3.29351 10.2727C4.21276 10.5653 5.1693 10.7745 6.15432 10.8913C6.75932 10.9631 7.37518 11 7.99988 11C8.62466 11 9.2406 10.9631 9.84568 10.8913C10.8306 10.7745 11.7871 10.5653 12.7062 10.2727C11.947 9.20905 11.4999 7.90632 11.4999 6.5V6.02877L11.5 6C11.5 4.067 9.933 2.5 8.00001 2.5ZM3.50001 5.99987C3.50008 3.51465 5.51477 1.5 8.00001 1.5C10.4853 1.5 12.5 3.51472 12.5 6L12.4999 6.03279V6.5C12.4999 7.91542 13.0339 9.20494 13.9122 10.1799C14.0232 10.3031 14.0659 10.4734 14.0262 10.6344C13.9865 10.7954 13.8695 10.9262 13.7139 10.9836C12.6846 11.3636 11.607 11.6439 10.4931 11.8128C10.4977 11.8746 10.5 11.9371 10.5 12C10.5 13.3807 9.38072 14.5 8.00001 14.5C6.6193 14.5 5.50001 13.3807 5.50001 12C5.50001 11.9371 5.50234 11.8747 5.50693 11.8128C4.39289 11.644 3.31525 11.3637 2.28583 10.9836C2.13026 10.9262 2.01328 10.7954 1.97355 10.6344C1.93382 10.4734 1.97651 10.3031 2.08751 10.1799C2.96586 9.20494 3.49988 7.91542 3.49988 6.5L3.50001 5.99987C3.50001 5.99991 3.50001 5.99982 3.50001 5.99987ZM6.50148 11.9328C6.5005 11.9551 6.50001 11.9775 6.50001 12C6.50001 12.8284 7.17158 13.5 8.00001 13.5C8.82843 13.5 9.50001 12.8284 9.50001 12C9.50001 11.9775 9.49951 11.9551 9.49854 11.9328C9.00482 11.9773 8.50494 12 7.99988 12C7.4949 12 6.99511 11.9773 6.50148 11.9328Z"
    />
    <ellipse cx="11.6667" cy="3.66667" rx="1.66667" ry="1.66667" fill="#FF9271" />
  </svg>
);

export default BellAlert;
