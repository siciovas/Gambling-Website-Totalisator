import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import { useHistory } from "react-router-dom";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isLogged: false,
    };
  }

  componentDidMount() {
    const userLoggedIn = JSON.parse(localStorage.getItem("isLogged"));
    console.log(userLoggedIn);
    this.setState({ isLogged: userLoggedIn });
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              PSAIPI
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/leagues">
                    Lygos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/prizes">
                    Peržiūrėti prizus
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/maps">
                    Žemėlapis
                  </NavLink>
                </NavItem>

                {!this.state.isLogged && (
                  <>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/register-page"
                      >
                        Register
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/login-page"
                      >
                        Login
                      </NavLink>
                    </NavItem>
                  </>
                )}
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/matches">
                    Peržiūrėti varžybas
                  </NavLink>
                            </NavItem>
                            {this.state.isLogged && (
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        onClick={() => {
                                            window.location.replace("/bets");
                                        }}
                                    >
                                        Spejimai
                                    </NavLink>
                                </NavItem>

                            )}
                {this.state.isLogged && (
                  <NavItem>
                    <NavLink
                      tag={Link}
                      className="text-dark"
                      onClick={() => {
                        localStorage.clear();
                        window.location.replace("/login-page");
                      }}
                    >
                      Logout
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/supportChat">
                    Pagalba gyvai
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/generate-link">
                    Pakviesk draugą į lygą
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
