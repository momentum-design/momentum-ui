import { html, LitElement, css, property, internalProperty, PropertyValues } from 'lit-element';
import { customElementWithCheck } from '@/mixins/CustomElementCheck';
import './ErrorLoader.scss';
import '@/components/help-text/HelpText';
import '@/components/link/Link';
export namespace MdFetchError {
  @customElementWithCheck('md-fetch-error')
  export class ELEMENT extends LitElement {
    @property({ type: String }) messageType = 'error';
    @property({ type: String }) customStyle = '';
    @property({ type: String }) commonErrorMsg = '';
    @property({ type: String }) commonTryAgain = '';
    @property({ type: String }) trackingId = '';
    @property({ type: String }) trackingIdInputLabel = '';

    @internalProperty() isLoading = false;
    @internalProperty() hasError = false;


    private onRetry(event: Event) {
      this.dispatchEvent(
        new CustomEvent('retry', {
          detail: { message: 'Retrying fetch...' },
          bubbles: true,
          composed: true,
        })
      );
    }

    render() {
      return html`
        <md-help-text
          .messageType="${this.messageType}"
          class="infinite-scroll-error"
          style="${this.style}"
          aria-live="polite"
        >
          <div class="error-block">
            <span>
              <span class="error-span-padding">
                ${this.commonErrorMsg}.
              </span>
              <md-link
                inline
                class="infinite-scroll-retry-link"
                aria-label="${this.commonTryAgain}"
                @click="${this.onRetry}"
                @keydown="${this.onRetry}"
                tag="span"
                data-testid="retry-page"
              >
                ${this.commonTryAgain}
              </md-link>
            </span>
            ${this.trackingId && this.trackingId !== ''
              ? html`<span class="tracking-error-block">
                  ${this.trackingIdInputLabel} ${this.trackingId}
                </span>`
              : null}
          </div>
        </md-help-text>
      `;
    }

    updated(changedProperties: PropertyValues) {
      if (changedProperties.has('hasError') && this.hasError) {
        this.requestUpdate();
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-fetch-error': MdFetchError.ELEMENT;
  }
}
