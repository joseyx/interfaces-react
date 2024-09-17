import React from 'react'
import '../../public/lib/animate/animate.min.css'
import '../../public/lib/owlcarousel/assets/owl.carousel.min.css'
import '../../public/css/bootstrap.min.css'
import '../../public/css/style.css'

import useLoggedInUser from 'src/hooks/useLoggedInUser'

import { logout } from 'src/services/AuthService'

const LandingLayout = () => {
  const { user, error, isLoading } = useLoggedInUser()

  if (isLoading) {
    return <div>Cargando...</div>
  }

  const handleLogout = async () => {
    try {
      await logout()
      window.location.href = '/'
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="landing-layout">
      <div className="container-fluid bg-primary text-white pt-4 pb-5 d-none d-lg-flex">
        <div className="container pb-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <i className="bi bi-telephone-inbound fs-2"></i>
              <div className="ms-3">
                <h5 className="text-white mb-0">Call Now</h5>
                <span>+012 345 6789</span>
              </div>
            </div>
            <a href="index.html" className="h1 text-white mb-0">
              Lab<span className="text-dark">sky</span>
            </a>
            <div className="d-flex">
              <i className="bi bi-envelope fs-2"></i>
              <div className="ms-3">
                <h5 className="text-white mb-0">Mail Now</h5>
                <span>info@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-white py-lg-0 px-lg-3">
            <a href="index.html" className="navbar-brand d-lg-none">
              <h1 className="text-primary m-0">
                Lab<span className="text-dark">sky</span>
              </h1>
            </a>
            <button
              type="button"
              className="navbar-toggler me-0"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav">
                <a href="index.html" className="nav-item nav-link active">
                  Home
                </a>
                <a href="about.html" className="nav-item nav-link">
                  About
                </a>
                <a href="service.html" className="nav-item nav-link">
                  Services
                </a>
                {user && user.isAdmin && (
                  <a href="dashboard" className="nav-item nav-link">
                    Dashboard
                  </a>
                )}
                {user && (
                  <a
                    className="nav-item nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      handleLogout()
                    }}
                  >
                    Cerrar Sesion
                  </a>
                )}
                {!user && (
                  <a href="login" className="nav-item nav-link">
                    Iniciar Sesion
                  </a>
                )}
                {!user && (
                  <a href="register" className="nav-item nav-link">
                    Registrarse
                  </a>
                )}
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    Pages
                  </a>
                  <div className="dropdown-menu bg-light m-0">
                    <a href="feature.html" className="dropdown-item">
                      Features
                    </a>
                    <a href="team.html" className="dropdown-item">
                      Our Team
                    </a>
                    <a href="testimonial.html" className="dropdown-item">
                      Testimonial
                    </a>
                    <a href="appoinment.html" className="dropdown-item">
                      Appoinment
                    </a>
                    <a href="404.html" className="dropdown-item">
                      404 Page
                    </a>
                  </div>
                </div>
                <a href="contact.html" className="nav-item nav-link">
                  Contact
                </a>
              </div>
              <div className="ms-auto d-none d-lg-flex">
                <a className="btn btn-sm-square btn-primary ms-2" href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-sm-square btn-primary ms-2" href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-sm-square btn-primary ms-2" href="">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="btn btn-sm-square btn-primary ms-2" href="">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="container-fluid header-carousel px-0 mb-5">
        <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-lg-7 text-start">
                      <h1 className="display-1 text-white animated slideInRight mb-3">
                        Award Winning Laboratory Center
                      </h1>
                      <p className="mb-5 animated slideInRight">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus
                        augue, iaculis id elit eget, ultrices pulvinar tortor. Quisque vel lorem
                        porttitor, malesuada arcu quis, fringilla risus.
                      </p>
                      <a href="" className="btn btn-primary py-3 px-5 animated slideInRight">
                        Explore More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-end">
                    <div className="col-lg-7 text-end">
                      <h1 className="display-1 text-white animated slideInLeft mb-3">
                        Expet Doctors & Lab Assistants
                      </h1>
                      <p className="mb-5 animated slideInLeft">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus
                        augue, iaculis id elit eget, ultrices pulvinar tortor. Quisque vel lorem
                        porttitor, malesuada arcu quis, fringilla risus.
                      </p>
                      <a href="" className="btn btn-primary py-3 px-5 animated slideInLeft">
                        Explore More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="row g-0">
                <div className="col-6">
                  <img className="img-fluid" src="img/about-1.jpg" />
                </div>
                <div className="col-6">
                  <img className="img-fluid" src="img/about-2.jpg" />
                </div>
                <div className="col-6">
                  <img className="img-fluid" src="img/about-3.jpg" />
                </div>
                <div className="col-6">
                  <div className="bg-primary w-100 h-100 mt-n5 ms-n5 d-flex flex-column align-items-center justify-content-center">
                    <div className="icon-box-light">
                      <i className="bi bi-award text-dark"></i>
                    </div>
                    <h1 className="display-1 text-white mb-0" data-toggle="counter-up">
                      25
                    </h1>
                    <small className="fs-5 text-white">Years Experience</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 className="display-6 mb-4">Trusted Lab Experts and Latest Lab Technologies</h1>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue,
                iaculis id elit eget, ultrices pulvinar tortor. Quisque vel lorem porttitor,
                malesuada arcu quis, fringilla risus. Pellentesque eu consequat augue.
              </p>
              <div className="row g-4 g-sm-5 justify-content-center">
                <div className="col-sm-6">
                  <div className="about-fact btn-square flex-column rounded-circle bg-primary ms-sm-auto">
                    <p className="text-white mb-0">Awards Winning</p>
                    <h1 className="text-white mb-0" data-toggle="counter-up">
                      9999
                    </h1>
                  </div>
                </div>
                <div className="col-sm-6 text-start">
                  <div className="about-fact btn-square flex-column rounded-circle bg-secondary me-sm-auto">
                    <p className="text-white mb-0">Complete Cases</p>
                    <h1 className="text-white mb-0" data-toggle="counter-up">
                      9999
                    </h1>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="about-fact mt-n130 btn-square flex-column rounded-circle bg-dark mx-sm-auto">
                    <p className="text-white mb-0">Happy Clients</p>
                    <h1 className="text-white mb-0" data-toggle="counter-up">
                      9999
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-0 feature-row">
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
              <div className="feature-item border h-100 p-5">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-award text-dark"></i>
                </div>
                <h5 className="mb-3">Award Winning</h5>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
              <div className="feature-item border h-100 p-5">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-people text-dark"></i>
                </div>
                <h5 className="mb-3">Expet Doctors</h5>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
              <div className="feature-item border h-100 p-5">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-cash-coin text-dark"></i>
                </div>
                <h5 className="mb-3">Fair Prices</h5>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
              <div className="feature-item border h-100 p-5">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-headphones text-dark"></i>
                </div>
                <h5 className="mb-3">24/7 Support</h5>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-0 feature-row">
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
              <div className="feature-item border h-100 p-5">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-award text-dark"></i>
                </div>
                <h5 className="mb-3">Award Winning</h5>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
              <div className="feature-item border h-100 p-5">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-people text-dark"></i>
                </div>
                <h5 className="mb-3">Expet Doctors</h5>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
              <div className="feature-item border h-100 p-5">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-cash-coin text-dark"></i>
                </div>
                <h5 className="mb-3">Fair Prices</h5>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
              <div className="feature-item border h-100 p-5">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-headphones text-dark"></i>
                </div>
                <h5 className="mb-3">24/7 Support</h5>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid feature mt-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-6 pt-lg-5">
              <div className="bg-white p-5 mt-lg-5">
                <h1 className="display-6 mb-4 wow fadeIn" data-wow-delay="0.3s">
                  The Best Medical Test & Laboratory Solution
                </h1>
                <p className="mb-4 wow fadeIn" data-wow-delay="0.4s">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue,
                  iaculis id elit eget, ultrices pulvinar tortor. Quisque vel lorem porttitor,
                  malesuada arcu quis, fringilla risus. Pellentesque eu consequat augue.
                </p>
                <div className="row g-5 pt-2 mb-5">
                  <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                    <div className="icon-box-primary mb-4">
                      <i className="bi bi-person-plus text-dark"></i>
                    </div>
                    <h5 className="mb-3">Experience Doctors</h5>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                  </div>
                  <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                    <div className="icon-box-primary mb-4">
                      <i className="bi bi-check-all text-dark"></i>
                    </div>
                    <h5 className="mb-3">Advanced Microscopy</h5>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                  </div>
                </div>
                <a className="btn btn-primary py-3 px-5 wow fadeIn" data-wow-delay="0.5s" href="">
                  Explore More
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row h-100 align-items-end">
                <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: '300px' }}
                  >
                    <button
                      type="button"
                      className="btn-play"
                      data-bs-toggle="modal"
                      data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                      data-bs-target="#videoModal"
                    >
                      <span></span>
                    </button>
                  </div>
                </div>
                <div className="col-12">
                  <div className="bg-primary p-5">
                    <div className="experience mb-4 wow fadeIn" data-wow-delay="0.3s">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-white">Sample Preparation</span>
                        <span className="text-white">90%</span>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-dark"
                          role="progressbar"
                          aria-valuenow="90"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div className="experience mb-4 wow fadeIn" data-wow-delay="0.4s">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-white">Result Accuracy</span>
                        <span className="text-white">95%</span>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-dark"
                          role="progressbar"
                          aria-valuenow="95"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div className="experience mb-0 wow fadeIn" data-wow-delay="0.5s">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-white">Lab Equipments</span>
                        <span className="text-white">90%</span>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-dark"
                          role="progressbar"
                          aria-valuenow="90"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid container-service py-5">
        <div className="container pt-5">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: '600px' }}
          >
            <h1 className="display-6 mb-3">Reliable & High-Quality Laboratory Service</h1>
            <p className="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue,
              iaculis id elit eget, ultrices pulvinar tortor.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-heart-pulse text-dark"></i>
                </div>
                <h5 className="mb-3">Pathology Testing</h5>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
                <a className="btn btn-light px-3" href="">
                  Read More<i className="bi bi-chevron-double-right ms-1"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-lungs text-dark"></i>
                </div>
                <h5 className="mb-3">Microbiology Tests</h5>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
                <a className="btn btn-light px-3" href="">
                  Read More<i className="bi bi-chevron-double-right ms-1"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-virus text-dark"></i>
                </div>
                <h5 className="mb-3">Biochemistry Tests</h5>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
                <a className="btn btn-light px-3" href="">
                  Read More<i className="bi bi-chevron-double-right ms-1"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-capsule-pill text-dark"></i>
                </div>
                <h5 className="mb-3">Histopatology Tests</h5>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
                <a className="btn btn-light px-3" href="">
                  Read More<i className="bi bi-chevron-double-right ms-1"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-capsule text-dark"></i>
                </div>
                <h5 className="mb-3">Urine Tests</h5>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
                <a className="btn btn-light px-3" href="">
                  Read More<i className="bi bi-chevron-double-right ms-1"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-prescription2 text-dark"></i>
                </div>
                <h5 className="mb-3">Blood Tests</h5>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
                <a className="btn btn-light px-3" href="">
                  Read More<i className="bi bi-chevron-double-right ms-1"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-clipboard2-pulse text-dark"></i>
                </div>
                <h5 className="mb-3">Fever Tests</h5>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
                <a className="btn btn-light px-3" href="">
                  Read More<i className="bi bi-chevron-double-right ms-1"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item">
                <div className="icon-box-primary mb-4">
                  <i className="bi bi-file-medical text-dark"></i>
                </div>
                <h5 className="mb-3">Allergy Tests</h5>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                </p>
                <a className="btn btn-light px-3" href="">
                  Read More<i className="bi bi-chevron-double-right ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid footer position-relative bg-dark text-white-50 py-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="row g-5 py-5">
            <div className="col-lg-6 pe-lg-5">
              <a href="index.html" className="navbar-brand">
                <h1 className="h1 text-primary mb-0">
                  Lab<span className="text-white">sky</span>
                </h1>
              </a>
              <p className="fs-5 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue,
                iaculis id elit eget, ultrices pulvinar tortor.
              </p>
              <p>
                <i className="fa fa-map-marker-alt me-2"></i>123 Street, New York, USA
              </p>
              <p>
                <i className="fa fa-phone-alt me-2"></i>+012 345 67890
              </p>
              <p>
                <i className="fa fa-envelope me-2"></i>info@example.com
              </p>
              <div className="d-flex mt-4">
                <a className="btn btn-lg-square btn-primary me-2" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-lg-square btn-primary me-2" href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-lg-square btn-primary me-2" href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="btn btn-lg-square btn-primary me-2" href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <div className="row g-5">
                <div className="col-sm-6">
                  <h4 className="text-light mb-4">Quick Links</h4>
                  <a className="btn btn-link" href="">
                    About Us
                  </a>
                  <a className="btn btn-link" href="">
                    Contact Us
                  </a>
                  <a className="btn btn-link" href="">
                    Our Services
                  </a>
                  <a className="btn btn-link" href="">
                    Terms & Condition
                  </a>
                  <a className="btn btn-link" href="">
                    Support
                  </a>
                </div>
                <div className="col-sm-6">
                  <h4 className="text-light mb-4">Popular Links</h4>
                  <a className="btn btn-link" href="">
                    About Us
                  </a>
                  <a className="btn btn-link" href="">
                    Contact Us
                  </a>
                  <a className="btn btn-link" href="">
                    Our Services
                  </a>
                  <a className="btn btn-link" href="">
                    Terms & Condition
                  </a>
                  <a className="btn btn-link" href="">
                    Support
                  </a>
                </div>
                <div className="col-sm-12">
                  <h4 className="text-light mb-4">Newsletter</h4>
                  <div className="w-100">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control border-0 py-3 px-4"
                        style={{ background: 'rgba(255, 255, 255, .1)' }}
                        placeholder="Your Email Address"
                      />
                      <button className="btn btn-primary px-4">Sign Up</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingLayout
