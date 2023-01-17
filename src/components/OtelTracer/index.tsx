// deps
import { SegmentedControl, SegmentedControlItem, Group, Text } from '@mantine/core';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {  otelTracer, getTraceTypeFromLocal, TraceType } from '@utils/otel';

export default function OtelTracer() {

  const [traceType, setTraceType] = useState<TraceType | null>(null);

  useEffect(() => {
    const localTraceType = getTraceTypeFromLocal();
    setTraceType(localTraceType || "custom");
  }, []);

  const reportMechainismDescriptors = useMemo<SegmentedControlItem[]>(
    () => [
      { label: 'Auto report', value: 'auto' },
      { label: 'Custom report', value: 'custom' },
      { label: 'Prevent report', value: 'prevent' },
    ],
    []
  );

  const changeReportMechainism = useCallback((type: string) => {
    setTraceType(type as 'auto' | 'custom' | 'prevent');
  }, []);

  useEffect(() => {
    if (traceType === null) return;
    otelTracer(traceType); // init tracer
  }, [traceType]);

  return (
    <Group display={'flex'} position='center' mt={30} style={{ flexDirection: 'column' }}>
      <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
        Choose a log report mechanism
      </Text>
      { traceType && <SegmentedControl data={reportMechainismDescriptors} onChange={changeReportMechainism} defaultValue={ traceType } /> }
    </Group>
  );
}
