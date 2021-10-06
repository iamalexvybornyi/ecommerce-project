package com.iamalexvybornyi.service;

import com.iamalexvybornyi.dto.Purchase;
import com.iamalexvybornyi.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
