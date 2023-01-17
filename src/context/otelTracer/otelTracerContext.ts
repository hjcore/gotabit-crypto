import { TraceType } from '@utils/otel';
import { createContext } from 'react';

interface OtelContextType {
  traceType: TraceType | null;
  setTraceType: (traceType: TraceType) => void;
}

const OtelTracerContext = createContext<OtelContextType>({
  traceType: 'custom',
  setTraceType: () => {},
});

OtelTracerContext.displayName = 'OtelTracerContext';

export default OtelTracerContext;
