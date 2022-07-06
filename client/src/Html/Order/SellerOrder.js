import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Navbar from "../Navbar/Navbar";
import getScreenAccessible from '../ScreenHelper';

export default function SellerOrder() {
  let [orders, setOrders] = useState(1);
  let [screenLoading, setScreenLoading] = useState(false);
  
  const [datatable, setDatatable] = useState({
    columns: [],
    rows: []
  });

  useEffect(() => {
      //  if (!getScreenAccessible("Order")) {
      //     window.location.href = "/";
      // }
        import("../../CSS/Order.css");
    }, []);
  
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
        if (el.OrderStatus == 0) {
          el.OrderStatusText = "Waiting approval";
            el.action = (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                style={{
                  cursor: "pointer",
                  color: "black",
                  fontSize: ".7em",
                  padding: ".5rem",
                  margin:0,
                  borderRadius: ".3rem",
                  background: "#fb6262",
                }}
              >
                Accept
              </div>
              <div
                style={{
                  cursor: "pointer",
                  color: "black",
                  fontSize: ".7em",
                  margin:0,
                  padding: ".5rem",
                  borderRadius: ".3rem",
                  background: "#fb6262",
                }}
              >
                Reject
              </div>
            </div>
          );
        }
        else if (el.OrderStatus == 1) {
          el.OrderStatusText = "Accepted";
        }
        else if (el.OrderStatus == 2) {
          el.OrderStatusText = "In Delivery Process";
        }
      }
      setDataTable2(myData);
      }
  }

  const setDataTable2 = (data) => {
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
        setDataTable2(data.data);
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
        setDataTable2(data.data);
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