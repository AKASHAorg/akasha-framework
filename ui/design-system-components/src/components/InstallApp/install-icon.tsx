import React from 'react';

const InstallIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="95"
    height="95"
    viewBox="0 0 95 95"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <rect width="95" height="95" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_250_10860" transform="scale(0.00666667)" />
      </pattern>
      <image
        id="image0_250_10860"
        width="150"
        height="150"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export default InstallIcon;
