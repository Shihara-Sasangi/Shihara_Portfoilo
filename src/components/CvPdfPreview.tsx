import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

type CvPdfPreviewProps = {
  cvUrl: string;
};

/**
 * Scrollable PDF preview with a visible scrollbar and pinch / drag zoom (mobile-friendly).
 */
export const CvPdfPreview: React.FC<CvPdfPreviewProps> = ({ cvUrl }) => {
  const src = `${cvUrl}#view=FitH`;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-slate-50">
      <TransformWrapper
        initialScale={1}
        minScale={0.45}
        maxScale={4}
        centerOnInit
        limitToBounds={false}
        centerZoomedOut
        wheel={{ step: 0.12 }}
        pinch={{ step: 0.06 }}
        doubleClick={{ mode: "reset", step: 0.5 }}
        panning={{ velocityDisabled: false }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-100 px-3 py-2">
              <p className="max-w-[min(100%,20rem)] text-[11px] leading-snug text-slate-700 sm:max-w-none sm:text-xs">
                <span className="font-semibold text-slate-800">Tip:</span> scroll the area below, pinch to
                zoom, drag to pan. Use + / − if needed.
              </p>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-800 shadow-sm active:bg-slate-100"
                  aria-label="Zoom out"
                  onClick={() => zoomOut()}
                >
                  −
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-800 shadow-sm active:bg-slate-100"
                  aria-label="Zoom in"
                  onClick={() => zoomIn()}
                >
                  +
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 shadow-sm active:bg-slate-100"
                  aria-label="Reset zoom"
                  onClick={() => resetTransform()}
                >
                  Reset
                </button>
              </div>
            </div>
            <div
              className="cv-pdf-scroll min-h-0 flex-1 overflow-x-auto overflow-y-scroll overscroll-contain"
              style={{
                maxHeight: "min(75vh, calc(90dvh - 11rem))",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <TransformComponent
                wrapperClass="!w-full !max-w-full"
                contentClass="!w-full"
              >
                <iframe
                  src={src}
                  title="CV PDF preview"
                  className="block min-h-[1100px] w-full min-w-full border-0 bg-white sm:min-h-[900px]"
                />
              </TransformComponent>
            </div>
            <p className="shrink-0 border-t border-slate-200 bg-slate-100 px-3 py-2 text-center text-[10px] text-slate-500 sm:text-xs">
              If the preview is blank, use <strong>Open</strong> or <strong>Download</strong> above.
            </p>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};
