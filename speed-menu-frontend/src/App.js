import React, { Component } from 'react';
import './App.css';
import { DishService } from './service/DishService';
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { DataView } from 'primereact/dataview';

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dishes: [],
      first: 0,
      rows: 3,
      totalRecords: 0,
      activePanel: 'menu',
      orders: []
    };

    this.items = [
      {
        label: 'Menu',
        icon: 'pi pi-book',
        command: () => this.setActivePanel('menu')
      },
      {
        label: 'Order',
        icon: 'pi pi-shopping-cart',
        command: () => this.setActivePanel('order')
      }
    ];

    this.dishService = new DishService();
  }

  componentDidMount() {
    this.dishService.getAll().then(data =>
      this.setState({
        dishes: data,
        totalRecords: data.length
      }));
  }

  onPageChange = (event) => {
    this.setState({
      first: event.first,
      rows: event.rows
    });
  }

  setActivePanel = (panel) => {
    this.setState({ activePanel: panel });
  }

  addToOrder = (dish) => {
    this.setState((prevState) => {
      const existingDish = prevState.orders.find(d => d.id === dish.id);
      if (existingDish) {
        return {
          orders: prevState.orders.map(d => 
            d.id === dish.id 
              ? { ...d, quantity: d.quantity + 1 } 
              : d
          )
        };
      } else {
        return {
          orders: [...prevState.orders, { ...dish, quantity: 1 }]
        };
      }
    });
  }

  removeFromOrder = (dishToRemove) => {
    this.setState((prevState) => ({
      orders: prevState.orders.filter(dish => dish.id !== dishToRemove.id)
    }));
  }

  getTotalAmount = () => {
    return this.state.orders.reduce((total, dish) => total + dish.price * dish.quantity, 0).toFixed(2);
  }

  handleConfirmOrder = async () => {
    const { orders } = this.state;
  
    // 1. Preparar los datos para el primer POST
    const orderPrice = this.getTotalAmount();
  
    // Primero, crea la orden
    try {
      const createOrderResponse = await fetch('http://localhost:8081/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderPrice }),
      });
  
      if (!createOrderResponse.ok) {
        throw new Error('Failed to create order');
      }
  
      const orderResponse = await createOrderResponse.json();
      const orderId = orderResponse.id;
  
      // 2. Preparar y enviar los datos para el segundo POST
      const orderLineRequests = orders.map(dish => {
        const linePrice = dish.price * dish.quantity;
        return fetch('http://localhost:8081/order/order-line/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order: { id: orderId },
            dishId: dish.id,
            productQuantity: dish.quantity,
            linePrice,
          }),
        });
      });
  
      // Esperar a que todas las solicitudes se completen
      const responses = await Promise.all(orderLineRequests);
  
      // Verificar que todas las solicitudes se realizaron con éxito
      for (const response of responses) {
        if (!response.ok) {
          throw new Error('Failed to create order line');
        }
      }
  
      alert('Order confirmed!');
      this.setState({ orders: [] });
  
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm order');
    }
  }
  
  itemTemplate = (dish, index) => {
    return (
      <div className="item-container" key={dish.id}>
        <div className="item-image-container">
          <img src={dish.imageUrl} alt={dish.name} className="item-image" />
          <div className="item-name">{dish.name}</div>
        </div>
        <div className="item-details">
          <div className="item-price">${dish.price}</div>
          <div className="item-quantity">Quantity: {dish.quantity}</div>
          <Button 
            label="Remove" 
            icon="pi pi-times" 
            className="remove-button" 
            onClick={() => this.removeFromOrder(dish)} 
          />
        </div>
      </div>
    );
  };
  
  render() {
    const { dishes, first, rows, totalRecords, activePanel, orders } = this.state;
    const currentDishes = dishes.slice(first, first + rows);

    return (
      <div>
        <Menubar model={this.items} />
        <div className="panel-container">

          {activePanel === 'menu' && (
            <Panel header="Menu">
              <div className="grid-container">
                {currentDishes.map((dish, index) => (
                  <Card key={index} title={dish.name} className="grid-item">
                    <div className="flex-container">
                      <div>
                        <div className="dish-image">
                          <img className="dish-image" src={dish.imageUrl} alt={dish.name} />
                        </div>
                        <p className="dish-price">Price: ${dish.price}</p>
                      </div>
                      <div className="dish-description">
                        <p>Description:</p>
                        <p>{dish.description}</p>
                        <Button label="Order" onClick={() => this.addToOrder(dish)} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="pagination">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={[3, 6, 12]}
                  onPageChange={this.onPageChange}
                  className="paginator"
                />
              </div>
            </Panel>
          )}

          {activePanel === 'order' && (
            <Panel header="My Order">
              <div className="card">
                <DataView value={orders} itemTemplate={this.itemTemplate} />
                <div className="order-summary">
                  <div className="total-amount">
                    <strong>Total: ${this.getTotalAmount()}</strong>
                  </div>
                  <Button 
                    label="Confirm Order" 
                    className="confirm-button" 
                    onClick={this.handleConfirmOrder} 
                    disabled={orders.length === 0}
                  />
                </div>
              </div>
            </Panel>
          )}

        </div>
      </div>
    );
  }
}