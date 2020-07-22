const ProductBuilder = require('./ProductBuilder')

class MlProductBuilder extends ProductBuilder{
  constructor(productSchema) {
    super(productSchema)
  }

  buildTitle() {
    this.product.title = this.productSchema.name
  }

  buildDescription() {
    this.product.description = this.productSchema.body_html.replace(/<[^>]*>?/gm, '');
  }

  buildCondition() {
    this.product.condition = this.productSchema.condition
  }

  buildAvailableQuantity() {
    this.product.available_quantity = this.productSchema.quantity
  }

  buildListingTypes() {
    this.product.listing_type_id = 'gold_special'
  }

  buildCategory() {
    this.product.category_id = 'MLB272126'
  }

  buildCurrency() {
    this.product.currency_id = this.productSchema.currency_id
  }

  buildPrice() {
    this.product.price = this.productSchema.price
  }

  buildPictures() {
    const { pictures } = this.productSchema
    if (pictures && pictures.length > 0) {
      this.product.pictures = pictures.map(({ small }) => ({ source: small.url }))
      this.product.pictures.concat(pictures.map(({ normal }) => ({ source: normal.url })))
      this.product.pictures.concat(pictures.map(({ big }) => ({ source: big.url })))
    }
  }

  buildVariations() {
    this.product.variations = [
      {
        id: 'SELLER_SKU',
        value_name: this.productSchema.sku
      }
    ]
  }

  buildSellerCustomField() {
    this.product.seller_custom_field = this.productSchema.sku
  }

}

module.exports = MlProductBuilder

