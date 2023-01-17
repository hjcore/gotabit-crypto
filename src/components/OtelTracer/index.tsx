// deps
import { SegmentedControl, SegmentedControlItem, Group, Text } from '@mantine/core';
import { TraceType } from '@utils/otel';
import { useCallback, useMemo } from 'react';
import useOtelTracer from '../../context/otelTracer/useOtelTracer';

export default function OtelTracer() {
  const { traceType, mutateTraceType } = useOtelTracer();

  const reportMechainismDescriptors = useMemo<SegmentedControlItem[]>(
    () => [
      { label: 'Auto report', value: 'auto' },
      { label: 'Custom report', value: 'custom' },
      { label: 'Prevent report', value: 'prevent' },
    ],
    []
  );

  const changeReportMechainism = useCallback(
    (type: string) => {
      mutateTraceType(type as TraceType);
    },
    [mutateTraceType]
  );

  return (
    <Group display="flex" position="center" mt={30} style={{ flexDirection: 'column' }}>
      <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
        Choose a log report mechanism
      </Text>
      {traceType && (
        <SegmentedControl
          data={reportMechainismDescriptors}
          onChange={changeReportMechainism}
          defaultValue={traceType}
        />
      )}
    </Group>
  );
}
