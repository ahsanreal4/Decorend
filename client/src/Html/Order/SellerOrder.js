import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Navbar from "../Navbar/Navbar";
import getScreenAccessible from '../ScreenHelper';
import MySwal from "../../AlertModel/MySwal";
import Swal from 'sweetalert2';

export default function SellerOrder() {
  let [orders, setOrders] = useState(1);
  let [screenLoading, setScreenLoading] = useState(false);
  
  const [datatable, setDatatable] = useState({
    columns: [],
    rows: []
  });

  useEffect(() => {
       if (!getScreenAccessible("SellerOrder")) {
          window.location.href = "/";
        }
        import("../../CSS/Order.css");
  }, []);

  const setStatus = async (id, st) => {
          const json2 = JSON.stringify({ "orderID": id, "orderStatus": st });
          const response = await fetch("http://localhost:3000/api/setOrderStatus", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: json2,
          });
          const data = await response.json();
          if (data.status === "ok") {
            MySwal("success", "Order updated!", 500);
            setTimeout(() => window.location.reload(), 500);
          }
          else {
            MySwal("error", "Error occurred! Try again!", 1000);
          }
  }
  
  const setOrderStatus = (id, st) => {
    if (st == 5) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          setStatus(id, st);
        }
      });
    }
    else {
        setStatus(id, st);
    }
  }
  
  const getPendingOrders = async (userData) => {
      const json2 = JSON.stringify({"sellerID": userData.id});
      const response = await fetch("http://localhost:3000/api/getSellerPendingOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json2,
      });
    const data = await response.json();
    if (data.status === "ok") {
      let myData = data.data;
      for (let i = 0; i < myData.length; i++){
        let el = myData[i];
        el.OrderAmount = el.OrderAmount + "$";
        if (el.OrderStatus == 0) {
          el.OrderStatusText = "Waiting approval";
            el.action = (
            <div style={{ display: "flex" }}>
              <button onClick={() => setOrderStatus(el._id, 1)} type="button" className="btn btn-success btn-sm">Accept</button>
              <button onClick={() => setOrderStatus(el._id, 5)} type="button" className="btn btn-danger btn-sm">Cancel</button>
            </div>
          );
        }
        else if (el.OrderStatus == 1) {
          el.OrderStatusText = "Accepted";
          el.action = (
            <div style={{ display: "flex" }}>
              <button onClick={() => setOrderStatus(el._id, 2)} type="button" className="btn btn-success btn-sm">Order Shipped</button>
            </div>
          );
        }
        else if (el.OrderStatus == 2) {
          el.OrderStatusText = "In Delivery Process";
          el.action = (
            <div style={{ display: "flex" }}>
              <button onClick={() => setOrderStatus(el._id, 4)} type="button" className="btn btn-success btn-sm">Order Complete</button>
            </div>
          );
        }
      }
      setDataTable2(myData);
      }
  }

  const setDataTable2 = (data) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData.userType == "manager") {
      setDatatable({
        columns: [
          {
            label: 'OrderID',
            field: '_id',
            width: 100,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'OrderID',
            },
          },
          {
            label: 'OrderType',
            field: 'OrderType',
            width: 150,
          },
          {
            label: 'Order Items',
            field: 'OrderItems',
            width: 50,
          },
          {
            label: 'OrderAmount',
            field: 'OrderAmount',
            width: 50,
          },
          {
            label: 'OrderStatus',
            field: 'OrderStatusText',
            sort: 'disabled',
            width: 100,
          },
          {
            label: 'Action',
            field: 'action',
            sort: 'disabled',
            width: 100,
          }
        ],
        rows: data
      });
    }
    else if (userData.userType == "seller") {
        setDatatable({
        columns: [
          {
            label: 'OrderID',
            field: '_id',
            width: 100,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'OrderID',
            },
          },
          {
            label: 'OrderType',
            field: 'OrderType',
            width: 150,
          },
          {
            label: 'Order Items',
            field: 'OrderItems',
            width: 50,
          },
          {
            label: 'Item Quantities',
            field: 'ItemsQuantities',
            width: 50,
          },
          {
            label: 'OrderAmount',
            field: 'OrderAmount',
            width: 50,
          },
          {
            label: 'OrderStatus',
            field: 'OrderStatusText',
            sort: 'disabled',
            width: 100,
          },
          {
            label: 'Action',
            field: 'action',
            sort: 'disabled',
            width: 100,
          }
        ],
        rows: data
      });
    }
    setScreenLoading(true);
  }

  const getCompletedOrders = async (userData) => {
      const json2 = JSON.stringify({"sellerID": userData.id});
      const response = await fetch("http://localhost:3000/api/getSellerCompletedOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json2,
      });
      const data = await response.json();
      if (data.status === "ok") {
        let myData = data.data;
        for (let i = 0; i < myData.length; i++){
          let el = myData[i];
          el.OrderAmount = el.OrderAmount + "$";
          if (el.OrderStatus == 4) {
            el.OrderStatusText = "Completed";
            el.action = "No Action";
          }

        }
        setDataTable2(myData);
      }
  }

    const getCancelledOrders = async (userData) => {
      const json2 = JSON.stringify({"sellerID": userData.id});
      const response = await fetch("http://localhost:3000/api/getSellerCancelledOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json2,
      });
      const data = await response.json();
      if (data.status === "ok") {
        let myData = data.data;
        for (let i = 0; i < myData.length; i++){
          let el = myData[i];
          el.OrderAmount = el.OrderAmount + "$";
          if (el.OrderStatus == 5) {
            el.OrderStatusText = "Cancelled";
            el.action = "No Action";
          }

        }
        setDataTable2(myData);
      }
  }
    
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (orders == 1) {
      getPendingOrders(userData);
    }
    else if (orders == 2) {
      getCompletedOrders(userData);
    }
    else if (orders == 3) {
      getCancelledOrders(userData);
    }
    }, [orders]);
  if (screenLoading) {
    return <div><Navbar /><h1 style={{ "marginLeft": "43%", "marginTop": "1%" }}>Orders</h1><button className='button-13' onClick={() => setOrders(1)} style={{ "marginLeft": "38%", "marginRight": "10px" }}>Pending</button><button className='button-13' onClick={() => setOrders(2)} style={{ "marginRight": "10px" }}>Completed</button><button className='button-13' onClick={() => setOrders(3)} style={{ "marginRight": "10px" }}>Cancelled</button><MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} /></div>;
  }
  return <div><Navbar /></div>;
    }