import React from 'react';
import './Sidebar.css';
import add from '../../assets/add_icon.png';
import edit from '../../assets/edit_icon.png';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'sidebar-option active' : 'sidebar-option')}
        >
          <img src={add} alt="Add" />
          <p>Add Students</p>
        </NavLink>
        <NavLink
          to="/edit"
          className={({ isActive }) => (isActive ? 'sidebar-option active' : 'sidebar-option')}
        >
          <img src={edit} alt="Edit" />
          <p>Edit Students</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
