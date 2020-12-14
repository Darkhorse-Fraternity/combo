import React, { ComponentType, PropsWithChildren } from 'react';
import { useWindowDimensions } from 'react-native';

export const withWindowWidth = <
  ComposedComponentProps extends { width: number }
>(
  WrappedComponent: ComponentType<ComposedComponentProps>,
) => {
  const WindowWidthCmp = React.forwardRef<
    typeof WrappedComponent,
    PropsWithChildren<Omit<ComposedComponentProps, 'width'>>
  >((props, ref) => {
    const { width } = useWindowDimensions();

    //@ts-expect-error
    return <WrappedComponent {...props} ref={ref} width={width} />;
  });

  return WindowWidthCmp;
};
