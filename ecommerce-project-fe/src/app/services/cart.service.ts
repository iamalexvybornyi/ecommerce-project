import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find( tempCartItem => cartItem.id === tempCartItem.id )
    }

    alreadyExistsInCart = (existingCartItem != undefined);

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let cartItem of this.cartItems) {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    // publish the new values to all subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  private logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Cart items:');
    for (let cartItem of this.cartItems) {
      let subTotalPrice: number = cartItem.unitPrice * cartItem.quantity;
      console.log(`name = ${cartItem.name}, quantity = ${cartItem.quantity}, total price = ${subTotalPrice}`);
    }

    console.log(`total price = ${totalPriceValue}, total quantity = ${totalQuantityValue}`);
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem) {
    let itemIndex = this.cartItems.findIndex(tempCartItem => cartItem.id === tempCartItem.id );
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
    this.computeCartTotals();
  }
}
