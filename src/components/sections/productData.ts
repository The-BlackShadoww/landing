export type Tone = "green" | "blue" | "yellow" | "red" | "gray";

export type Kpi = { label: string; value: string; delta: string; up: boolean; spark: number[] };

export type Panel =
  | { kind: "table"; columns: string[]; rows: { cells: string[]; tag: [string, Tone] }[] }
  | { kind: "bars"; sites: string[]; rows: { part: string; values: number[]; reorder: number }[] }
  | { kind: "tree" }
  | { kind: "chart"; bars: { label: string; revenue: number; margin: number }[] };

export type Tab = {
  key: string;
  label: string;
  sub: string;
  nav: string;
  title: string;
  subtitle: string;
  action: string;
  kpis: Kpi[];
  panel: Panel;
};

export const TABS: Tab[] = [
  {
    key: "production",
    label: "Production",
    sub: "Work orders that schedule themselves",
    nav: "Production",
    title: "Work orders",
    subtitle: "214 open across 3 lines · replanned 4 min ago",
    action: "New work order",
    kpis: [
      { label: "Open work orders", value: "214", delta: "12", up: true, spark: [4, 6, 5, 7, 6, 8, 9] },
      { label: "On-time completion", value: "97.2%", delta: "4.1 pts", up: true, spark: [5, 5, 6, 7, 7, 8, 9] },
      { label: "Avg. cycle time", value: "3.4d", delta: "0.6d", up: false, spark: [9, 8, 8, 6, 6, 5, 4] },
      { label: "Scrap rate", value: "0.8%", delta: "0.3 pts", up: false, spark: [7, 6, 7, 5, 4, 4, 3] },
    ],
    panel: {
      kind: "table",
      columns: ["Work order", "Part", "Line", "Qty", "Due"],
      rows: [
        { cells: ["WO-2291", "Gravel frame · 54cm", "Weld A", "120", "Oct 09"], tag: ["On track", "green"] },
        { cells: ["WO-2290", "Fork crown CNC", "CNC 2", "480", "Oct 09"], tag: ["In progress", "blue"] },
        { cells: ["WO-2288", "Rear triangle · 56cm", "Weld B", "90", "Oct 10"], tag: ["Waiting stock", "yellow"] },
        { cells: ["WO-2287", "Dropout set", "CNC 1", "600", "Oct 11"], tag: ["On track", "green"] },
        { cells: ["WO-2285", "Powder coat · Moss", "Finish", "210", "Oct 11"], tag: ["At risk", "red"] },
        { cells: ["WO-2284", "Headset press-fit", "Assembly", "150", "Oct 12"], tag: ["Scheduled", "gray"] },
      ],
    },
  },
  {
    key: "inventory",
    label: "Inventory",
    sub: "Lot-level stock across every site",
    nav: "Inventory",
    title: "Stock by site",
    subtitle: "3 sites · 1,284 SKUs · counted 2 days ago",
    action: "Transfer stock",
    kpis: [
      { label: "Inventory value", value: "$4.82M", delta: "3.2%", up: false, spark: [9, 8, 8, 7, 7, 6, 6] },
      { label: "Turns (annual)", value: "7.1", delta: "1.4", up: true, spark: [4, 5, 5, 6, 6, 7, 8] },
      { label: "Below reorder", value: "12", delta: "9", up: false, spark: [8, 9, 7, 6, 5, 4, 3] },
      { label: "Count accuracy", value: "99.4%", delta: "2.0 pts", up: true, spark: [5, 6, 6, 7, 8, 8, 9] },
    ],
    panel: {
      kind: "bars",
      sites: ["Leeds", "Porto", "Reno"],
      rows: [
        { part: "6061 tube · 34.9mm", values: [42, 26, 18], reorder: 40 },
        { part: "Carbon fork blank", values: [18, 12, 6], reorder: 44 },
        { part: "Dropout blank", values: [30, 30, 24], reorder: 50 },
        { part: "Bottom bracket shell", values: [12, 8, 4], reorder: 30 },
        { part: "Powder · Moss green", values: [36, 20, 12], reorder: 38 },
      ],
    },
  },
  {
    key: "purchasing",
    label: "Purchasing",
    sub: "Auto-drafted POs with three-way match",
    nav: "Purchasing",
    title: "Purchase orders",
    subtitle: "8 drafted from demand · awaiting approval",
    action: "Approve all",
    kpis: [
      { label: "Open PO value", value: "$612K", delta: "8%", up: true, spark: [5, 6, 5, 7, 8, 7, 8] },
      { label: "Supplier on-time", value: "94%", delta: "6 pts", up: true, spark: [5, 5, 6, 6, 7, 8, 9] },
      { label: "Avg. approval time", value: "2.1h", delta: "1.9d", up: false, spark: [9, 8, 6, 5, 4, 3, 2] },
      { label: "Match exceptions", value: "3", delta: "17", up: false, spark: [9, 8, 6, 5, 4, 3, 2] },
    ],
    panel: {
      kind: "table",
      columns: ["PO", "Supplier", "Lines", "Amount", "ETA"],
      rows: [
        { cells: ["PO-8821", "Reynolds Tubing", "4", "$48,200", "Oct 18"], tag: ["Draft", "blue"] },
        { cells: ["PO-8820", "Kinetic Coatings", "2", "$9,860", "Oct 14"], tag: ["Draft", "blue"] },
        { cells: ["PO-8817", "Reynolds Tubing", "6", "$71,400", "Oct 06"], tag: ["Matched", "green"] },
        { cells: ["PO-8815", "Sato Bearings", "3", "$12,150", "Oct 08"], tag: ["Price variance", "yellow"] },
        { cells: ["PO-8812", "Northgate Fasteners", "9", "$4,320", "Oct 05"], tag: ["Matched", "green"] },
        { cells: ["PO-8809", "Alder Packaging", "2", "$6,780", "Oct 03"], tag: ["Short shipped", "red"] },
      ],
    },
  },
  {
    key: "quality",
    label: "Quality",
    sub: "Full genealogy from lot to customer",
    nav: "Quality",
    title: "Lot genealogy · LOT 24-118",
    subtitle: "Traced in 0.4s · 3 sites · 2 customers",
    action: "Start recall drill",
    kpis: [
      { label: "First-pass yield", value: "98.6%", delta: "1.2 pts", up: true, spark: [6, 6, 7, 7, 8, 8, 9] },
      { label: "Open NCRs", value: "4", delta: "6", up: false, spark: [9, 8, 7, 6, 5, 5, 4] },
      { label: "Trace time", value: "0.4s", delta: "2 days", up: false, spark: [9, 7, 5, 4, 3, 2, 1] },
      { label: "Inspections today", value: "61", delta: "9", up: true, spark: [4, 5, 6, 5, 7, 8, 8] },
    ],
    panel: { kind: "tree" },
  },
  {
    key: "margin",
    label: "Contribution margin",
    sub: "True cost by part, channel and customer",
    nav: "Finance",
    title: "Contribution margin by channel",
    subtitle: "Quarter to date · landed cost included",
    action: "Export",
    kpis: [
      { label: "Revenue", value: "$9.4M", delta: "14%", up: true, spark: [4, 5, 6, 6, 7, 8, 9] },
      { label: "Contribution margin", value: "38.2%", delta: "3.4 pts", up: true, spark: [5, 5, 6, 6, 7, 7, 8] },
      { label: "Landed cost / unit", value: "$212", delta: "$18", up: false, spark: [8, 8, 7, 6, 6, 5, 5] },
      { label: "Unprofitable SKUs", value: "7", delta: "11", up: false, spark: [9, 8, 7, 5, 4, 3, 3] },
    ],
    panel: {
      kind: "chart",
      bars: [
        { label: "Direct", revenue: 92, margin: 54 },
        { label: "Dealers", revenue: 70, margin: 31 },
        { label: "Wholesale", revenue: 58, margin: 22 },
        { label: "Marketplace", revenue: 40, margin: 12 },
        { label: "Fleet", revenue: 30, margin: 17 },
      ],
    },
  },
  {
    key: "ledger",
    label: "Ledger sync",
    sub: "Clean journal entries into your GL",
    nav: "Finance",
    title: "General ledger sync",
    subtitle: "Connected to NetSuite · last sync 38s ago",
    action: "Sync now",
    kpis: [
      { label: "Entries this month", value: "18,402", delta: "6%", up: true, spark: [4, 5, 5, 6, 7, 7, 8] },
      { label: "Auto-reconciled", value: "99.7%", delta: "0.4 pts", up: true, spark: [7, 7, 8, 8, 8, 9, 9] },
      { label: "Month-end close", value: "3 days", delta: "9 days", up: false, spark: [9, 8, 6, 5, 4, 3, 3] },
      { label: "Exceptions", value: "2", delta: "14", up: false, spark: [9, 7, 6, 4, 3, 2, 2] },
    ],
    panel: {
      kind: "table",
      columns: ["Entry", "Account", "Source", "Debit", "Credit"],
      rows: [
        { cells: ["JE-30418", "1310 Raw materials", "PO-8817", "$71,400", "—"], tag: ["Synced", "green"] },
        { cells: ["JE-30417", "2010 Accounts payable", "PO-8817", "—", "$71,400"], tag: ["Synced", "green"] },
        { cells: ["JE-30416", "1320 Work in progress", "WO-2291", "$22,860", "—"], tag: ["Synced", "green"] },
        { cells: ["JE-30415", "5010 COGS · Direct", "SO-41207", "$14,212", "—"], tag: ["Synced", "green"] },
        { cells: ["JE-30414", "5030 Freight in", "PO-8815", "$1,180", "—"], tag: ["Review", "yellow"] },
        { cells: ["JE-30413", "1330 Finished goods", "WO-2287", "$31,500", "—"], tag: ["Queued", "gray"] },
      ],
    },
  },
];

export const SIDEBAR = ["Home", "Production", "Inventory", "Purchasing", "Quality", "Orders", "Finance"];
