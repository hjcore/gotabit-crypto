import { Container, createStyles, Divider } from '@mantine/core';
import LocalWalletViewer from '@components/LocalWalletViewer';
import CryptoViewer from '@components/CryptoViewer';

const useStyles = createStyles(() => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },
}));

export default function Index() {
  const { classes } = useStyles();

  return (
    <>
      <Container className={classes.root} my={40}>
        <LocalWalletViewer />
        <Divider my={20} />
        <CryptoViewer />
      </Container>{' '}
    </>
  );
}
