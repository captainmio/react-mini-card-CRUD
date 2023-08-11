import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { useState, useEffect } from "react";

import { Form } from "react-bootstrap";

import SearchField from "./components/searchfield";
import Button from "./components/button";
import FruitItem from "./components/fruit-item";

import FruitService from "./services/fruit.service";

export default function App() {
  const [selectedFruit, setSelectedFruit] = useState([]);
  const [cart, setCart] = useState([]);

  const handleSearch = (value) => {
    setSelectedFruit(value);
  };

  const handleAddToCart = () => {
    // function to add the item to the cart
    setCart((cart) => [
      ...cart,
      {
        id: selectedFruit.id,
        name: selectedFruit.label,
        quantity: 1
      }
    ]);
  };

  const quantityIncrement = (id) => {
    let cartIndex = searchCartIndex(id);
    let updatedCartQuantity = cart;

    updatedCartQuantity[cartIndex].quantity = cart[cartIndex].quantity + 1;

    setCart([...updatedCartQuantity]);
  };

  const quantityDecrement = (id) => {
    let cartIndex = searchCartIndex(id);
    let updatedCartQuantity = cart;

    if (updatedCartQuantity[cartIndex].quantity <= 1) {
      // remove the item to the cart
      updatedCartQuantity = cart.filter((item) => item.id !== id);
    } else {
      // decrement the item's quantity
      updatedCartQuantity[cartIndex].quantity = cart[cartIndex].quantity - 1;
    }

    setCart([...updatedCartQuantity]);
  };

  const searchCartIndex = (id) => {
    return cart.findIndex((item) => item.id === id);
  };

  useEffect(() => {
    setSelectedFruit([]);
  }, [cart]);

  const [fruits, setFruits] = useState([]);

  // page initial load, will fetch records from API
  useEffect(() => {
    FruitService.getAll()
      .then((response) => {
        let fruitList = response.data;
        fruitList.map((item) => {
          setFruits((fruits) => [
            ...fruits,
            {
              id: item.id,
              label: item.title
            }
          ]);

          return item;
        });
      })
      .catch(() => setFruits([]));
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h1 className="fw-bold">Add Products</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10 col-md-10 col-sm-10 col-10">
            <Form.Label className="productLabel">Product</Form.Label>
            <SearchField
              placeholder="e.g. Product ABC"
              options={fruits}
              onSelect={(value) => handleSearch(value)}
              clearSelected={cart.length}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-2 d-flex">
            <Button
              className="d-flex align-self-end align-items-end btn-primary"
              onClick={handleAddToCart}
            >
              Add
            </Button>
          </div>
        </div>
        <div className="row mt-4 product-listings">
          {cart.length === 0 ? (
            <div className="col-xl-12 align-self-center">
              <img
                src={"assets/ioscompass.png"}
                alt="ios-compass"
                width="80"
                height="80"
                className="mb-4"
              />
              <p>No products have been added</p>
            </div>
          ) : (
            <div className="col-xl-12">
              {cart.map((item, index) => {
                return (
                  <FruitItem
                    item={item}
                    key={index}
                    quantityIncrement={quantityIncrement}
                    quantityDecrement={quantityDecrement}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
