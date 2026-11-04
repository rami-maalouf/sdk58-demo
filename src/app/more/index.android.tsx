// the android counterpart of the swiftui list in index.tsx. the grouped list is copied from
// nathan schroeder's expo-ui-examples (mit), src/app/index.android.tsx at bf89951. our edits: the
// rows show the changelog label, and a row for a demo with its own tab opens that tab.
import ChevronRight from '@expo/material-symbols/chevron_right.xml';
import OpenInNew from '@expo/material-symbols/open_in_new.xml';
import {
  Host,
  Icon,
  LazyColumn,
  ListItem,
  Surface,
  Text,
  useMaterialColors,
  type MaterialColors,
} from '@expo/ui/jetpack-compose';
import {
  background,
  clickable,
  clip,
  fillMaxSize,
  fillMaxWidth,
  padding,
  paddingAll,
  Shapes,
  size,
} from '@expo/ui/jetpack-compose/modifiers';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StatusColors } from '@/constants/theme';
import { openChangelog } from '@/demos/demo-toolbar';
import { DEMOS_HERE, type Demo } from '@/demos/registry';

// Material 3 "grouped list" corner treatment: the group reads as one rounded
// slab, so only its outer corners get the full radius and the seams stay tight.
const GROUP_RADIUS = 24;
const SEAM_RADIUS = 6;

function groupCorners(index: number, count: number) {
  const top = index === 0 ? GROUP_RADIUS : SEAM_RADIUS;
  const bottom = index === count - 1 ? GROUP_RADIUS : SEAM_RADIUS;
  return { topStart: top, topEnd: top, bottomStart: bottom, bottomEnd: bottom };
}

type RowProps = {
  demo: Demo;
  /** Position within its own group, so each group rounds independently. */
  index: number;
  count: number;
  colors: MaterialColors;
  onPress: () => void;
};

function DemoRow({ demo, index, count, colors, onPress }: RowProps) {
  const statusColor = StatusColors[demo.status];
  return (
    <ListItem
      colors={{
        containerColor: colors.surfaceContainerHigh,
        contentColor: colors.onSurface,
        supportingContentColor: colors.onSurfaceVariant,
        trailingContentColor: colors.onSurfaceVariant,
      }}
      // `clip` before `clickable` so the ripple stays inside the shape.
      modifiers={[
        fillMaxWidth(),
        clip(Shapes.RoundedCorner(groupCorners(index, count))),
        clickable(onPress),
      ]}>
      <ListItem.LeadingContent>
        {/* 22 + 9 * 2 = 40dp tonal circle around the glyph. */}
        <Icon
          source={demo.materialIcon}
          tint={colors.onSecondaryContainer}
          modifiers={[
            clip(Shapes.Circle),
            background(colors.secondaryContainer),
            paddingAll(9),
            size(22, 22),
          ]}
        />
      </ListItem.LeadingContent>
      <ListItem.OverlineContent>
        <Text color={statusColor} style={{ typography: 'labelMedium' }}>
          {demo.status}
        </Text>
      </ListItem.OverlineContent>
      <ListItem.HeadlineContent>
        <Text style={{ typography: 'titleMedium' }}>{demo.title}</Text>
      </ListItem.HeadlineContent>
      <ListItem.SupportingContent>
        <Text style={{ typography: 'bodyMedium' }}>{demo.description}</Text>
      </ListItem.SupportingContent>
      <ListItem.TrailingContent>
        <Icon
          source={demo.screen || demo.href ? ChevronRight : OpenInNew}
          size={20}
          tint={colors.onSurfaceVariant}
        />
      </ListItem.TrailingContent>
    </ListItem>
  );
}

export default function MoreScreen() {
  const router = useRouter();
  const colors = useMaterialColors();
  const insets = useSafeAreaInsets();

  const open = (demo: Demo) => {
    if (demo.screen) router.push({ pathname: '/more/[slug]', params: { slug: demo.slug } });
    else if (demo.href) router.navigate(demo.href);
    else openChangelog(demo);
  };
  const inMore = DEMOS_HERE.filter((d) => d.screen);
  const elsewhere = DEMOS_HERE.filter((d) => !d.screen);

  return (
    <Host style={{ flex: 1 }}>
      <Surface color={colors.background} modifiers={[fillMaxSize()]}>
        <LazyColumn
          modifiers={[fillMaxSize()]}
          verticalArrangement={{ spacedBy: 3 }}
          contentPadding={{
            start: 16,
            end: 16,
            top: insets.top + 16,
            bottom: insets.bottom + 24,
          }}>
          <Text
            color={colors.onBackground}
            style={{ typography: 'displaySmall' }}
            modifiers={[padding(4, 8, 4, 16)]}>
            More
          </Text>

          <Text
            color={colors.onSurfaceVariant}
            style={{ typography: 'titleSmall' }}
            modifiers={[padding(4, 12, 4, 12)]}>
            Demos
          </Text>
          {inMore.map((demo, index) => (
            <DemoRow
              key={demo.slug}
              demo={demo}
              index={index}
              count={inMore.length}
              colors={colors}
              onPress={() => open(demo)}
            />
          ))}

          <Text
            color={colors.onSurfaceVariant}
            style={{ typography: 'titleSmall' }}
            modifiers={[padding(4, 28, 4, 12)]}>
            In this app
          </Text>
          {elsewhere.map((demo, index) => (
            <DemoRow
              key={demo.slug}
              demo={demo}
              index={index}
              count={elsewhere.length}
              colors={colors}
              onPress={() => open(demo)}
            />
          ))}

          <Text
            color={colors.onSurfaceVariant}
            style={{ typography: 'bodySmall' }}
            modifiers={[padding(4, 12, 4, 0)]}>
            Labels match the Expo SDK 58 changelog.
          </Text>
        </LazyColumn>
      </Surface>
    </Host>
  );
}
