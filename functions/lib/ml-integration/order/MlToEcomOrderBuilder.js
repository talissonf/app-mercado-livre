const OrderBuilder = require('./OrderBuilder')
const { randomObjectId } = require('@ecomplus/utils')

class MlToEcomOrderBuilder extends OrderBuilder {
  constructor(orderSchema, appSdk, storeId) {
    super(orderSchema)
    this.appSdk = appSdk
    this.storeId = parseInt(storeId, 10)
  }

  buildAmount() {
    this.amount = {
      total: this.orderSchema.total_amount,
      subtotal: this.orderSchema.paid_amount
    }
  }

  getProductId(sku) {
    return new Promise((resolve, reject) => {
      const resource = `/products.json?sku=${sku}`
      console.log('[resource]', resource)
      return this.appSdk.apiRequest(this.storeId, resource)
        .then(res => {
          console.log(res)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }

  buildItems() {
    const items = []
    for (const mlItem of this.orderSchema.order_items) {
      const { quantity, unit_price, item } = mlItem
      const { seller_custom_field } = item
      this.getProductId(seller_custom_field)
        .then(res => console.log(res))
      // items.push({
      //   _id: randomObjectId(),
      //   product_id,
      //   quantity,
      //   price: unit_price
      // })
    }
  }

  create(callback) {
    const resource = '/orders.json'
    this.appSdk
      .getAuth(this.storeId)
      .then(auth => {
        console.log('[AUTH]', auth)
        this.appSdk
          .apiRequest(this.storeId, resource, 'POST', this.getOrder(), auth)
          .then(res => callback(null, res))
          .catch(err => callback(err))
      })
      .catch(err => callback(err))
  }
}

module.exports = MlToEcomOrderBuilder