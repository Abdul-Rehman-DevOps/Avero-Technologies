import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07111f",
          borderRadius: 40,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 124,
            height: 16,
            background: "#0d8f9c",
            borderRadius: 4,
            top: 92,
            left: 28,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 18,
            height: 18,
            borderRadius: 999,
            background: "#0d8f9c",
            top: 56,
            left: 81,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 24,
            height: 96,
            background: "#ffffff",
            transform: "skewX(-18deg)",
            top: 44,
            left: 52,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 24,
            height: 96,
            background: "#ffffff",
            transform: "skewX(18deg)",
            top: 44,
            left: 104,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
