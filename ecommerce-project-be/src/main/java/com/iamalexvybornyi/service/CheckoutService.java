package com.iamalexvybornyi.service;

import com.iamalexvybornyi.dto.PaymentInfo;
import com.iamalexvybornyi.dto.Purchase;
import com.iamalexvybornyi.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
