import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PropertyForm from './components/PropertyForm';
import PropertyList from './components/PropertyList';
import ReviewForm from './components/ReviewForm';

import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim'; 

import { type Container, type ISourceOptions, MoveDirection, OutMode } from '@tsparticles/engine';

function App() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); 
    }).then(() => {
      setInit(true); 
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(() => ({
    autoPlay: true,
    background: {
      color: {
        value: "#000000",
      },
      image: "",
      position: "",
      repeat: "",
      size: "",
      opacity: 1
    },
    backgroundMask: {
      composite: "destination-out",
      cover: {
        color: {
          value: "#fff"
        },
        opacity: 1
      },
      enable: false
    },
    clear: true,
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    detectRetina: true,
    fpsLimit: 120,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: false,
          mode: []
        },
        onDiv: {
          selectors: [],
          enable: false,
          mode: [],
          type: "circle"
        },
        onHover: {
          enable: false,
          mode: [],
          parallax: {
            enable: false,
            force: 2,
            smooth: 10
          }
        },
        resize: {
          delay: 0.5,
          enable: true
        }
      },
      modes: {
        push: {
          default: true,
          quantity: 4
        },
        remove: {
          quantity: 2
        },
        repulse: {
          distance: 200,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: "ease-out-quad"
        }
      }
    },
    manualParticles: [],
    particles: {
      bounce: {
        horizontal: {
          value: 1
        },
        vertical: {
          value: 1
        }
      },
      collisions: {
        enable: false,
        maxSpeed: 50,
        mode: "bounce",
        overlap: {
          enable: true,
          retries: 0
        }
      },
      color: {
        value: "#fff",
      },
      move: {
        direction: "right",
        enable: true,
        speed: 5,
        outModes: {
          default: "out",
        },
        random: false,
        straight: false,
        spin: {
          enable: false,
          acceleration: 0
        }
      },
      number: {
        density: {
          enable: false,
          width: 1920,
          height: 1080
        },
        value: 200
      },
      opacity: {
        value: 1,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 3,
      },
      zIndex: {
        value: 5,
      }
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    responsive: [],
    smooth: false,
    style: {},
    zLayers: 100,
    emitters: {
      autoPlay: true,
      fill: true,
      life: {
        wait: false
      },
      rate: {
        quantity: 1,
        delay: 7
      },
      shape: {
        type: "square"
      },
      particles: {
        shape: {
          type: "images",
          options: {
            images: {
              src: "https://particles.js.org/images/cyan_amongus.png",
              width: 500,
              height: 634
            }
          }
        },
        size: {
          value: 40
        },
        move: {
          speed: 10,
          outModes: {
            default: "none",
            right: "destroy"
          },
          straight: true
        },
        rotate: {
          value: { min: 0, max: 360 },
          animation: {
            enable: true,
            speed: 10,
            sync: true
          }
        }
      },
      position: {
        x: -5,
        y: 55
      }
    },
    motion: {
      disable: false,
      reduce: {
        factor: 4,
        value: true
      }
    }
  }), []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}

      <header className="app-header">
        <nav>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home properties={properties} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={user ? <Dashboard logout={logout} /> : <Login login={login} />} />
        <Route path="/property-form" element={user ? <PropertyForm /> : <Login login={login} />} />
        <Route path="/property-list" element={<PropertyList />} />
        <Route path="/property-review/:propertyId" element={<ReviewForm />} />
      </Routes>
    </>
  );
}

export default App;
  