import { useContext } from 'react';
import OtelTracerContext from './otelTracerContext';

export default function useOtelTracer() {
  const { traceType, setTraceType } = useContext(OtelTracerContext);
  return {
    traceType,
    mutateTraceType: setTraceType,
  };
}
