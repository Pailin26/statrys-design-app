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

function ButtonDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button</Text>
      {VARIANTS.map((variant) => (
        <View key={variant}>
          <Text style={styles.subtitle2}>{variant}</Text>
          <VariantGrid
            columns={SIZES}
            rows={[
              { label: "Default", render: (size) => <Button variant={variant} size={size}>{`${variant} / ${size}`}</Button> },
              { label: "Disabled", render: (size) => <Button variant={variant} size={size} disabled>{`${variant} / ${size}`}</Button> },
            ]}
          />
        </View>
      ))}

      <Text style={styles.subtitle}>Shape=Square / Circle (icon-only)</Text>
      <Text style={styles.note}>
        icon is a consumer-supplied ReactNode — no re-export layer in @statrys/app-ds. Here it's Lucide's
        ArrowUpRight, matching Figma's own icon.
      </Text>
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
  );
}

const BADGE_COLORS = ["neutral", "success", "warning", "error", "info", "custom"] as const;
const BADGE_VARIANTS = ["subtle", "bold", "text"] as const;

function BadgeDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Badge</Text>
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
    </View>
  );
}

function NotiBadgeDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NotiBadge</Text>
      <View style={styles.row}>
        <NotiBadge count="3" />
        <NotiBadge count="99+" />
        <View style={styles.darkSwatch}>
          <NotiBadge count="3" inverse />
        </View>
      </View>
    </View>
  );
}

const TOGGLE_COLUMNS = ["Enabled", "Disabled"] as const;

function ToggleDemo() {
  const [off, setOff] = useState(false);
  const [on, setOn] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toggle</Text>
      <VariantGrid
        columns={TOGGLE_COLUMNS}
        rows={[
          {
            label: "Off",
            render: (column) =>
              column === "Enabled" ? (
                <Toggle selected={off} onChange={setOff} accessibilityLabel="off, enabled" />
              ) : (
                <Toggle selected={false} disabled accessibilityLabel="off, disabled" />
              ),
          },
          {
            label: "On",
            render: (column) =>
              column === "Enabled" ? (
                <Toggle selected={on} onChange={setOn} accessibilityLabel="on, enabled" />
              ) : (
                <Toggle selected={true} disabled accessibilityLabel="on, disabled" />
              ),
          },
        ]}
      />
    </View>
  );
}

const XCLOSE_SIZES = ["sm", "md"] as const;

function XCloseDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>XClose</Text>
      <VariantGrid
        columns={XCLOSE_SIZES}
        rows={[
          { label: "Default", render: (size) => <XClose size={size} /> },
          {
            label: "Inverse",
            render: (size) => (
              <View style={styles.darkSwatch}>
                <XClose size={size} inverse />
              </View>
            ),
          },
        ]}
      />
    </View>
  );
}

function OverlayDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overlay</Text>
      <Button size="sm" onPress={() => setVisible((v) => !v)}>
        Toggle overlay
      </Button>
      <View style={styles.overlayBox}>
        <Text>Content behind the overlay</Text>
        <Overlay visible={visible} onPress={() => setVisible(false)} />
      </View>
    </View>
  );
}

function ListCardDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ListCard</Text>
      <ListCard>
        <Text style={styles.padded}>Row one</Text>
        <Text style={styles.padded}>Row two</Text>
      </ListCard>
      <Text style={styles.subtitle2}>onLayer=&quot;gray&quot;</Text>
      <ListCard onLayer="gray">
        <Text style={styles.padded}>Row one</Text>
      </ListCard>
    </View>
  );
}

function ChipsDemo() {
  const [active, setActive] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chips</Text>
      <View style={styles.row}>
        <Chips label="Filter" type="filter" active={active} onPress={() => setActive((a) => !a)} />
        <Chips label="alice@statrys.com" type="input" onDismiss={() => {}} />
      </View>
    </View>
  );
}

function LoadingDemo() {
  const sizes = ["2xs", "xs", "sm", "md", "lg"] as const;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading</Text>
      <View style={styles.row}>
        {sizes.map((size) => (
          <Loading key={size} size={size} />
        ))}
      </View>
    </View>
  );
}

function AvatarDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avatar</Text>
      <View style={styles.row}>
        {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const).map((size) => (
          <Avatar key={size} size={size} initials="OR" />
        ))}
      </View>
      <Text style={styles.subtitle2}>style=&quot;photo&quot;</Text>
      <Avatar style="photo" size="lg" src="https://picsum.photos/seed/statrys/80" />
    </View>
  );
}

function BannerDemo() {
  const colors = ["info", "success", "warning", "error"] as const;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Banner</Text>
      {colors.map((color) => (
        <Banner
          key={color}
          color={color}
          title="Heads up"
          text="Supporting detail line for this banner."
          linkLabel="View Details"
          onDismiss={() => {}}
        />
      ))}
    </View>
  );
}

function BottomSheetDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BottomSheet</Text>
      <View style={styles.sheetBox}>
        <BottomSheet title="Sheet title">
          <Text style={styles.padded}>Sheet body content goes here.</Text>
        </BottomSheet>
      </View>
    </View>
  );
}

const CHECKBOX_SIZES = ["sm", "md"] as const;
const CHECKBOX_VARIANT_ROWS: { label: string; props: Partial<React.ComponentProps<typeof Checkbox>> }[] = [
  { label: "Unselected", props: { selected: false } },
  { label: "Selected", props: { selected: true } },
  { label: "Indeterminate", props: { selected: true, indeterminate: true } },
  { label: "Disabled, unselected", props: { selected: false, disabled: true } },
  { label: "Disabled, selected", props: { selected: true, disabled: true } },
];

function CheckboxDemo() {
  const [withDesc, setWithDesc] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkbox</Text>
      <VariantGrid
        columns={CHECKBOX_SIZES}
        columnLabelWidth={150}
        rows={CHECKBOX_VARIANT_ROWS.map((row) => ({
          label: row.label,
          render: (size: (typeof CHECKBOX_SIZES)[number]) => (
            <Checkbox label="Label" size={size} onChange={() => {}} {...row.props} />
          ),
        }))}
      />
      <Text style={styles.subtitle2}>With description</Text>
      <Checkbox label="Remember me" description="Save my login details for next time" selected={withDesc} onChange={setWithDesc} />
    </View>
  );
}

function NumberStepperDemo() {
  const [value, setValue] = useState(2);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NumberStepper</Text>
      <NumberStepper value={value} onChange={setValue} label="quantity" />
    </View>
  );
}

function SwipeActionsDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SwipeActions</Text>
      <SwipeActions />
    </View>
  );
}

function OutstandingCardDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OutstandingCard</Text>
      <OutstandingCard
        expected="20,000.00"
        collected="12,000.00"
        outstanding="8,000.00"
        percent={60}
        encouragement="Keep it up!"
        linkLabel="2 invoices"
      />
    </View>
  );
}

function PageHeaderDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PageHeader</Text>
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
    </View>
  );
}

function SegmentedControlBaseDemo() {
  const [active, setActive] = useState(0);
  const labels = ["All", "Paid", "Overdue"];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SegmentedControlBase</Text>
      <View style={styles.segmentTrack}>
        {labels.map((label, i) => (
          <SegmentedControlBase key={label} label={label} active={active === i} onPress={() => setActive(i)} />
        ))}
      </View>
    </View>
  );
}

function TooltipDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tooltip</Text>
      <View style={styles.row}>
        <Tooltip title="Default" arrow="bottom" />
        <Tooltip title="Inverse" arrow="bottom" inverse />
      </View>
      <Tooltip title="With description" description="A second, longer supporting line of text." arrow="top" />
    </View>
  );
}

const TEXT_FIELD_TYPES = ["text", "mobile", "currency", "dropdown"] as const;

function TextFieldDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TextField</Text>
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
      <Text style={styles.subtitle2}>Labeled, with error</Text>
      <TextField label="Email" error caption="This field is required" mandatory />
    </View>
  );
}

function TextAreaDemo() {
  const [value, setValue] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TextArea</Text>
      <TextArea label="Notes" placeholder="Add a note…" value={value} onChange={setValue} rows={4} />
    </View>
  );
}

function SearchDemo() {
  const [value, setValue] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <Search value={value} onChange={setValue} placeholder="Search" />
    </View>
  );
}

function ActionRequiredDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ActionRequired</Text>
      <ActionRequired title="Verify your business details" description="Required to receive payouts" />
    </View>
  );
}

function FABDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAB</Text>
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
    </View>
  );
}

function InvoiceStatusDemo() {
  const colors = ["neutral", "success", "warning", "error", "info", "custom"] as const;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>InvoiceStatus</Text>
      {colors.map((color) => (
        <InvoiceStatus key={color} label={color} color={color} caption="12 Jun 2026" />
      ))}
    </View>
  );
}

const TABS_BASE_VARIANTS = ["button", "underline"] as const;

function TabsBaseDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TabsBase</Text>
      <VariantGrid
        columns={TABS_BASE_VARIANTS}
        rows={[
          { label: "Active", render: (variant) => <TabsBase label="Paid" variant={variant} active unread={variant === "button" ? "3" : undefined} /> },
          { label: "Inactive", render: (variant) => <TabsBase label="Paid" variant={variant} active={false} /> },
        ]}
      />
    </View>
  );
}

function TileDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tile</Text>
      <View style={{ gap: 8, width: 320 }}>
        <Tile avatar="OR" title="Olivia Rhye" text="olivia@statrys.com" trailing="chevron" onPress={() => {}} />
        <Tile icon={<ArrowUpRight size={24} color="#1b1b1b" />} title="Selected row" selected trailing="check" onPress={() => {}} />
        <Tile title="Primary account" badgeLabel="Primary" text="HKD 1234 5678" onLayer="gray" />
        <Tile title="Disabled row" text="Can't be selected" disabled trailing="chevron" />
      </View>
    </View>
  );
}

function FileItemBaseDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FileItemBase</Text>
      <View style={{ gap: 8, width: 320 }}>
        <FileItemBase name="Invoice-0142.pdf" size="200 KB" />
        <FileItemBase name="Receipt.pdf" state="loading" progress={64} />
        <FileItemBase name="Scan.pdf" state="error" />
        <FileItemBase name="Statement.pdf" action="download" />
        <FileItemBase name="Contract.pdf" action="replace" />
      </View>
    </View>
  );
}

function NotificationItemDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NotificationItem</Text>
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
    </View>
  );
}

function ListTextDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ListText</Text>
      <View style={styles.row}>
        <ListText text="HKD 1,200.00" />
        <ListText text="Paid" description="12 Jun 2026" />
        <ListText text="USD" flag={<View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#b5d9ff" }} />} />
        <ListText text="Select a date" placeholder />
        <ListText text="Required" error />
      </View>
    </View>
  );
}

function ListRowDemo() {
  const [selected, setSelected] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ListRow</Text>
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
    </View>
  );
}

function HorizontalTabsDemo() {
  const [active, setActive] = useState(0);
  const tabs = ["All", "Paid", "Overdue", "Draft"];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HorizontalTabs</Text>
      <Text style={styles.subtitle2}>variant=&quot;button&quot;</Text>
      <HorizontalTabs tabs={tabs} activeIndex={active} onChange={setActive} unread={[undefined, undefined, "3"]} />
      <Text style={styles.subtitle2}>variant=&quot;underline&quot;</Text>
      <HorizontalTabs tabs={tabs} activeIndex={active} onChange={setActive} variant="underline" />
    </View>
  );
}

function InvoiceRowDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>InvoiceRow</Text>
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
    </View>
  );
}

function SegmentedControlsDemo() {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SegmentedControls</Text>
      <View style={{ width: 300 }}>
        <SegmentedControls segments={["Day", "Week", "Month", "Year"]} activeIndex={active} onChange={setActive} />
      </View>
    </View>
  );
}

function ToastMessageDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToastMessage</Text>
      <View style={{ gap: 8 }}>
        <ToastMessage title="Saved" onClose={() => {}} />
        <ToastMessage variant="success" title="Invoice sent" subtitle="Marked as sent" action={{ label: "View Details", onPress: () => {} }} onClose={() => {}} />
        <ToastMessage variant="error" title="Upload failed" onClose={() => {}} />
        <ToastMessage variant="warning" title="Missing details" onClose={() => {}} />
      </View>
    </View>
  );
}

function EmptyStateDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EmptyState</Text>
      <EmptyState
        icon={<ArrowUpRight size={32} color="#a0a0a0" />}
        title="No invoices yet"
        subtitle="Invoices you send will show up here."
        action={<Button size="sm">Create invoice</Button>}
      />
    </View>
  );
}

function ToastDemo() {
  const [open, setOpen] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toast</Text>
      <Button size="sm" onPress={() => setOpen((o) => !o)}>
        Toggle toast
      </Button>
      <View style={[styles.overlayBox, { height: 160 }]}>
        <Toast open={open} message="Invoice sent" subtext="Marked as sent" onDone={() => setOpen(false)} bottomOffset={16} />
      </View>
    </View>
  );
}

function ButtonDockDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ButtonDock</Text>
      <Text style={styles.subtitle2}>type=&quot;double&quot;</Text>
      <View style={{ width: 320, borderWidth: 1, borderColor: "#e5e5e5" }}>
        <ButtonDock type="double" accessory selected={checked} onSelectedChange={setChecked} />
      </View>
      <Text style={styles.subtitle2}>type=&quot;ghost&quot; stack=&quot;horizontal&quot;</Text>
      <View style={{ width: 320, borderWidth: 1, borderColor: "#e5e5e5" }}>
        <ButtonDock type="ghost" stack="horizontal" primaryLabel="Confirm" secondaryLabel="Close" />
      </View>
      <Text style={styles.subtitle2}>with slot</Text>
      <View style={{ width: 320, borderWidth: 1, borderColor: "#e5e5e5" }}>
        <ButtonDock type="single" slot={<Text>Total: HKD 1,200.00</Text>} />
      </View>
    </View>
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
  container: { gap: 16 },
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
});
