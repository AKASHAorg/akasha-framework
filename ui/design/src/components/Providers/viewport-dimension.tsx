import * as React from 'react';
import responsiveBreakpoints from '../../styles/responsive-breakpoints';

const breakpoints = responsiveBreakpoints.global.breakpoints;

const ViewportSizeCtx = React.createContext({
  dimensions: { width: 0, height: 0 },
  size: '',
});
const getSizeByWidth = (width: number) => {
  const size = Object.keys(breakpoints).reduce((prev, curr) => {
    if (breakpoints[prev].value - width <= 0) {
      return curr;
    }
    return prev;
  });
  return size;
};

export interface IViewportDimProps {
  children: React.ReactElement;
}
const ViewportSizeProvider = ({ children }: IViewportDimProps) => {
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });
  const [size, setSize] = React.useState(getSizeByWidth(dimensions.width));

  React.useEffect(() => {
    const onResize = () => {
      if (document && document.body.getBoundingClientRect) {
        const width = document.body.getBoundingClientRect().width;
        const height = document.body.getBoundingClientRect().height;
        setDimensions({
          width: width,
          height: height,
        });
        setSize(getSizeByWidth(width));
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <ViewportSizeCtx.Provider value={{ dimensions, size }}>{children}</ViewportSizeCtx.Provider>
  );
};
export const useViewportSize = () => React.useContext(ViewportSizeCtx);
export default ViewportSizeProvider;
