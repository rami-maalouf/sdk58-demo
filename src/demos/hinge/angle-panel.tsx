// copied from nathan schroeder's expo-ui-examples (mit), src/examples/hinge/angle-panel.tsx at bf89951.
// our edit: a hyphen marks a missing reading.
import { ScrollView, Text, VStack } from '@expo/ui/swift-ui';
import {
  accessibilityIdentifier,
  accessibilityLabel,
  background,
  font,
  foregroundStyle,
  frame,
  minimumScaleFactor,
  monospacedDigit,
  onGeometryChange,
  padding,
  splitArrangementLayoutSize,
  textSelection,
} from '@expo/ui/swift-ui/modifiers';
import type { Hinge } from 'expo-hinge';
import { Color } from 'expo-router';
import { useState } from 'react';

const secondary = foregroundStyle({ type: 'hierarchical', style: 'secondary' });

type AnglePanelProps = {
  hinge: Hinge | null;
  posture: string;
  /** where the content starts below the picker. the panel always starts at the top. */
  contentTop: number;
  stacked: boolean;
};

export function AnglePanel({ hinge, posture, contentTop, stacked }: AnglePanelProps) {
  const [panelHeight, setPanelHeight] = useState(0);
  const availableHeight = Math.max(0, panelHeight - contentTop);
  const compact = availableHeight < 400;

  return (
    <ScrollView
      showsIndicators={false}
      modifiers={[
        frame({ maxWidth: Infinity, maxHeight: stacked ? contentTop + 180 : Infinity }),
        background(Color.ios.systemGroupedBackground),
        onGeometryChange(({ height }) => setPanelHeight(height)),
        splitArrangementLayoutSize({
          minHeight: contentTop + 144,
          idealHeight: contentTop + 160,
          maxHeight: contentTop + 180,
        }),
      ]}>
      <VStack
        spacing={8}
        modifiers={[
          frame({ minHeight: Math.max(0, availableHeight - 24), maxWidth: Infinity }),
          padding({ horizontal: 28, top: contentTop + 12, bottom: 12 }),
        ]}>
        <Text modifiers={[font({ textStyle: 'caption' }), secondary]}>Hinge angle</Text>
        <Text
          modifiers={[
            font({ size: compact ? 80 : 120, weight: 'light' }),
            monospacedDigit(),
            textSelection(true),
            minimumScaleFactor(0.5),
            accessibilityLabel(
              hinge ? `Hinge angle, ${hinge.angle.toFixed(1)} degrees` : 'Hinge angle unavailable'
            ),
            accessibilityIdentifier('hinge-angle'),
          ]}>
          {hinge ? `${compact ? hinge.angle.toFixed(1) : Math.round(hinge.angle)}°` : '-'}
        </Text>
        <Text
          modifiers={[
            font({ textStyle: compact ? 'body' : 'title3' }),
            secondary,
            accessibilityIdentifier('hinge-posture'),
          ]}>
          {posture}
        </Text>
      </VStack>
    </ScrollView>
  );
}
