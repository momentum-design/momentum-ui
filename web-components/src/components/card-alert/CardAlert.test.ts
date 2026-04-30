import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./CardAlert";
import { CardAlertSeverity, type CardAlert } from "./CardAlert";

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('<svg><circle cx="50" cy="50" r="40" /></svg>')
  })
) as jest.Mock;

const defaultDetails: CardAlert.DetailRow[] = [
  { label: "Agent", value: "Bob Flynn" },
  { label: "Scheduled start", value: "9:00 AM" },
  { label: "Current delay", value: "18 mins", highlighted: true }
];

const fixtureFactory = async (
  overrides: Partial<{
    severity: CardAlertSeverity | "";
    category: string;
    timestamp: string;
    title: string;
    queueName: string;
    details: CardAlert.DetailRow[];
    insight: string;
    primaryActionLabel: string;
    primaryActionDropdown: boolean;
    expanded: boolean;
    detailsHeading: string;
    showDismiss: boolean;
  }> = {}
): Promise<CardAlert.ELEMENT> => {
  const props = {
    severity: CardAlertSeverity.CRITICAL,
    category: "Adherence",
    timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
    title: "Bob has not signed in for his scheduled shift",
    queueName: "Customer Support · 9:00–17:00",
    details: defaultDetails,
    insight: "Repeated late sign-ins over the past 2 weeks (4 occurrences)",
    primaryActionLabel: "Take action",
    primaryActionDropdown: false,
    expanded: false,
    detailsHeading: "Shift details",
    showDismiss: true,
    ...overrides
  };

  const el = await fixture<CardAlert.ELEMENT>(html`
    <md-card-alert
      severity=${props.severity}
      category=${props.category}
      timestamp=${props.timestamp}
      title=${props.title}
      queueName=${props.queueName}
      .details=${props.details}
      insight=${props.insight}
      primaryActionLabel=${props.primaryActionLabel}
      ?primaryActionDropdown=${props.primaryActionDropdown}
      ?expanded=${props.expanded}
      detailsHeading=${props.detailsHeading}
      .showDismiss=${props.showDismiss}
    >
    </md-card-alert>
  `);
  await elementUpdated(el);
  return el;
};

describe("CardAlert component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render the card", async () => {
    const element = await fixtureFactory();
    const card = element.shadowRoot?.querySelector(".md-card-alert");
    expect(card).not.toBeNull();
  });

  // ─── Header ────────────────────────────────────────────────────────

  test("should render severity chip with correct color", async () => {
    const element = await fixtureFactory({ severity: CardAlertSeverity.CRITICAL });
    const chips = element.shadowRoot!.querySelectorAll("md-chip") as NodeListOf<any>;
    const severityChip = chips[0];
    expect(severityChip).toBeDefined();
    expect(severityChip.color).toBe("negative");
  });

  test("should render medium severity chip", async () => {
    const element = await fixtureFactory({ severity: CardAlertSeverity.MEDIUM });
    const chip = element.shadowRoot!.querySelector("md-chip") as any;
    expect(chip!.color).toBe("warning");
  });

  test("should render fallback severity styles for unsupported severity", async () => {
    const element = await fixtureFactory({ severity: "unsupported" as CardAlertSeverity });
    const chip = element.shadowRoot!.querySelector("md-chip") as any;
    const icon = chip!.querySelector("md-icon") as any;
    expect(chip!.color).toBe("neutral");
    expect(icon.name).toBe("info-circle-filled");
  });

  test("should render category chip", async () => {
    const element = await fixtureFactory({ category: "Adherence" });
    const chips = element.shadowRoot!.querySelectorAll("md-chip") as NodeListOf<any>;
    const categoryChip = chips[1];
    expect(categoryChip).toBeDefined();
    expect(categoryChip.value).toBe("Adherence");
    expect(categoryChip.color).toBe("neutral");
  });

  test("should render header with category only", async () => {
    const element = await fixtureFactory({ severity: "", category: "Surplus", timestamp: "" });
    const chips = element.shadowRoot!.querySelectorAll("md-chip") as NodeListOf<any>;
    const timestamp = element.shadowRoot!.querySelector(".md-card-alert-timestamp");
    expect(chips.length).toBe(1);
    expect(chips[0].value).toBe("Surplus");
    expect(timestamp).toBeNull();
  });

  test("should render header with severity only", async () => {
    const element = await fixtureFactory({ category: "", timestamp: "" });
    const chips = element.shadowRoot!.querySelectorAll("md-chip") as NodeListOf<any>;
    expect(chips.length).toBe(1);
    expect(chips[0].color).toBe("negative");
  });

  test("should not render header when severity, category, and timestamp are all empty", async () => {
    const element = await fixtureFactory({ severity: "", category: "", timestamp: "" });
    await elementUpdated(element);
    const header = element.shadowRoot!.querySelector(".md-card-alert-header");
    expect(header).toBeNull();
  });

  // ─── Timestamp ────────────────────────────────────────────────────

  test("should render relative timestamp", async () => {
    const element = await fixtureFactory({ timestamp: new Date(Date.now() - 5 * 60000).toISOString() });
    const ts = element.shadowRoot!.querySelector(".md-card-alert-timestamp");
    expect(ts).not.toBeNull();
    expect(ts!.textContent!.trim()).toBe("5 mins ago");
  });

  test("should render 'Just now' for very recent timestamp", async () => {
    const element = await fixtureFactory({ timestamp: new Date().toISOString() });
    const ts = element.shadowRoot!.querySelector(".md-card-alert-timestamp");
    expect(ts!.textContent!.trim()).toBe("Just now");
  });

  test("should not render timestamp for invalid timestamp", async () => {
    const element = await fixtureFactory({ timestamp: "not-a-date" });
    const ts = element.shadowRoot!.querySelector(".md-card-alert-timestamp");
    expect(ts).toBeNull();
  });

  test("should format singular, future, hour, day, invalid, and numeric timestamps", async () => {
    const element = await fixtureFactory();
    const now = new Date("2026-01-01T12:00:00.000Z").getTime();
    const nowSpy = jest.spyOn(Date, "now").mockReturnValue(now);

    expect((element as any).formatRelativeTime(now - 60000)).toBe("1 min ago");
    expect((element as any).formatRelativeTime(new Date(now + 60000).toISOString())).toBe("Just now");
    expect((element as any).formatRelativeTime(new Date(now - 60 * 60000).toISOString())).toBe("1 hour ago");
    expect((element as any).formatRelativeTime(new Date(now - 24 * 60 * 60000).toISOString())).toBe("1 day ago");
    expect((element as any).formatRelativeTime("not-a-date")).toBe("");

    nowSpy.mockRestore();
  });

  // ─── Title section ─────────────────────────────────────────────────

  test("should render title", async () => {
    const element = await fixtureFactory({ title: "Test Title" });
    const title = element.shadowRoot!.querySelector(".md-card-alert-title");
    expect(title!.textContent!.trim()).toBe("Test Title");
  });

  test("should render title without queueName", async () => {
    const element = await fixtureFactory({ title: "Title only", queueName: "" });
    const title = element.shadowRoot!.querySelector(".md-card-alert-title");
    const subtitle = element.shadowRoot!.querySelector(".md-card-alert-subtitle");
    expect(title!.textContent!.trim()).toBe("Title only");
    expect(subtitle).toBeNull();
  });

  test("should render queueName without title", async () => {
    const element = await fixtureFactory({ title: "", queueName: "Sales (Calls)" });
    const title = element.shadowRoot!.querySelector(".md-card-alert-title");
    const subtitle = element.shadowRoot!.querySelector(".md-card-alert-subtitle");
    expect(title).toBeNull();
    expect(subtitle!.textContent!.trim()).toBe("Sales (Calls)");
  });

  test("should not render title section when title and queueName are empty", async () => {
    const element = await fixtureFactory({ title: "", queueName: "" });
    const titleSection = element.shadowRoot!.querySelector(".md-card-alert-title-section");
    expect(titleSection).toBeNull();
  });

  test("should render queueName with icon", async () => {
    const element = await fixtureFactory({ queueName: "Sales (Calls)" });
    const subtitle = element.shadowRoot!.querySelector(".md-card-alert-subtitle");
    expect(subtitle).not.toBeNull();
    expect(subtitle!.textContent!.trim()).toBe("Sales (Calls)");
    const icon = subtitle!.querySelector("md-icon");
    expect(icon).not.toBeNull();
  });

  // ─── Details ───────────────────────────────────────────────────────

  test("should render detail rows", async () => {
    const element = await fixtureFactory({ details: defaultDetails });
    const rows = element.shadowRoot!.querySelectorAll(".md-card-alert-detail-row");
    expect(rows.length).toBe(3);
  });

  test("should render details heading", async () => {
    const element = await fixtureFactory({ detailsHeading: "Shift details" });
    const heading = element.shadowRoot!.querySelector(".md-card-alert-details-heading");
    expect(heading!.textContent!.trim()).toBe("Shift details");
  });

  test("should apply highlighted class to highlighted detail value", async () => {
    const element = await fixtureFactory({ details: defaultDetails });
    const highlighted = element.shadowRoot!.querySelector(".md-card-alert-detail-value--highlighted");
    expect(highlighted).not.toBeNull();
    expect(highlighted!.textContent!.trim()).toBe("18 mins");
  });

  test("should not render details when details array is empty", async () => {
    const element = await fixtureFactory({ details: [] });
    const details = element.shadowRoot!.querySelector(".md-card-alert-details");
    expect(details).toBeNull();
  });

  test("should not render details when details is undefined", async () => {
    const element = await fixtureFactory({ details: undefined as any });
    const details = element.shadowRoot!.querySelector(".md-card-alert-details");
    expect(details).toBeNull();
  });

  // ─── Insight ───────────────────────────────────────────────────────

  test("should render insight text", async () => {
    const element = await fixtureFactory({ insight: "Insight text here" });
    const insight = element.shadowRoot!.querySelector(".md-card-alert-insight-text");
    expect(insight!.textContent!.trim()).toBe("Insight text here");
  });

  test("should not render insight when insight is empty", async () => {
    const element = await fixtureFactory({ insight: "" });
    const insight = element.shadowRoot!.querySelector(".md-card-alert-insight");
    expect(insight).toBeNull();
  });

  test("should not render insight when insight is null", async () => {
    const element = await fixtureFactory();
    (element as any).insight = null;
    await elementUpdated(element);
    const insight = element.shadowRoot!.querySelector(".md-card-alert-insight");
    expect(insight).toBeNull();
  });

  test("should apply no-insight class when insight is empty", async () => {
    const element = await fixtureFactory({ insight: "" });
    const card = element.shadowRoot!.querySelector(".md-card-alert");
    expect(card!.classList.contains("md-card-alert--no-insight")).toBe(true);
  });

  // ─── Actions ───────────────────────────────────────────────────────

  test("should render primary action button with label", async () => {
    const element = await fixtureFactory({ primaryActionLabel: "Do something" });
    const btn = element.shadowRoot!.querySelector(".md-card-alert-primary-action");
    expect(btn).not.toBeNull();
  });

  test("should render dropdown arrow when primaryActionDropdown is true", async () => {
    const element = await fixtureFactory({ primaryActionDropdown: true });
    const btn = element.shadowRoot!.querySelector(".md-card-alert-primary-action");
    const icon = btn!.querySelector("md-icon[name='arrow-down-bold']");
    expect(icon).not.toBeNull();
  });

  test("should render arrow-up when expanded and primaryActionDropdown", async () => {
    const element = await fixtureFactory({ primaryActionDropdown: true, expanded: true });
    const btn = element.shadowRoot!.querySelector(".md-card-alert-primary-action");
    const icon = btn!.querySelector("md-icon[name='arrow-up-bold']");
    expect(icon).not.toBeNull();
  });

  test("should not render dropdown arrow when primaryActionDropdown is false", async () => {
    const element = await fixtureFactory({ primaryActionDropdown: false });
    const btn = element.shadowRoot!.querySelector(".md-card-alert-primary-action");
    const arrowDown = btn!.querySelector("md-icon[name='arrow-down-bold']");
    const arrowUp = btn!.querySelector("md-icon[name='arrow-up-bold']");
    expect(arrowDown).toBeNull();
    expect(arrowUp).toBeNull();
  });

  test("should render dismiss button when showDismiss is true", async () => {
    const element = await fixtureFactory({ showDismiss: true });
    const dismiss = element.shadowRoot!.querySelector(".md-card-alert-dismiss");
    expect(dismiss).not.toBeNull();
  });

  test("should not render dismiss button when showDismiss is false", async () => {
    const element = await fixtureFactory({ showDismiss: false });
    await elementUpdated(element);
    const dismiss = element.shadowRoot!.querySelector(".md-card-alert-dismiss");
    expect(dismiss).toBeNull();
  });

  // ─── Events ────────────────────────────────────────────────────────

  test("should dispatch primary-action-clicked event on primary button click", async () => {
    const element = await fixtureFactory();
    const primaryBtn = element.shadowRoot!.querySelector(".md-card-alert-primary-action") as HTMLElement;
    const handler = jest.fn();
    element.addEventListener("primary-action-clicked", handler);
    primaryBtn.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    await elementUpdated(element);
    expect(handler).toHaveBeenCalled();
  });

  test("should dispatch dismiss-clicked event on dismiss button click", async () => {
    const element = await fixtureFactory({ showDismiss: true });
    const dismissBtn = element.shadowRoot!.querySelector(".md-card-alert-dismiss") as HTMLElement;
    const handler = jest.fn();
    element.addEventListener("dismiss-clicked", handler);
    dismissBtn.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    await elementUpdated(element);
    expect(handler).toHaveBeenCalled();
  });

  // ─── Timer ─────────────────────────────────────────────────────────

  test("should clear timer on disconnect", async () => {
    const element = await fixtureFactory({ timestamp: new Date().toISOString() });
    const spy = jest.spyOn(globalThis, "clearInterval");
    element.remove();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
