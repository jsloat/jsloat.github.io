import React, { useCallback, useRef } from "react";
import styled from "styled-components/macro";
import { BaseContainer } from "src/atoms/Misc";

const albumPath = "/albums/life-in-seattle/index.html";

export default function LifeInSeattle() {
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const syncHeight = useCallback(() => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!frame || !doc) return;

    const nextHeight = Math.max(
      doc.documentElement.scrollHeight,
      doc.body.scrollHeight
    );
    frame.style.height = `${nextHeight}px`;
  }, []);

  const handleLoad = useCallback(() => {
    syncHeight();

    const frame = frameRef.current;
    const win = frame?.contentWindow;
    const doc = frame?.contentDocument;
    if (!frame || !win || !doc) return;

    win.addEventListener("resize", syncHeight);

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(() => syncHeight());
      observer.observe(doc.body);
      (frame as HTMLIFrameElement & { __observer?: ResizeObserver }).__observer =
        observer;
    }
  }, [syncHeight]);

  return (
    <Outer>
      <Content>
        <Frame
          ref={frameRef}
          src={albumPath}
          title="Life in Seattle album"
          onLoad={handleLoad}
          scrolling="no"
        />
      </Content>
    </Outer>
  );
}

const Outer = styled.div`
  padding: 24px;
`;

const Content = styled(BaseContainer)`
  max-width: 1200px;
  padding: 0;
  overflow: hidden;
  background: transparent;
`;

const Frame = styled.iframe`
  width: 100%;
  height: 100vh;
  border: 0;
  display: block;
  background: transparent;
`;
