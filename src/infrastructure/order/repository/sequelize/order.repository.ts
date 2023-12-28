import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async find(id: string): Promise<Order> { 
    
    let orderModel: OrderModel;
    let orderItemsEntity: OrderItem[];
    let orderEntity: Order;

    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: ["items"],
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    orderItemsEntity = orderModel.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      );
    });

    orderEntity = new Order(
      orderModel.id, 
      orderModel.customer_id, orderItemsEntity);

    return orderEntity;
  }

  async findAll(): Promise<Order[]> {

    let ordersModel: OrderModel[];
    let ordersEntity: Order[];

    try {
      ordersModel = await OrderModel.findAll({
        include: ["items"],
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    ordersEntity = ordersModel.map(orderModel => {
        const orderItems = orderModel.items.map((item) => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          );
        });
        return new Order(orderModel.id, orderModel.customer_id, orderItems);
      }
    );
    return ordersEntity;
  }

  async update(entity: Order): Promise<void> {

    await OrderItemModel.destroy({
      where: {
        order_id: entity.id,
      }
    });

    entity.items.forEach(async (item) => {

      await OrderItemModel.create(
        {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id,
        }
      );
  
    });


    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(async (item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,          
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

}
