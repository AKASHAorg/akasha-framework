import React from 'react';

const InfoLight = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.875 12C1.875 7.51269 5.51269 3.875 10 3.875C14.4873 3.875 18.125 7.51269 18.125 12C18.125 16.4873 14.4873 20.125 10 20.125C5.51269 20.125 1.875 16.4873 1.875 12ZM9.1302 10.7987C10.0854 10.3211 11.1609 11.1839 10.9019 12.2199L10.3111 14.5833L10.3456 14.566C10.6544 14.4116 11.0298 14.5368 11.1842 14.8455C11.3385 15.1542 11.2134 15.5297 10.9046 15.684L10.8701 15.7013C9.91488 16.1789 8.83936 15.3162 9.09838 14.2801L9.68922 11.9167L9.65465 11.934C9.34591 12.0884 8.97049 11.9633 8.81612 11.6545C8.66175 11.3458 8.78689 10.9704 9.09563 10.816L9.1302 10.7987ZM10 9.5C10.3452 9.5 10.625 9.22018 10.625 8.875C10.625 8.52982 10.3452 8.25 10 8.25C9.65482 8.25 9.375 8.52982 9.375 8.875C9.375 9.22018 9.65482 9.5 10 9.5Z"
        fill="#BA9AE0"
      />
    </svg>
  );
};

export default InfoLight;
