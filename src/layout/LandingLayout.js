import React, { useEffect, useState } from 'react'
import '../assets/lib/animate/animate.min.css'
import '../assets/lib/owlcarousel/assets/owl.carousel.min.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/style.css'

import useLoggedInUser from 'src/hooks/useLoggedInUser'
import useAjustes from 'src/hooks/useAjustes'
import useArchivos from 'src/hooks/useArchivos'

import { logout } from 'src/services/AuthService'
import Tangram from 'src/layout/tangram'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import ReactPlayer from 'react-player'

const LandingLayout = () => {
  const { user, isLoading } = useLoggedInUser()
  const { ajustes, handleUpdateAjustes } = useAjustes()
  const { videos, imagenes, documentos, subtitulos, audios } = useArchivos()

  const [fontSizeTitle, setFontSizeTitle] = useState('')
  const [fontSizeSubtitle, setFontSizeSubtitle] = useState('')
  const [fontSizeParagraph, setFontSizeParagraph] = useState('')
  const [primaryColor, setPrimaryColor] = useState('')
  const [secondaryColor, setSecondaryColor] = useState('')
  const [tertiaryColor, setTertiaryColor] = useState('')
  const [fontsFile, setFontsFile] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log('ajustes', ajustes)
  }, [ajustes])

  useEffect(() => {
    if (ajustes) {
      setFontSizeTitle(ajustes.font_size_title)
      setFontSizeSubtitle(ajustes.font_size_subtitle)
      setFontSizeParagraph(ajustes.font_size_paragraph)
      setPrimaryColor(ajustes.color_primary)
      setSecondaryColor(ajustes.color_secondary)
      setTertiaryColor(ajustes.color_tertiary)
      setFontsFile(ajustes.fonts_file)
    }
  }, [ajustes])

  useEffect(() => {
    if (fontsFile) {
      const style = document.createElement('style')
      style.appendChild(
        document.createTextNode(`
          @font-face {
            font-family: 'CustomFont';
            src: url('${fontsFile}') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
        `),
      )
      document.head.appendChild(style)
    }
  }, [fontsFile])

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = {
        font_size_title: fontSizeTitle,
        font_size_subtitle: fontSizeSubtitle,
        font_size_paragraph: fontSizeParagraph,
        color_primary: primaryColor,
        color_secondary: secondaryColor,
        color_tertiary: tertiaryColor,
        font_file: fontsFile,
      }
      if (!fontsFile) {
        delete formData.font_file
      }
      await handleUpdateAjustes(formData)
    } catch (error) {
      console.error(error)
    }
  }

  const darkenHexColor = (hex, percent) => {
    if (!hex) {
      console.error('Invalid hex color:', hex)
      return null
    }

    // Remove the hash at the start if it's there
    hex = hex.replace('#', '')

    // Parse the r, g, b values
    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    // Calculate the darkened values
    r = Math.floor(r * (1 - percent / 100))
    g = Math.floor(g * (1 - percent / 100))
    b = Math.floor(b * (1 - percent / 100))

    // Convert back to hex and pad with zeros if necessary
    r = r.toString(16).padStart(2, '0')
    g = g.toString(16).padStart(2, '0')
    b = b.toString(16).padStart(2, '0')

    // Return the darkened color
    return `#${r}${g}${b}`
  }

  const lightenHexColor = (hex, percent) => {
    if (!hex) {
      console.error('Invalid hex color:', hex)
      return null
    }
    // Remove the hash at the start if it's there
    hex = hex.replace('#', '')

    // Parse the r, g, b values
    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    // Calculate the lightened values
    r = Math.min(255, Math.floor(r * (1 + percent / 100)))
    g = Math.min(255, Math.floor(g * (1 + percent / 100)))
    b = Math.min(255, Math.floor(b * (1 + percent / 100)))

    // Convert back to hex and pad with zeros if necessary
    r = r.toString(16).padStart(2, '0')
    g = g.toString(16).padStart(2, '0')
    b = b.toString(16).padStart(2, '0')

    // Return the lightened color
    return `#${r}${g}${b}`
  }

  const subtitleTracks = subtitulos.map((subtitulo, index) => ({
    kind: 'subtitles',
    src: subtitulo.archivo,
    srcLang: `option ${index + 1}`,
    default: subtitulo.default || false,
  }))

  return (
    <>
      <CModal
        size="xl"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Video</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {(videos.length > 0 && (
            <ReactPlayer
              playing
              url={videos[0].archivo}
              width="100%"
              height="100%"
              controls={true}
              caption={true}
              config={{
                file: {
                  tracks: subtitulos.length > 0 ? subtitleTracks : [],
                  attributes: { crossOrigin: 'true' },
                },
              }}
            />
          )) || <div>No hay videos</div>}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
      <div
        className="landing-layout"
        style={{
          backgroundColor: tertiaryColor,
        }}
      >
        <div
          className="container-fluid text-white pt-4 pb-5 d-none d-lg-flex"
          style={{
            backgroundColor: tertiaryColor,
          }}
        >
          <div className="container pb-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex">
                <i
                  className="bi bi-telephone-inbound fs-2"
                  style={{
                    color: secondaryColor,
                  }}
                ></i>
                <div className="ms-3">
                  <h5
                    className="mb-0"
                    style={{
                      color: secondaryColor,
                    }}
                  >
                    Call Now
                  </h5>
                  <span
                    style={{
                      color: secondaryColor,
                    }}
                  >
                    +012 345 6789
                  </span>
                </div>
              </div>
              <a
                href="index.html"
                className="h1 mb-0"
                style={{
                  color: secondaryColor,
                  fontFamily: 'CustomFont',
                }}
              >
                Lab<span style={{ color: darkenHexColor(secondaryColor, 30) }}>sky</span>
              </a>
              <div className="d-flex">
                <i className="bi bi-envelope fs-2" style={{ color: secondaryColor }}></i>
                <div className="ms-3">
                  <h5 className="mb-0" style={{ color: secondaryColor }}>
                    Mail Now
                  </h5>
                  <span style={{ color: secondaryColor }}>info@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container-fluid"
          style={{
            backgroundColor: tertiaryColor,
          }}
        >
          <div className="container">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-3">
              <a href="index.html" className="navbar-brand d-lg-none">
                <h1 className="m-0" style={{ Color: secondaryColor }}>
                  Lab<span style={{ Color: darkenHexColor(secondaryColor, 30) }}>sky</span>
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
                <div className="navbar-nav w-100">
                  <a
                    href="index.html"
                    className="nav-item nav-link active"
                    style={{
                      color: darkenHexColor(secondaryColor, 20),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Home
                  </a>
                  <a
                    href=""
                    className="nav-item nav-link"
                    style={{
                      color: darkenHexColor(secondaryColor, 20),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    About
                  </a>
                  <a
                    href=""
                    className="nav-item nav-link"
                    style={{
                      color: darkenHexColor(secondaryColor, 20),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Services
                  </a>
                  {user && user.isAdmin && (
                    <a
                      href="dashboard"
                      className="nav-item nav-link"
                      style={{
                        color: darkenHexColor(secondaryColor, 20),
                        fontFamily: 'CustomFont',
                        fontSize: `${fontSizeParagraph}rem`,
                      }}
                    >
                      Dashboard
                    </a>
                  )}
                  {user && (
                    <a
                      className="nav-item nav-link"
                      style={{
                        cursor: 'pointer',
                        color: darkenHexColor(secondaryColor, 20),
                        fontFamily: 'CustomFont',
                        fontSize: `${fontSizeParagraph}rem`,
                      }}
                      onClick={() => {
                        handleLogout()
                      }}
                    >
                      Cerrar Sesion
                    </a>
                  )}
                  {!user && (
                    <>
                      <a
                        href="login"
                        className="nav-item nav-link"
                        style={{
                          color: darkenHexColor(secondaryColor, 20),
                          fontFamily: 'CustomFont',
                          fontSize: `${fontSizeParagraph}rem`,
                        }}
                      >
                        Iniciar Sesion
                      </a>
                      <a
                        href="register"
                        className="nav-item nav-link"
                        style={{
                          color: darkenHexColor(secondaryColor, 20),
                          fontFamily: 'CustomFont',
                          fontSize: `${fontSizeParagraph}rem`,
                        }}
                      >
                        Registrarse
                      </a>
                    </>
                  )}
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      style={{
                        color: darkenHexColor(secondaryColor, 20),
                        fontFamily: 'CustomFont',
                        fontSize: `${fontSizeParagraph}rem`,
                      }}
                    >
                      Paginas
                    </a>
                    <div className="dropdown-menu m-0" style={{ backgroundColor: tertiaryColor }}>
                      <a href="tangram" className="dropdown-item">
                        Tangrama
                      </a>
                      <a href="" className="dropdown-item">
                        Our Team
                      </a>
                      <a href="" className="dropdown-item">
                        Testimonial
                      </a>
                      <a href="" className="dropdown-item">
                        Appoinment
                      </a>
                      <a href="" className="dropdown-item">
                        404 Page
                      </a>
                    </div>
                  </div>
                  <a
                    href=""
                    className="nav-item nav-link"
                    style={{
                      color: darkenHexColor(secondaryColor, 20),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Contact
                  </a>
                </div>

                {/* Social media icons on the right */}
                <div className="ms-auto d-none d-lg-flex">
                  <a
                    className="btn btn-sm-square btn-primary ms-2"
                    href=""
                    style={{ backgroundColor: primaryColor }}
                  >
                    <i className="fab fa-facebook-f" style={{ color: secondaryColor }}></i>
                  </a>
                  <a
                    className="btn btn-sm-square btn-primary ms-2"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <i className="fab fa-twitter" style={{ color: secondaryColor }}></i>
                  </a>
                  <a
                    className="btn btn-sm-square btn-primary ms-2"
                    href=""
                    style={{ backgroundColor: primaryColor }}
                  >
                    <i className="fab fa-linkedin-in" style={{ color: secondaryColor }}></i>
                  </a>
                  <a
                    className="btn btn-sm-square btn-primary ms-2"
                    href=""
                    style={{ backgroundColor: primaryColor }}
                  >
                    <i className="fab fa-youtube" style={{ color: secondaryColor }}></i>
                  </a>
                </div>
              </div>
            </nav>

            {/* Form */}
            <div className="container my-3" onSubmit={handleSubmit}>
              <form className="d-block">
                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Subtitle size"
                      value={fontSizeSubtitle}
                      onChange={(e) => setFontSizeSubtitle(e.target.value)}
                      style={{
                        backgroundColor: darkenHexColor(tertiaryColor, 20),
                        color: secondaryColor,
                      }}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Paragraph size"
                      value={fontSizeParagraph}
                      onChange={(e) => setFontSizeParagraph(e.target.value)}
                      style={{
                        backgroundColor: darkenHexColor(tertiaryColor, 20),
                        color: secondaryColor,
                      }}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Title size"
                      value={fontSizeTitle}
                      onChange={(e) => setFontSizeTitle(e.target.value)}
                      style={{
                        backgroundColor: darkenHexColor(tertiaryColor, 20),
                        color: secondaryColor,
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      type="color"
                      className="form-control mb-2"
                      title="Choose primary color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      style={{
                        backgroundColor: darkenHexColor(tertiaryColor, 20),
                        color: secondaryColor,
                      }}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="color"
                      className="form-control mb-2"
                      title="Choose secondary color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      style={{
                        backgroundColor: darkenHexColor(tertiaryColor, 20),
                        color: secondaryColor,
                      }}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="color"
                      className="form-control mb-2"
                      title="Choose title color"
                      value={tertiaryColor}
                      onChange={(e) => setTertiaryColor(e.target.value)}
                      style={{
                        backgroundColor: darkenHexColor(tertiaryColor, 20),
                        color: secondaryColor,
                      }}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="file"
                      className="form-control mb-2"
                      title="Choose fonts file"
                      accept=".ttf"
                      onChange={(e) => setFontsFile(e.target.files[0])}
                      style={{
                        backgroundColor: darkenHexColor(tertiaryColor, 20),
                        color: secondaryColor,
                      }}
                    />
                  </div>
                </div>

                {/* Save Button with proper background */}
                <div className="text-center pb-4">
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                    }} /* Same as navbar color */
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="container-fluid header-carousel px-0 mb-5">
          <div
            id="header-carousel"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
                <div className="carousel-caption">
                  <div className="container">
                    <div className="row justify-content-start">
                      <div className="col-lg-7 text-start">
                        <h1
                          className="display-1 animated slideInRight mb-3"
                          style={{
                            color: secondaryColor,
                            fontFamily: 'CustomFont',
                            fontSize: `${fontSizeTitle}rem`,
                          }}
                        >
                          Award Winning Laboratory Center
                        </h1>
                        <p
                          className="mb-5 animated slideInRight"
                          style={{
                            color: secondaryColor,
                            fontFamily: 'CustomFont',
                            fontSize: `${fontSizeParagraph}rem`,
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus
                          augue, iaculis id elit eget, ultrices pulvinar tortor. Quisque vel lorem
                          porttitor, malesuada arcu quis, fringilla risus.
                        </p>
                        <a
                          href=""
                          className="btn btn-primary py-3 px-5 animated slideInRight"
                          style={{
                            color: secondaryColor,
                            backgroundColor: primaryColor,
                            fontFamily: 'CustomFont',
                          }}
                        >
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
                        <h1
                          className="display-1 animated slideInLeft mb-3"
                          style={{
                            color: secondaryColor,
                            fontFamily: 'CustomFont',
                            fontSize: `${fontSizeTitle}rem`,
                          }}
                        >
                          Expet Doctors & Lab Assistants
                        </h1>
                        <p
                          className="mb-5 animated slideInLeft"
                          style={{
                            color: secondaryColor,
                            fontFamily: 'CustomFont',
                            fontSize: `${fontSizeParagraph}rem`,
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus
                          augue, iaculis id elit eget, ultrices pulvinar tortor. Quisque vel lorem
                          porttitor, malesuada arcu quis, fringilla risus.
                        </p>
                        <a
                          href=""
                          className="btn btn-primary py-3 px-5 animated slideInLeft"
                          style={{
                            color: secondaryColor,
                            backgroundColor: primaryColor,
                            fontFamily: 'CustomFont',
                            fontSize: `${fontSizeParagraph}rem`,
                          }}
                        >
                          Explore More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add more carousel items based on the imagenes array */}
              {imagenes.length > 0 &&
                imagenes.map((imagen, index) => (
                  <div className="carousel-item" key={index}>
                    <img className="w-100" src={imagen.archivo} alt="Image" />
                    <div className="carousel-caption">
                      <div className="container">
                        <div className="row justify-content-end">
                          <div className="col-lg-7 text-end">
                            <h1
                              className="display-1 animated slideInLeft mb-3"
                              style={{
                                color: secondaryColor,
                                fontFamily: 'CustomFont',
                                fontSize: `${fontSizeTitle}rem`,
                              }}
                            >
                              Expet Doctors & Lab Assistants
                            </h1>
                            <p
                              className="mb-5 animated slideInLeft"
                              style={{
                                color: secondaryColor,
                                fontFamily: 'CustomFont',
                                fontSize: `${fontSizeParagraph}rem`,
                              }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                              tellus augue, iaculis id elit eget, ultrices pulvinar tortor. Quisque
                              vel lorem porttitor, malesuada arcu quis, fringilla risus.
                            </p>
                            <a
                              href=""
                              className="btn btn-primary py-3 px-5 animated slideInLeft"
                              style={{
                                color: secondaryColor,
                                backgroundColor: primaryColor,
                                fontFamily: 'CustomFont',
                                fontSize: `${fontSizeParagraph}rem`,
                              }}
                            >
                              Explore More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                        <i className="bi bi-award" style={{ color: primaryColor }}></i>
                      </div>
                      <h1
                        className="display-1 mb-0"
                        data-toggle="counter-up"
                        style={{ color: secondaryColor, fontFamily: 'CustomFont' }}
                      >
                        25
                      </h1>
                      <small
                        className="fs-5"
                        style={{ color: secondaryColor, fontFamily: 'CustomFont' }}
                      >
                        Years Experience
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <h1
                  className="display-6 mb-4"
                  style={{
                    color: secondaryColor,
                    fontFamily: 'CustomFont',
                    fontSize: `${fontSizeSubtitle}rem`,
                  }}
                >
                  Trusted Lab Experts and Latest Lab Technologies
                </h1>
                <p
                  className="mb-4"
                  style={{
                    color: secondaryColor,
                    fontFamily: 'CustomFont',
                    fontSize: `${fontSizeParagraph}rem`,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue,
                  iaculis id elit eget, ultrices pulvinar tortor. Quisque vel lorem porttitor,
                  malesuada arcu quis, fringilla risus. Pellentesque eu consequat augue.
                </p>
                <div className="row g-4 g-sm-5 justify-content-center">
                  <div className="col-sm-6">
                    <div className="about-fact btn-square flex-column rounded-circle bg-primary ms-sm-auto">
                      <p className="mb-0" style={{ color: secondaryColor }}>
                        Awards Winning
                      </p>
                      <h1
                        className="mb-0"
                        data-toggle="counter-up"
                        style={{ color: secondaryColor }}
                      >
                        9999
                      </h1>
                    </div>
                  </div>
                  <div className="col-sm-6 text-start">
                    <div className="about-fact btn-square flex-column rounded-circle bg-secondary me-sm-auto">
                      <p className="mb-0" style={{ color: secondaryColor }}>
                        Complete Cases
                      </p>
                      <h1
                        className="mb-0"
                        data-toggle="counter-up"
                        style={{ color: secondaryColor }}
                      >
                        9999
                      </h1>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="about-fact mt-n130 btn-square flex-column rounded-circle bg-dark mx-sm-auto">
                      <p className="mb-0" style={{ color: secondaryColor }}>
                        Happy Clients
                      </p>
                      <h1
                        className="mb-0"
                        data-toggle="counter-up"
                        style={{ color: secondaryColor }}
                      >
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
                <div
                  className="feature-item border h-100 p-5"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 20) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i
                      className="bi bi-award"
                      style={{ color: lightenHexColor(primaryColor, 50) }}
                    ></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: lightenHexColor(secondaryColor, 30),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Award Winning
                  </h5>
                  <p
                    className="mb-0"
                    style={{
                      color: lightenHexColor(secondaryColor, 30),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
                <div
                  className="feature-item border h-100 p-5"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 20) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i
                      className="bi bi-people"
                      style={{ color: lightenHexColor(primaryColor, 50) }}
                    ></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: lightenHexColor(secondaryColor, 30),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Expet Doctors
                  </h5>
                  <p
                    className="mb-0"
                    style={{
                      color: lightenHexColor(secondaryColor, 30),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
                <div
                  className="feature-item border h-100 p-5"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 20) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i
                      className="bi bi-cash-coin"
                      style={{ color: lightenHexColor(primaryColor, 50) }}
                    ></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: lightenHexColor(secondaryColor, 30),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Fair Prices
                  </h5>
                  <p
                    className="mb-0"
                    style={{
                      color: lightenHexColor(secondaryColor, 30),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
                <div
                  className="feature-item border h-100 p-5"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 20) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i
                      className="bi bi-headphones"
                      style={{ color: lightenHexColor(primaryColor, 50) }}
                    ></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: lightenHexColor(secondaryColor, 30),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    24/7 Support
                  </h5>
                  <p
                    className="mb-0"
                    style={{
                      color: lightenHexColor(secondaryColor, 30),
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
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
                <div
                  className="p-5 mt-lg-5"
                  style={{
                    backgroundColor: tertiaryColor,
                  }}
                >
                  <h1
                    className="display-6 mb-4 wow fadeIn"
                    data-wow-delay="0.3s"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeSubtitle}rem`,
                    }}
                  >
                    The Best Medical Test & Laboratory Solution
                  </h1>
                  <p
                    className="mb-4 wow fadeIn"
                    data-wow-delay="0.4s"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue,
                    iaculis id elit eget, ultrices pulvinar tortor. Quisque vel lorem porttitor,
                    malesuada arcu quis, fringilla risus. Pellentesque eu consequat augue.
                  </p>
                  <div className="row g-5 pt-2 mb-5">
                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                      <div className="icon-box-primary mb-4">
                        <i
                          className="bi bi-person-plus"
                          style={{ color: lightenHexColor(primaryColor, 50) }}
                        ></i>
                      </div>
                      <h5 className="mb-3" style={{ color: secondaryColor }}>
                        Experience Doctors
                      </h5>
                      <span
                        style={{
                          color: secondaryColor,
                          fontFamily: 'CustomFont',
                          fontSize: `${fontSizeParagraph}rem`,
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </span>
                    </div>
                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                      <div className="icon-box-primary mb-4">
                        <i
                          className="bi bi-check-all"
                          style={{ color: lightenHexColor(primaryColor, 50) }}
                        ></i>
                      </div>
                      <h5 className="mb-3" style={{ color: secondaryColor }}>
                        Advanced Microscopy
                      </h5>
                      <span
                        style={{
                          color: secondaryColor,
                          fontFamily: 'CustomFont',
                          fontSize: `${fontSizeParagraph}rem`,
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </span>
                    </div>
                  </div>
                  <a
                    className="btn btn-primary py-3 px-5 wow fadeIn"
                    data-wow-delay="0.5s"
                    href=""
                    style={{
                      color: secondaryColor,
                      backgroundColor: primaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
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
                        onClick={() => setVisible(!visible)}
                      >
                        <span></span>
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="bg-primary p-5">
                      <div className="experience mb-4 wow fadeIn" data-wow-delay="0.3s">
                        <div className="d-flex justify-content-between mb-2">
                          <span
                            style={{
                              color: secondaryColor,
                              fontFamily: 'CustomFont',
                              fontSize: `${fontSizeParagraph}rem`,
                            }}
                          >
                            Sample Preparation
                          </span>
                          <span
                            style={{
                              color: secondaryColor,
                              fontFamily: 'CustomFont',
                              fontSize: `${fontSizeParagraph}rem`,
                            }}
                          >
                            90%
                          </span>
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
                          <span
                            style={{
                              color: secondaryColor,
                              fontFamily: 'CustomFont',
                              fontSize: `${fontSizeParagraph}rem`,
                            }}
                          >
                            Result Accuracy
                          </span>
                          <span
                            style={{
                              color: secondaryColor,
                              fontFamily: 'CustomFont',
                              fontSize: `${fontSizeParagraph}rem`,
                            }}
                          >
                            95%
                          </span>
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
                          <span
                            style={{
                              color: secondaryColor,
                              fontFamily: 'CustomFont',
                              fontSize: `${fontSizeParagraph}rem`,
                            }}
                          >
                            Lab Equipments
                          </span>
                          <span
                            style={{
                              color: secondaryColor,
                              fontFamily: 'CustomFont',
                              fontSize: `${fontSizeParagraph}rem`,
                            }}
                          >
                            90%
                          </span>
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
              <h1
                className="display-6 mb-3"
                style={{
                  color: secondaryColor,
                  fontFamily: 'CustomFont',
                  fontSize: `${fontSizeSubtitle}rem`,
                }}
              >
                Reliable & High-Quality Laboratory Service
              </h1>
              <p
                className="mb-5"
                style={{
                  color: secondaryColor,
                  fontFamily: 'CustomFont',
                  fontSize: `${fontSizeParagraph}rem`,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue,
                iaculis id elit eget, ultrices pulvinar tortor.
              </p>
            </div>
            <div className="row g-4">
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div
                  className="service-item"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 10) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i className="bi bi-heart-pulse" style={{ color: primaryColor }}></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Pathology Testing
                  </h5>
                  <p
                    className="mb-4"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                  <a
                    className="btn btn-light px-3"
                    href=""
                    style={{ color: secondaryColor, backgroundColor: primaryColor }}
                  >
                    Read More
                    <i
                      className="bi bi-chevron-double-right ms-1"
                      style={{ color: primaryColor }}
                    ></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                <div
                  className="service-item"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 10) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i className="bi bi-lungs" style={{ color: primaryColor }}></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Microbiology Tests
                  </h5>
                  <p
                    className="mb-4"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                  <a
                    className="btn btn-light px-3"
                    href=""
                    style={{ color: secondaryColor, backgroundColor: primaryColor }}
                  >
                    Read More<i className="bi bi-chevron-double-right ms-1"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                <div
                  className="service-item"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 10) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i className="bi bi-virus" style={{ color: primaryColor }}></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Biochemistry Tests
                  </h5>
                  <p
                    className="mb-4"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                  <a
                    className="btn btn-light px-3"
                    href=""
                    style={{ color: secondaryColor, backgroundColor: primaryColor }}
                  >
                    Read More<i className="bi bi-chevron-double-right ms-1"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                <div
                  className="service-item"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 10) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i className="bi bi-capsule-pill" style={{ color: primaryColor }}></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Histopatology Tests
                  </h5>
                  <p
                    className="mb-4"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                  <a
                    className="btn btn-light px-3"
                    href=""
                    style={{ color: secondaryColor, backgroundColor: primaryColor }}
                  >
                    Read More<i className="bi bi-chevron-double-right ms-1"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div
                  className="service-item"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 10) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i className="bi bi-capsule" style={{ color: primaryColor }}></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Urine Tests
                  </h5>
                  <p
                    className="mb-4"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                  <a
                    className="btn btn-light px-3"
                    href=""
                    style={{ color: secondaryColor, backgroundColor: primaryColor }}
                  >
                    Read More<i className="bi bi-chevron-double-right ms-1"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                <div
                  className="service-item"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 10) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i className="bi bi-prescription2" style={{ color: primaryColor }}></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Blood Tests
                  </h5>
                  <p
                    className="mb-4"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                  <a
                    className="btn btn-light px-3"
                    href=""
                    style={{ color: secondaryColor, backgroundColor: primaryColor }}
                  >
                    Read More<i className="bi bi-chevron-double-right ms-1"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                <div
                  className="service-item"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 10) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i className="bi bi-clipboard2-pulse" style={{ color: primaryColor }}></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Fever Tests
                  </h5>
                  <p
                    className="mb-4"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                  <a
                    className="btn btn-light px-3"
                    href=""
                    style={{ color: secondaryColor, backgroundColor: primaryColor }}
                  >
                    Read More<i className="bi bi-chevron-double-right ms-1"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                <div
                  className="service-item"
                  style={{ backgroundColor: darkenHexColor(tertiaryColor, 10) }}
                >
                  <div className="icon-box-primary mb-4">
                    <i className="bi bi-file-medical" style={{ color: primaryColor }}></i>
                  </div>
                  <h5
                    className="mb-3"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Allergy Tests
                  </h5>
                  <p
                    className="mb-4"
                    style={{
                      color: secondaryColor,
                      fontFamily: 'CustomFont',
                      fontSize: `${fontSizeParagraph}rem`,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus augue.
                  </p>
                  <a
                    className="btn btn-light px-3"
                    href=""
                    style={{ color: secondaryColor, backgroundColor: primaryColor }}
                  >
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
                {/*{secondaryColor && <Tangram color={secondaryColor} />}*/}
              </div>
              <div className="col-lg-6 ps-lg-5">
                <div className="row g-5">
                  <div className="col-sm-6">
                    <h4 className="mb-4" style={{ color: secondaryColor }}>
                      Quick Links
                    </h4>
                    <a
                      className="btn btn-link"
                      href=""
                      style={{ color: darkenHexColor(secondaryColor, 30) }}
                    >
                      About Us
                    </a>
                    <a
                      className="btn btn-link"
                      href=""
                      style={{ color: darkenHexColor(secondaryColor, 30) }}
                    >
                      Contact Us
                    </a>
                    <a
                      className="btn btn-link"
                      href=""
                      style={{ color: darkenHexColor(secondaryColor, 30) }}
                    >
                      Our Services
                    </a>
                    {documentos.length > 0 && (
                      <a
                        className="btn btn-link"
                        href={documentos[0].archivo}
                        target="_blank"
                        style={{ color: darkenHexColor(secondaryColor, 30) }}
                        rel="noreferrer"
                      >
                        Terms & Condition
                      </a>
                    )}
                    <a
                      className="btn btn-link"
                      href=""
                      style={{ color: darkenHexColor(secondaryColor, 30) }}
                    >
                      Support
                    </a>
                  </div>
                  <div className="col-sm-6">
                    <h4 className="mb-4" style={{ color: secondaryColor }}>
                      Popular Links
                    </h4>
                    <a
                      className="btn btn-link"
                      href=""
                      style={{ color: darkenHexColor(secondaryColor, 30) }}
                    >
                      About Us
                    </a>
                    <a
                      className="btn btn-link"
                      href=""
                      style={{ color: darkenHexColor(secondaryColor, 30) }}
                    >
                      Contact Us
                    </a>
                    <a
                      className="btn btn-link"
                      href=""
                      style={{ color: darkenHexColor(secondaryColor, 30) }}
                    >
                      Our Services
                    </a>
                    {documentos.length > 0 && (
                      <a
                        className="btn btn-link"
                        href={documentos[0].archivo}
                        target="_blank"
                        style={{ color: darkenHexColor(secondaryColor, 30) }}
                        rel="noreferrer"
                      >
                        Terms & Condition
                      </a>
                    )}
                    <a
                      className="btn btn-link"
                      href=""
                      style={{ color: darkenHexColor(secondaryColor, 30) }}
                    >
                      Support
                    </a>
                  </div>
                  <div className="col-sm-12">
                    <h4 className="mb-4" style={{ color: secondaryColor }}>
                      Newsletter
                    </h4>
                    <div className="w-100">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control border-0 py-3 px-4"
                          style={{ background: 'rgba(255, 255, 255, .1)' }}
                          placeholder="Your Email Address"
                        />
                        <button
                          className="btn btn-primary px-4"
                          style={{ backgroundColor: primaryColor, color: secondaryColor }}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingLayout
