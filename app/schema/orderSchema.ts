import mongoose from 'mongoose'
import { Order } from '../src/order'

const { Schema } = mongoose

enum PaymentMethod {
  VISA = 'visa',
  VENMO = 'venmo',
  PAYPAL = 'paypal',
  CREDIT = 'credit'
}

enum Status {
  INCOMPLETE = 'incomplete',
  INPROGRESS = 'inprogress',
  INDELIVERY = 'indelivery',
  DELIVERED = 'delivered'
}

const orderSchema = new Schema<Order>({
  customerID:
        { type: Schema.Types.ObjectId, ref: 'Customer' }, // Foreign key to object
  droneID:
        { type: Schema.Types.ObjectId, ref: 'Drone' }, // Foreign key to object
  address: String,
  paymentMethod: {
    type: String,
    default: PaymentMethod.VISA,
    enum: Object.values(PaymentMethod),
    required: [true, 'Payment Method required']
  },
  status: {
    type: String,
    default: Status.INCOMPLETE,
    enum: Object.values(Status),
    required: [true, 'Status required']
  },
  orderItems: [
    { type: Schema.Types.ObjectId, ref: 'OrderItems' }
  ],
  timeOfPurchase: Date,
  timeOfDeparture: Date,
  timeOfArrival: Date,
  estimatedTime: Date,
  grandTotal: Number
})

const OrderModel = mongoose.model<Order>('Order', orderSchema)
export { OrderModel, PaymentMethod, Status }
