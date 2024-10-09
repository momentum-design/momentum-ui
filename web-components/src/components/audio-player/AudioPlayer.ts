/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE src in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/tooltip/Tooltip";
import { Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export type AudioEvent = {
  name: string;
  onEvent: EventListener;
};

export const playbackSpeeds = [
  {
    value: 0.25,
    label: "0.25"
  },
  {
    value: 0.5,
    label: "0.50"
  },
  {
    value: 0.75,
    label: "0.75"
  },
  {
    value: 1,
    label: "Normal"
  },
  {
    value: 1.25,
    label: "1.25"
  },
  {
    value: 1.5,
    label: "1.50"
  },
  {
    value: 1.75,
    label: "1.75"
  },
  {
    value: 2.0,
    label: "2"
  }
];

export type Label = {
  ariaLabel: string;
  tooltipText: string;
};

export type LabelMap = {
  playBtn: Label;
  pauseBtn: Label;
  duration: Label;
  timeline: Label;
  volumeBtn: Label;
  volumeSlider: Label;
  playbackSpeedBtn: Label;
};

export const defaultLabelMap = {
  playBtn: {
    ariaLabel: "Play",
    tooltipText: "Play"
  },
  pauseBtn: {
    ariaLabel: "Pause",
    tooltipText: "Pause"
  },
  duration: {
    ariaLabel: "Duration:",
    tooltipText: "Duration"
  },
  timeline: {
    ariaLabel: "Audio Seekbar",
    tooltipText: "Audio Seekbar"
  },
  volumeBtn: {
    ariaLabel: "Mute / Unmute Audio",
    tooltipText: "Mute / Unmute"
  },
  volumeSlider: {
    ariaLabel: "Volume level",
    tooltipText: "Volume level"
  },
  playbackSpeedBtn: {
    ariaLabel: "Playback speed",
    tooltipText: "Playback speed"
  }
};

export namespace AudioPlayer {
  @customElementWithCheck("md-audio-player")
  export class ELEMENT extends LitElement {
    @property({ type: String }) src = "";
    @property({ type: Object }) labelMap: LabelMap;
    @internalProperty() events: AudioEvent[] = [];
    @internalProperty() audio: HTMLAudioElement;
    @internalProperty() volumeElement!: HTMLElement;
    @internalProperty() isPlaying = false;
    @internalProperty() isMuted = false;
    @internalProperty() duration = 0;
    @internalProperty() volume = 100;
    @internalProperty() currentTime = 0;
    @internalProperty() showSpeedPopup = false;
    @internalProperty() playbackSpeed = 1;
    @internalProperty() volumeExpanded = false;
    @internalProperty() bufferedRange = 0;
    @internalProperty() selectedPlaybackSpeed = this.playbackSpeed;
    @internalProperty() currentlySelectingPlaybackSpeed = false;
    constructor() {
      super();
      this.audio = new Audio();
      this.setAudioEventListeners();
      this.labelMap = defaultLabelMap;
    }

    firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      if (changedProperties.has("src")) {
        this.audio.src = this.src;
      }
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("src")) {
        this.audio.src = this.src;
      }
    }

    connectedCallback() {
      super.connectedCallback();
      this.requestUpdate("src");
      document.addEventListener("click", this.onOutsideClick);
      document.addEventListener("keydown", this.handleKeyDown);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("click", this.onOutsideClick);
      document.removeEventListener("keydown", this.handleKeyDown);
      this.audio.pause();
      this.isPlaying = false;
    }

    setAudioEventListeners() {
      this.audio.onloadeddata = () => {
        this.duration = this.audio.duration;
        this.audio.volume = 0.75;
      };

      this.audio.onerror = () => {
        if (this.audio.src) {
          this.dispatchEvent(
            new CustomEvent("playback-error", {
              composed: true,
              bubbles: true
            })
          );
        }
      };

      this.audio.onended = () => {
        this.audio.currentTime = 0;
        this.isPlaying = false;
      };

      this.audio.ontimeupdate = () => {
        this.currentTime = this.audio.currentTime;
      };

      this.audio.onvolumechange = () => {
        this.volume = this.audio.volume;
      };

      // Listen for progress in loading the resource, buffer state will be available only when this occurs
      this.audio.onprogress = () => {
        if (this.audio.buffered.length > 0) {
          this.bufferedRange = this.audio.buffered.end(this.audio.buffered.length - 1);
        }
      };
    }

    togglePlay() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.audio.play();
        this.dispatchEvent(
          new CustomEvent("play-clicked", {
            composed: true,
            bubbles: true
          })
        );
      } else {
        this.audio.pause();
      }
    }

    toTimecode(time: number) {
      const num = Math.floor(time);
      return `${Math.floor(num / 60)}:${String(num % 60).padStart(2, "0")}`;
    }

    setTime(e: MouseEvent) {
      const percentage = this.getBarPercentage(e, "timeline");
      const seconds = Math.floor(percentage * this.duration);

      this.audio.currentTime = seconds;
    }

    setVolumeElement(e: MouseEvent) {
      const className = "volume";
      this.volumeElement =
        (e.target as HTMLElement).className === className
          ? (e.target as HTMLElement)
          : ((e.target as HTMLElement).parentElement as HTMLElement);
    }

    handleVolumeChange(e: MouseEvent) {
      let isDragging = false;
      this.setVolumeElement(e);
      this.setVolume(e);

      const onMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging) {
          isDragging = true;
        }
        if (this.volumeExpanded) {
          this.setVolume(moveEvent);
        } else {
          cleanupEventListeners();
        }
      };

      const onMouseUp = () => {
        cleanupEventListeners();
      };

      const cleanupEventListeners = () => {
        isDragging = false;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);

      // Prevent text selection during drag
      e.preventDefault();
    }

    getVolumeFromSlider(e: MouseEvent): number {
      if (this.volumeElement === null) {
        return 0;
      }
      const rect = this.volumeElement.getBoundingClientRect();
      const clientPos = e.clientX - rect.x;
      return Math.max(0, Math.min(1, clientPos / rect.width));
    }

    setVolume(e: MouseEvent) {
      const percentage = this.getVolumeFromSlider(e);
      this.audio.volume = percentage;
    }

    getBarPercentage(e: MouseEvent, className: string) {
      // gets the percentage of a bar (or box) clicked on the X plane
      const bar =
        (e.target as HTMLElement).className === className ? e.target : (e.target as HTMLElement).parentElement;
      const rect = (bar as HTMLElement).getBoundingClientRect();
      const clientPos = e.clientX - rect.x;
      return clientPos / rect.width;
    }

    toggleSoundMute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
    }

    toggleSpeedPopup() {
      this.showSpeedPopup = !this.showSpeedPopup;
    }

    onOutsideClick = (e: MouseEvent) => {
      let insideSelfClick = false;
      const path = e.composedPath();
      if (path.length) {
        insideSelfClick = !!path.find((element) => (element as HTMLElement).id === "speed-btn");
        if (!insideSelfClick) {
          this.showSpeedPopup = false;
        }
      }
    };

    setTimeKeydown(value: number) {
      if (value > this.duration) {
        this.currentTime = this.duration;
        this.audio.currentTime = this.duration;
      } else if (value < 0) {
        this.currentTime = 0;
        this.audio.currentTime = 0;
      } else {
        this.currentTime = value;
        this.audio.currentTime = value;
      }
    }

    setVolumeKeydown(value: number) {
      if (value > 1) {
        this.volume = 1;
        this.audio.volume = 1;
      } else if (value < 0) {
        if (!this.isMuted) {
          this.toggleSoundMute();
        }
        this.volume = 0;
        this.audio.volume = 0;
      } else {
        if (this.isMuted) {
          this.toggleSoundMute();
        }
        this.volume = value;
        this.audio.volume = value;
      }
    }

    handleKeyDown = (event: KeyboardEvent) => {
      const { code } = event;

      switch (code) {
        case Key.ArrowLeft:
          {
            if (this.volumeExpanded) {
              this.setVolumeKeydown(this.volume - 0.01);
            } else {
              this.setTimeKeydown(this.currentTime - 1);
            }
          }
          break;
        case Key.ArrowRight:
          {
            if (this.volumeExpanded) {
              this.setVolumeKeydown(this.volume + 0.01);
            } else {
              this.setTimeKeydown(this.currentTime + 1);
            }
          }
          break;
        case Key.ArrowUp: {
          if (this.showSpeedPopup) {
            this.currentlySelectingPlaybackSpeed = true;
            const currentIndex = playbackSpeeds.findIndex((speed) => speed.value === this.selectedPlaybackSpeed);
            const newIndex = Math.max(0, currentIndex - 1);
            this.selectedPlaybackSpeed = playbackSpeeds[newIndex].value;
            event.preventDefault();
            this.currentlySelectingPlaybackSpeed = false;
          }
          break;
        }
        case Key.ArrowDown: {
          if (this.showSpeedPopup) {
            this.currentlySelectingPlaybackSpeed = true;
            const currentIndex = playbackSpeeds.findIndex((speed) => speed.value === this.selectedPlaybackSpeed);
            const newIndex = Math.min(playbackSpeeds.length - 1, currentIndex + 1);
            this.selectedPlaybackSpeed = playbackSpeeds[newIndex].value;
            event.preventDefault();
            this.currentlySelectingPlaybackSpeed = false;
          }
          break;
        }
        case Key.Enter:
          {
            if (this.showSpeedPopup) {
              this.setPlaybackSpeed(this.selectedPlaybackSpeed);
              event.preventDefault();
            }
          }
          break;
        default:
          break;
      }
    };

    private get popupClassMap() {
      return {
        "popup-open": this.showSpeedPopup
      };
    }

    setPlaybackSpeed(speed: number) {
      this.playbackSpeed = speed;
      this.selectedPlaybackSpeed = speed;
      this.audio.playbackRate = this.playbackSpeed;
      this.showSpeedPopup = false;
    }

    toggleVolumeExpand(show: boolean) {
      this.volumeExpanded = show;
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="md-audio-player">
          <div class="inner-container">
            <div class="play-container">
              <md-tooltip
                placement="top"
                message="${this.isPlaying ? this.labelMap.pauseBtn.tooltipText : this.labelMap.playBtn.tooltipText}"
              >
                <md-button
                  hasRemoveStyle
                  class="play-btn"
                  @click="${this.togglePlay}"
                  aria-label="${this.isPlaying ? this.labelMap.pauseBtn.ariaLabel : this.labelMap.playBtn.ariaLabel}"
                >
                  ${this.isPlaying
                    ? html` <md-icon slot="icon" name="pause-bold" size="16" iconSet="momentumDesign"></md-icon> `
                    : html` <md-icon slot="icon" name="play-bold" size="16" iconSet="momentumDesign"></md-icon> `}
                </md-button>
              </md-tooltip>
            </div>
            <div class="text-container">
              <md-tooltip placement="top" message="${this.labelMap.duration.tooltipText}">
                <span
                  class="duration"
                  aria-label="${this.labelMap.duration.ariaLabel} ${this.toTimecode(
                    this.currentTime
                  )}/${this.toTimecode(this.duration)}"
                >
                  ${this.toTimecode(this.currentTime)} / ${this.toTimecode(this.duration)}
                </span>
              </md-tooltip>
            </div>
            <div class="timeline-container">
              <md-tooltip placement="top" message="${this.labelMap.timeline.tooltipText}">
                <div class="timeline" @click="${this.setTime}" aria-label="${this.labelMap.timeline.ariaLabel}">
                  <div class="progress-bar" style="width: ${(this.currentTime / this.duration) * 100}%"></div>
                  <div class="buffer-bar" style="width: ${(this.bufferedRange / this.duration) * 100}%"></div>
                </div>
              </md-tooltip>
            </div>
            <div
              class="volume-container"
              @mouseleave="${() => this.toggleVolumeExpand(false)}"
              @mouseenter="${() => this.toggleVolumeExpand(true)}"
              aria-label="${this.labelMap.volumeSlider.ariaLabel}"
            >
              <md-tooltip
                placement="top"
                message="${this.labelMap.volumeSlider.tooltipText} ${Math.trunc(this.volume * 100)}%"
              >
                <div
                  class="volume"
                  @mousedown="${this.handleVolumeChange}"
                  aria-label="${this.labelMap.volumeSlider.ariaLabel} ${Math.trunc(this.volume * 100)}%"
                >
                  <div class="volume-slider" style="width: ${this.isMuted ? 0 : this.volume * 100}%"></div>
                </div>
              </md-tooltip>
              <md-tooltip placement="top" message="${this.labelMap.volumeBtn.tooltipText}">
                <md-button
                  hasRemoveStyle
                  class="volume-btn"
                  aria-label="${this.labelMap.volumeBtn.ariaLabel}"
                  @click="${this.toggleSoundMute}"
                >
                  ${this.isMuted
                    ? html`
                        <md-icon slot="icon" name="speaker-muted-bold" size="16" iconSet="momentumDesign"></md-icon>
                      `
                    : html` <md-icon slot="icon" name="speaker-bold" size="16" iconSet="momentumDesign"></md-icon> `}
                </md-button>
              </md-tooltip>
            </div>
            <div class="speed-icon-container" aria-label="${this.labelMap.playbackSpeedBtn.ariaLabel}">
              <md-tooltip placement="top" message="${this.labelMap.playbackSpeedBtn.tooltipText}">
                <md-button hasRemoveStyle id="speed-btn" @click="${this.toggleSpeedPopup}">
                  <md-icon slot="icon" name="too-fast-bold" size="16" iconSet="momentumDesign"></md-icon>
                </md-button>
              </md-tooltip>
              <div class="speed-popup ${classMap(this.popupClassMap)}">
                <ul id="speed-popup-menu">
                  ${playbackSpeeds.map((speed) => {
                    const isCurrentlySelected =
                      this.selectedPlaybackSpeed == speed.value && !this.currentlySelectingPlaybackSpeed;
                    return html`
                      <li
                        class=${isCurrentlySelected ? "speed-popup-selected-speed" : ""}
                        @click="${() => this.setPlaybackSpeed(speed.value)}"
                      >
                        <span>${speed.label}</span>
                        ${this.playbackSpeed == speed.value
                          ? html`
                              <md-icon
                                slot="icon"
                                color="md-blue-60"
                                name="check-bold"
                                size="16"
                                iconSet="momentumDesign"
                              ></md-icon>
                            `
                          : nothing}
                      </li>
                    `;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-audio-player": AudioPlayer.ELEMENT;
  }
}
