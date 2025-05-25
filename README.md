<div id="Badges1">
    <img alt="Stars Count" src="https://img.shields.io/github/stars/RedondoDev/GeeXPert-Frontend?style=flat-square&color=yellow">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-purple?style=flat-square">    
</div>
<div id="Badges2">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="20">
    <img alt="Angular" src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" height="20">
    <img alt="Node JS" src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="20">
    <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" height="20">
    <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" height="20">
    <img alt="Docker" src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" height="20">
</div>

<br>

*GeeXPert Frontend is the user interface component for the GeeXPert ecosystem. While the main repository covers the full application (frontend, backend, etc.), this repository focuses exclusively on frontend logic and user experience. If you want to see the parent repository, click on the following link: <a href="https://github.com/RedondoDev/GeeXPert">GeeXPert</a>.*

# GeeXPert Frontend

This repository contains the frontend code for the GeeXPert application. The frontend is built with TypeScript and Angular, aiming to provide a smooth user experience for managing video game collections, personalized recommendations, and game exploration.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Backend Integration](#backend-integration)
- [Author](#author)
- [License](#license)

## Features

### 1. User Authentication & Authorization
- Allows user registration and login via the [backend](https://github.com/RedondoDev/GeeXPert-Backend) API.
- Handles JWT tokens in local storage and protects private routes.

### 2. IGDB Integration & Game Management
- Enables browsing, searching, and viewing game details via the [backend](https://github.com/RedondoDev/GeeXPert-Backend) API.
- Lists such as "top", "trending", and "search" results.
- Detail cards with extended information for each game.

### 3. Personal Game Collection
- Users can add, remove, and change the state of games (pending, playing, completed).
- Personalized collection view, fully synchronized with the backend.

### 4. Personalized Recommendations
- Interface to receive game recommendations based on the user's collection.
- Integrates with AI-powered endpoints provided by the [backend](https://github.com/RedondoDev/GeeXPert-Backend) using [ollama](https://github.com/ollama/ollama).

### 5. Modern User Experience
- Responsive design using [Tailwind CSS](https://tailwindcss.com/).
- Intuitive navigation and real-time visual feedback.

## Technologies

<ul>
  <li>TypeScript</li>
  <li>Angular</li>
    <ul>
      <li>Angular Material</li>
    </ul>
  <li>Node JS</li>
  <li>HTML5</li>
  <li>Tailwind CSS</li>
  <li>Docker</li>
</ul>

## Backend Integration

The application communicates via RESTful endpoints provided by the backend. Main endpoints include:

- Authentication
- Games
- Collection
- Recommendations

You can check the API endpoinds on [backend](https://github.com/RedondoDev/GeeXPert-Backend).

> **Note:** The backend must be running locally or accessible for the frontend to work properly.

## Author

<table>
    <tr>
        <th>RedondoDEV</th>    
    </tr>
    <tr>        
        <td>
            <a href="https://github.com/RedondoDev">
                <img src="https://avatars.githubusercontent.com/u/163606882?v=1" width="110px"> 
            </a>
        </td>
    </tr>
</table>

## License

This project is licensed under the [MIT License](https://github.com/RedondoDev/GeeXPert-Frontend/blob/master/README.md)  
<img alt="License" src="https://img.shields.io/badge/License-MIT-purple?style=flat-square"> 
