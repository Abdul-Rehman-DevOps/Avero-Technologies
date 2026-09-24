import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon — Avero Signal Apex. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07111f",
          borderRadius: 14,
          position: "relative",
        }}
      >
        {/* Signal beam */}
        <div
          style={{
            position: "absolute",
            width: 44,
            height: 6,
            background: "#0d8f9c",
            borderRadius: 2,
            top: 33,
            left: 10,
          }}
        />
        {/* Apex node */}
        <div
          style={{
            position: "absolute",
            width: 7,
            height: 7,
            borderRadius: 999,
            background: "#0d8f9c",
            top: 20,
            left: 28.5,
          }}
        />
        {/* Left leg via skewed bar */}
        <div
          style={{
            position: "absolute",
            width: 9,
            height: 34,
            background: "#ffffff",
            transform: "skewX(-18deg)",
            top: 16,
            left: 19,
          }}
        />
        {/* Right leg */}
        <div
          style={{
            position: "absolute",
            width: 9,
            height: 34,
            background: "#ffffff",
            transform: "skewX(18deg)",
            top: 16,
            left: 36,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
