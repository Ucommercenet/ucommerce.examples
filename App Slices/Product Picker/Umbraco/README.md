# Product Picker in Umbraco

This example shows an example of a Umbraco custom property using the Ucommerce product picker app slice.

These are the most important files for creating a Custom Property Editor. We have omitted all the Vite and Umbraco specific files.

## Files

* [product-picker.ts](./product-picker.ts)  
  The wrapper for the product picker written for the Lit framework that Umbraco uses for building custom web components for the Umbraco backend.  
  It shows loading the Ucommerce Product Picker App Slice in to the Umbraco backoffice and listening for the emitted `product-selection` event.
* [umbraco-package.json](./umbraco-package.json)  
  The properties needed for the `product-picker.ts` to set up communiccation with Ucomemrce.