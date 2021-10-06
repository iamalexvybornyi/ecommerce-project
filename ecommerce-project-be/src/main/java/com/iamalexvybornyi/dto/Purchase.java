package com.iamalexvybornyi.dto;

import com.iamalexvybornyi.entity.Address;
import com.iamalexvybornyi.entity.Customer;
import com.iamalexvybornyi.entity.Order;
import com.iamalexvybornyi.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
