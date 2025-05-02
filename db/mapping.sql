-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2025 at 08:44 PM
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
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `b_id` int(11) NOT NULL,
  `b_households` int(50) NOT NULL,
  `b_water_consm` varchar(50) NOT NULL,
  `b_electricity_consm` varchar(50) NOT NULL,
  `b_incidents` varchar(50) NOT NULL,
  `b_constructions` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `construction`
--

CREATE TABLE `construction` (
  `c_id` int(11) NOT NULL,
  `c_block` varchar(50) DEFAULT NULL,
  `c_hid` varchar(50) DEFAULT NULL,
  `c_status` varchar(50) DEFAULT NULL,
  `c_startDate` date DEFAULT NULL,
  `c_endDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `construction`
--

INSERT INTO `construction` (`c_id`, `c_block`, `c_hid`, `c_status`, `c_startDate`, `c_endDate`) VALUES
(1, 'B', 'B4', NULL, '1212-12-12', '1212-12-12'),
(2, 'B', 'B2', NULL, '1212-12-12', '1212-12-12'),
(3, 'A', 'A3', NULL, '1212-12-12', '1212-12-12'),
(4, 'C', 'C2', 'Upcoming Renovation', '1212-12-12', '1212-12-12');

-- --------------------------------------------------------

--
-- Table structure for table `household`
--

CREATE TABLE `household` (
  `h_id` int(11) NOT NULL,
  `h_status` varchar(50) NOT NULL,
  `h_water_cons` varchar(50) NOT NULL,
  `h_electricity_cons` varchar(50) NOT NULL,
  `h_occupants` int(50) NOT NULL,
  `h_payment_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `incident`
--

CREATE TABLE `incident` (
  `i_id` int(11) NOT NULL,
  `i_block` varchar(50) DEFAULT NULL,
  `i_hid` varchar(50) DEFAULT NULL,
  `i_type` varchar(50) DEFAULT NULL,
  `i_description` varchar(250) DEFAULT NULL,
  `i_status` varchar(50) NOT NULL,
  `i_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incident`
--

INSERT INTO `incident` (`i_id`, `i_block`, `i_hid`, `i_type`, `i_description`, `i_status`, `i_date`) VALUES
(1, 'C', 'C3', 'Noise', 'wrwr', 'Resolved', '2025-05-02'),
(2, 'B', 'B3', 'Noise', 'desc', 'Resolved', '2025-05-02');

-- --------------------------------------------------------

--
-- Table structure for table `notifcation`
--

CREATE TABLE `notifcation` (
  `n_id` int(11) NOT NULL,
  `n_date` date NOT NULL,
  `n_type` varchar(50) NOT NULL,
  `n_subject` varchar(50) NOT NULL,
  `n_recipients` varchar(50) NOT NULL,
  `n_priority` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `p_id` int(11) NOT NULL,
  `p_date` date NOT NULL,
  `p_hid` varchar(50) NOT NULL,
  `p_type` varchar(50) NOT NULL,
  `p_amount` varchar(50) NOT NULL,
  `p_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(8, '124124', '124124124', '124124', '124124124', 'BHPWOBDXIPI1', 'guard', '', '', 'New'),
(9, 'sabi ', 'mosakin', 'pusoing bato', 'wala ka pala...', 'NI128313VTLG', 'guard', '', '', 'New'),
(10, 'yawa ', 'ka', 'atay', 'piste', 'TFODGFR1PTTE', 'guard', '', '', 'New'),
(11, '12312', '31231', '23123124', '24234234234', 'W4PZ6TIWPAFW', 'customer', 'C', 'C10', 'New'),
(12, '123213213', '231213231', '213231123231', '231231213231231', '8CE0BXO3VAX5', 'customer', 'A', 'A9', 'New');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`b_id`);

--
-- Indexes for table `construction`
--
ALTER TABLE `construction`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `household`
--
ALTER TABLE `household`
  ADD PRIMARY KEY (`h_id`);

--
-- Indexes for table `incident`
--
ALTER TABLE `incident`
  ADD PRIMARY KEY (`i_id`);

--
-- Indexes for table `notifcation`
--
ALTER TABLE `notifcation`
  ADD PRIMARY KEY (`n_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `b_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `construction`
--
ALTER TABLE `construction`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `household`
--
ALTER TABLE `household`
  MODIFY `h_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `incident`
--
ALTER TABLE `incident`
  MODIFY `i_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notifcation`
--
ALTER TABLE `notifcation`
  MODIFY `n_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
