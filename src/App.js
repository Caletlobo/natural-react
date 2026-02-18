import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // State management
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [instaPosts, setInstaPosts] = useState([
    'img21.png', 'img22.png', 'img23.png', 'img24.png', 'img25.png'
  ]);
  const [buyCounters, setBuyCounters] = useState({});

  const videoRef = useRef(null);
  const footerRef = useRef(null);

  // Products data
  const seasonalProducts = [
    { id: 1, img: 'img10.png', name: 'Mulberry', desc: 'Mulberry ice cream made from fresh mulberries' },
    { id: 2, img: 'img11.png', name: 'Blueberry', desc: 'Blueberry ice cream rich in antioxidants' },
    { id: 3, img: 'img12.png', name: 'Black Currant', desc: 'Black currant flavour – tangy & fresh' },
    { id: 4, img: 'img13.png', name: 'Gooseberry', desc: 'Gooseberry ice cream – vitamin rich' },
    { id: 5, img: 'img14.png', name: 'Raspberry', desc: 'Raspberry creamy delight' },
    { id: 6, img: 'img15.png', name: 'Cranberry', desc: 'Cranberry refreshing scoop' }
  ];

  // Hero slider effect
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(sliderInterval);
  }, []);

  // Show modal on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Buy button handler
  const handleBuy = (productId) => {
    setBuyCounters(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  // Read more handler
  const handleReadMore = (description) => {
    alert(description);
  };

  // Load more Instagram posts
  const loadMorePosts = () => {
    const morePosts = ['img26.png', 'img27.png', 'img28.png', 'img29.png', 'img30.png'];
    setInstaPosts(prev => [...prev, ...morePosts]);
  };

  // Scroll to footer
  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle video mute
  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <div className={isDarkMode ? 'app dark' : 'app'}>
      {/* Caution Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <span className="close" onClick={() => setShowModal(false)}>×</span>
            <h2>⚠ CAUTION</h2>
            <p>This is a student clone project. Beware of fake franchise offers. Always verify from official website.</p>
            <p style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
              Reference: <a href="https://caletlobo.github.io/calet_clone_website/" target="_blank" rel="noopener noreferrer">Original Clone Website</a>
            </p>
          </div>
        </div>
      )}

      {/* Disclaimer Bar */}
      <div className="disclaimer">
        *This is only a brand name and does not represent its true nature.
      </div>

      {/* Header */}
      <header className="header">
        <div className="logo-area">
          <img src="img1.png" alt="Naturals Logo" />
          <img src="img2.png" alt="40 Years" />
        </div>
        <div className="header-right">
          <div className="search-box">
            <input type="text" placeholder="I'm looking for..." />
            <button>🔍</button>
          </div>
          <button className="order-btn" onClick={scrollToFooter}>Order Now</button>
          <button className="toggle" onClick={toggleTheme}>🌙</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <ul className="nav-menu">
          <li><a href="#treat">Tree To Treat</a></li>
          <li><a href="#legacy">Our Legacy</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#magic">Malai Magic</a></li>
          <li><a href="#franchise">Franchise Queries</a></li>
          <li><a href="#store">Store Locator</a></li>
        </ul>
      </nav>

      {/* Hero Slider */}
      <section className="slider">
        <img 
          src="img3.png" 
          className={`slide ${currentSlide === 0 ? 'active' : ''}`} 
          alt="Slide 1"
        />
        <img 
          src="img4.png" 
          className={`slide ${currentSlide === 1 ? 'active' : ''}`} 
          alt="Slide 2"
        />
      </section>

      {/* Static Banner */}
      <section className="banner">
        <img src="img5.png" alt="Banner" />
      </section>

      {/* Video with Controls */}
      <section className="video-wrapper">
        <video ref={videoRef} autoPlay muted loop>
          <source src="video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-controls">
          <button onClick={toggleVideoMute}>
            {isVideoMuted ? '🔇 Unmute' : '🔊 Mute'}
          </button>
        </div>
      </section>

      {/* Story Grid */}
      <section className="story-grid">
        <img src="img6.png" alt="Story 1" />
        <img src="img7.png" alt="Story 2" />
        <img src="img8.png" alt="Story 3" />
        <img src="img9.png" alt="Story 4" />
      </section>

      {/* Seasonal Best */}
      <section className="seasonal" id="products">
        <h2>SEASONAL BEST</h2>
        <div className="cards">
          {seasonalProducts.map(product => (
            <div key={product.id} className="card">
              <img src={product.img} alt={product.name} />
              <p>{product.name}</p>
              <button onClick={() => handleBuy(product.id)}>
                {buyCounters[product.id] ? `BUY (${buyCounters[product.id]})` : 'BUY'}
              </button>
              <button onClick={() => handleReadMore(product.desc)}>READ MORE</button>
            </div>
          ))}
        </div>
      </section>

      {/* Sundaes */}
      <section className="sundaes">
        <img src="img16.png" alt="Sundae 1" />
        <img src="img17.png" alt="Sundae 2" />
        <img src="img18.png" alt="Sundae 3" />
      </section>

      {/* Strips */}
      <img src="img19.png" className="strip" alt="Strip 1" />
      <img src="img20.png" className="strip" alt="Strip 2" />

      {/* Instagram */}
      <section className="instagram">
        <h2>FOLLOW @naturalicecream ON INSTAGRAM</h2>
        <div className="insta-grid">
          {instaPosts.map((post, index) => (
            <img key={index} src={post} alt={`Instagram post ${index + 1}`} />
          ))}
        </div>
        <button onClick={loadMorePosts}>LOAD MORE</button>
      </section>

      {/* Pre Footer */}
      <img src="img31.png" className="strip" alt="Pre Footer" />

      {/* Footer */}
      <footer ref={footerRef} id="footer">
        <img src="img32.png" alt="Footer" />
        <p>© Natural Ice Creams – Student Clone</p>
        <p style={{ fontSize: '11px', marginTop: '5px' }}>
          Reference: <a href="https://caletlobo.github.io/calet_clone_website/" target="_blank" rel="noopener noreferrer" style={{ color: '#1aa34a' }}>https://caletlobo.github.io/calet_clone_website/</a>
        </p>
      </footer>
    </div>
  );
}

export default App;