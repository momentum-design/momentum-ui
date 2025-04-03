import { Key } from "@/constants";
import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./MeetingAlert";
import { type MeetingAlert } from "./MeetingAlert";

describe("MeetingAlert", () => {
  afterEach(fixtureCleanup);

  test("Meeting-Alert component is not null", async () => {
    const ma = await fixture("<md-meeting-alert></md-meeting-alert>");
    expect(ma).not.toBeNull();
  });

  test("should render one MeetingAlert", async () => {
    const el = await fixture(html` <md-meeting-alert title="Test Name"></md-meeting-alert> `);
    expect(el).not.toBeNull();
  });

  test("should handle default className prop", async () => {
    const container = await fixture("<md-meeting-alert></md-meeting-alert>");
    expect(container.className).toEqual("");
  });

  test("should handle role prop", async () => {
    const el: MeetingAlert.ELEMENT = await fixture(html` <md-meeting-alert role="button"></md-meeting-alert> `);
    expect(el.getAttribute("role")).toEqual("button");
  });

  test("should handle default role prop", async () => {
    const el: MeetingAlert.ELEMENT = await fixture("<md-meeting-alert></md-meeting-alert>");
    expect(el.getAttribute("role")).toBeNull();
  });

  test("should handle message prop", async () => {
    const el: MeetingAlert.ELEMENT = await fixture(html`
      <md-meeting-alert message="Test message"></md-meeting-alert>
    `);
    expect(el.getAttribute("message")).toEqual("Test message");
  });

  test("should handle default message prop", async () => {
    const el: MeetingAlert.ELEMENT = await fixture("<md-meeting-alert></md-meeting-alert>");
    expect(el.getAttribute("message")).toBeNull();
  });

  test("should handle status prop", async () => {
    const el: MeetingAlert.ELEMENT = await fixture(html` <md-meeting-alert status="Test status"></md-meeting-alert> `);
    expect(el.getAttribute("status")).toEqual("Test status");
  });

  test("should handle title prop", async () => {
    const el: MeetingAlert.ELEMENT = await fixture(html` <md-meeting-alert title="Test title"></md-meeting-alert> `);
    expect(el.getAttribute("title")).toEqual("Test title");
  });

  test("should dispatch 'snooze' event on _onSnooze call", async () => {
    const el: MeetingAlert.ELEMENT = await fixture("<md-meeting-alert></md-meeting-alert>");
    const snoozeEventSpy = jest.fn();
    el.addEventListener("snooze", snoozeEventSpy);
    const event = new Event("test");
    el._onSnooze(event);
    expect(snoozeEventSpy).toHaveBeenCalled();
    expect(snoozeEventSpy.mock.calls[0][0].detail.srcEvent).toBe(event);
  });

  test("handleKeyDown should call handleClose on Escape key press", async () => {
    const el: MeetingAlert.ELEMENT = await fixture("<md-meeting-alert></md-meeting-alert>");
    const handleCloseSpy = jest.spyOn(el, "handleClose");
    const keyboardEvent = new KeyboardEvent("keydown", { code: "Escape" });
    el.handleKeyDown(keyboardEvent);
    expect(handleCloseSpy).toHaveBeenCalledWith(keyboardEvent);
  });

  test("handleKeyDown should call handleClose when 'close' button is pressed with Enter key", async () => {
    const el: MeetingAlert.ELEMENT = await fixture("<md-meeting-alert></md-meeting-alert>");
    const handleCloseSpy = jest.spyOn(el, "handleClose");
    const button = document.createElement("button");
    button.setAttribute("aria-label", "close");
    const keyboardEvent = new KeyboardEvent("keydown", { code: "Enter" });
    Object.defineProperty(keyboardEvent, "target", { value: button });
    el.handleKeyDown(keyboardEvent);
    expect(handleCloseSpy).toHaveBeenCalledWith(keyboardEvent);
  });

  test("handleKeyDown should call handleClose when 'close' button is pressed with Space key", async () => {
    const el: MeetingAlert.ELEMENT = await fixture("<md-meeting-alert></md-meeting-alert>");
    const handleCloseSpy = jest.spyOn(el, "handleClose");
    const button = document.createElement("button");
    button.setAttribute("aria-label", "close");
    const keyboardEvent = new KeyboardEvent("keydown", { code: "Space" });
    Object.defineProperty(keyboardEvent, "target", { value: button });
    el.handleKeyDown(keyboardEvent);
    expect(handleCloseSpy).toHaveBeenCalledWith(keyboardEvent);
  });

  describe("Should Handle Events", () => {
    afterEach(() => {
      fixtureCleanup();
      jest.restoreAllMocks();
    });

    const mockEvent = jest.fn();
    test("Should trigger a passed Snooze event", async () => {
      const element: MeetingAlert.ELEMENT = await fixture(html`
        <md-meeting-alert show .onSnooze=${mockEvent}> </md-meeting-alert>
      `);
      const spyClick = jest.spyOn(element, "handleSnooze");
      const snoozeElement = await element.shadowRoot!.querySelector("md-button[aria-label='snooze']");
      snoozeElement!.dispatchEvent(new MouseEvent("click"));
      // TODO: Fix KeyDown event tests that fire on md-button elements, and test for expect(spyClick).toHaveBeenCalledTimes(2);
      // snoozeElement?.dispatchEvent(
      //   new KeyboardEvent("keydown", {
      //     code: Key.Enter
      //   })
      // );
      expect(spyClick).toHaveBeenCalledTimes(1);
    });

    describe("Should handle KeyDown events", () => {
      test("Should trigger a passed Keydown event", async () => {
        const element: MeetingAlert.ELEMENT = await fixture(html`
          <md-meeting-alert show .onKeyDown=${mockEvent}> </md-meeting-alert>
        `);
        const spyKeyDown = jest.spyOn(element, "handleKeyDown");
        const meetingAlert = element.shadowRoot!.querySelector("div");
        meetingAlert!.dispatchEvent(
          new KeyboardEvent("keydown", {
            code: Key.Enter
          })
        );
        meetingAlert!.dispatchEvent(
          new KeyboardEvent("keydown", {
            code: Key.Space
          })
        );
        meetingAlert!.dispatchEvent(
          new KeyboardEvent("keydown", {
            code: Key.Escape
          })
        );
        expect(spyKeyDown).toHaveBeenCalledTimes(3);
      });
      test("Should handleClose when escape key is pressed", async () => {
        const element: MeetingAlert.ELEMENT = await fixture(html`
          <md-meeting-alert
            show
            status="Queue_Demo7"
            title="John Doe"
            src="https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
          >
          </md-meeting-alert>
        `);
        const spyKeyDown = jest.spyOn(element, "handleKeyDown");
        const spyClose = jest.spyOn(element, "handleClose");
        const meetingAlert = await element.shadowRoot!.querySelector("div");
        meetingAlert!.dispatchEvent(
          new KeyboardEvent("keydown", {
            code: Key.Escape
          })
        );
        expect(spyKeyDown).toHaveBeenCalledTimes(1);
        expect(spyClose).toHaveBeenCalledTimes(1);
      });
      // TODO: Fix KeyDown event tests that fire on md-button elements
      // test("Should handleClose when close button is activated with keydown", async () => {
      //   const element: MeetingAlert = await fixture(
      //     html`
      //       <md-meeting-alert
      //         show
      //         status="Queue_Demo7"
      //         title="John Doe"
      //         src="https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
      //       >
      //       </md-meeting-alert>
      //     `
      //   );
      //   const spyKeyDown = jest.spyOn(element, "handleKeyDown");
      //   const spyClose = jest.spyOn(element, "handleClose");
      //   const closeButton = await element.shadowRoot!.querySelector("md-button[ariaLabel='close']");
      //   closeButton!.dispatchEvent(
      //     new KeyboardEvent("keydown", {
      //       code: Key.Enter
      //     })
      //   );
      //   closeButton!.dispatchEvent(
      //     new KeyboardEvent("keydown", {
      //       code: Key.Space,
      //     })
      //   );
      //   expect(spyKeyDown).toHaveBeenCalledTimes(2);
      //   expect(spyClose).toHaveBeenCalledTimes(2);
      // });
      test("Should handle custom key event", async () => {
        const el: MeetingAlert.ELEMENT = await fixture(html`
          <md-meeting-alert title="Test title"></md-meeting-alert>
        `);
        expect(el.getAttribute("title")).toEqual("Test title");
      });
    });
  });

  describe("Should render correct Avatar", () => {
    test("Should render a single Avatar", async () => {
      const element: MeetingAlert.ELEMENT = await fixture(html`
        <md-meeting-alert show status="Queue_Demo7" title="Jane Doe"> </md-meeting-alert>
      `);

      expect(element.shadowRoot!.querySelectorAll("md-avatar").length).toBe(1);
    });
    test("Should render a Composite Avatar when 2 or more attendees are provided", async () => {
      const element: MeetingAlert.ELEMENT = await fixture(html`
        <md-meeting-alert
          .attendees=${[
            { title: "J $", src: null, alt: "J $" },
            { title: "Jefe Guadelupe", src: null, alt: "Jefe Guadelupe" }
          ]}
          show
          status="Queue_Demo7"
          title="Jane Doe"
        >
        </md-meeting-alert>
      `);

      expect(element.shadowRoot!.querySelectorAll(".md-composite-avatar").length).toBe(1);
    });
  });
});
