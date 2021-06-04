-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2021 at 09:42 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groceries`
--
CREATE DATABASE IF NOT EXISTS `groceries` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `groceries`;

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `itemId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cartitems`
--

INSERT INTO `cartitems` (`itemId`, `productId`, `cartId`, `quantity`) VALUES
(6, 2, 6, 2),
(163, 16, 71, 1),
(166, 1, 71, 1),
(167, 5, 71, 1),
(168, 11, 71, 2),
(169, 3, 71, 2),
(170, 18, 71, 1),
(175, 20, 76, 2),
(176, 21, 76, 1),
(177, 18, 76, 1),
(178, 17, 76, 2),
(180, 14, 77, 2),
(181, 5, 77, 2),
(189, 13, 78, 1),
(190, 16, 78, 2),
(191, 7, 78, 1),
(192, 3, 79, 1),
(193, 7, 79, 2),
(194, 21, 79, 1),
(195, 15, 79, 1),
(196, 2, 79, 1),
(197, 13, 81, 1),
(198, 7, 81, 1),
(199, 21, 81, 2),
(200, 12, 81, 1),
(201, 20, 82, 2),
(202, 3, 82, 1),
(203, 4, 82, 2),
(204, 4, 83, 1),
(205, 1, 83, 1),
(206, 5, 83, 2),
(207, 4, 84, 1),
(208, 3, 84, 2),
(209, 19, 84, 1),
(210, 4, 85, 1),
(211, 19, 85, 2),
(212, 11, 85, 1),
(213, 21, 85, 2),
(214, 14, 86, 1),
(215, 16, 86, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`) VALUES
(1, 'Meat, Chicken and Fish'),
(2, 'Fruit and Vegetables'),
(3, 'Legume'),
(4, 'Dairy And Eggs'),
(5, 'Pastries'),
(6, 'Beverages'),
(7, 'Sweets And Snacks');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `cityId` int(11) NOT NULL,
  `city` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`cityId`, `city`) VALUES
(3, 'Beer Sheva'),
(4, 'Haifa'),
(7, 'Herzelia'),
(2, 'Jerusalem'),
(8, 'Nazareth'),
(6, 'Netanya'),
(5, 'Rishon Letzion'),
(1, 'Tel Aviv');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `finalPrice` decimal(10,2) NOT NULL,
  `cityId` int(11) NOT NULL,
  `shippingStreet` varchar(50) NOT NULL,
  `shippingDate` date NOT NULL,
  `orderDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `cc4Digits` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `cartId`, `finalPrice`, `cityId`, `shippingStreet`, `shippingDate`, `orderDate`, `cc4Digits`) VALUES
(21, 11, 71, '64.57', 5, 'King George st. 25', '2021-06-21', '2021-06-04 17:41:54', '5678'),
(22, 11, 71, '64.57', 3, 'King George st. 25', '2021-06-15', '2021-06-04 17:43:44', '5678'),
(23, 11, 71, '64.57', 3, 'King George st. 25', '2021-06-15', '2021-06-04 17:47:27', '5678'),
(24, 11, 71, '64.57', 7, 'King George st. 25', '2021-06-17', '2021-06-04 17:53:17', '5678'),
(25, 11, 71, '64.57', 7, 'King George st. 25', '2021-06-29', '2021-06-04 17:56:16', '5678'),
(26, 11, 76, '59.25', 5, 'King George st. 25', '2021-06-14', '2021-06-04 18:12:14', '5678'),
(27, 11, 77, '46.98', 3, 'King George st. 25', '2021-06-22', '2021-06-04 18:24:11', '5432'),
(28, 50, 78, '38.69', 2, '22 Queen St.', '2021-06-29', '2021-06-04 18:55:44', '8889'),
(29, 11, 79, '30.08', 5, 'King George st. 25', '2021-06-29', '2021-06-04 19:16:06', '8888'),
(30, 11, 81, '52.37', 2, 'King George st. 25', '2021-06-20', '2021-06-04 19:17:28', '5555'),
(31, 11, 82, '10.86', 3, 'King George st. 25', '2021-06-22', '2021-06-04 19:25:51', '9999'),
(32, 11, 83, '41.25', 3, 'King George st. 25', '2021-06-21', '2021-06-04 19:28:53', '7777'),
(33, 11, 84, '15.19', 3, 'King George st. 25', '2021-06-14', '2021-06-04 19:30:39', '1111'),
(34, 11, 85, '51.57', 8, 'King George st. 25', '2021-06-22', '2021-06-04 19:33:47', '1111'),
(35, 11, 86, '13.40', 4, 'King George st. 25', '2021-06-14', '2021-06-04 19:36:06', '2222'),
(36, 11, 86, '13.40', 4, 'King George st. 25', '2021-06-14', '2021-06-04 19:37:04', '2222');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageFileName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `categoryId`, `productName`, `price`, `imageFileName`) VALUES
(1, 6, 'Coffee Beans 100gr', '5.98', '7ef70290-0c47-4733-b803-6bb2e95d0fce.png'),
(2, 3, 'Rice', '4.89', '6e9d8f6d-e284-46bf-befa-59211e603c5b.png'),
(3, 2, 'Bananas 300 gr', '2.50', 'ee100bc1-db83-4dcc-96d1-1855c7723131.png'),
(4, 5, 'Bread', '3.29', '83dc8e0b-c8f3-4e17-9acf-6ebcd77adf45.png'),
(5, 1, 'Ground Beef 500gr', '15.99', '0b490894-dfe5-4acf-ac03-b4775c4cb5cb.png'),
(7, 6, 'Lipton Tea', '4.90', 'ba9e27b3-8e40-4636-8a8a-859ba7b3cbb1.png'),
(11, 3, 'Green Lentils 100gr', '12.50', 'c66ecfcb-d072-4c46-b162-7a6d76f7a2fe.png'),
(12, 2, 'Red Apples 100gr', '3.50', 'b1255736-626c-44ea-bf35-428fb357d918.png'),
(13, 1, 'Buffalo Chicken Wings', '21.99', '4baf3c31-5f93-48ce-9eff-339b1f9a395a.png'),
(14, 4, 'Cream Cheese', '7.50', '272944ce-1fc4-446c-9751-4cd0a8164693.png'),
(15, 4, 'Plain Yogurt', '1.90', '1f4dc696-0d63-46a7-9c5f-10e7342b51b1.png'),
(16, 5, '6 Burger Buns', '5.90', '5b3863a9-843d-43ea-8d36-7a24be59138e.png'),
(17, 1, 'Burgers 500gr', '19.89', '5d3ffbcd-8186-42bd-a9e0-891549d0ed6b.png'),
(18, 2, 'Strawberries 100gr', '6.70', 'f9e36176-9e08-4466-9561-a22cd1170a01.png'),
(19, 4, '12 Eggs Pack', '6.90', '83d9a30b-0241-44f8-ba14-19f894809e06.png'),
(20, 7, 'Chips', '0.89', '3512e975-c50b-431f-81e8-69fc12f985f8.png'),
(21, 7, 'Pizza', '10.99', '4c5ca7ac-a009-4785-adfd-e03568010e2b.png');

-- --------------------------------------------------------

--
-- Table structure for table `shoppingcarts`
--

CREATE TABLE `shoppingcarts` (
  `cartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isOrdered` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shoppingcarts`
--

INSERT INTO `shoppingcarts` (`cartId`, `userId`, `date`, `isOrdered`) VALUES
(6, 10, '2021-06-03 19:51:12', 1),
(71, 11, '2021-06-04 17:48:54', 1),
(76, 11, '2021-06-04 18:12:14', 1),
(77, 11, '2021-06-04 18:24:11', 1),
(78, 50, '2021-06-04 18:55:44', 1),
(79, 11, '2021-06-04 19:16:06', 1),
(80, 50, '2021-06-04 16:05:46', 0),
(81, 11, '2021-06-04 19:17:28', 1),
(82, 11, '2021-06-04 19:25:51', 1),
(83, 11, '2021-06-04 19:28:53', 1),
(84, 11, '2021-06-04 19:30:39', 1),
(85, 11, '2021-06-04 19:33:47', 1),
(86, 11, '2021-06-04 19:36:06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `idNumber` varchar(10) NOT NULL,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(128) NOT NULL,
  `cityId` int(11) DEFAULT NULL,
  `street` varchar(40) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `idNumber`, `firstName`, `lastName`, `email`, `password`, `cityId`, `street`, `isAdmin`) VALUES
(10, '123456789', 'Master', 'Admin', 'master_admin@mail.com', 'a6609e54e49dd8507da85532fc31e403e9408a64041335216c1fc011d0c45f220f3f851f871118af52b5c1284c0a744d8b9f5f2ff40fb3f4050b7e48203e4c9e', 2, 'Main st. 3', 1),
(11, '987654321', 'Aviv', 'Elad', 'aviv_elad@mail.com', 'bbe21b33178e79025d2df4ec1ee14f26a132a9569253df169f66a473c875549429d2eb2108e4e9699989a5a545d53e6cebaa021ede1da0f9dc46544cfe908648', 5, 'King George st. 25', 0),
(44, '444555666', 'Moishe', 'Ufnik', 'm@m.com', 'aa37c1fcd994924dc34c216b00e025d1beb3bf3a6a853cf68037aa9276dbfedef8c4a98dacde18c3aadb3bfa5d7f6debd418d64ef41245b9b92fea7f9c1930b3', 7, '12 Seasam St. ', 0),
(45, '111222333', 'Allen', 'Air', 'a@a.com', 'e251d690c3b4e58b05ea28c3a9eb18a7f63fa322db651e7aec23f277ba4fc5b2c86252facadb5b3dea3501830c66bfa781ecef94040b27347917e3bfd501ae4c', 2, '12 Alpha St. ', 0),
(46, '000111222', 'Cookie', 'Monster', 'cookie_m@mail.com', '325546dc40466d3bb3648aad57745ffad634fed025743aaeae334639fe432db79d978e052a325a64d0f4536bc2c4adf14419186501dbec90b308666314f2a288', 4, '10 Seasam St. ', 0),
(47, '444555111', 'Ally', 'McBeal', 'a@a.mail.com', '091500d99e361444c9469b35eb6adfe88dd1594e4e8a874e6b8641c625e9a8ba9809685f89e46bbb7998418e0ec4db9cf4a0110401979ed4857e2c6060d7428c', 6, '22th Street', 0),
(48, '999999999', 'Kermit', 'The Frog', 'kermit@frog.com', '0dd3369a0b588a8ff12cd4eacd125c7b16155bf744c63346a87073bf79dd347fc55c9ef2c3ec1eadefe505e3ae2c22bcaa9f2cf04e9fabd63bb26252906eae47', 3, '10 Seasam St. ', 0),
(49, '777777777', 'Homer', 'Simpson', 'homer@simpson.com', '2fbbf935843b67c08da19c6f7f386778b665c90f063012526271835dbb85c02cfd9ca0ae2f69d8878f9c365df6a359bc18a9828c9700bde8ca39890a7e7ce8ba', 7, '1 Main St. ', 0),
(50, '666333999', 'Karen', 'Levin', 'q@q.com', 'f54e449c5d5c71f05ee346ea1c46ba6e1e1673bc437ae3037a9ce7a7b39ab1256494d7a698fa64ed3e91fdc166d20f536782ff004350b2dc64fd2b139ab5b38e', 8, '22 Queen St.', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`itemId`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`cityId`),
  ADD KEY `city` (`city`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `cityId` (`cityId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `shoppingcarts`
--
ALTER TABLE `shoppingcarts`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `city` (`cityId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `itemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `cityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `shoppingcarts`
--
ALTER TABLE `shoppingcarts`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `shoppingcarts` (`cartId`),
  ADD CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `shoppingcarts` (`cartId`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`cityId`) REFERENCES `cities` (`cityId`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`);

--
-- Constraints for table `shoppingcarts`
--
ALTER TABLE `shoppingcarts`
  ADD CONSTRAINT `shoppingcarts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`cityId`) REFERENCES `cities` (`cityId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
