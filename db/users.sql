-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2025 at 09:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mapping`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_fn` varchar(50) DEFAULT NULL,
  `u_ln` varchar(50) DEFAULT NULL,
  `u_mi` varchar(50) DEFAULT NULL,
  `u_email` varchar(50) DEFAULT NULL,
  `u_refs` varchar(250) DEFAULT NULL,
  `u_type` varchar(50) DEFAULT NULL,
  `u_block` varchar(50) DEFAULT NULL,
  `u_hid` varchar(50) DEFAULT NULL,
  `u_status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_fn`, `u_ln`, `u_mi`, `u_email`, `u_refs`, `u_type`, `u_block`, `u_hid`, `u_status`) VALUES
(1, '123', '12312', '3123123', '123123', 'SCD5R0TV1D2J', 'customer', 'B', 'B8', NULL),
(2, 'First name', 'last name', 'middle name', 'email', '2M5U50OROV3F', 'customer', 'A', 'A1', NULL),
(3, '2', '2', '2', '2', '5ZKLUMQL2HMF', 'guard', '', '', NULL),
(4, '3', '3', '3', '3', '7159AXP2IDBI', 'guard', '', '', NULL),
(5, '4', '4', '4', '4', 'UVTQ3S9YIWWJ', 'guard', '', '', NULL),
(6, '23232', '3232323', '2323', '23232', 'O96BMTZ18ELN', 'guard', '', '', NULL),
(7, '124124124124124', '4442412414', '1241241', '24124', '1WW6VTQDCDAI', 'guard', '', '', 'New'),
(8, '124124', '124124124', '124124', '124124124', 'BHPWOBDXIPI1', 'guard', '', '', 'New');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
