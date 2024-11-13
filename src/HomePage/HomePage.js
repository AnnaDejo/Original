import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import NavigationBar from '../NavBar/NavBar'; // Import your Navbar component
import image1 from '../homeimages/image1.jpg';
import image2 from '../homeimages/image2.jpg';
import image3 from '../homeimages/image3.jpg';
import image4 from '../homeimages/image4.jpg';
import image5 from '../homeimages/image5.jpg';
import image6 from '../homeimages/image6.jpg';
import image7 from '../homeimages/image7.jpg';
import image8 from '../homeimages/image8.jpg';
import image9 from '../homeimages/image9.jpg';

function HomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/map'); // Navigate to the map page
  };

  const imageRef = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the image is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = imageRef.current.indexOf(entry.target);
          entry.target.classList.add('fade-in'); // Add a class to fade in the image

          // Stagger fade-in effect by adding a delay
          entry.target.style.transitionDelay = `${index * 0.2}s`; // Delay based on index
          observer.unobserve(entry.target); // Stop observing after the image is shown
        }
      });
    }, options);

    // Attach observer to each image
    imageRef.current.forEach(image => {
      if (image) observer.observe(image);
    });

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

  return (
    <div>
      <NavigationBar />

      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-text">
            <div className="hero-content">
              <h1 className="hero-title">Discover Hidden Gems</h1>
              <p className="hero-description">Explore unique attractions and experiences guided by local knowledge.</p>
              <button type="button" className="btn btn-outline-light" onClick={handleButtonClick}>Start Your Adventure</button>
            </div>
          </div>
        </div>
      </section>

      <div className="info-container">
        <div className="info-left">
          <h2>About Kerala</h2>
          <p>
            Kerala, located in the southwestern region of India, is renowned for its diverse landscapes, vibrant culture, 
            and rich history. Known as 'God's Own Country', it offers a unique blend of traditions and natural beauty. 
            The state is famous for its festivals, such as Onam, a harvest festival celebrated with flower carpets 
            and traditional feasts, and Vishu, marking the Malayali New Year. Other notable festivals include Thrissur 
            Pooram, known for grand processions and decorated elephants, as well as Christmas and Eid, which are 
            celebrated with great enthusiasm, reflecting Kerala's cultural diversity. Kerala is a melting pot of 
            religions and traditions, with influences from Hinduism, Christianity, and Islam. The state is also home 
            to classical art forms like Kathakali and Mohiniyattam, traditional Ayurvedic healing, and a rich cuisine 
            known for its use of spices.
          </p>
        </div>
      
        <div className="info-right">
          <h2>Kerala Details</h2>
          <ul>
            <li><strong>Area:</strong> 38,863 sq km</li>
            <li><strong>Population:</strong> Approximately 35 million</li>
            <li><strong>Language:</strong> Malayalam</li>
            <li><strong>Capital:</strong> Thiruvananthapuram</li>
            <li><strong>Major Cities:</strong> Kochi, Kozhikode, Kollam</li>
            <li><strong>Famous For:</strong> Backwaters, Ayurveda, Spices</li>
          </ul>
        </div>
      </div>

      <div className="image-container">
        {images.map((image, index) => (
          <img
            ref={el => (imageRef.current[index] = el)}
            src={image}
            alt={`Image ${index + 1}`}
            className="fade-image"
            key={index}
            srcSet={`${image} 300w, ${image} 600w, ${image} 1200w`} // Responsive sizes
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
          />
        ))}
      </div>

      <footer className="footer">
        <div className="container text-center">
          <p>Get in touch: tourism@example.com | Follow us on social media</p>
          <p>&copy; 2024 Tourism Guidance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
