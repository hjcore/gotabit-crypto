// deps
import { SegmentedControl, SegmentedControlItem, Dialog, Text, Button } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInterval } from "@mantine/hooks";
import { OTEL_HTTP_ENDPOINT, otelTracer } from "@utils/otel";
import preflightRequestParams from "./preflightReuqestBody";

export default function OtelTracer() {
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);
  const [traceType, setTraceType] = useState<"auto" | "custom" | "prevent" | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(true);

  const sendPreflightRequest = useCallback(() => {
    fetch(OTEL_HTTP_ENDPOINT, {
      method: "POST",
      body:

        JSON.stringify(preflightRequestParams),
      headers: {
        ["Content-Type"]: "application/json"
      }
    }).then(data => {
      console.log("data", data);
      if (data.ok) {
        // test success, connect is robust
      }
    }).catch(reason => {
      console.log("reason", reason);
      // test error, prevent all the subsequent report request
      setTraceType("prevent");
    })
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    sendPreflightRequest();
    interval.start();
  }, []);

  const reportMechainismDescriptors = useMemo<SegmentedControlItem[]>(() => {
    return [
      { label: "Auto report", value: "auto" },
      { label: "Custom report", value: "custom" },
      { label: "Prevent report", value: "prevent" }
    ];
  }, []);

  const changeReportMechainism = useCallback((type: string) => {
    setTraceType(type as "auto" | "custom" | "prevent");
  }, []);

  const confirmReportType = useCallback((isUserInterective: boolean = false) => {
    if (isUserInterective) {
      interval.stop();
    }
    const _traceType = traceType || "custom";
    otelTracer(_traceType);
    setDialogOpen(false);
  }, [traceType]);

  useEffect(() => {
    if (seconds === 0) {
      interval.stop();
      confirmReportType();
    }
  }, [seconds]);

  return (
    <Dialog opened={ dialogOpen } size="fit">
      <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
        Choose a log report mechanism
      </Text>
      <SegmentedControl
        data={reportMechainismDescriptors}
        onChange={ changeReportMechainism }
        defaultValue="custom"
      />
      <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={ () => confirmReportType(true) }>Confirm({ seconds })</Button>
      </div>
    </Dialog>
  )
}