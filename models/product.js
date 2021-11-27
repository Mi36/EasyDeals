//using class to create an object
// this will help to type check
// this is not a must
class Product {
  constructor(id, ownerId, title, description, price, phone, place) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.phone = phone;
    this.place = place;
  }
}
export default Product;
