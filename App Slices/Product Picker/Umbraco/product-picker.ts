import {
  LitElement,
  html,
  customElement,
  property,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { type UmbPropertyEditorConfigCollection } from "@umbraco-cms/backoffice/property-editor";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

@customElement("product-picker-property-editor-ui-element")
export default class ProductPickerPropertyEditorUIElement
  extends UmbElementMixin(LitElement)
  implements UmbPropertyEditorUiElement
{
  constructor() {
    super();
  }

  @property({ type: String })
  public value = "";

  #dispatchChangeEvent() {
    this.dispatchEvent(new UmbPropertyValueChangeEvent());
  }

  #onChangedEvent = (e: Event) => {
    this.value = (e.target as HTMLInputElement).value;
    this.#dispatchChangeEvent();
  };

  #productsPickedEvent = (e: CustomEvent) => {
    this.value = e.detail.toString();
    this.#dispatchChangeEvent();
  };

  @state()
  private _baseApiUrl?: string;

  @state()
  private _clientId?: string;

  @state()
  private _clientSecret?: string;

  @state()
  private _cultureCode?: string;


  @property({ attribute: false })
  public set config(config: UmbPropertyEditorConfigCollection) {
    this._baseApiUrl = config.getValueByAlias("baseApiUrl");
    this._clientId = config.getValueByAlias("clientId");
    this._clientSecret = config.getValueByAlias("clientSecret");
    this._cultureCode = config.getValueByAlias("cultureCode");
  }

  render() {
    // @ts-ignore
    import("http://localhost:5024/CustomComponents/widgets/ucommerce-product-picker.js");
    return html`
      <uui-input
          id="products"
          class="element"
          label="text input"
          .value=${this.value || ""}
          @input=${this.#onChangedEvent}
      >
      </uui-input>
      <ucommerce-product-picker
        base-api-url=${this._baseApiUrl}
        client-id=${this._clientId}
        client-secret=${this._clientSecret}
        culture-code=${this._cultureCode}
        @product-selection=${this.#productsPickedEvent}
        id="product-picker"
      ></ucommerce-product-picker>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "product-picker-property-editor-ui-element": ProductPickerPropertyEditorUIElement;
  }
}
