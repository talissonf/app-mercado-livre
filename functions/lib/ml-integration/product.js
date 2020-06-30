class MLProduct {
  constructor(ecomProduct) {
    this.ecomProduct = ecomProduct
  }

  get title() {
    return this.ecomProduct.name
  }

  get price() {
    return this.ecomProduct.price
  }

  get category_id() {
    // Todo: check how to parser
    return ''
  }

  get available_quantity() {
    return this.ecomProduct.quantity
  }

  get buying_mode() {
    // Todo: check how to work
    return 'buy_it_now'
  }

  get condition() {
    return this.ecomProduct.condition
  }

  get listing_type_id() {
    // Todo: checko how to work
    return 'gold_special'
  }

  get description() {
    return { plain_text: this.ecomProduct.body_html }
  }

  get video() {
    // Todo: check if exists video in ecom product
    return ''
  }

  get sale_terms() {
    // Todo: check how to work
    return []
  }

  get picutres() {
    return this.ecomProduct.picutres
  }

  get atrributes() {
    // Todo: check what prodcts have
    return [
      {
        id: 'BRAND',
        value_name: "Product Brand"
      },
      {
        id: 'EAN',
        value: '7898095297749'
      }
    ]
  }

  save() {
    console.log('[ML-INTEGRATION:SALVE PRODUCT]', this)
  }

}

module.exports = MLProduct
