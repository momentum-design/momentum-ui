import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./AudioPlayer";
import { AudioPlayer } from "./AudioPlayer";
import clearAllMocks = jest.clearAllMocks;

const fixtureFactory = async (): Promise<AudioPlayer.ELEMENT> => {
  return await fixture(html` <md-audio-player src="somesrc"></md-audio-player> `);
};

describe("AudioPlayer", () => {
  beforeEach(() => {
    const mocks = {
      Audio: {
        pause: jest.fn(),
        play: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        duration: 600,
        volume: 75
      }
    };

    global.Audio = jest.fn().mockImplementation(() => ({
      pause: mocks.Audio.pause,
      play: mocks.Audio.play,
      addEventListener: mocks.Audio.addEventListener,
      removeEventListener: mocks.Audio.removeEventListener,
      duration: mocks.Audio.duration,
      volume: mocks.Audio.volume
    }));
  });
  afterEach(() => {
    clearAllMocks();
    fixtureCleanup;
  });

  test("should set source property", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    expect(element.src).toEqual("somesrc");
  });

  test("should render Audio Player Component", async () => {
    const element = await fixture(`<md-audio-player></md-audio-player>`);
    expect(element).not.toBeNull();
  });

  test("should toggle play/pause", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.togglePlay();
    expect(element.isPlaying).toBe(true);

    element.togglePlay();
    expect(element.isPlaying).toBe(false);
  });

  test("should control volume", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.setVolumeElement = jest.fn();
    element.getVolumeFromSlider = jest.fn().mockReturnValue(0.2);

    const mockMouseEvent = new MouseEvent("mousedown");
    element.handleVolumeChange(mockMouseEvent);

    expect(element.audio.volume).toBe(0.2);
  });

  test("should mute when toggleSoundMute is called", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);

    element.toggleSoundMute();
    expect(element.isMuted).toBe(true);
  });

  test("should render the playback speed menu when showSpeedPopup is true", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);

    element.toggleSpeedPopup();
    expect(element.showSpeedPopup).toBe(true);
  });

  test("should set the playback speed when setPlaybackSpeed is called", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);

    element.setPlaybackSpeed(0.25);
    expect(element.playbackSpeed).toBe(0.25);
    expect(element.selectedPlaybackSpeed).toBe(element.playbackSpeed);
  });

  test("should adjust playback speed using up arrow key in combination with enter key", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.toggleSpeedPopup();
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.ArrowUp }));
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.Enter }));
    expect(element.playbackSpeed).toBe(0.75);
  });

  test("should adjust playback speed using down arrow key in combination with enter key", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.toggleSpeedPopup();
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.ArrowDown }));
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.Enter }));
    expect(element.playbackSpeed).toBe(1.25);
  });

  test("should convert audio duration into friendly string", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);

    expect(element.toTimecode(100)).toBe("1:40");
  });

  test("should set the Audios current time", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    jest.spyOn(element, "getBarPercentage").mockReturnValue(2);
    element.duration = 15;
    element.setTime(new MouseEvent("click"));
    expect(element.audio.currentTime).toBe(30);
  });

  test("should set showSpeedPopop to false on an outside click", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    const clickEvent = new MouseEvent("click");
    const mockElement = document.createElement("div");
    mockElement.setAttribute("id", "not-speed-btn");
    jest.spyOn(clickEvent, "composedPath").mockReturnValue([mockElement]);
    element.onOutsideClick(clickEvent);
    expect(element.showSpeedPopup).toBe(false);
  });

  test("should adjust volume when arrow keys are pressed", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.volumeExpanded = true;
    element.volume = 0.5;
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.ArrowLeft }));
    expect(element.volume).toBe(0.49);
  });

  test("should set volume expanded when toggleVolumeExpanded is called", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.volumeExpanded = true;
    element.toggleVolumeExpand(false);
    expect(element.volumeExpanded).toBe(false);
  });

  test("should mute volume at min when arrow keys are pressed", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.volumeExpanded = true;
    element.volume = 0;
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.ArrowLeft }));
    expect(element.isMuted).toBe(true);
  });

  test("should unmute volume when arrow keys are pressed", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.volumeExpanded = true;
    element.isMuted = true;
    element.volume = 0;
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.ArrowRight }));
    expect(element.isMuted).toBe(false);
  });

  test("should not adjust volume out of range max when arrow keys are pressed", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.volumeExpanded = true;
    element.volume = 1;
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.ArrowRight }));
    expect(element.volume).toBe(1);
  });

  test("should adjust time within range when arrow keys are pressed", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.duration = 60;
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.ArrowRight }));
    expect(element.currentTime).toBe(1);
  });

  test("should not adjust time out of min range when arrow keys are pressed", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.duration = 60;
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.ArrowLeft }));
    expect(element.currentTime).toBe(0);
  });

  test("should not adjust time out of max range when arrow keys are pressed", async () => {
    const element: AudioPlayer.ELEMENT = await fixtureFactory();
    await elementUpdated(element);
    element.duration = 60;
    element.currentTime = 60;
    element.handleKeyDown(new KeyboardEvent("keydown", { code: Key.ArrowRight }));
    expect(element.currentTime).toBe(60);
  });
});
