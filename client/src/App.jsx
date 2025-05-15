import React, { useState } from 'react';
import './styles.css';
import { Search, ShoppingCart, User } from 'lucide-react';

// const cakes = [
//   { name: 'Chocolate Cake', image: '/cakeintro2.jpeg', price: 450, description:'Rich chocolate sponge with creamy ganache.' },
//   { name: 'Butterscotch Cake', image: '/cakelogowithintro1.jpeg', price: 700, description:'Sweet caramel flavor topped with crunchy bits.' },
//   { name: 'Black Forest Cake', image: '/cake2.jpeg', price: 550, description:'Layers of chocolate, cream, and cherries.' },
//   { name: 'Butterscotch Cream Cake', image: '/cake3.jpeg', price: 475, description: 'A moist vanilla sponge layered with creamy butterscotch and drizzled with caramel.' },
//   { name: 'Chocolate Mousse Cake', image: '/cake1.jpeg', price: 525, description:'A rich chocolate sponge filled with airy mousse and topped with silky ganache.' },
// ];

function CakeGallery({ onCakeClick, onBackToHome }) {
  return (
    <div className='gallery'>
      <button className='back-button' onClick={onBackToHome}> ← Back to Home</button>
      <h2>Choose Your Cake</h2>
      <div className='cake-grid'>
        {cakes.map((cake, index) => (
          <div key={index} className='cake-card' onClick={() => onCakeClick(cake)}>
            <img src={cake.image} alt={cake.name} className='cake-image' />
            <p>{cake.name}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

function CakeDetail({ cake, onBack, onAddToCart }) {
  return (
    <div className='cake-detail'>
      <button className='back-button' onClick={onBack}>← Back</button>

      <div className='detail-content'>
      <img src={cake.image} alt={cake.name} className='detail-image' />

      <div className='detail-info'>
      <h2>{cake.name}</h2>
      <p>{cake.description}</p>
      <p><strong>Price:</strong> ₹{cake.price} </p>
      <label>
        Toppings:
        <select>
          <option>None</option>
          <option>Choco Chips</option>
          <option>Sprinkles</option>
          <option>Caramel Drizzle</option>
          <option>Extra Frosting</option>
        </select>
      </label>
      <button className='add-to-cart' onClick={() => onAddToCart(cake)}>Add to Cart</button>
      </div>
    </div>
    </div>
  )
}

function UserProfile({ onBack }) {
  return (
    <div className='user-profile'>
      <button className='back-button' onClick={onBack}>← Back</button>
      <div className='profile-content'>
        <h2>User Profile</h2>
        <p><strong>Name:</strong> Jesmer Customer</p>
        <p><strong>Email:</strong> jesmercakes@gmail.com</p>
        <p><strong>Orders:</strong> 3 previous cakes </p>
        <p><strong>Member Since:</strong> Jan 2024</p>
        <button className='edit-button'>Edit Profile</button>
      </div>
    </div>
  );
}

function CartView({ cartItems, onClose }) {
  const getTotal = () => 
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  return (
    <div className='cart-view'>
      <button className='back-button' onClick={onClose}>← Back</button>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='cart-items'>
          {cartItems.map((item, index) => (
            <div key={index} className='cart-item'>
              <img src={item.image} alt={item.name} className='cart-image' />
              <div className='item-details'>
                <h3>{item.name}</h3>
                <p>₹{item.price} × {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className='cart-total'>
            <strong>Total:</strong> ₹{getTotal()}
          </div>
          <button className='checkout-button'>Proceed to Checkout</button>
          </div>
      )}
    </div>
  );
}


function App(){
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const handleOrderClick = () => {
    setShowGallery(true);
  };

  const handleCakeClick = (cake) => {
    setSelectedCake(cake);
  };

  const handleBack = () => {
    setSelectedCake(null);
  };

  const handleAddToCart = (cake) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === cake.name);
      if (existingItem) {
        return prevItems.map(item => 
          item.name === cake.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
      } else {
        return [...prevItems, {...cake, quantity: 1}];
      }
    });
  };

  
  return (

    <div className='app-container'>
      {/* Navbar */}
      <header className='navbar'>
        <div className='navbar-left'>
          <img src='/jesmer.png' alt='Jesmer Logo' className='logo' />
        </div>

        <div className='search-bar'>
          <input 
          type='text'
          placeholder='Type in your cravings....'
          className='search-input'
          />
          <Search className='search-icon' size={18}/>
        </div>

        <div className='navbar-right'>
          <ShoppingCart className='icon' size={24} onClick={() => setShowCart(true)} />
          <User className='icon' size={24} onClick={() => setShowProfile(true)} />
        </div>
      </header>

      {/* <div className='welcome-message'>
        <p>Welcome to Jesmers'!</p>
      </div> */}

      {showProfile ? (
          <UserProfile onBack={() => setShowProfile(false)} />
      ) : showCart ? (
        <CartView cartItems={cartItems} onClose={() => setShowCart(false)} />
      ) : selectedCake ? (
        <CakeDetail cake={selectedCake} onBack={handleBack} onAddToCart={handleAddToCart}/>
      ) : showGallery ? (
        <CakeGallery onCakeClick={handleCakeClick}
        onBackToHome={() => setShowGallery(false)} />
      ) : (
        <>
      
      <div className='welcome-message'>
        <p>Welcome to Jesmer!</p>
      </div>

      <section className='hero'>
        <div className='hero-text'>
          <h1>Delight in Every Bite!</h1>
          {/* {/* <h2>Cakes and Cookies</h2> */}
          <p>Freshly baked cakes & cookies, crafted with love to cherish your sweetest memories.</p> 
          <button className='cta-button' onClick={handleOrderClick}>Place Your Order </button>
          </div>
          <div className='hero-image'>
            <img src='/cakeintro2.jpeg' alt='Hero Cake' />
        </div>
      </section>


      <section className='review-section'>
        <div className='review-card'>
          <img src='/cake1.jpeg' alt='Butterscotch Cake'/>
          <p className='review-user'>@unkownabc</p>
          <p className='review-text'>Best birthday cake I've ever had. So moist and rich!</p>
        </div>

        <div className='review-card'>
          <img src='/cakelogowithintro1.jpeg' alt='cake1'/>
          <p className='review-user'>@unkown123</p>
          <p className='review-text'>Ordered this for our anniversary - perfection.</p>
        </div>

        <div className='review-card'>
          <img src='/cake2.jpeg' alt='cake2'/>
          <p className='review-user'>@unknown321</p>
          <p className='review-text'>Delicious and beautifully decorated. Highly recommend.</p>
        </div>
      </section>

      <footer className='contact-section'>
        <h2>Contact Us</h2>
        <p>Email: jesmercakes@gmail.com</p>
        <p>Phone: +91 6363941678</p>
        <p>Address: #22, KRISHNA REDDY LAYOUT, RAMAMUTHY NAGAR, KR PURAM, 
        BANGALORE- 560 016 </p>
      </footer>
      </>
      )}
    </div>
  ); 
}

export default App;