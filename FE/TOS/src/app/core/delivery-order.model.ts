export interface DeliveryOrder {
    delivery_order_id: string,
    created_at: string,
    status: string,
    owner: string,
    delivery_address: string,
    delivery_address_latitude: string,
    delivery_address_longitude: string,
    delivery_man: string,
    planned_delivery_date: string,
    reel_delivery_date: string,
    planned_delivery_time: string,
    reel_delivery_time: string
}