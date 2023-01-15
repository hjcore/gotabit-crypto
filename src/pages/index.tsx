import { Group, Container, createStyles, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import Head from 'next/head';
import { IconSun, IconMoon } from '@tabler/icons';

const useStyles = createStyles(() => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },
}));

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Group position="center" my={30}>
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="lg"
        onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
        offLabel={<IconMoon color={theme.colors.gray[6]} size={20} stroke={1.5} />}
      />
    </Group>
  );
}

export default function Index() {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Project G</title>
        <meta property="og:title" content="Project G" key="title" />
      </Head>
      <Container className={classes.root} size={420} my={40}>
        <ThemeToggle />
      </Container>{' '}
    </>
  );
}
