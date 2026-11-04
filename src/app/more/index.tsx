// the row layout comes from nathan's expo-ui-examples list (src/app/index.tsx at bf89951).
import { Host } from '@expo/ui';
import {
  Button,
  HStack,
  Image,
  Label,
  List,
  Section,
  Spacer,
  Text,
  VStack,
} from '@expo/ui/swift-ui';
import { buttonStyle, font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';

import { StatusBadge } from '@/components/status-badge';
import { openChangelog } from '@/demos/demo-toolbar';
import { DEMOS_HERE, type Demo } from '@/demos/registry';

function DemoRow({ demo, onPress }: { demo: Demo; onPress: () => void }) {
  return (
    <Button onPress={onPress} modifiers={[buttonStyle('plain')]}>
      <HStack spacing={8}>
        <Label systemImage={demo.systemImage}>
          <VStack alignment="leading" spacing={2}>
            <Text>{demo.title}</Text>
            <Text
              modifiers={[
                font({ textStyle: 'footnote' }),
                foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
              ]}>
              {demo.description}
            </Text>
          </VStack>
        </Label>
        <Spacer />
        <StatusBadge status={demo.status} />
        <Image
          systemName={demo.screen || demo.href ? 'chevron.right' : 'arrow.up.right'}
          size={14}
          modifiers={[foregroundStyle({ type: 'hierarchical', style: 'tertiary' })]}
        />
      </HStack>
    </Button>
  );
}

export default function MoreScreen() {
  const router = useRouter();
  const open = (demo: Demo) => {
    if (demo.screen) router.push({ pathname: '/more/[slug]', params: { slug: demo.slug } });
    else if (demo.href) router.navigate(demo.href);
    else openChangelog(demo);
  };
  const inMore = DEMOS_HERE.filter((d) => d.screen);
  const elsewhere = DEMOS_HERE.filter((d) => !d.screen);

  return (
    <Host style={{ flex: 1 }}>
      <List>
        {inMore.length > 0 ? (
          <Section title="Demos">
            {inMore.map((d) => (
              <DemoRow key={d.slug} demo={d} onPress={() => open(d)} />
            ))}
          </Section>
        ) : null}
        <Section
          title="In this app"
          footer={<Text>Labels match the Expo SDK 58 changelog.</Text>}>
          {elsewhere.map((d) => (
            <DemoRow key={d.slug} demo={d} onPress={() => open(d)} />
          ))}
        </Section>
      </List>
    </Host>
  );
}
