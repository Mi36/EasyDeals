import * as moment from 'moment';

class Order {
  constructor(id, item, totalAmount, date) {
    (this.id = id),
      (this.item = item),
      (this.totalAmount = totalAmount),
      (this.date = date);
    //this.date=moment(date).format('MMMM,Do,YYYY , hh:mm')
    // this is a date javascript object, we cant output this as text when pass to another conponent so we
    // create another function.
  }
  //getter
  get readableDate() {
    // return
    //     this.date.toLocaleDateString(
    //     'en-EN',{
    //     year:'numeric',
    //     month:'long',
    //     day:'numeric',
    //     hour:'2-digit',
    //     minute:'2-digit'
    // })
    // this only work on ios, So we use moment
    return moment(this.date).format('MMMM,Do,YYYY , hh:mm');
  }
}

export default Order;
