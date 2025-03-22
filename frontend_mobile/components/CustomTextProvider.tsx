import { Text } from 'react-native';

export const overrideDefaultTextFont = () => {
  const oldRender = (Text as any).render;

  (Text as any).render = function (...args: any) {
    const origin = oldRender.call(this, ...args);

    return {
      ...origin,
      props: {
        ...origin.props,
        style: [
          { fontFamily: 'Poppins' }, // Ganti dengan font default kamu
          origin.props.style,
        ],
      },
    };
  };
};
