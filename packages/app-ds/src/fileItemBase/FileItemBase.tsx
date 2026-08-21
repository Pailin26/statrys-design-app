import React from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Trash2, Upload, Download } from "lucide-react-native";
import { Loading } from "../loading/Loading";
import { styles, ICON_BTN_COLOR, UPLOAD_ROW_COLOR, FILE_ICON_STROKE } from "./FileItemBase.styles";

export type FileItemState = "completed" | "loading" | "error";
export type FileItemAction = "delete" | "replace" | "download" | "none";

export interface FileItemBaseProps {
  name: string;
  /** Human-readable size, e.g. "200 KB" — hidden in the error state. */
  size?: string;
  /** Format tag on the file icon (Figma "pdf") — any short label. */
  fileType?: string;
  state?: FileItemState;
  /** 0–100, only meaningful while state="loading". */
  progress?: number;
  /** Trailing action when not loading. Loading always shows delete (cancel upload). */
  action?: FileItemAction;
  /** `action="download"` only — swaps the download icon for a small spinner and ignores
   *  presses while the file is being prepared. Caller owns the timing. */
  downloading?: boolean;
  /** Tap the row itself (e.g. open a preview) — ignored while loading. */
  onPress?: () => void;
  onDelete?: () => void;
  onReplace?: () => void;
  onDownload?: () => void;
  /** Error state's "Try Again" link. */
  onRetry?: () => void;
}

function FileIcon({ label }: { label: string }) {
  return (
    <View style={styles.icon}>
      <Svg width={24} height={27} viewBox="0 0 21 27" fill="none">
        <Path
          d="M2.74 0.5H12.04L20.49 8.66V24.26C20.49 25.49 19.49 26.49 18.26 26.49H2.74C1.51 26.49 0.51 25.49 0.51 24.26V2.74C0.51 1.51 1.51 0.5 2.74 0.5Z"
          fill="white"
          stroke={FILE_ICON_STROKE}
          strokeWidth="1.03"
        />
        <Path d="M12.04 0.5V7.5C12.04 8.15 12.5 8.66 13.15 8.66H20.49" stroke={FILE_ICON_STROKE} strokeWidth="1.03" strokeLinecap="round" />
      </Svg>
      <Text style={styles.tag}>{label}</Text>
    </View>
  );
}

// Web sweeps a continuous shimmer band through the progress fill
// (@keyframes loop); dropped for native — keeps the functional width-based
// fill, not the decorative sweep, no react-native-reanimated dependency.
export function FileItemBase({
  name,
  size = "200 KB",
  fileType = "pdf",
  state = "completed",
  progress = 0,
  action = "delete",
  downloading = false,
  onPress,
  onDelete,
  onReplace,
  onDownload,
  onRetry,
}: FileItemBaseProps) {
  const isError = state === "error";
  const isLoading = state === "loading";
  const pct = Math.min(100, Math.max(0, progress));

  const trailing =
    !isLoading && action === "replace" ? (
      <Pressable onPress={onReplace} style={styles.replaceBtn}>
        <Text style={styles.replaceBtnText}>Re-upload</Text>
      </Pressable>
    ) : !isLoading && action === "download" ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={downloading ? "Downloading file" : "Download file"}
        disabled={downloading}
        onPress={downloading ? undefined : onDownload}
        style={styles.iconBtn}
      >
        {downloading ? <Loading size="2xs" accessibilityLabel="Downloading" /> : <Download size={20} color={ICON_BTN_COLOR} />}
      </Pressable>
    ) : !isLoading && action === "none" ? null : (
      <Pressable accessibilityRole="button" accessibilityLabel="Remove file" onPress={onDelete} style={styles.iconBtn}>
        <Trash2 size={20} color={ICON_BTN_COLOR} />
      </Pressable>
    );

  const Root = onPress && !downloading ? Pressable : View;

  return (
    <Root
      style={[styles.root, isError && styles.error]}
      {...(onPress && !downloading ? { accessibilityRole: "button" as const, onPress } : {})}
    >
      {isLoading && <View style={[styles.progressFill, { width: `${pct}%` }]} />}

      <FileIcon label={fileType} />

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        {isError ? (
          <>
            <Text style={styles.errorCaption}>Upload failed, please try again.</Text>
            <Pressable onPress={onRetry}>
              <Text style={styles.retry}>Try Again</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.metaRow}>
            <Text style={styles.meta}>{size}</Text>
            {isLoading && (
              <>
                <View style={styles.divider} />
                <View style={styles.metaRow}>
                  <Upload size={10} color={UPLOAD_ROW_COLOR} />
                  <Text style={styles.meta}>{pct}%</Text>
                </View>
              </>
            )}
          </View>
        )}
      </View>

      {trailing}
    </Root>
  );
}
