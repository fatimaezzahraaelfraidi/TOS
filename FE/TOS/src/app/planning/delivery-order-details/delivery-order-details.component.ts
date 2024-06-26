import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeliveryOrder } from '../../core/delivery-order.model';

@Component({
  selector: 'app-delivery-order-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'delivery-order-details.component.html',
  styleUrl: 'delivery-order-details.component.scss'
})
export class DeliveryOrderDetailsComponent {
  @Input()
  delivery_order!: DeliveryOrder;
  @Output() close = new EventEmitter<void>();
  @Output() updateExistingDeliveryOrder = new EventEmitter<DeliveryOrder>();

  updateDeliveryOrder() {
    this.updateExistingDeliveryOrder.emit(this.delivery_order);
    this.close.emit();
  }
}
