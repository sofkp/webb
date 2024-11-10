import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, Form, Button, Container } from 'react-bootstrap';

export const StyledNavbar = styled(Navbar)`
  background-color: #231123;
  color: #FFFCF2;

  .navbar-nav .nav-link {
    color: #FFFCF2;

    &:hover,
    &:active {
      color: #DD7596;
    }
  }
`;

export const StyledNavLink = styled(Nav.Link)`
  color: #FFFCF2;
  display: flex;
  align-items: center;
  
  &:hover,
  &:active {
    color: #DD7596;
  }

  &:hover svg {
    color: #DD7596;
  }

  margin-right: 30px;
  
  span {
    margin-left: 10px;
  }
`;

export const StyledNavbarToggle = styled(Navbar.Toggle)`
  .navbar-toggler-icon {
    background-color: white;
  }
`;

export const StyledNavDropdown = styled(NavDropdown)`
  .dropdown-item {
    color: #FFFCF2;

    &:hover {
      color: #DD7596;
    }
  }
`;

export const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledSearchInput = styled.input`
  width: 500px;
  padding: 5px;
  border: 1px solid #DD7596;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #DD7596;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #DD7596;
  border: none;
  
  &:hover {
    background-color: #DD7596;
  }
`;
