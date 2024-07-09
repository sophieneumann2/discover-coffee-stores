export const getDomain = () => {
  return new URL(
    process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
  );
};
