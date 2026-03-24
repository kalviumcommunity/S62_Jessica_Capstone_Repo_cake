import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function AdminDashboard() {

  const [revenue, setRevenue] = useState(0);
  const [popularFlavors, setPopularFlavors] = useState([]);
  const [ordersPerDay, setOrdersPerDay] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cakes, setCakes] = useState([]);

  const [editingCake, setEditingCake] = useState(null);

  const [newCake, setNewCake] = useState({
    name: "",
    description: "",
    mediumPrice: "",
    largePrice: "",
    image: "",
    category: ""
  });

  const updateOrderStatus = async (id, status) => {

  await axios.put(`http://localhost:5001/api/orders/${id}`, {
    status
  });

  window.location.reload();

};

  // Fetch orders
  useEffect(() => {

  const fetchOrders = async () => {

    const res = await axios.get("http://localhost:5001/api/orders");

    setOrders(res.data);

  };

  fetchOrders();

}, []);

  // Fetch cakes
  useEffect(() => {

    const fetchCakes = async () => {
      const res = await axios.get("http://localhost:5001/api/cakes");
      setCakes(res.data);
    };

    fetchCakes();

  }, []);

  // Fetch analytics
  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. Please login.");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const revenueRes = await axios.get(
          "http://localhost:5001/api/analytics/revenue",
          config
        );

        const flavorRes = await axios.get(
          "http://localhost:5001/api/analytics/popular-flavors",
          config
        );

        const ordersRes = await axios.get(
          "http://localhost:5001/api/analytics/orders-per-day",
          config
        );

        setRevenue(revenueRes.data.totalRevenue);
        setPopularFlavors(flavorRes.data);
        setOrdersPerDay(ordersRes.data);

      } catch (error) {
        console.error("Analytics fetch failed:", error);
      }

    };

    fetchAnalytics();

  }, []);

  // Add cake
  const handleAddCake = async () => {

    await axios.post("http://localhost:5001/api/cakes", {

      name: newCake.name,
      description: newCake.description,

      price: {
        medium: newCake.mediumPrice,
        large: newCake.largePrice
      },

      image: newCake.image,
      category: newCake.category
    });

    window.location.reload();

  };

  // Delete cake
  const deleteCake = async (id) => {

    await axios.delete(`http://localhost:5001/api/cakes/${id}`);

    setCakes(cakes.filter(cake => cake._id !== id));

  };

  // Update cake
  const updateCake = async () => {

    await axios.put(
      `http://localhost:5001/api/cakes/${editingCake._id}`,
      {
        name: editingCake.name,
        description: editingCake.description,
        price: {
          medium: editingCake.price.medium,
          large: editingCake.price.large
        },
        image: editingCake.image,
        category: editingCake.category
      }
    );

    window.location.reload();

  };

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Admin Analytics Dashboard
      </h1>

      <div className="mb-8 text-xl">
        Total Revenue: ₹{revenue}
      </div>

      <h2 className="text-xl mb-3">
        Popular Flavors
      </h2>

      <BarChart width={500} height={300} data={popularFlavors}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      <h2 className="text-xl mt-10 mb-3">
        Orders Per Day
      </h2>

      <BarChart width={500} height={300} data={ordersPerDay}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="orders" fill="#82ca9d" />
      </BarChart>


      {/* Cake Manager */}

      <h2 className="text-2xl mt-12 mb-4">
        Cake Manager
      </h2>

      {/* Orders */}
      <h2 className="text-2xl mt-12 mb-4">
Orders
</h2>

<table className="admin-orders-table">

<thead>

<tr>
<th>Customer</th>
<th>Cake</th>
<th>Total</th>
<th>Status</th>
<th>Update</th>
</tr>

</thead>

<tbody>

{orders.map(order => (

<tr key={order._id}>

<td>Guest</td>

<td>
{order.items.map(item => item.cakeId.name).join(", ")}
</td>

<td>₹{order.totalPrice}</td>

<td>{order.status}</td>

<td>

<select
onChange={(e)=>updateOrderStatus(order._id,e.target.value)}
value={order.status}
>

<option>Pending</option>
<option>Preparing</option>
<option>Out for Delivery</option>
<option>Delivered</option>

</select>

</td>

</tr>

))}

</tbody>

</table>

      {/* Add Cake Form */}

      <div className="admin-cake-form">

        <input
          placeholder="Cake Name"
          onChange={(e)=>setNewCake({...newCake,name:e.target.value})}
        />

        <input
          placeholder="Description"
          onChange={(e)=>setNewCake({...newCake,description:e.target.value})}
        />

        <input
          placeholder="Medium Price"
          onChange={(e)=>setNewCake({...newCake,mediumPrice:e.target.value})}
        />

        <input
          placeholder="Large Price"
          onChange={(e)=>setNewCake({...newCake,largePrice:e.target.value})}
        />

        <input
          placeholder="Image Path"
          onChange={(e)=>setNewCake({...newCake,image:e.target.value})}
        />

        <input
          placeholder="Category"
          onChange={(e)=>setNewCake({...newCake,category:e.target.value})}
        />

        <button onClick={handleAddCake}>
          Add Cake
        </button>

      </div>


      {/* Existing Cakes */}

      <h3 className="text-xl mt-8 mb-3">
        Existing Cakes
      </h3>

      <div className="admin-cake-list">

        {cakes.map(cake => (

          <div key={cake._id} className="admin-cake-card">

            <img src={cake.image} width="80" alt={cake.name} />

            <h4>{cake.name}</h4>

            <p>Medium: ₹{cake.price.medium}</p>
            <p>Large: ₹{cake.price.large}</p>

            <button onClick={()=>setEditingCake(cake)}>
              Edit
            </button>

            <button onClick={()=>deleteCake(cake._id)}>
              Delete
            </button>

          </div>

        ))}

      </div>


      {/* Edit Cake */}

      {editingCake && (

        <div className="admin-edit-form">

          <h3>Edit Cake</h3>

          <input
            value={editingCake.name}
            onChange={(e)=>setEditingCake({...editingCake,name:e.target.value})}
          />

          <input
            value={editingCake.description}
            onChange={(e)=>setEditingCake({...editingCake,description:e.target.value})}
          />

          <input
            value={editingCake.price.medium}
            onChange={(e)=>setEditingCake({
              ...editingCake,
              price:{...editingCake.price,medium:e.target.value}
            })}
          />

          <input
            value={editingCake.price.large}
            onChange={(e)=>setEditingCake({
              ...editingCake,
              price:{...editingCake.price,large:e.target.value}
            })}
          />

          <button onClick={updateCake}>
            Save Changes
          </button>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;