import { CompositePropagator, W3CBaggagePropagator, W3CTraceContextPropagator } from '@opentelemetry/core';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { trace } from '@opentelemetry/api';

export const OTEL_SERVICE_NAME = process.env.NEXT_PUBLIC_OTEL_SERVICE_NAME || 'cf-pages';
export const OTEL_HTTP_ENDPOINT = process.env.NEXT_PUBLIC_OTEL_HTTP_ENDPOINT || 'http://localhost:4318/v1/traces';

const getTracer = (service: string) => trace.getTracer(service);

export const runCustomTracer = () => {
  const tracer = getTracer(OTEL_SERVICE_NAME);
  const min = Math.floor(Date.now() / 60000);

  const span = tracer.startSpan('test-key-value' + min);
  span.setAttribute('key-a', 'value-a');
  span.setAttribute('key-b', 'value-b');
  span.setAttribute('key-c', 'value-c');
  span.end();
}

const otelTracer = async (traceType: "auto" | "prevent" | "custom" = "auto") => {
  console.log("traceType", traceType);

  if (traceType === "prevent") return;

  const { ZoneContextManager } = await import('@opentelemetry/context-zone');

  const provider = new WebTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: OTEL_SERVICE_NAME,
    }),
  });

  provider.addSpanProcessor(
    new SimpleSpanProcessor(
      new OTLPTraceExporter({
        url: OTEL_HTTP_ENDPOINT,
      })
    )
  );

  const contextManager = new ZoneContextManager();

  provider.register({
    contextManager,
    propagator: new CompositePropagator({
      propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()],
    }),
  });

  if (traceType === "custom") return runCustomTracer();

  if (traceType !== "auto") return;

  console.log("start register", traceType);
  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      getWebAutoInstrumentations({
        '@opentelemetry/instrumentation-fetch': {
          clearTimingResources: true,
          applyCustomAttributesOnSpan(span) {
            span.setAttribute('app.synthetic_request', 'false');
          },
        },
      }),
    ],
  });
};

export { getTracer, otelTracer };
