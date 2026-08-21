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
} from "@statrys/app-ds";

const VARIANTS = ["primary", "secondary", "tertiary"] as const;
const SHAPES = ["square", "circle"] as const;
const SIZES = ["sm", "md", "lg"] as const;
const ICON_SIZE = { sm: 16, md: 20, lg: 24 };

function ButtonDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button</Text>
      {VARIANTS.map((variant) => (
        <View key={variant} style={styles.row}>
          {SIZES.map((size) => (
            <Button key={size} variant={variant} size={size}>
              {`${variant} / ${size}`}
            </Button>
          ))}
          <Button variant={variant} disabled>
            disabled
          </Button>
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
            <View key={variant} style={styles.row}>
              {SIZES.map((size) => (
                <Button
                  key={size}
                  variant={variant}
                  size={size}
                  shape={shape}
                  icon={<ArrowUpRight size={ICON_SIZE[size]} />}
                  accessibilityLabel={`${variant} ${shape} ${size}`}
                />
              ))}
              <Button
                variant={variant}
                shape={shape}
                icon={<ArrowUpRight size={20} />}
                accessibilityLabel={`${variant} ${shape} disabled`}
                disabled
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function BadgeDemo() {
  const colors = ["neutral", "success", "warning", "error", "info", "custom"] as const;
  const variants = ["subtle", "bold", "text"] as const;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Badge</Text>
      {variants.map((variant) => (
        <View key={variant}>
          <Text style={styles.subtitle2}>{variant}</Text>
          <View style={styles.row}>
            {colors.map((color) => (
              <Badge key={color} label={color} variant={variant} color={color} />
            ))}
          </View>
        </View>
      ))}
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

function ToggleDemo() {
  const [on, setOn] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toggle</Text>
      <View style={styles.row}>
        <Toggle selected={on} onChange={setOn} accessibilityLabel="Demo toggle" />
        <Toggle selected={false} disabled />
        <Toggle selected={true} disabled />
      </View>
    </View>
  );
}

function XCloseDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>XClose</Text>
      <View style={styles.row}>
        <XClose size="sm" />
        <XClose size="md" />
        <View style={styles.darkSwatch}>
          <XClose size="md" inverse />
        </View>
      </View>
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

function CheckboxDemo() {
  const [checked, setChecked] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkbox</Text>
      <Checkbox label="Selected" selected={checked} onChange={setChecked} />
      <Checkbox label="With description" description="Supporting detail line" selected={false} onChange={() => {}} />
      <Checkbox label="Indeterminate" selected indeterminate onChange={() => {}} />
      <Checkbox label="Disabled" selected disabled onChange={() => {}} />
      <Checkbox label="size=md" size="md" selected onChange={() => {}} />
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

function TextFieldDemo() {
  const [value, setValue] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TextField</Text>
      <TextField label="Email" placeholder="you@example.com" value={value} onChange={setValue} />
      <TextField type="mobile" onSelectorPress={() => {}} value={value} onChange={setValue} />
      <TextField type="currency" onSelectorPress={() => {}} placeholder="0.00" />
      <TextField type="dropdown" placeholder="Select a customer" onPress={() => {}} />
      <TextField label="With error" error caption="This field is required" mandatory />
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
      <View style={styles.row}>
        {VARIANTS.map((hierarchy) => (
          <FAB key={hierarchy} hierarchy={hierarchy} label="New" iconLeft={<Plus size={20} />} />
        ))}
      </View>
      <View style={styles.row}>
        {VARIANTS.map((hierarchy) => (
          <FAB key={hierarchy} hierarchy={hierarchy} circle icon={<Star size={20} />} accessibilityLabel="Favorite" />
        ))}
      </View>
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

function TabsBaseDemo() {
  const [active, setActive] = useState(0);
  const labels = ["All", "Paid", "Overdue"];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TabsBase</Text>
      <Text style={styles.subtitle2}>variant=&quot;button&quot;</Text>
      <View style={styles.row}>
        {labels.map((label, i) => (
          <TabsBase key={label} label={label} variant="button" active={active === i} onPress={() => setActive(i)} unread={i === 2 ? "3" : undefined} />
        ))}
      </View>
      <Text style={styles.subtitle2}>variant=&quot;underline&quot;</Text>
      <View style={styles.row}>
        {labels.map((label, i) => (
          <TabsBase key={label} label={label} variant="underline" active={active === i} onPress={() => setActive(i)} />
        ))}
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
});
