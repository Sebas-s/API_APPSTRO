-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-02-2023 a las 06:44:28
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appstro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `id_type_user` int(10) NOT NULL,
  `first_name` varchar(120) NOT NULL,
  `lastname` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(8) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `id_type_user`, `first_name`, `lastname`, `email`, `password`, `username`) VALUES
(1, 3, 'Super', 'sus', 'sebastiansilvan97@gmail.com', 'olademar', ''),
(3, 1, 'Pablo', 'Sanchez', 'email.prueba.email.com', '12345789', ''),
(5, 2, 'testName', 'testLastname', 'hola@gmail.com', 'olasasTe', ''),
(6, 2, 'testName', 'testLastname', 'hola@gmaillll.com', 'olasasTe', ''),
(7, 1, 'Pablo', 'Parquer', '', 'aasd.oco', ''),
(8, 1, 'Pablo', 'Parquer', '', 'aasd.oco', 'pepe'),
(9, 1, 'Pablo', 'Parquer', 'test2@correo', 'aasd.oco', 'pepe2'),
(10, 1, 'Pablo', 'Parquer', 'test2@correo42sd', 'aasd.oco', 'pepe3');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_type_user` (`id_type_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_type_user`) REFERENCES `usertype` (`id_user_type`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
