-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-02-2023 a las 06:51:38
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

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addNewAstro` (IN `name_astro` VARCHAR(150), IN `id_type_astro` INT(10), IN `description` TEXT, IN `image_url` TEXT, IN `id_main_composition` INT(10), IN `distance` DOUBLE)   BEGIN

INSERT INTO `astro` (`name_astro`, `id_type_astro`, `description`, `image_url`, `id_main_composition`, `distance`) VALUES ( name_astro, id_type_astro, description, image_url, id_main_composition, distance);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addNewAstros` (IN `name_astro` VARCHAR(150), IN `id_type_astro` INT(10), IN `description` TEXT, IN `image_url` TEXT, IN `id_main_composition` INT(10), IN `distance` DOUBLE)   BEGIN
INSERT INTO `astro` (`name_astro`, `id_type_astro`, `description`, `image_url`, `id_main_composition`, `distance`) VALUES ( name_astro, id_type_astro, description, image_url, id_main_composition, distance);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addUser` (IN `typeUser` INT(10), IN `first_name` VARCHAR(120), IN `lastname` VARCHAR(150), IN `correo` VARCHAR(200), IN `passwordU` VARCHAR(8), IN `usern` VARCHAR(50), OUT `mensaje` VARCHAR(120))   BEGIN 
    DECLARE correo_existente INT;
    DECLARE usuario_existente INT;
    
    SELECT COUNT(*) INTO correo_existente FROM users WHERE email = correo;
    
    IF correo_existente > 0 THEN
        SET mensaje = 'El correo electrónico ya está registrado';
    ELSE
        SELECT COUNT(*) INTO usuario_existente FROM users WHERE username = usern;
        
        IF usuario_existente > 0 THEN
            SET mensaje = 'El nombre de usuario ya está en uso';
        ELSE
            INSERT INTO `users` (`id_type_user`, `first_name`, `lastname`, `email`, `password`, `username`) 
            VALUES (typeUser, first_name, lastname, correo, passwordU, usern);
            SET mensaje = CONCAT('Has completado tu registro ', first_name);
        END IF;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `FindAstro` (IN `id_astrop` INT(10))   BEGIN
SELECT id_astro, type_astro, name_astro, description, image_url, distance, name_com, composition_description FROM astro INNER JOIN typeastro ON astro.id_type_astro = typeastro.id_type_astro INNER JOIN composition on astro.id_main_composition= composition.id_compositiion WHERE id_astro=id_astrop;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `FindAstroById` (IN `id_astrop` INT(10))   BEGIN
SELECT id_astro, type_astro, name_astro, description, image_url, distance, name_com, composition_description FROM astro INNER JOIN typeastro ON astro.id_type_astro = typeastro.id_type_astro INNER JOIN composition on astro.id_main_composition= composition.id_compositiion WHERE id_astro=id_astrop;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllAstros` ()   BEGIN 

SELECT id_astro, name_astro, type_astro, description, name_com,composition_description, distance, image_url
    FROM astro INNER JOIN typeastro ON astro.id_type_astro=typeastro.id_type_astro INNER JOIN composition ON astro.id_main_composition = composition.id_compositiion; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAstrosByType` (IN `idType` INT(11))   BEGIN 

SELECT id_astro, name_astro, type_astro, description, name_com,composition_description, distance, image_url
    FROM astro INNER JOIN typeastro ON astro.id_type_astro=typeastro.id_type_astro INNER JOIN composition ON astro.id_main_composition = composition.id_compositiion
    WHERE	typeastro.id_type_astro= idType ; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTypesAstro` ()   BEGIN 
SELECT * FROM  typeastro;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsers` ()   BEGIN
SELECT id_user, user_type, first_name, lastname, email, password FROM users INNER JOIN usertype on users.id_type_user = usertype.id_user_type;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `astro`
--

CREATE TABLE `astro` (
  `id_astro` int(11) NOT NULL,
  `name_astro` varchar(150) NOT NULL,
  `id_type_astro` int(10) NOT NULL,
  `description` text NOT NULL,
  `image_url` text NOT NULL,
  `id_main_composition` int(10) NOT NULL,
  `distance` double NOT NULL,
  `id_user_modifier_astro` int(10) DEFAULT NULL,
  `data_modifier_astro` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `astro`
--

INSERT INTO `astro` (`id_astro`, `name_astro`, `id_type_astro`, `description`, `image_url`, `id_main_composition`, `distance`, `id_user_modifier_astro`, `data_modifier_astro`) VALUES
(1, 'sun ', 2, 'Las estrellas son cuerpos celestes que representan enormes motores de energía cósmica y que producen calor, luz y radiaciones (como rayos ultravioletas y rayos X).\r\n\r\n', 'https://concepto.de/wp-content/uploads/2020/03/cuerpos-celestes-estrellas-e1585096688475.jpg', 1, 25, NULL, NULL),
(2, 'Tierra', 1, 'la tierra hijo', 'data:image/jpeg;base64,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', 1, 20231, NULL, NULL),
(4, 'Luna', 4, 'Satelite de la tierra', 'https://apod.nasa.gov/apod/image/0609/moonmosaic_carboni_f45.jpg', 1, 125348, NULL, NULL),
(5, 'test', 4, 'un astro de prueba', 'https://media.nature.com/lw767/magazine-assets/d41586-023-00185-z/d41586-023-00185-z_23948612.jpg?as=webp', 1, 10, NULL, NULL),
(6, 'Marte', 1, 'Nuestro hermano en el sistema solar', 'https://cdn0.geoenciclopedia.com/es/posts/1/5/0/marte_51_orig.jpg', 1, 400, NULL, NULL),
(7, 'Jupiter', 1, 'Este es Jupiter', 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRS5G-fpV8aDvEWIAPzCqEL1jEWMJl5d2YxkLcVUhNlbFJSasq1s4dNjaJpj4Tgldcl', 1, 401520, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `composition`
--

CREATE TABLE `composition` (
  `id_compositiion` int(11) NOT NULL,
  `name_com` varchar(32) NOT NULL,
  `composition_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `composition`
--

INSERT INTO `composition` (`id_compositiion`, `name_com`, `composition_description`) VALUES
(1, 'Metano', 'es metano hijo, muy peligroso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `typeastro`
--

CREATE TABLE `typeastro` (
  `id_type_astro` int(10) NOT NULL,
  `type_astro` varchar(39) NOT NULL,
  `img_type_astrourl` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `typeastro`
--

INSERT INTO `typeastro` (`id_type_astro`, `type_astro`, `img_type_astrourl`) VALUES
(1, 'Planetas', 'https://www.xtrafondos.com/wallpapers/resized/planeta-tierra-con-destello-de-luz-4460.jpg?s=large'),
(2, 'Estrellas', 'https://astroaficion.com/wp-content/uploads/2012/04/Sirius-1-1200x799.jpg'),
(3, 'Cometas', 'https://services.meteored.com/img/article/por-que-o-cometa-que-vai-reaparecer-apos-50-mil-anos-e-verde-1673509703001_1024.jpeg'),
(4, 'Satélites ', 'https://w.wallhaven.cc/full/5w/wallhaven-5wzvz8.png');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usertype`
--

CREATE TABLE `usertype` (
  `id_user_type` int(10) NOT NULL,
  `user_type` varchar(29) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usertype`
--

INSERT INTO `usertype` (`id_user_type`, `user_type`) VALUES
(1, 'Visitante'),
(2, 'Admin'),
(3, 'supersu');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `astro`
--
ALTER TABLE `astro`
  ADD PRIMARY KEY (`id_astro`),
  ADD KEY `id_type_astro` (`id_type_astro`),
  ADD KEY `id_main_composition` (`id_main_composition`);

--
-- Indices de la tabla `composition`
--
ALTER TABLE `composition`
  ADD PRIMARY KEY (`id_compositiion`);

--
-- Indices de la tabla `typeastro`
--
ALTER TABLE `typeastro`
  ADD PRIMARY KEY (`id_type_astro`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_type_user` (`id_type_user`);

--
-- Indices de la tabla `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`id_user_type`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `astro`
--
ALTER TABLE `astro`
  MODIFY `id_astro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `composition`
--
ALTER TABLE `composition`
  MODIFY `id_compositiion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `typeastro`
--
ALTER TABLE `typeastro`
  MODIFY `id_type_astro` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usertype`
--
ALTER TABLE `usertype`
  MODIFY `id_user_type` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `astro`
--
ALTER TABLE `astro`
  ADD CONSTRAINT `astro_ibfk_1` FOREIGN KEY (`id_main_composition`) REFERENCES `composition` (`id_compositiion`) ON DELETE CASCADE,
  ADD CONSTRAINT `astro_ibfk_2` FOREIGN KEY (`id_type_astro`) REFERENCES `typeastro` (`id_type_astro`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_type_user`) REFERENCES `usertype` (`id_user_type`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
