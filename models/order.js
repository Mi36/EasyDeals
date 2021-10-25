import * as moment from 'moment';

class Order {
  constructor(id, item, totalAmount, date) {
    (this.id = id),
      (this.item = item),
      (this.totalAmount = totalAmount),
      (this.date = date);
  }
  //getter application
  get readableDate() {
    return moment(this.date).format('MMMM,Do,YYYY , hh:mm');
  }
}

export default Order;
