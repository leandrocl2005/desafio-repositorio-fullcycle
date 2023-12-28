import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-change-address.event";

export default class ConsoleLogWhenCustomerChangeAddressHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
    handle(event: CustomerCreatedEvent): void {
        const { id, name, address } = event.eventData;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`); 
    }
}