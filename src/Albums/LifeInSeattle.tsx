import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components/macro";
import { BaseContainer } from "src/atoms/Misc";
import { colors } from "src/consts";

const albumBasePath = "/albums/life-in-seattle/";
const albumPath = `${albumBasePath}index.html`;

type ModalMedia = {
  caption: string;
  name: string;
  src: string;
  type: "image" | "video";
};

function rewriteAssetPaths(value: string): string {
  return value.split("./assets/").join(`${albumBasePath}assets/`);
}

function extractAlbumParts(html: string): { bodyHtml: string; styleText: string } {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const styleText = doc.querySelector("style")?.textContent ?? "";
  const bodyHtml = doc.querySelector("main")?.innerHTML ?? "";
  return {
    bodyHtml: rewriteAssetPaths(bodyHtml),
    styleText: rewriteAssetPaths(styleText),
  };
}

export default function LifeInSeattle() {
  const [albumHtml, setAlbumHtml] = useState("");
  const [albumStyle, setAlbumStyle] = useState("");
  const [activeMedia, setActiveMedia] = useState<ModalMedia | null>(null);

  useEffect(() => {
    let mounted = true;

    void fetch(albumPath)
      .then((response) => response.text())
      .then((html) => {
        if (!mounted) return;
        const { bodyHtml, styleText } = extractAlbumParts(html);
        setAlbumHtml(bodyHtml);
        setAlbumStyle(styleText);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const content = useMemo(
    () => ({ __html: albumHtml }),
    [albumHtml]
  );

  return (
    <Outer>
      <Content>
        {albumStyle ? <style>{albumStyle}</style> : null}
        <AlbumBody
          onClick={(event) => {
            const target = event.target as HTMLElement;
            const button = target.closest(
              '[data-action="open-export-media"]'
            ) as HTMLButtonElement | null;
            if (!button) return;

            const media = button.querySelector("img, video");
            const src = media?.getAttribute("src") ?? "";
            const type =
              (button.dataset.mediaType as "image" | "video" | undefined) ??
              "image";
            const name = button.dataset.mediaName ?? "";
            const caption = button.dataset.mediaCaption ?? "";

            setActiveMedia({
              caption,
              name,
              src,
              type,
            });
          }}
          dangerouslySetInnerHTML={content}
        />
      </Content>
      {activeMedia ? (
        <ModalBackdrop
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveMedia(null);
            }
          }}
        >
          <ModalCard>
            <ModalClose onClick={() => setActiveMedia(null)}>Close</ModalClose>
            <ModalStage>
              {activeMedia.type === "video" ? (
                <video
                  src={activeMedia.src}
                  controls
                  autoPlay
                  preload="metadata"
                />
              ) : (
                <img src={activeMedia.src} alt={activeMedia.name} />
              )}
            </ModalStage>
            <ModalMeta>
              <strong>{activeMedia.name}</strong>
              {activeMedia.caption ? <p>{activeMedia.caption}</p> : null}
            </ModalMeta>
          </ModalCard>
        </ModalBackdrop>
      ) : null}
    </Outer>
  );
}

const Outer = styled.div`
  padding: 24px;
`;

const Content = styled(BaseContainer)`
  max-width: 1200px;
  background: white;
  padding: 0;
  overflow: hidden;
`;

const AlbumBody = styled.div`
  background: white;

  body {
    background: white;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.68);
  backdrop-filter: blur(8px);
`;

const ModalCard = styled.div`
  width: min(1000px, 100%);
  max-height: 90vh;
  overflow: auto;
  border-radius: 24px;
  background: white;
  padding: 18px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.22);
`;

const ModalClose = styled.button`
  margin-left: auto;
  display: block;
  border: 0;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  background: ${colors.slate[900]};
  color: white;
`;

const ModalStage = styled.div`
  margin-top: 14px;

  img,
  video {
    display: block;
    width: 100%;
    max-height: 68vh;
    object-fit: contain;
    border-radius: 18px;
    background: ${colors.slate[50]};
  }
`;

const ModalMeta = styled.div`
  padding: 16px 6px 4px;

  p {
    margin: 8px 0 0;
    color: ${colors.slate[700]};
  }
`;
