import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ArrowUpRight, Plus, Star } from "lucide-react-native";
import {
  Button,
  Badge,
  NotiBadge,
  Toggle,
  XClose,
  Overlay,
  ListCard,
  Chips,
  Loading,
  Avatar,
  Banner,
  BottomSheet,
  Checkbox,
  NumberStepper,
  SwipeActions,
  OutstandingCard,
  PageHeader,
  SegmentedControlBase,
  Tooltip,
  TextField,
  TextArea,
  Search,
  ActionRequired,
  FAB,
  InvoiceStatus,
  TabsBase,
  Tile,
  FileItemBase,
  NotificationItem,
  ListText,
  ListRow,
  HorizontalTabs,
  InvoiceRow,
  SegmentedControls,
  ToastMessage,
  EmptyState,
  Toast,
  ButtonDock,
} from "@statrys/app-ds";
import { ComponentPage } from "../ComponentPage";

const VARIANTS = ["primary", "secondary", "tertiary"] as const;
const SHAPES = ["square", "circle"] as const;
const SIZES = ["sm", "md", "lg"] as const;
const ICON_SIZE = { sm: 16, md: 20, lg: 24 };

// RN has no CSS Grid, so this is a plain flex-row-per-row table: a fixed-width
// label column, then one flexible cell per column. Same "one state per row,
// one axis value per column" pattern as the web playground's VariantGrid.
function VariantGrid<Col extends string>({
  columns,
  rows,
  columnLabelWidth = 110,
  showColumnHeaders = true,
}: {
  columns: readonly Col[];
  rows: { label: string; render: (column: Col) => React.ReactNode }[];
  columnLabelWidth?: number;
  /** Off for a single-column table where the column value isn't a real axis. */
  showColumnHeaders?: boolean;
}) {
  return (
    <View style={styles.grid}>
      {showColumnHeaders && (
        <View style={styles.gridRow}>
          <View style={{ width: columnLabelWidth }} />
          {columns.map((column) => (
            <View key={column} style={styles.gridCell}>
              <Text style={styles.gridHeaderLabel}>{column}</Text>
            </View>
          ))}
        </View>
      )}
      {rows.map((row) => (
        <View key={row.label} style={styles.gridRow}>
          <View style={{ width: columnLabelWidth }}>
            <Text style={styles.gridRowLabel}>{row.label}</Text>
          </View>
          {columns.map((column) => (
            <View key={column} style={styles.gridCell}>
              {row.render(column)}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

// Shared by every rebuilt interactive demo below — mirrors the web
// playground's ControlGroupLabel/DemoField/DemoRadioGroup, swapping
// DemoRadioGroup for app-ds's own SegmentedControls (there's no Radio on
// mobile) and DemoField for app-ds's own TextField, same "dogfood the DS"
// reasoning as web using its own Radio.
function ControlGroupLabel({ children }: { children: string }) {
  return <Text style={styles.controlGroupLabel}>{children}</Text>;
}

function DemoSegmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.controlRow}>
      <Text style={styles.controlLabel}>{label}</Text>
      <SegmentedControls segments={[...options]} activeIndex={options.indexOf(value)} onChange={(i: number) => onChange(options[i])} />
    </View>
  );
}

function DemoPreview({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <View style={[styles.preview, dark && styles.previewDark]}>{children}</View>;
}

function ButtonDemo() {
  const [label, setLabel] = useState("Continue");
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>("primary");
  const [size, setSize] = useState<(typeof SIZES)[number]>("md");
  const [shape, setShape] = useState<"rec" | "rounded">("rec");
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentPage
      title="Button"
      whatItIs="A tappable button for the one action you want someone to take, like submitting a form or confirming a choice."
      whenToUse={[
        "For the main action on a screen, like “Save” or “Continue.”",
        "For a supporting action next to it, like “Cancel” beside “Confirm.”",
        "For a low-emphasis action that shouldn't compete for attention, like “Skip.”",
      ]}
      goodToKnow={[
        "The square and circle shapes are for icon-only buttons with no visible label — only use them when the icon alone is clear.",
      ]}
      code={`import { Button } from "@statrys/app-ds";\n\n<Button variant="primary" size="md" onPress={handlePress}>\n  Continue\n</Button>`}
    >
      <View style={styles.demoRow}>
        <DemoPreview>
          <Button variant={variant} size={size} shape={shape} disabled={disabled}>
            {label}
          </Button>
        </DemoPreview>

        <View style={styles.sidebar}>
          <View style={styles.controls}>
            <ControlGroupLabel>Text</ControlGroupLabel>
            <TextField label="Label" value={label} onChange={setLabel} />
          </View>

          <View style={styles.controls}>
            <ControlGroupLabel>Layout</ControlGroupLabel>
            <DemoSegmented label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
            <DemoSegmented label="Size" options={SIZES} value={size} onChange={setSize} />
            <DemoSegmented label="Shape" options={["rec", "rounded"] as const} value={shape} onChange={setShape} />
          </View>

          <View style={styles.controls}>
            <ControlGroupLabel>State</ControlGroupLabel>
            <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.subtitle}>Icon-only buttons</Text>
        <Text style={styles.note}>Square and circle buttons show only an icon, no label — you supply whichever icon fits.</Text>
        {SHAPES.map((shape) => (
          <View key={shape}>
            <Text style={styles.subtitle2}>{shape}</Text>
            {VARIANTS.map((variant) => (
              <VariantGrid
                key={variant}
                columns={SIZES}
                rows={[
                  {
                    label: variant,
                    render: (size) => (
                      <Button
                        variant={variant}
                        size={size}
                        shape={shape}
                        icon={<ArrowUpRight size={ICON_SIZE[size]} />}
                        accessibilityLabel={`${variant} ${shape} ${size}`}
                      />
                    ),
                  },
                  {
                    label: `${variant}, disabled`,
                    render: (size) => (
                      <Button
                        variant={variant}
                        size={size}
                        shape={shape}
                        icon={<ArrowUpRight size={ICON_SIZE[size]} />}
                        accessibilityLabel={`${variant} ${shape} ${size} disabled`}
                        disabled
                      />
                    ),
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    </ComponentPage>
  );
}

const BADGE_COLORS = ["neutral", "success", "warning", "error", "info", "custom"] as const;
const BADGE_VARIANTS = ["subtle", "bold", "text"] as const;

function BadgeDemo() {
  return (
    <ComponentPage
      title="Badge"
      whatItIs="A small label for tagging a status or category inline with other content."
      whenToUse={[
        "Marking a status like “New,” or a category tag next to a list item.",
        "Use subtle for a low-emphasis tag, bold when it needs to stand out.",
      ]}
      goodToKnow={["The text variant drops the background entirely, for the lightest-weight tag."]}
      code={`import { Badge } from "@statrys/app-ds";\n\n<Badge label="New" variant="bold" color="success" />`}
    >
      <VariantGrid
        columns={BADGE_COLORS}
        columnLabelWidth={60}
        rows={BADGE_VARIANTS.map((variant) => ({
          label: variant,
          render: (color: (typeof BADGE_COLORS)[number]) => <Badge label={color} variant={variant} color={color} />,
        }))}
      />
      <Text style={styles.subtitle2}>Sizes (subtle/neutral)</Text>
      <View style={styles.row}>
        {SIZES.map((size) => (
          <Badge key={size} label={size} size={size} />
        ))}
      </View>
    </ComponentPage>
  );
}

function NotiBadgeDemo() {
  return (
    <ComponentPage
      title="NotiBadge"
      whatItIs="A small red dot or number that flags unread or pending items, usually docked to the corner of an icon."
      whenToUse={["Showing an unread count on a tab or icon, like a notification bell."]}
      goodToKnow={["Use inverse on a dark surface so it stays visible."]}
      code={`import { NotiBadge } from "@statrys/app-ds";\n\n<NotiBadge count="3" />`}
    >
      <View style={styles.row}>
        <NotiBadge count="3" />
        <NotiBadge count="99+" />
        <View style={styles.darkSwatch}>
          <NotiBadge count="3" inverse />
        </View>
      </View>
    </ComponentPage>
  );
}

function ToggleDemo() {
  const [selected, setSelected] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentPage
      title="Toggle"
      whatItIs="A switch for turning something on or off right away, with no extra step to confirm."
      whenToUse={["Settings that apply the moment you flip them, like notifications or dark mode."]}
      useInstead={[
        { label: "Checkbox", because: "the choice is part of a form and won't take effect until the whole form is submitted." },
      ]}
      code={`import { Toggle } from "@statrys/app-ds";\n\n<Toggle selected={enabled} onChange={setEnabled} accessibilityLabel="Enable notifications" />`}
    >
      <Text style={styles.note}>
        Toggle has no label of its own — tap it directly to flip it, or use the "Selected" control below to see how it
        looks both on and off while disabled.
      </Text>
      <View style={styles.demoRow}>
        <DemoPreview>
          <Toggle selected={selected} onChange={disabled ? undefined : setSelected} disabled={disabled} accessibilityLabel="Toggle demo" />
        </DemoPreview>
        <View style={styles.sidebar}>
          <View style={styles.controls}>
            <ControlGroupLabel>State</ControlGroupLabel>
            <Checkbox label="Selected" selected={selected} onChange={setSelected} />
            <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
          </View>
        </View>
      </View>
    </ComponentPage>
  );
}

const XCLOSE_SIZES = ["sm", "md"] as const;

function XCloseDemo() {
  const [size, setSize] = useState<(typeof XCLOSE_SIZES)[number]>("md");
  const [inverse, setInverse] = useState(false);

  return (
    <ComponentPage
      title="XClose"
      whatItIs="The small × button people tap to close or dismiss something."
      whenToUse={["On sheets, toasts, and banners — anywhere someone can close a surface without taking its main action."]}
      goodToKnow={["Always give it an accessibility label describing what it closes."]}
      code={`import { XClose } from "@statrys/app-ds";\n\n<XClose size="sm" onPress={() => setOpen(false)} accessibilityLabel="Dismiss" />`}
    >
      <View style={styles.demoRow}>
        <DemoPreview dark={inverse}>
          <XClose size={size} inverse={inverse} />
        </DemoPreview>
        <View style={styles.sidebar}>
          <View style={styles.controls}>
            <ControlGroupLabel>Layout</ControlGroupLabel>
            <DemoSegmented label="Size" options={XCLOSE_SIZES} value={size} onChange={setSize} />
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>State</ControlGroupLabel>
            <Checkbox label="Inverse (dark surface)" selected={inverse} onChange={setInverse} />
          </View>
        </View>
      </View>
    </ComponentPage>
  );
}

function OverlayDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <ComponentPage
      title="Overlay"
      whatItIs="The dimmed background that appears behind a bottom sheet or other pop-up surface."
      whenToUse={["Any time a BottomSheet (or similar pop-up) needs to visually separate itself from the screen behind it."]}
      goodToKnow={[
        "It's just the dimmed backdrop, mounted alongside the sheet rather than wrapped around it — never put content inside it.",
      ]}
      code={`import { Overlay, BottomSheet } from "@statrys/app-ds";\n\n{open && (\n  <>\n    <Overlay onPress={() => setOpen(false)} />\n    <BottomSheet title="Title">...</BottomSheet>\n  </>\n)}`}
    >
      <Button size="sm" onPress={() => setVisible((v) => !v)}>
        Toggle overlay
      </Button>
      <View style={styles.overlayBox}>
        <Text>Content behind the overlay</Text>
        <Overlay visible={visible} onPress={() => setVisible(false)} />
      </View>
    </ComponentPage>
  );
}

function ListCardDemo() {
  return (
    <ComponentPage
      title="ListCard"
      whatItIs="A rounded card that groups a set of rows together, like a settings section or a list of line items."
      whenToUse={["Grouping related rows — account details, settings, invoice lines — into one visual block."]}
      goodToKnow={["Use onLayer=\"gray\" when the card sits on a gray background instead of white, so it still stands out."]}
      code={`import { ListCard } from "@statrys/app-ds";\n\n<ListCard>\n  <ListRow label="Account holder" value="Olivia Rhye" />\n</ListCard>`}
    >
      <ListCard>
        <Text style={styles.padded}>Row one</Text>
        <Text style={styles.padded}>Row two</Text>
      </ListCard>
      <Text style={styles.subtitle2}>onLayer=&quot;gray&quot;</Text>
      <ListCard onLayer="gray">
        <Text style={styles.padded}>Row one</Text>
      </ListCard>
    </ComponentPage>
  );
}

function ChipsDemo() {
  const [active, setActive] = useState(false);

  return (
    <ComponentPage
      title="Chips"
      whatItIs="A small pill for filtering a list or showing an entry the user can remove."
      whenToUse={[
        "A filter toggle, like “Paid” or “This month.”",
        "Showing something already entered that can be dismissed, like an email address.",
      ]}
      code={`import { Chips } from "@statrys/app-ds";\n\n<Chips label="Filter" type="filter" active={active} onPress={() => setActive((a) => !a)} />\n<Chips label="alice@statrys.com" type="input" onDismiss={() => {}} />`}
    >
      <View style={styles.row}>
        <Chips label="Filter" type="filter" active={active} onPress={() => setActive((a) => !a)} />
        <Chips label="alice@statrys.com" type="input" onDismiss={() => {}} />
      </View>
    </ComponentPage>
  );
}

function LoadingDemo() {
  const sizes = ["2xs", "xs", "sm", "md", "lg"] as const;
  return (
    <ComponentPage
      title="Loading"
      whatItIs="A spinner for showing that something is in progress."
      whenToUse={["Anywhere content is still loading and there's nothing more specific to show yet."]}
      code={`import { Loading } from "@statrys/app-ds";\n\n<Loading size="md" />`}
    >
      <View style={styles.row}>
        {sizes.map((size) => (
          <Loading key={size} size={size} />
        ))}
      </View>
    </ComponentPage>
  );
}

function AvatarDemo() {
  return (
    <ComponentPage
      title="Avatar"
      whatItIs="A circular image or initials representing a person or account."
      whenToUse={["Showing who a row, message, or account belongs to."]}
      goodToKnow={["Falls back to initials when there's no photo — always pass initials even when you expect a photo to load."]}
      code={`import { Avatar } from "@statrys/app-ds";\n\n<Avatar size="lg" initials="OR" />\n<Avatar style="photo" size="lg" src="https://..." />`}
    >
      <View style={styles.row}>
        {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const).map((size) => (
          <Avatar key={size} size={size} initials="OR" />
        ))}
      </View>
      <Text style={styles.subtitle2}>style=&quot;photo&quot;</Text>
      <Avatar style="photo" size="lg" src="https://picsum.photos/seed/statrys/80" />
    </ComponentPage>
  );
}

function BannerDemo() {
  const [title, setTitle] = useState("Heads up");
  const [text, setText] = useState("Supporting detail line for this banner.");
  const [color, setColor] = useState<"info" | "success" | "warning" | "error">("info");
  const [showDismiss, setShowDismiss] = useState(true);

  return (
    <ComponentPage
      title="Banner"
      whatItIs="A notice that stays visible on the screen until someone dismisses it or the situation changes."
      whenToUse={["Ongoing notices, like a maintenance warning, an account status, or a security alert."]}
      useInstead={[
        { label: "ToastMessage or Toast", because: "it's a quick confirmation right after an action, not something that needs to stay on screen." },
      ]}
      goodToKnow={["Match the color to how serious the notice is — green for success, red for errors, and so on."]}
      code={`import { Banner } from "@statrys/app-ds";\n\n<Banner\n  color="success"\n  title="Heads up"\n  text="Supporting detail line for this banner."\n  linkLabel="View Details"\n  onDismiss={() => {}}\n/>`}
    >
      <View style={styles.demoRow}>
        <DemoPreview>
          <View style={{ width: "100%" }}>
            <Banner color={color} title={title} text={text} linkLabel="View Details" onDismiss={showDismiss ? () => {} : undefined} />
          </View>
        </DemoPreview>

        <View style={styles.sidebar}>
          <View style={styles.controls}>
            <ControlGroupLabel>Text</ControlGroupLabel>
            <TextField label="Title" value={title} onChange={setTitle} />
            <TextField label="Text" value={text} onChange={setText} />
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>Layout</ControlGroupLabel>
            <DemoSegmented label="Color" options={["info", "success", "warning", "error"] as const} value={color} onChange={setColor} />
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>Content</ControlGroupLabel>
            <Checkbox label="Dismiss" selected={showDismiss} onChange={setShowDismiss} />
          </View>
        </View>
      </View>
    </ComponentPage>
  );
}

function BottomSheetDemo() {
  return (
    <ComponentPage
      title="BottomSheet"
      whatItIs="A panel that slides up from the bottom of the screen for a focused task or confirmation."
      whenToUse={[
        "Confirming a destructive action, like deleting something.",
        "A short, focused task that needs someone's full attention before they move on.",
      ]}
      useInstead={[{ label: "Toast", because: "the info is just a quick notice, not something that needs to block the screen." }]}
      goodToKnow={["Pair it with Overlay for the dimmed background behind it."]}
      code={`import { BottomSheet, Overlay } from "@statrys/app-ds";\n\n{open && (\n  <>\n    <Overlay onPress={() => setOpen(false)} />\n    <BottomSheet title="Sheet title">\n      <Text>Sheet body content goes here.</Text>\n    </BottomSheet>\n  </>\n)}`}
    >
      <View style={styles.sheetBox}>
        <BottomSheet title="Sheet title">
          <Text style={styles.padded}>Sheet body content goes here.</Text>
        </BottomSheet>
      </View>
    </ComponentPage>
  );
}

const CHECKBOX_SIZES = ["sm", "md"] as const;

function CheckboxDemo() {
  const [label, setLabel] = useState("Remember me");
  const [description, setDescription] = useState("Save my login details for next time");
  const [showDescription, setShowDescription] = useState(false);
  const [size, setSize] = useState<(typeof CHECKBOX_SIZES)[number]>("md");
  const [selected, setSelected] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentPage
      title="Checkbox"
      whatItIs="A checkbox with a label (and an optional short description) for choices that are part of a form or list."
      whenToUse={[
        "Agreeing to terms, or picking several options that can all apply at once.",
        "Selecting rows in a list to include in a bulk action.",
      ]}
      useInstead={[{ label: "Toggle", because: "the choice should take effect immediately, with no submit step." }]}
      code={`import { Checkbox } from "@statrys/app-ds";\n\n<Checkbox label="Remember me" selected={checked} onChange={setChecked} />\n\n<Checkbox\n  label="Remember me"\n  description="Save my login details for next time"\n  selected={checked}\n  onChange={setChecked}\n/>`}
    >
      <View style={styles.demoRow}>
        <DemoPreview>
          <Checkbox
            label={label}
            description={showDescription ? description : undefined}
            size={size}
            selected={selected}
            indeterminate={indeterminate}
            disabled={disabled}
            onChange={setSelected}
          />
        </DemoPreview>

        <View style={styles.sidebar}>
          <View style={styles.controls}>
            <ControlGroupLabel>Text</ControlGroupLabel>
            <TextField label="Label" value={label} onChange={setLabel} />
            {showDescription && <TextField label="Description" value={description} onChange={setDescription} />}
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>Layout</ControlGroupLabel>
            <DemoSegmented label="Size" options={CHECKBOX_SIZES} value={size} onChange={setSize} />
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>Content</ControlGroupLabel>
            <Checkbox label="Description" selected={showDescription} onChange={setShowDescription} />
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>State</ControlGroupLabel>
            <Checkbox label="Selected" selected={selected} onChange={setSelected} />
            <Checkbox label="Indeterminate" selected={indeterminate} onChange={setIndeterminate} />
            <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
          </View>
        </View>
      </View>
    </ComponentPage>
  );
}

function NumberStepperDemo() {
  const [value, setValue] = useState(2);
  return (
    <ComponentPage
      title="NumberStepper"
      whatItIs="A plus/minus control for adjusting a small whole number, like a quantity."
      whenToUse={["Picking a quantity for an order or a line item."]}
      code={`import { NumberStepper } from "@statrys/app-ds";\n\n<NumberStepper value={quantity} onChange={setQuantity} label="quantity" />`}
    >
      <NumberStepper value={value} onChange={setValue} label="quantity" />
    </ComponentPage>
  );
}

function SwipeActionsDemo() {
  return (
    <ComponentPage
      title="SwipeActions"
      whatItIs="Actions revealed by swiping a row sideways, like delete or archive."
      whenToUse={["Offering a quick action on a list row without a separate menu button."]}
      goodToKnow={[
        "Since the action is hidden until someone swipes, don't put the only way to do something essential behind it — pair it with a visible alternative when the action matters.",
      ]}
      code={`import { SwipeActions } from "@statrys/app-ds";\n\n<SwipeActions />`}
    >
      <SwipeActions />
    </ComponentPage>
  );
}

function OutstandingCardDemo() {
  return (
    <ComponentPage
      title="OutstandingCard"
      whatItIs="A summary card showing how much of an expected amount has been collected, with a progress bar."
      whenToUse={["Dashboard summaries — outstanding invoices, or collected vs. expected revenue."]}
      code={`import { OutstandingCard } from "@statrys/app-ds";\n\n<OutstandingCard\n  expected="20,000.00"\n  collected="12,000.00"\n  outstanding="8,000.00"\n  percent={60}\n  encouragement="Keep it up!"\n  linkLabel="2 invoices"\n/>`}
    >
      <OutstandingCard
        expected="20,000.00"
        collected="12,000.00"
        outstanding="8,000.00"
        percent={60}
        encouragement="Keep it up!"
        linkLabel="2 invoices"
      />
    </ComponentPage>
  );
}

function PageHeaderDemo() {
  return (
    <ComponentPage
      title="PageHeader"
      whatItIs="The header at the top of a screen, with a title and optional search or back navigation."
      whenToUse={["Every screen needs one — pick the type that matches what else the header needs to do (search, subtitle, back button)."]}
      code={`import { PageHeader } from "@statrys/app-ds";\n\n<PageHeader type="center" title="Invoices" />\n<PageHeader type="search" searchPlaceholder="Search invoices" />`}
    >
      <Text style={styles.subtitle2}>type=&quot;center&quot;</Text>
      <PageHeader type="center" title="Invoices" />
      <Text style={styles.subtitle2}>type=&quot;left-on-scroll&quot;</Text>
      <PageHeader type="left-on-scroll" title="Invoices" text="12 outstanding" />
      <Text style={styles.subtitle2}>type=&quot;search&quot;</Text>
      <PageHeader type="search" searchPlaceholder="Search invoices" />
      <Text style={styles.subtitle2}>type=&quot;left&quot;</Text>
      <View style={styles.sheetBox}>
        <PageHeader type="left" title="All Invoices" text="A list of every invoice you've sent" />
      </View>
    </ComponentPage>
  );
}

function SegmentedControlBaseDemo() {
  const [active, setActive] = useState(0);
  const labels = ["All", "Paid", "Overdue"];
  return (
    <ComponentPage
      title="SegmentedControlBase"
      whatItIs="One segment of a segmented control — the building block, not meant to be used alone."
      whenToUse={["Composing a custom segmented control; otherwise use SegmentedControls, which already assembles a full row of these."]}
      code={`import { SegmentedControlBase } from "@statrys/app-ds";\n\n<SegmentedControlBase label="All" active={active === 0} onPress={() => setActive(0)} />`}
    >
      <View style={styles.segmentTrack}>
        {labels.map((label, i) => (
          <SegmentedControlBase key={label} label={label} active={active === i} onPress={() => setActive(i)} />
        ))}
      </View>
    </ComponentPage>
  );
}

const TOOLTIP_ARROWS = ["none", "top", "bottom"] as const;

function TooltipDemo() {
  const [title, setTitle] = useState("This is a tooltip");
  const [description, setDescription] = useState("A second, longer supporting line of text.");
  const [showDescription, setShowDescription] = useState(false);
  const [arrow, setArrow] = useState<(typeof TOOLTIP_ARROWS)[number]>("bottom");
  const [inverse, setInverse] = useState(false);

  return (
    <ComponentPage
      title="Tooltip"
      whatItIs="A small bubble of extra context that appears near whatever it's explaining."
      whenToUse={[
        "Explaining an icon-only button, or why a control is greyed out.",
        "Giving a short, optional definition someone might want but doesn't need to see right away.",
      ]}
      goodToKnow={["Never put information someone needs to finish a task inside a tooltip — it's easy to miss."]}
      code={`import { Tooltip } from "@statrys/app-ds";\n\n<Tooltip title="This is a tooltip" arrow="bottom" />\n\n<Tooltip\n  title="This is a tooltip"\n  description="A second, longer supporting line of text."\n  arrow="top"\n  inverse\n/>`}
    >
      <View style={styles.demoRow}>
        <DemoPreview>
          <Tooltip title={title} description={showDescription ? description : undefined} arrow={arrow} inverse={inverse} />
        </DemoPreview>

        <View style={styles.sidebar}>
          <View style={styles.controls}>
            <ControlGroupLabel>Text</ControlGroupLabel>
            <TextField label="Title" value={title} onChange={setTitle} />
            {showDescription && <TextField label="Description" value={description} onChange={setDescription} />}
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>Layout</ControlGroupLabel>
            <DemoSegmented label="Arrow" options={TOOLTIP_ARROWS} value={arrow} onChange={setArrow} />
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>Content</ControlGroupLabel>
            <Checkbox label="Description" selected={showDescription} onChange={setShowDescription} />
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>State</ControlGroupLabel>
            <Checkbox label="Inverse (dark bubble)" selected={inverse} onChange={setInverse} />
          </View>
        </View>
      </View>
    </ComponentPage>
  );
}

const TEXT_FIELD_TYPES = ["text", "mobile", "currency", "dropdown"] as const;

function TextFieldDemo() {
  const [label, setLabel] = useState("Email");
  const [caption, setCaption] = useState("This field is required");
  const [showCaption, setShowCaption] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(true);
  const [mandatory, setMandatory] = useState(true);

  return (
    <ComponentPage
      title="TextField"
      whatItIs="A form field for a single line of input — text, a phone number, an amount, or a value picked from a list."
      whenToUse={[
        "Standard form fields like name, email, phone, or an amount.",
        "Use type=\"dropdown\" or \"date-picker\" when tapping the field should open a picker instead of the keyboard.",
      ]}
      useInstead={[{ label: "Search", because: "it's specifically for filtering a list, not a general form field." }]}
      goodToKnow={["Always pair a field with a caption when it can be wrong — don't rely on the red border alone."]}
      code={`import { TextField } from "@statrys/app-ds";\n\n<TextField label="Email" value={email} onChange={setEmail} mandatory />`}
    >
      <View style={styles.demoRow}>
        <DemoPreview>
          <TextField label={label} disabled={disabled} error={error} mandatory={mandatory} caption={showCaption ? caption : undefined} />
        </DemoPreview>

        <View style={styles.sidebar}>
          <View style={styles.controls}>
            <ControlGroupLabel>Text</ControlGroupLabel>
            <TextField label="Label" value={label} onChange={setLabel} />
            {showCaption && <TextField label="Caption" value={caption} onChange={setCaption} />}
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>Content</ControlGroupLabel>
            <Checkbox label="Caption" selected={showCaption} onChange={setShowCaption} />
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>State</ControlGroupLabel>
            <Checkbox label="Mandatory" selected={mandatory} onChange={setMandatory} />
            <Checkbox label="Error" selected={error} onChange={setError} />
            <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.subtitle}>Field types</Text>
        <VariantGrid
          columns={TEXT_FIELD_TYPES}
          columnLabelWidth={90}
          rows={[
            {
              label: "Default",
              render: (type) => (
                <TextField
                  type={type}
                  placeholder={type === "currency" ? "0.00" : type === "dropdown" ? "Select a customer" : undefined}
                  onSelectorPress={type === "mobile" || type === "currency" ? () => {} : undefined}
                  onPress={type === "dropdown" ? () => {} : undefined}
                />
              ),
            },
            {
              label: "Disabled",
              render: (type) => (
                <TextField
                  type={type}
                  disabled
                  placeholder={type === "currency" ? "0.00" : type === "dropdown" ? "Select a customer" : undefined}
                />
              ),
            },
          ]}
        />
      </View>
    </ComponentPage>
  );
}

function TextAreaDemo() {
  const [value, setValue] = useState("");
  return (
    <ComponentPage
      title="TextArea"
      whatItIs="A multi-line text field for longer free-text input, like notes or a message."
      whenToUse={["Notes, descriptions, or any input that's more than one line."]}
      code={`import { TextArea } from "@statrys/app-ds";\n\n<TextArea label="Notes" placeholder="Add a note…" value={value} onChange={setValue} rows={4} />`}
    >
      <TextArea label="Notes" placeholder="Add a note…" value={value} onChange={setValue} rows={4} />
    </ComponentPage>
  );
}

function SearchDemo() {
  const [value, setValue] = useState("");
  return (
    <ComponentPage
      title="Search"
      whatItIs="A search box for filtering a list of results."
      whenToUse={["Filtering or searching a list, table, or page of results."]}
      useInstead={[{ label: "TextField", because: "it's a regular form field like name or email, not a search box." }]}
      code={`import { Search } from "@statrys/app-ds";\n\n<Search value={query} onChange={setQuery} placeholder="Search" />`}
    >
      <Search value={value} onChange={setValue} placeholder="Search" />
    </ComponentPage>
  );
}

function ActionRequiredDemo() {
  return (
    <ComponentPage
      title="ActionRequired"
      whatItIs="A prompt telling someone there's a task they need to complete, like verifying their account."
      whenToUse={["Nudging someone toward an unfinished but important task — verification, missing details."]}
      code={`import { ActionRequired } from "@statrys/app-ds";\n\n<ActionRequired title="Verify your business details" description="Required to receive payouts" />`}
    >
      <ActionRequired title="Verify your business details" description="Required to receive payouts" />
    </ComponentPage>
  );
}

function FABDemo() {
  return (
    <ComponentPage
      title="FAB"
      whatItIs="A floating action button that stays anchored to the screen for the single most important action, like creating something new."
      whenToUse={["The one primary action for a whole screen, like “New Invoice.”"]}
      goodToKnow={["Only ever show one FAB per screen — it's meant to be the single obvious next step."]}
      code={`import { FAB } from "@statrys/app-ds";\n\n<FAB hierarchy="primary" label="New" iconLeft={<Plus size={20} />} />`}
    >
      <VariantGrid
        columns={VARIANTS}
        rows={[
          { label: "Pill", render: (hierarchy) => <FAB hierarchy={hierarchy} label="New" iconLeft={<Plus size={20} />} /> },
          {
            label: "Circle",
            render: (hierarchy) => <FAB hierarchy={hierarchy} circle icon={<Star size={20} />} accessibilityLabel="Favorite" />,
          },
        ]}
      />
    </ComponentPage>
  );
}

function InvoiceStatusDemo() {
  const colors = ["neutral", "success", "warning", "error", "info", "custom"] as const;
  return (
    <ComponentPage
      title="InvoiceStatus"
      whatItIs="A colored status label specifically for invoice states, like Paid or Overdue."
      whenToUse={["Showing an invoice's current state in a list or on its detail page."]}
      useInstead={[{ label: "Badge", because: "it's a generic status or category tag, not specifically an invoice state." }]}
      code={`import { InvoiceStatus } from "@statrys/app-ds";\n\n<InvoiceStatus label="Paid" color="success" caption="12 Jun 2026" />`}
    >
      {colors.map((color) => (
        <InvoiceStatus key={color} label={color} color={color} caption="12 Jun 2026" />
      ))}
    </ComponentPage>
  );
}

const TABS_BASE_VARIANTS = ["button", "underline"] as const;

function TabsBaseDemo() {
  return (
    <ComponentPage
      title="TabsBase"
      whatItIs="One tab item — the building block used inside HorizontalTabs, not meant to be used alone."
      whenToUse={["Composing a custom tab row; otherwise use HorizontalTabs, which already assembles a scrollable row of these."]}
      code={`import { TabsBase } from "@statrys/app-ds";\n\n<TabsBase label="Paid" variant="underline" active onPress={() => {}} />`}
    >
      <VariantGrid
        columns={TABS_BASE_VARIANTS}
        rows={[
          { label: "Active", render: (variant) => <TabsBase label="Paid" variant={variant} active unread={variant === "button" ? "3" : undefined} /> },
          { label: "Inactive", render: (variant) => <TabsBase label="Paid" variant={variant} active={false} /> },
        ]}
      />
    </ComponentPage>
  );
}

function TileDemo() {
  return (
    <ComponentPage
      title="Tile"
      whatItIs="A tappable row with a leading icon or avatar, a title, and optional trailing content."
      whenToUse={["A row in a list of choices, contacts, or settings that someone can tap."]}
      code={`import { Tile } from "@statrys/app-ds";\n\n<Tile avatar="OR" title="Olivia Rhye" text="olivia@statrys.com" trailing="chevron" onPress={() => {}} />`}
    >
      <View style={{ gap: 8, width: 320 }}>
        <Tile avatar="OR" title="Olivia Rhye" text="olivia@statrys.com" trailing="chevron" onPress={() => {}} />
        <Tile icon={<ArrowUpRight size={24} color="#1b1b1b" />} title="Selected row" selected trailing="check" onPress={() => {}} />
        <Tile title="Primary account" badgeLabel="Primary" text="HKD 1234 5678" onLayer="gray" />
        <Tile title="Disabled row" text="Can't be selected" disabled trailing="chevron" />
      </View>
    </ComponentPage>
  );
}

function FileItemBaseDemo() {
  return (
    <ComponentPage
      title="FileItemBase"
      whatItIs="A row representing a file, with its name, size, and current upload or attachment state."
      whenToUse={["Showing an attached or uploading file, like a receipt or scanned document."]}
      code={`import { FileItemBase } from "@statrys/app-ds";\n\n<FileItemBase name="Invoice-0142.pdf" size="200 KB" />\n<FileItemBase name="Receipt.pdf" state="loading" progress={64} />`}
    >
      <View style={{ gap: 8, width: 320 }}>
        <FileItemBase name="Invoice-0142.pdf" size="200 KB" />
        <FileItemBase name="Receipt.pdf" state="loading" progress={64} />
        <FileItemBase name="Scan.pdf" state="error" />
        <FileItemBase name="Statement.pdf" action="download" />
        <FileItemBase name="Contract.pdf" action="replace" />
      </View>
    </ComponentPage>
  );
}

function NotificationItemDemo() {
  return (
    <ComponentPage
      title="NotificationItem"
      whatItIs="A row in a notification list, with a title, message, timestamp, and optional action."
      whenToUse={["Listing individual notifications or activity events."]}
      code={`import { NotificationItem } from "@statrys/app-ds";\n\n<NotificationItem\n  title="Invoice paid"\n  text="Acme Co. paid invoice INV-0142"\n  time="2h ago"\n  amount="HKD 1,200.00"\n  actionLabel="View invoice"\n/>`}
    >
      <View style={{ width: 320 }}>
        <NotificationItem
          title="Invoice paid"
          text="Acme Co. paid invoice INV-0142"
          time="2h ago"
          amount="HKD 1,200.00"
          actionLabel="View invoice"
        />
        <NotificationItem title="New message" text="Support replied to your ticket" time="1d ago" read lastItem />
      </View>
    </ComponentPage>
  );
}

function ListTextDemo() {
  return (
    <ComponentPage
      title="ListText"
      whatItIs="A small piece of text formatted for a list row's trailing value, like an amount, status, or date."
      whenToUse={["The value side of a list row — an amount, a status word, a placeholder date."]}
      code={`import { ListText } from "@statrys/app-ds";\n\n<ListText text="HKD 1,200.00" />\n<ListText text="Paid" description="12 Jun 2026" />`}
    >
      <View style={styles.row}>
        <ListText text="HKD 1,200.00" />
        <ListText text="Paid" description="12 Jun 2026" />
        <ListText text="USD" flag={<View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#b5d9ff" }} />} />
        <ListText text="Select a date" placeholder />
        <ListText text="Required" error />
      </View>
    </ComponentPage>
  );
}

function ListRowDemo() {
  const [selected, setSelected] = useState(true);
  return (
    <ComponentPage
      title="ListRow"
      whatItIs="A single row inside a ListCard, for a label/value pair, a toggle setting, or a tappable field."
      whenToUse={["Rows inside a settings list or form summary — account fields, toggles, tappable pickers."]}
      code={`import { ListCard, ListRow } from "@statrys/app-ds";\n\n<ListCard>\n  <ListRow label="Account holder" value="Olivia Rhye" trailing="chevron" onPress={() => {}} />\n  <ListRow label="Enable notifications" trailing="toggle" selected={on} onSelectedChange={setOn} last />\n</ListCard>`}
    >
      <ListCard>
        <ListRow label="Account holder" value="Olivia Rhye" trailing="chevron" onPress={() => {}} />
        <ListRow label="Currency" description="Settlement currency" value="USD" trailing="chevron" onPress={() => {}} />
        <ListRow label="Enable notifications" trailing="toggle" selected={selected} onSelectedChange={setSelected} />
        <ListRow label="Issue date" placeholder value="Select a date" caption="Required" error last />
      </ListCard>
      <Text style={styles.subtitle2}>swiped=true</Text>
      <ListCard>
        <ListRow label="Draft invoice" value="HKD 500.00" swiped onDelete={() => {}} onMore={() => {}} last />
      </ListCard>
    </ComponentPage>
  );
}

function HorizontalTabsDemo() {
  const [tab1, setTab1] = useState("All");
  const [tab2, setTab2] = useState("Paid");
  const [tab3, setTab3] = useState("Overdue");
  const [tab4, setTab4] = useState("Draft");
  const [active, setActive] = useState(0);
  const [variant, setVariant] = useState<"button" | "underline">("underline");

  const tabs = [tab1, tab2, tab3, tab4];

  return (
    <ComponentPage
      title="HorizontalTabs"
      whatItIs="A row of tabs for switching between a few closely related views on the same screen."
      whenToUse={[
        "Switching between sections that live on one screen, like a list's status filters.",
        "When there are only a few tabs — enough to fit comfortably, since the row scrolls once they overflow.",
      ]}
      useInstead={[{ label: "SegmentedControls", because: "the options are more like a single setting (a chart range) than separate content views." }]}
      code={`import { HorizontalTabs } from "@statrys/app-ds";\n\nconst tabs = ["All", "Paid", "Overdue", "Draft"];\n\n<HorizontalTabs tabs={tabs} activeIndex={activeIndex} onChange={setActiveIndex} />`}
    >
      <View style={styles.demoRow}>
        <DemoPreview>
          <HorizontalTabs tabs={tabs} activeIndex={active} onChange={setActive} variant={variant} unread={variant === "button" ? [undefined, undefined, "3", undefined] : undefined} />
        </DemoPreview>

        <View style={styles.sidebar}>
          <View style={styles.controls}>
            <ControlGroupLabel>Text</ControlGroupLabel>
            <TextField label="Tab 1" value={tab1} onChange={setTab1} />
            <TextField label="Tab 2" value={tab2} onChange={setTab2} />
            <TextField label="Tab 3" value={tab3} onChange={setTab3} />
            <TextField label="Tab 4" value={tab4} onChange={setTab4} />
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>Layout</ControlGroupLabel>
            <DemoSegmented label="Variant" options={["button", "underline"] as const} value={variant} onChange={setVariant} />
          </View>
        </View>
      </View>
    </ComponentPage>
  );
}

function InvoiceRowDemo() {
  return (
    <ComponentPage
      title="InvoiceRow"
      whatItIs="A row summarizing one invoice — client, invoice number, status, and amount — for an invoice list."
      whenToUse={["Listing invoices, each tappable to open its detail page."]}
      code={`import { InvoiceRow } from "@statrys/app-ds";\n\n<InvoiceRow title="Acme Co." invoiceNo="INV-0142" status="Paid" statusCaption="12 Jun 2026" amount="USD 6,430.05" onPress={() => {}} />`}
    >
      <View style={{ width: 320 }}>
        <InvoiceRow title="Acme Co." invoiceNo="INV-0142" status="Paid" statusCaption="12 Jun 2026" amount="USD 6,430.05" onPress={() => {}} />
        <InvoiceRow
          title="Beta LLC"
          invoiceNo="INV-0143"
          status="Refunded"
          statusColor="info"
          amount="USD 1,200.00"
          creditedAmount="USD 300.00"
          onCreditedPress={() => {}}
          lastItem
        />
      </View>
    </ComponentPage>
  );
}

function SegmentedControlsDemo() {
  const [active, setActive] = useState(0);
  return (
    <ComponentPage
      title="SegmentedControls"
      whatItIs="A row of 2-4 segments for switching between a few closely related views, like a chart's time range."
      whenToUse={["Switching between a small number of views inline, like Day/Week/Month/Year."]}
      useInstead={[{ label: "HorizontalTabs", because: "you have more than a few options, or the row needs to scroll." }]}
      code={`import { SegmentedControls } from "@statrys/app-ds";\n\n<SegmentedControls segments={["Day", "Week", "Month", "Year"]} activeIndex={activeIndex} onChange={setActiveIndex} />`}
    >
      <View style={{ width: 300 }}>
        <SegmentedControls segments={["Day", "Week", "Month", "Year"]} activeIndex={active} onChange={setActive} />
      </View>
    </ComponentPage>
  );
}

const TOAST_MESSAGE_VARIANTS = ["default", "success", "error", "warning"] as const;

function ToastMessageDemo() {
  const [title, setTitle] = useState("Invoice sent");
  const [subtitle, setSubtitle] = useState("Marked as sent");
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [showAction, setShowAction] = useState(true);
  const [variant, setVariant] = useState<(typeof TOAST_MESSAGE_VARIANTS)[number]>("success");

  return (
    <ComponentPage
      title="ToastMessage"
      whatItIs="A dark notification card you place and time yourself — the presentational piece, not the auto-hide behavior."
      whenToUse={["Brief feedback after a user action, when you want full control over how and when it's shown and hidden."]}
      useInstead={[{ label: "Toast", because: "you want the component to handle showing and auto-hiding itself instead of managing that yourself." }]}
      goodToKnow={["Keep the title short enough to read at a glance."]}
      code={`import { ToastMessage } from "@statrys/app-ds";\n\n<ToastMessage\n  variant="success"\n  title="Invoice sent"\n  subtitle="Marked as sent"\n  action={{ label: "View Details", onPress: openInvoice }}\n  onClose={() => setShow(false)}\n/>`}
    >
      <View style={styles.demoRow}>
        <DemoPreview dark>
          <ToastMessage
            variant={variant}
            title={title}
            subtitle={showSubtitle ? subtitle : undefined}
            action={showAction ? { label: "View Details", onPress: () => {} } : undefined}
            onClose={() => {}}
          />
        </DemoPreview>

        <View style={styles.sidebar}>
          <View style={styles.controls}>
            <ControlGroupLabel>Text</ControlGroupLabel>
            <TextField label="Title" value={title} onChange={setTitle} />
            {showSubtitle && <TextField label="Subtitle" value={subtitle} onChange={setSubtitle} />}
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>Layout</ControlGroupLabel>
            <DemoSegmented label="Variant" options={TOAST_MESSAGE_VARIANTS} value={variant} onChange={setVariant} />
          </View>
          <View style={styles.controls}>
            <ControlGroupLabel>Content</ControlGroupLabel>
            <Checkbox label="Subtitle" selected={showSubtitle} onChange={setShowSubtitle} />
            <Checkbox label="Action link" selected={showAction} onChange={setShowAction} />
          </View>
        </View>
      </View>
    </ComponentPage>
  );
}

function EmptyStateDemo() {
  return (
    <ComponentPage
      title="EmptyState"
      whatItIs="A friendly placeholder shown when a list or screen has nothing in it yet."
      whenToUse={["A list with zero items — no invoices yet, no results found."]}
      goodToKnow={["Pair it with an action when there's an obvious next step, like “Create invoice.”"]}
      code={`import { EmptyState, Button } from "@statrys/app-ds";\n\n<EmptyState\n  title="No invoices yet"\n  subtitle="Invoices you send will show up here."\n  action={<Button size="sm">Create invoice</Button>}\n/>`}
    >
      <EmptyState
        icon={<ArrowUpRight size={32} color="#a0a0a0" />}
        title="No invoices yet"
        subtitle="Invoices you send will show up here."
        action={<Button size="sm">Create invoice</Button>}
      />
    </ComponentPage>
  );
}

function ToastDemo() {
  const [open, setOpen] = useState(true);
  return (
    <ComponentPage
      title="Toast"
      whatItIs="A self-contained, auto-hiding notification banner that manages its own timer — mount it once per screen and toggle it open."
      whenToUse={["Brief feedback after an action, when you want the component to handle showing and auto-hiding itself."]}
      useInstead={[{ label: "ToastMessage", because: "you want to control the card's content and timing yourself instead of the built-in auto-hide." }]}
      code={`import { Toast } from "@statrys/app-ds";\n\n<Toast open={open} message="Invoice sent" subtext="Marked as sent" onDone={() => setOpen(false)} bottomOffset={16} />`}
    >
      <Button size="sm" onPress={() => setOpen((o) => !o)}>
        Toggle toast
      </Button>
      <View style={[styles.overlayBox, { height: 160 }]}>
        <Toast open={open} message="Invoice sent" subtext="Marked as sent" onDone={() => setOpen(false)} bottomOffset={16} />
      </View>
    </ComponentPage>
  );
}

function ButtonDockDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <ComponentPage
      title="ButtonDock"
      whatItIs="The fixed action bar docked to the bottom of a screen, holding the primary (and optional secondary) button."
      whenToUse={["The main call-to-action for a screen or form, kept visible while someone scrolls."]}
      code={`import { ButtonDock } from "@statrys/app-ds";\n\n<ButtonDock type="double" primaryLabel="Confirm" secondaryLabel="Cancel" />`}
    >
      <Text style={styles.subtitle2}>type=&quot;double&quot;</Text>
      <View style={styles.sheetBox}>
        <ButtonDock type="double" accessory selected={checked} onSelectedChange={setChecked} />
      </View>
      <Text style={styles.subtitle2}>type=&quot;ghost&quot; stack=&quot;horizontal&quot;</Text>
      <View style={styles.sheetBox}>
        <ButtonDock type="ghost" stack="horizontal" primaryLabel="Confirm" secondaryLabel="Close" />
      </View>
      <Text style={styles.subtitle2}>with slot</Text>
      <View style={styles.sheetBox}>
        <ButtonDock type="single" slot={<Text>Total: HKD 1,200.00</Text>} />
      </View>
    </ComponentPage>
  );
}

const DEMOS: Record<string, React.ComponentType> = {
  button: ButtonDemo,
  badge: BadgeDemo,
  "noti-badge": NotiBadgeDemo,
  toggle: ToggleDemo,
  "x-close": XCloseDemo,
  overlay: OverlayDemo,
  "list-card": ListCardDemo,
  chips: ChipsDemo,
  loading: LoadingDemo,
  avatar: AvatarDemo,
  banner: BannerDemo,
  "bottom-sheet": BottomSheetDemo,
  checkbox: CheckboxDemo,
  "number-stepper": NumberStepperDemo,
  "swipe-actions": SwipeActionsDemo,
  "outstanding-card": OutstandingCardDemo,
  "page-header": PageHeaderDemo,
  "segmented-control-base": SegmentedControlBaseDemo,
  tooltip: TooltipDemo,
  "text-field": TextFieldDemo,
  "text-area": TextAreaDemo,
  search: SearchDemo,
  "action-required": ActionRequiredDemo,
  fab: FABDemo,
  "invoice-status": InvoiceStatusDemo,
  "tabs-base": TabsBaseDemo,
  tile: TileDemo,
  "file-item-base": FileItemBaseDemo,
  "notification-item": NotificationItemDemo,
  "list-text": ListTextDemo,
  "list-row": ListRowDemo,
  "horizontal-tabs": HorizontalTabsDemo,
  "invoice-row": InvoiceRowDemo,
  "segmented-controls": SegmentedControlsDemo,
  "toast-message": ToastMessageDemo,
  "empty-state": EmptyStateDemo,
  toast: ToastDemo,
  "button-dock": ButtonDockDemo,
};

export function Components({ item }: { item: string }) {
  const Demo = DEMOS[item];
  if (Demo) return <Demo />;
  return <Text>Unknown component: {item}</Text>;
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, fontWeight: "700", marginTop: 8 },
  subtitle2: { fontSize: 14, fontWeight: "600", textTransform: "capitalize", marginTop: 4 },
  note: { fontSize: 13, color: "#666", maxWidth: 560 },
  row: { flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" },
  darkSwatch: { backgroundColor: "#1b1b1b", padding: 12, borderRadius: 8 },
  overlayBox: { height: 120, width: 220, backgroundColor: "#faf9f4", borderRadius: 8, position: "relative", padding: 12 },
  padded: { padding: 12 },
  sheetBox: { width: 320, borderWidth: 1, borderColor: "#e5e5e5" },
  segmentTrack: { flexDirection: "row", backgroundColor: "#f5f4f1", borderRadius: 8, padding: 2, width: 280 },
  grid: { gap: 12, marginBottom: 8 },
  gridRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  gridCell: { flex: 1, alignItems: "flex-start" },
  gridHeaderLabel: { fontSize: 12, fontWeight: "700", textTransform: "uppercase", color: "#808080" },
  gridRowLabel: { fontSize: 13, color: "#666" },
  demoRow: { flexDirection: "row", flexWrap: "wrap", gap: 24, alignItems: "stretch" },
  sidebar: { minWidth: 220, flexShrink: 0, gap: 16 },
  preview: { flex: 1, minWidth: 260, minHeight: 160, alignItems: "center", justifyContent: "center", backgroundColor: "#f2f2f2", borderRadius: 8, padding: 16 },
  previewDark: { backgroundColor: "#1b1b1b" },
  controls: { gap: 8 },
  controlGroupLabel: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    color: "#999",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 6,
  },
  controlRow: { gap: 6 },
  controlLabel: { fontSize: 12, fontWeight: "600", color: "#444" },
});
