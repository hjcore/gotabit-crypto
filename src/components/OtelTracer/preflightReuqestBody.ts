const preflightRequestParams = {
  resourceSpans: [
    {
      resource: {
        attributes: [
          {
            key: 'service.name',
            value: {
              stringValue: 'cf-pages',
            },
          },
          {
            key: 'telemetry.sdk.language',
            value: {
              stringValue: 'webjs',
            },
          },
          {
            key: 'telemetry.sdk.name',
            value: {
              stringValue: 'opentelemetry',
            },
          },
          {
            key: 'telemetry.sdk.version',
            value: {
              stringValue: '1.9.0',
            },
          },
        ],
        droppedAttributesCount: 0,
      },
      scopeSpans: [
        {
          scope: {
            name: '@opentelemetry/instrumentation-document-load',
            version: '0.31.0',
          },
          spans: [
            {
              traceId: '4ed54726327c6f6761958673b6df9a05',
              spanId: '3f0db85429048b0f',
              name: 'documentLoad',
              kind: 1,
              startTimeUnixNano: 1673919610673600000,
              endTimeUnixNano: 1673919611986200000,
              attributes: [
                {
                  key: 'component',
                  value: {
                    stringValue: 'document-load',
                  },
                },
                {
                  key: 'http.url',
                  value: {
                    stringValue: 'http://localhost:3001/',
                  },
                },
                {
                  key: 'http.user_agent',
                  value: {
                    stringValue:
                      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                  },
                },
              ],
              droppedAttributesCount: 0,
              events: [
                {
                  attributes: [],
                  name: 'fetchStart',
                  timeUnixNano: 1673919610673600000,
                  droppedAttributesCount: 0,
                },
                {
                  attributes: [],
                  name: 'unloadEventStart',
                  timeUnixNano: 1673919610863000000,
                  droppedAttributesCount: 0,
                },
                {
                  attributes: [],
                  name: 'unloadEventEnd',
                  timeUnixNano: 1673919610863200000,
                  droppedAttributesCount: 0,
                },
                {
                  attributes: [],
                  name: 'domInteractive',
                  timeUnixNano: 1673919611042200000,
                  droppedAttributesCount: 0,
                },
                {
                  attributes: [],
                  name: 'domContentLoadedEventStart',
                  timeUnixNano: 1673919611889100000,
                  droppedAttributesCount: 0,
                },
                {
                  attributes: [],
                  name: 'domContentLoadedEventEnd',
                  timeUnixNano: 1673919611889100000,
                  droppedAttributesCount: 0,
                },
                {
                  attributes: [],
                  name: 'domComplete',
                  timeUnixNano: 1673919611985900000,
                  droppedAttributesCount: 0,
                },
                {
                  attributes: [],
                  name: 'loadEventStart',
                  timeUnixNano: 1673919611985900000,
                  droppedAttributesCount: 0,
                },
                {
                  attributes: [],
                  name: 'loadEventEnd',
                  timeUnixNano: 1673919611986200000,
                  droppedAttributesCount: 0,
                },
                {
                  attributes: [],
                  name: 'firstPaint',
                  timeUnixNano: 1673919611950500000,
                  droppedAttributesCount: 0,
                },
                {
                  attributes: [],
                  name: 'firstContentfulPaint',
                  timeUnixNano: 1673919611950500000,
                  droppedAttributesCount: 0,
                },
              ],
              droppedEventsCount: 0,
              status: {
                code: 0,
              },
              links: [],
              droppedLinksCount: 0,
            },
          ],
        },
      ],
    },
  ],
};

export default preflightRequestParams;
