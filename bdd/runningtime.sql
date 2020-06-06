-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2020 at 05:18 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `runningtime`
--

-- --------------------------------------------------------

--
-- Table structure for table `cargos`
--

CREATE TABLE `cargos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cargos`
--

INSERT INTO `cargos` (`id`, `nombre`, `descripcion`, `estado`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Administrador', 'Administrador', 1, NULL, '2020-06-03 00:33:12', '2020-06-03 00:33:12'),
(2, 'Coordinador General', 'Coordinador General', 1, NULL, '2020-06-03 00:33:12', '2020-06-03 00:33:12'),
(3, 'Técnico Logístico', 'Técnico Logístico', 1, NULL, '2020-06-03 00:33:12', '2020-06-03 00:33:12'),
(4, 'Cliente', 'Cliente', 1, NULL, '2020-06-03 00:33:12', '2020-06-03 00:33:12'),
(5, 'Tecnico Admin', 'Tecnico plataforma DT', 1, NULL, '2020-06-04 16:38:16', '2020-06-04 16:38:26'),
(6, 'gfdg', 'dfgdfgdfg', 1, '2020-06-04 16:38:35', '2020-06-04 16:38:32', '2020-06-04 16:38:35');

-- --------------------------------------------------------

--
-- Table structure for table `cupos`
--

CREATE TABLE `cupos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `establecimiento_id` bigint(20) UNSIGNED NOT NULL,
  `paquete_id` bigint(20) UNSIGNED NOT NULL,
  `carga` int(10) UNSIGNED NOT NULL,
  `gasto` int(10) UNSIGNED NOT NULL,
  `saldo` int(10) UNSIGNED NOT NULL,
  `fecha_fin` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cupos`
--

INSERT INTO `cupos` (`id`, `establecimiento_id`, `paquete_id`, `carga`, `gasto`, `saldo`, `fecha_fin`, `estado`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1500, 0, 1500, '2020-06-11', 1, NULL, '2020-06-03 00:39:19', '2020-06-03 00:39:19'),
(2, 2, 1, 1500, 12, 1488, '2020-07-10', 1, NULL, '2020-06-03 01:01:10', '2020-06-06 03:03:27'),
(3, 3, 2, 4000, 5, 3995, '2020-06-12', 1, NULL, '2020-06-04 16:58:48', '2020-06-05 00:25:17'),
(4, 4, 1, 1500, 2, 1498, '2020-06-26', 1, NULL, '2020-06-06 02:47:51', '2020-06-06 03:03:55');

-- --------------------------------------------------------

--
-- Table structure for table `establecimientos`
--

CREATE TABLE `establecimientos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `plan_id` bigint(20) UNSIGNED NOT NULL,
  `documento` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actividad` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacidad` int(10) UNSIGNED NOT NULL,
  `estancia` int(10) UNSIGNED NOT NULL,
  `cierre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `publicar` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `establecimientos`
--

INSERT INTO `establecimientos` (`id`, `plan_id`, `documento`, `nombre`, `actividad`, `direccion`, `email`, `telefono`, `logo`, `capacidad`, `estancia`, `cierre`, `estado`, `publicar`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, '1091780891001', 'DTMOWED CIA LTDA', 'Desarrollo de Software', 'Ibarra', 'info@dtmowed.com', '0969191290', '1591376341dtmowed.png', 10, 60, '20:00', 1, 1, NULL, '2020-06-03 00:33:12', '2020-06-05 16:59:03'),
(2, 2, '1091780891', 'La Choza', 'Economia Solidaria', 'Ibarra', 'choza@gmail.com', '96919290', '1591376414logo.fw.png', 20, 30, '21:00', 1, 1, NULL, '2020-06-03 00:37:54', '2020-06-05 17:00:16'),
(3, 1, '1002003004', 'Viveres Rosita', 'Venta por menoe', 'San Antonio', 'rosita@gmail.com', '969191290', '1591376365business zone.png', 10, 30, '18:30', 1, 1, NULL, '2020-06-04 14:30:22', '2020-06-05 16:59:26'),
(4, 2, '5435345345345', 'Busines XZOne', 'dsfsd', 'Quito', 'bus@gmail.com', '96191290', '1591383894ico.png', 30, 50, '18:10', 1, 0, NULL, '2020-06-05 19:05:08', '2020-06-05 19:05:08'),
(5, 1, '121212121', 'KFC Ibarra', 'Venta produtos pollo', 'Ibarra', 'kfc@gmail.com', '969191290', '1591387749kfc.png', 10, 10, '17:54', 1, 1, NULL, '2020-06-05 19:55:06', '2020-06-05 20:09:12');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `historiales`
--

CREATE TABLE `historiales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `qr_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `cupo_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ingreso` datetime NOT NULL,
  `salida` datetime NOT NULL,
  `salida_tentativa` datetime NOT NULL,
  `tiempo` int(10) UNSIGNED NOT NULL,
  `estado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `historiales`
--

INSERT INTO `historiales` (`id`, `qr_id`, `user_id`, `cupo_id`, `nombre`, `ingreso`, `salida`, `salida_tentativa`, `tiempo`, `estado`, `deleted_at`, `created_at`, `updated_at`) VALUES
(17, 4, 4, 2, 'Anahi Cartagena', '2020-06-05 22:03:10', '2020-06-05 22:15:07', '2020-06-05 22:23:10', 0, 'SALIDA', NULL, '2020-06-06 03:03:10', '2020-06-06 03:15:07'),
(18, 2, 4, 2, 'Daniel Cuaspud', '2020-06-05 22:03:27', '2020-06-05 22:15:07', '2020-06-05 22:33:27', 0, 'SALIDA', NULL, '2020-06-06 03:03:27', '2020-06-06 03:15:07'),
(19, 1, 10, 4, 'Ondina Pascal Ri', '2020-06-05 22:03:55', '2020-06-05 22:18:03', '2020-06-05 22:05:55', 0, 'SALIDA', NULL, '2020-06-06 03:03:55', '2020-06-06 03:18:03');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(2, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(3, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(4, '2016_06_01_000004_create_oauth_clients_table', 1),
(5, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(6, '2019_08_19_000000_create_failed_jobs_table', 1),
(7, '2020_05_16_002341_create_cargos_table', 1),
(8, '2020_05_16_172121_create_plans_table', 1),
(9, '2020_05_16_172123_create_establecimientos_table', 1),
(10, '2020_05_17_000000_create_users_table', 1),
(11, '2020_05_18_002358_create_q_r_s_table', 1),
(12, '2020_05_19_002407_create_historials_table', 1),
(13, '2020_05_23_171637_create_noticias_table', 1),
(14, '2020_05_23_171644_create_paquetes_table', 1),
(15, '2020_05_23_171648_create_cupos_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `noticias`
--

CREATE TABLE `noticias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `establecimiento_id` bigint(20) UNSIGNED NOT NULL,
  `titulo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detalle` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_fin` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `noticias`
--

INSERT INTO `noticias` (`id`, `establecimiento_id`, `titulo`, `detalle`, `fecha_fin`, `image`, `estado`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 2, 'titular', 'fdsfsdfsdfds', '2020-06-05', '1591388650icono.png', 1, NULL, '2020-06-03 00:40:04', '2020-06-05 20:24:11'),
(2, 5, 'abre las puertas', 'nuevas promociones', '2020-08-01', '1591388017ookamistore.fw.png', 1, NULL, '2020-06-05 20:13:39', '2020-06-05 20:32:49'),
(3, 1, 'gfgdf', 'gfdgdfgdfg', '2020-06-06', '1591388634larvel7.jpg', 1, NULL, '2020-06-05 20:23:46', '2020-06-05 20:34:36'),
(4, 5, 'MEGA FESTIN 1 10 PRE 12 HOT WING', 'MEGA FESTIN 1 10 PRE 12 HOT WING\n10 presas + 12 alitas picantes\n$16.99', '2020-06-24', '1591390071kfc-twitter-1.jpg', 1, NULL, '2020-06-05 20:32:30', '2020-06-05 20:52:55');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('0010cedaf881721b2a3513507449cd935ac04e42b52be8896f5c121c07b059e0857e4607298b5865', 2, 1, 'qr', '[]', 0, '2020-06-06 03:14:55', '2020-06-06 03:14:55', '2021-06-05 22:14:55'),
('00411dd3780eb1babdeda3ba4f22ad9aff60263f422131c5aff2dce6af050cef4639b6af1357c9c2', 3, 1, 'qr', '[]', 0, '2020-06-05 00:28:37', '2020-06-05 00:28:37', '2021-06-04 19:28:37'),
('0064acb2d709d42f1a3e09f0562045894a8a000509eb1163c494d5a1ed501d76c0c7e3f5fc20eac4', 13, 1, 'qr', '[]', 0, '2020-06-05 16:33:38', '2020-06-05 16:33:38', '2021-06-05 11:33:38'),
('035ac5f944549312e14fc504b6e557d39e8bbb5febfb888611aa6186804d48d6fa496fbbc1acb0f3', 4, 1, 'qr', '[]', 0, '2020-06-05 15:09:07', '2020-06-05 15:09:07', '2021-06-05 10:09:07'),
('04ffd3b14b2aa7bf33d09ebd633e84a0fc282a375522ebebc0872bcd5e809020508fd290b30d0141', 1, 1, 'qr', '[]', 0, '2020-06-03 01:11:39', '2020-06-03 01:11:39', '2021-06-02 20:11:39'),
('089b48e08908586ca32d204af9515a9f37e0023f7de20784eac8448b2ad504eb503ecf937567ec72', 2, 1, 'qr', '[]', 0, '2020-06-03 01:05:57', '2020-06-03 01:05:57', '2021-06-02 20:05:57'),
('08e14351c44c4f9bf01932db18f4157f682de0a60ec5f17c9ee8c6cf3552d8e149ce7137f64b4736', 1, 1, 'qr', '[]', 0, '2020-06-03 00:36:42', '2020-06-03 00:36:42', '2021-06-02 19:36:42'),
('0c11886cf4cba8bc165b3bc9a50af6a7b4fd7cdbd72c7983210bad9a6c1fe606130380a26f65779d', 4, 1, 'qr', '[]', 0, '2020-06-05 15:12:14', '2020-06-05 15:12:14', '2021-06-05 10:12:14'),
('13290a81918e8fc5c2ce9d5b7e9823b09402f77ae3e1004f8efab65bc1e04d4187756b8f34697950', 19, 1, 'qr', '[]', 0, '2020-06-05 20:16:12', '2020-06-05 20:16:12', '2021-06-05 15:16:12'),
('1acce7e2a3138dd05651e4c3595ec7815910e6607a8a00fa18d2701e515122a4d1d1ad7ad2410353', 19, 1, 'qr', '[]', 0, '2020-06-05 19:22:15', '2020-06-05 19:22:15', '2021-06-05 14:22:15'),
('1bc3b05616e6807214f6e40e172ef37840f212c7e9315ed132ea7e4bb091911f5134825e3f17a4f3', 10, 1, 'qr', '[]', 0, '2020-06-06 02:45:57', '2020-06-06 02:45:57', '2021-06-05 21:45:57'),
('1fe2e2b5fa761875455b4e1041ece6da2624c78a68892ce1420081d954ada2a9311b369616d386b3', 2, 1, 'qr', '[]', 0, '2020-06-05 00:25:44', '2020-06-05 00:25:44', '2021-06-04 19:25:44'),
('2015817b5d25d14156705e9ecf18c1639b25cf7fedbd20809c6b231988dd4f1ec702f2a442fd7f79', 19, 1, 'qr', '[]', 0, '2020-06-05 19:10:23', '2020-06-05 19:10:23', '2021-06-05 14:10:23'),
('25cffe3890a98809f4cae31464b76fed6391e46465af66ec1c6cc23cebbe5ce948894bce014da4fd', 10, 1, 'qr', '[]', 0, '2020-06-06 03:03:41', '2020-06-06 03:03:41', '2021-06-05 22:03:41'),
('26ba162d090f4701d12916db748848ea3545e8ec7ab63f0607a05a162c30d3f175db5a37c4c1231c', 1, 1, 'qr', '[]', 0, '2020-06-04 16:58:24', '2020-06-04 16:58:24', '2021-06-04 11:58:24'),
('2b0a54e84498c6274184ec35209a9cbe56660486b6f84829b6595643b94e9f2b2449f86c572f855b', 1, 1, 'qr', '[]', 0, '2020-06-03 00:39:39', '2020-06-03 00:39:39', '2021-06-02 19:39:39'),
('2bbf864662a9135456cca39817a36c2357d77d189855bf2af213a7e9e85319bce6fb306920056a3e', 2, 1, 'qr', '[]', 0, '2020-06-03 01:01:22', '2020-06-03 01:01:22', '2021-06-02 20:01:22'),
('316ce9bfb005b6bbb4768dc94bcabc319f6ca46c68da81f97557e30e045a0ca753ff440fb16ed746', 19, 1, 'qr', '[]', 0, '2020-06-05 19:10:37', '2020-06-05 19:10:37', '2021-06-05 14:10:37'),
('33fae4bf4fad70a90200bb80865219df592c0df984694abe898c7e875d61f119d1031c71212ae924', 2, 1, 'qr', '[]', 0, '2020-06-05 00:29:25', '2020-06-05 00:29:25', '2021-06-04 19:29:25'),
('3511798db2d33443dff8056bad38a1f0ea50259c09154128f8be0839e042d3fa0f6ea28100f63b94', 14, 1, 'qr', '[]', 0, '2020-06-05 17:18:17', '2020-06-05 17:18:17', '2021-06-05 12:18:17'),
('3b4d9199dff19c8775ddd7216b562c5385ee4bbc7d5084f31991afbac7d39e1af816b0ee178ca797', 1, 1, 'qr', '[]', 0, '2020-06-05 19:41:31', '2020-06-05 19:41:31', '2021-06-05 14:41:31'),
('3b6f36aa7f183dab76147598247169986d4fde7f016985a94944253d0d980b4bdf6feaa4a4e41cd6', 1, 1, 'qr', '[]', 0, '2020-06-05 15:05:48', '2020-06-05 15:05:48', '2021-06-05 10:05:48'),
('3c1b45c9a18982b5a8b9220b2043b348d53a3f0db1ba58b2f4073f986b6d14785730a61d451bd30f', 19, 1, 'qr', '[]', 0, '2020-06-05 19:19:29', '2020-06-05 19:19:29', '2021-06-05 14:19:29'),
('3daf702221ddf8f9c3987ef04ace25354e8eaa238dbab36b728bce14c01082854f331bc551616fce', 3, 1, 'qr', '[]', 0, '2020-06-04 16:57:43', '2020-06-04 16:57:43', '2021-06-04 11:57:43'),
('414ee5bf0efdc71b6ba3423387c8ef9035a0d04624a0ae62f8f82ef773ef47d2c50f452b3ceef402', 1, 1, 'qr', '[]', 0, '2020-06-05 00:29:10', '2020-06-05 00:29:10', '2021-06-04 19:29:10'),
('470e5ffc6bda58e987070ea581a69fe2b3975a6ee69bdf365277c199347fd9cc4c41cf813bf972e2', 18, 1, 'qr', '[]', 0, '2020-06-06 03:04:23', '2020-06-06 03:04:23', '2021-06-05 22:04:23'),
('4c3df5b4861e8b3f783f5e4365707897855da66e7a95581d442cf22de444c5f046208dca7dae4c2b', 4, 1, 'qr', '[]', 0, '2020-06-06 03:02:44', '2020-06-06 03:02:44', '2021-06-05 22:02:44'),
('4d45fa9e458d386831c537cb35b4fd204c625d554424e49ad6c54742c2d16b9b50496571540fecfb', 1, 1, 'qr', '[]', 0, '2020-06-05 00:27:28', '2020-06-05 00:27:28', '2021-06-04 19:27:28'),
('4d69c5b20e1a40facf3dccbf7a1dde6361a4cf77d4cdf424dd79be6be65290579a521191e0ab0dae', 10, 1, 'qr', '[]', 0, '2020-06-06 02:47:59', '2020-06-06 02:47:59', '2021-06-05 21:47:59'),
('529efb6e52317059a3ea6de0ef3d6d5561924e7b97b3d873a90f2b1f344ac9c5478cd95fc82cb0c3', 17, 1, 'qr', '[]', 0, '2020-06-05 19:03:12', '2020-06-05 19:03:12', '2021-06-05 14:03:12'),
('53be172fc2d9b51d295b9e5e0c89324448a5aef13acac85910e5163cdd4fc904445189fc2e8f8653', 4, 1, 'qr', '[]', 0, '2020-06-06 02:44:51', '2020-06-06 02:44:51', '2021-06-05 21:44:51'),
('54bc715f65b64504616fa11fef70bca09c64f957821dc183d8d2880db0b2f6381158d119b45b779e', 3, 1, 'qr', '[]', 0, '2020-06-04 16:59:04', '2020-06-04 16:59:04', '2021-06-04 11:59:04'),
('5687a485415fe59de234b340a4007cffd4ba711e8ddc7b4118fc538ee1294eea9aad281aa7f73ca5', 1, 1, 'qr', '[]', 0, '2020-06-04 16:08:48', '2020-06-04 16:08:48', '2021-06-04 11:08:48'),
('59f35484eb61ac296ccc674573225d1e66893ef78284c8550f3fa227045de5059e4258785a606711', 1, 1, 'qr', '[]', 0, '2020-06-05 15:11:16', '2020-06-05 15:11:16', '2021-06-05 10:11:16'),
('5a9af9e1046fbcfe5b28a52f02ace60e23ade9b20493cee980b5f3b13a84e691ac22cb41812e281a', 1, 1, 'qr', '[]', 0, '2020-06-04 16:09:55', '2020-06-04 16:09:55', '2021-06-04 11:09:55'),
('5f47d423c3ce5ac014e24093938d9ce56372831588953d174a5c5534f7935ce407faf6a9df5daf2c', 19, 1, 'qr', '[]', 0, '2020-06-05 19:12:56', '2020-06-05 19:12:56', '2021-06-05 14:12:56'),
('61da875995909639cde655ffd92cf9bc2b0724494ace61f26b1ddccab178a9ade3c3bdea314d6139', 19, 1, 'qr', '[]', 0, '2020-06-06 01:02:17', '2020-06-06 01:02:17', '2021-06-05 20:02:17'),
('659565b49640b3a6bd60244702b8d7f26a2449eb650ea3755dcb506ae69570a8941ac325d60221ce', 18, 1, 'qr', '[]', 0, '2020-06-06 03:16:09', '2020-06-06 03:16:09', '2021-06-05 22:16:09'),
('6771057bb56524b499a07cccfff8bd14ee60dc63043e17978773bd7b861b90dea53ff97885e2e1f3', 1, 1, 'qr', '[]', 0, '2020-06-06 02:42:11', '2020-06-06 02:42:11', '2021-06-05 21:42:11'),
('6ad618b605c4a1f93d62979b84b73ee920276e3dddce047907019216ee4c62fb0829aa171916bc1d', 1, 1, 'qr', '[]', 0, '2020-06-03 00:55:45', '2020-06-03 00:55:45', '2021-06-02 19:55:45'),
('6c925c3be8510c69a0699da187574e7600cab708687ab6fccad4c33ba6da48590163b5c0c0485b80', 2, 1, 'qr', '[]', 0, '2020-06-03 01:05:37', '2020-06-03 01:05:37', '2021-06-02 20:05:37'),
('6c9b18b9f39bcc8a1b970b391f4acd9034950776e5458ec018a62ca7106af81af292b704a277521e', 19, 1, 'qr', '[]', 0, '2020-06-05 19:09:51', '2020-06-05 19:09:51', '2021-06-05 14:09:51'),
('701673958e1692119f71b79d26ebf4fe992d5e368f697b7d68499507f0ba286cd8bfd0af3c7aea92', 1, 1, 'qr', '[]', 0, '2020-06-04 16:10:51', '2020-06-04 16:10:51', '2021-06-04 11:10:51'),
('71114d491308788ede320a79c1d7fae6ee75390362816a920afc1d4d585719adfe6c0e23438e6cbd', 3, 1, 'qr', '[]', 0, '2020-06-04 16:10:40', '2020-06-04 16:10:40', '2021-06-04 11:10:40'),
('781981f5f4bfd05629bf0c41250bd5f56e2f3ebb38a024659e8df280127c5c479243935956b8d24a', 19, 1, 'qr', '[]', 0, '2020-06-05 20:11:59', '2020-06-05 20:11:59', '2021-06-05 15:11:59'),
('782ee7ecbe166f15e08eb27bf71a6993aab5332e99b35df274c27da5e60ef17d61a0df478f43f52f', 1, 1, 'qr', '[]', 0, '2020-06-06 02:46:36', '2020-06-06 02:46:36', '2021-06-05 21:46:36'),
('84d643507949983a7c07021a32b70115cfdf429692e56efb6d0e231d010b7d832fbbe679f896ca0a', 19, 1, 'qr', '[]', 0, '2020-06-06 01:39:24', '2020-06-06 01:39:24', '2021-06-05 20:39:24'),
('91dd6f0d3bab634295f49b8cf93cd52a8c6aaf4e4b54d81063e3d201d5c753b976d8a590aed08904', 2, 1, 'qr', '[]', 0, '2020-06-03 01:05:38', '2020-06-03 01:05:38', '2021-06-02 20:05:38'),
('974d87e48b3dbf2d73bce437f34a0aef9a07b0c1c8d941637321f31cafec1db6a69eab763f94cf45', 1, 1, 'qr', '[]', 0, '2020-06-04 16:45:17', '2020-06-04 16:45:17', '2021-06-04 11:45:17'),
('98d03b7a4fda8ab0d7b723decf9837080621f43e5bd457972a984a5186035614c39ffe0eefa8ba1b', 1, 1, 'qr', '[]', 0, '2020-06-06 03:04:06', '2020-06-06 03:04:06', '2021-06-05 22:04:06'),
('9af9fe36ecc7a5d2cfcbfae2a15d1bb09a6d2363ceab3f6096273ba50a493ee1a0d94a322954b5ea', 1, 1, 'qr', '[]', 0, '2020-06-06 02:47:30', '2020-06-06 02:47:30', '2021-06-05 21:47:30'),
('9c40afba8b1644bb38964283fbc93a9c8eddb3949792c475a69bb89e474a42fc6336c405d2d4b670', 4, 1, 'qr', '[]', 0, '2020-06-04 16:00:08', '2020-06-04 16:00:08', '2021-06-04 11:00:08'),
('9f76c898d2587bdd2a244a1539fa93b4a55302f314fd4d09fe6f748af09087dc2fd64766763b3aea', 14, 1, 'qr', '[]', 0, '2020-06-05 17:18:11', '2020-06-05 17:18:11', '2021-06-05 12:18:11'),
('a0caa987711213ce06221d7b03be6b91bb7c344c40ebdfb61e86ef2bbbdd67fce0b859d763a74716', 2, 1, 'qr', '[]', 0, '2020-06-03 01:00:24', '2020-06-03 01:00:24', '2021-06-02 20:00:24'),
('a16bbfdd3f45e9cd10749668b61f5e3f322f7a212cd5d3ed4c78d4f74cf64ae92ce0183ca7ae101b', 19, 1, 'qr', '[]', 0, '2020-06-05 19:10:10', '2020-06-05 19:10:10', '2021-06-05 14:10:10'),
('a4ad1cf1680ed0f996d6f44402e1c6d0694c75f301291396a66bd9bc5c589f6abc559d90feeb01a4', 17, 1, 'qr', '[]', 0, '2020-06-05 19:03:01', '2020-06-05 19:03:01', '2021-06-05 14:03:01'),
('a574788f631e9d7fedcd0b0383e98acc37a03d1fbc3bf9ebdc1a19a9480ca30adb3898e9acbf713a', 4, 1, 'qr', '[]', 0, '2020-06-06 02:56:02', '2020-06-06 02:56:02', '2021-06-05 21:56:02'),
('a758a5072253b5feaf4ba537420ac1c459b2e1f179ebda58a85489008c262246c7153afb022074e1', 1, 1, 'qr', '[]', 0, '2020-06-06 02:48:42', '2020-06-06 02:48:42', '2021-06-05 21:48:42'),
('adc4f07321d5c484bbea4401a647d0e032259ac944e5c4517febdc24708a48f11d396f5c5e76d068', 19, 1, 'qr', '[]', 0, '2020-06-05 19:30:18', '2020-06-05 19:30:18', '2021-06-05 14:30:18'),
('af1eae26c3520a5d5f7cbf48d9be389275b34d98cca82d77ab45dd7e546b76883f21884fcffd6cb4', 14, 1, 'qr', '[]', 0, '2020-06-05 17:18:03', '2020-06-05 17:18:03', '2021-06-05 12:18:03'),
('b06838b1851cdf6ab590346f39ee9fb0115cbfb97b5047e36091900c393a1648d5b817437c843e6b', 1, 1, 'qr', '[]', 0, '2020-06-04 15:41:18', '2020-06-04 15:41:18', '2021-06-04 10:41:18'),
('b1b2dc22b207ea51a46b04982e82c6cafc8ce0012b881c91ba75d294a457b14bf3ebf43d08083e4b', 3, 1, 'qr', '[]', 0, '2020-06-05 00:24:27', '2020-06-05 00:24:27', '2021-06-04 19:24:27'),
('b2596b07aa90a0cd15b33b8f6d9eac53911d8a8c7fdca3569958407a4528740e3450d40aedeea53b', 19, 1, 'qr', '[]', 0, '2020-06-05 19:49:40', '2020-06-05 19:49:40', '2021-06-05 14:49:40'),
('b37da5a3b6908953dcaf8f64ed8ea2a2c17260dd932a4d65d0187ee73a743db8982aee3b0d79eb47', 15, 1, 'qr', '[]', 0, '2020-06-05 18:55:06', '2020-06-05 18:55:06', '2021-06-05 13:55:06'),
('b4f4b5749565fa07f035d134dff4c70c5d9b2c08ea90e74e9224fa38b39bfe19542017fc2e16a598', 1, 1, 'qr', '[]', 0, '2020-06-04 16:44:25', '2020-06-04 16:44:25', '2021-06-04 11:44:25'),
('b5c2118bbddda7fb742778ddbd0688db86080036f17028a544fbd2162996d2fdbad1a3eaf6c133d5', 19, 1, 'qr', '[]', 0, '2020-06-05 20:11:53', '2020-06-05 20:11:53', '2021-06-05 15:11:53'),
('bdea5b70ce7a881d914b7435886f459d116520bfc854a7221955352dd7b68d07bf951b02e97fa545', 19, 1, 'qr', '[]', 0, '2020-06-05 20:16:09', '2020-06-05 20:16:09', '2021-06-05 15:16:09'),
('c45518df41dc350a96ce8e7d775ce4d1834c685ebb5fba19979b9418fd0a9125ddf5acb1434760e0', 1, 1, 'qr', '[]', 0, '2020-06-04 15:36:20', '2020-06-04 15:36:20', '2021-06-04 10:36:20'),
('c4f257f27c3f3413705b447716f4f4a8a707b4cf9262c74cb3aa67186298577525a8a1d6546deeb6', 13, 1, 'qr', '[]', 0, '2020-06-05 16:36:31', '2020-06-05 16:36:31', '2021-06-05 11:36:31'),
('c9defb2e832eb0d69d83d22dc4941ffbda9e4c2e7be41d8ec5684e302e314fc92e524a2939ca05f4', 4, 1, 'qr', '[]', 0, '2020-06-05 00:27:53', '2020-06-05 00:27:53', '2021-06-04 19:27:53'),
('d00494fa6c3a4783e4fa57ccd87a5e9b31f4bb3ecbb46476db23c3a6f7707e85e5a2d751653eaee6', 1, 1, 'qr', '[]', 0, '2020-06-05 15:15:57', '2020-06-05 15:15:57', '2021-06-05 10:15:57'),
('d0a580f15c8d28b0c149af933f6b220675b9eb867ca44f2acef004127e09535efe921a2baf7c4830', 18, 1, 'qr', '[]', 0, '2020-06-06 03:14:35', '2020-06-06 03:14:35', '2021-06-05 22:14:35'),
('d200ee30cff5b9de7b8579783249dd5b899e14531576e4e01a69ea9f46bac1f09584513fc2fec339', 10, 1, 'qr', '[]', 0, '2020-06-06 02:47:12', '2020-06-06 02:47:12', '2021-06-05 21:47:12'),
('d368249a38a9c91ff53cbc7cdc997bf89567040883d8a5d3102b5ab51aecf0dcb81c7621a9545935', 18, 1, 'qr', '[]', 0, '2020-06-06 02:46:26', '2020-06-06 02:46:26', '2021-06-05 21:46:26'),
('d53703c30501c94f29e85bcc59a7c5ddf1a3636381acbec495234ae8696400ebbe3e05de015d81b5', 19, 1, 'qr', '[]', 0, '2020-06-05 19:20:58', '2020-06-05 19:20:58', '2021-06-05 14:20:58'),
('d5c71b1e0ea543ee9bf74454c5cfb0bd477626786cfefe2982efd5a710cf0bea90809131a913aa0a', 1, 1, 'qr', '[]', 0, '2020-06-04 15:58:05', '2020-06-04 15:58:05', '2021-06-04 10:58:05'),
('d68b493bd14a8b16c71eed0939e0cffa11c5df5407078907420e5da60ebdf48f60ecb7dab03c629c', 2, 1, 'qr', '[]', 0, '2020-06-06 02:49:09', '2020-06-06 02:49:09', '2021-06-05 21:49:09'),
('dfc096cf6201470771afe339a908fcc894343420b7fe0b3c9c731a4239918a94425f2fde56868ef9', 1, 1, 'qr', '[]', 0, '2020-06-06 03:00:48', '2020-06-06 03:00:48', '2021-06-05 22:00:48'),
('e379f1c5038f507743be54ad30e3f36c881fb500ca70e713871710396ce6dced383b2cd10f1dc83f', 1, 1, 'qr', '[]', 0, '2020-06-04 14:00:36', '2020-06-04 14:00:36', '2021-06-04 09:00:36'),
('ea37dc9b195fcbbf063ccd858745fc00f036428f7fd80039ca2005844158104a884cb60b14553558', 2, 1, 'qr', '[]', 0, '2020-06-04 16:44:10', '2020-06-04 16:44:10', '2021-06-04 11:44:10'),
('eb160ab885ccf84f65bda2fca9a9a6eefc8099c431968ef896b1dcd6ff95050766df0cdef39f75c1', 19, 1, 'qr', '[]', 0, '2020-06-05 19:30:22', '2020-06-05 19:30:22', '2021-06-05 14:30:22'),
('ec726e86ad831ac7e587710f991c0ba3a3f5b82b7c7821ade174ff076ca945dde975ce936baad473', 1, 1, 'qr', '[]', 0, '2020-06-05 16:58:36', '2020-06-05 16:58:36', '2021-06-05 11:58:36'),
('ef8d484aab8264afde2f81c0342e6cad825f788e887b476b2f31e962a992f62cc3142fc3e869074a', 1, 1, 'qr', '[]', 0, '2020-06-05 00:23:45', '2020-06-05 00:23:45', '2021-06-04 19:23:45'),
('f1be1f68c90c87e1d088ebca3dd330d2f25f96feb53e20103c94454d088ff3341318551db9dd7deb', 19, 1, 'qr', '[]', 0, '2020-06-05 19:20:52', '2020-06-05 19:20:52', '2021-06-05 14:20:52'),
('f31bd5e7d20c9946547c3f7597df3fd5dbf17ae925053bac7b301086e1a72adf42105382740e8c96', 13, 1, 'qr', '[]', 0, '2020-06-05 16:36:03', '2020-06-05 16:36:03', '2021-06-05 11:36:03'),
('f46376f8643ea4edda257527a1d7b88f9cbe322222c39e9444d2a8e207e5ca95b81c774f78072ebb', 13, 1, 'qr', '[]', 0, '2020-06-05 16:35:53', '2020-06-05 16:35:53', '2021-06-05 11:35:53'),
('f50b5ef41d72634db013b46b8b79919ad2ad59300cb113c4a232de919738eb0b268eb2649c7bbf94', 1, 1, 'qr', '[]', 0, '2020-06-05 19:51:12', '2020-06-05 19:51:12', '2021-06-05 14:51:12'),
('f58ce7b5180d7244afdcbb0a9fe38143985d810dccd11dd886a08ec3b0503e61a141d14e1f74e967', 18, 1, 'qr', '[]', 0, '2020-06-05 19:06:17', '2020-06-05 19:06:17', '2021-06-05 14:06:17'),
('f63f58c3996da3b5e4414c27d2b7bff87295f3405ccf0f2aba955349ef66bf882237eb6f5f922dc8', 19, 1, 'qr', '[]', 0, '2020-06-05 19:22:19', '2020-06-05 19:22:19', '2021-06-05 14:22:19'),
('f9d8ffe851bb72d56f9996d048a85e908b38b844f6cd332c21f6b7ed62d05913f2bbf7c67bf83c15', 19, 1, 'qr', '[]', 0, '2020-06-05 19:13:23', '2020-06-05 19:13:23', '2021-06-05 14:13:23'),
('fa00fa7b850c98f3ec1d047bb825f6a3558c7d3d3d38fc6db4f127ab29206c9c1863cd9490c778a7', 2, 1, 'qr', '[]', 0, '2020-06-04 16:44:59', '2020-06-04 16:44:59', '2021-06-04 11:44:59'),
('fb21fc4e68be59e97750477ad51e141cd4b31c010f823ae10bd9e0dd88106f5b09d5da10107c2ed0', 1, 1, 'qr', '[]', 0, '2020-06-05 00:26:43', '2020-06-05 00:26:43', '2021-06-04 19:26:43'),
('fbe05e6661d820707a118652600f2b8043b9494a4ef1946df3dfd1ede48d973f7f664c7c89a09dfa', 1, 1, 'qr', '[]', 0, '2020-06-04 14:28:04', '2020-06-04 14:28:04', '2021-06-04 09:28:04'),
('ff13e8e4f26ef15f997139f9af6c5027b2058113a6c79df4fb787587d3cdcfce1d179b1ee82ab1dc', 19, 1, 'qr', '[]', 0, '2020-06-06 01:19:01', '2020-06-06 01:19:01', '2021-06-05 20:19:01'),
('ffc75c43c404524133ad113930bdd625613f5ca18250284908f6ff3d9d84635299772244ef635b2a', 1, 1, 'qr', '[]', 0, '2020-06-06 03:12:34', '2020-06-06 03:12:34', '2021-06-05 22:12:34'),
('fffc04c04cca901888e4c35dcaaad5e509cbb45f9d30219648111f29df6345b3b3fdb3ce7937dc1b', 4, 1, 'qr', '[]', 0, '2020-06-05 00:28:54', '2020-06-05 00:28:54', '2021-06-04 19:28:54');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'ySfwRujPKJlNyItYZuc638vB44BuPmqOBTgFx8zG', NULL, 'http://localhost', 1, 0, 0, '2020-06-03 00:33:05', '2020-06-03 00:33:05'),
(2, NULL, 'Laravel Password Grant Client', 'PDV9NSZ0c7r9AF6GsufEre0tnIugFg7OROCj4zBs', 'users', 'http://localhost', 0, 1, 0, '2020-06-03 00:33:06', '2020-06-03 00:33:06');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2020-06-03 00:33:05', '2020-06-03 00:33:05');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paquetes`
--

CREATE TABLE `paquetes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `plan_id` bigint(20) UNSIGNED NOT NULL,
  `cupo` int(11) NOT NULL,
  `valor` double NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `paquetes`
--

INSERT INTO `paquetes` (`id`, `plan_id`, `cupo`, `valor`, `estado`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1500, 15, 1, NULL, '2020-06-03 00:33:13', '2020-06-03 00:33:13'),
(2, 1, 4000, 25, 1, NULL, '2020-06-03 00:33:13', '2020-06-03 00:33:13'),
(3, 2, 25000, 250, 1, NULL, '2020-06-03 00:33:13', '2020-06-03 00:33:13'),
(4, 1, 99, 10, 1, '2020-06-04 16:40:26', '2020-06-04 16:40:12', '2020-06-04 16:40:26');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detalle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `nombre`, `detalle`, `estado`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Empresarial', 'Capacidad maxima 4.000', 1, NULL, '2020-06-03 00:33:12', '2020-06-03 00:33:12'),
(2, 'Centro Comercial', 'Capacidad maxima 500.000', 1, NULL, '2020-06-03 00:33:12', '2020-06-03 00:33:12'),
(3, 'Establecimiento', 'gfdg', 1, '2020-06-04 16:38:54', '2020-06-04 16:38:44', '2020-06-04 16:38:54');

-- --------------------------------------------------------

--
-- Table structure for table `qrs`
--

CREATE TABLE `qrs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `codqr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tiempo` int(11) NOT NULL,
  `estado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Activo',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `qrs`
--

INSERT INTO `qrs` (`id`, `user_id`, `codqr`, `nombre`, `tiempo`, `estado`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 2, 'Ondi', 'Ondina Pascal Ri', 2, 'Activo', NULL, '2020-06-03 01:00:02', '2020-06-05 00:24:05'),
(2, 3, 'http://eci-qr.com/c/925p6zvwm4', 'Daniel Cuaspud', 30, 'Activo', NULL, '2020-06-04 14:36:32', '2020-06-04 16:33:27'),
(3, 4, 'marifer', 'Maritza Figueroa', 2, 'Activo', NULL, '2020-06-04 15:58:53', '2020-06-04 15:58:53'),
(4, 1, 'http://eci-qr.com/c/qrymp3gc47', 'Anahi Cartagena', 20, 'Activo', NULL, '2020-06-04 16:34:04', '2020-06-04 16:34:43'),
(6, 10, 'tertret', 'Marcelo Manosalvas', 60, 'Activo', NULL, '2020-06-04 18:10:04', '2020-06-04 18:11:13'),
(7, 13, 'Jose1991', 'Jose Daniel', 60, 'Activo', NULL, '2020-06-05 16:33:38', '2020-06-05 16:33:38'),
(8, 14, 'Marifernanda', 'Maritza Figueria', 60, 'Activo', NULL, '2020-06-05 17:18:02', '2020-06-05 17:18:02'),
(9, 15, 'pirulito', 'jghjghj', 60, 'Activo', NULL, '2020-06-05 18:55:05', '2020-06-05 18:55:05'),
(10, 17, 'pedro', 'Pedro Mendez', 60, 'Activo', NULL, '2020-06-05 19:03:01', '2020-06-05 19:03:01'),
(11, 18, 'JuanC', 'Juan Carlso Cartagena', 60, 'Activo', NULL, '2020-06-05 19:06:00', '2020-06-05 19:06:00'),
(12, 19, 'Lucia', 'Ana Lucia', 60, 'Activo', NULL, '2020-06-05 19:09:51', '2020-06-05 19:09:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cargo_id` bigint(20) UNSIGNED NOT NULL,
  `establecimiento_id` bigint(20) UNSIGNED NOT NULL,
  `cuenta` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cedula` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_nacimiento` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aceptacion` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `cargo_id`, `establecimiento_id`, `cuenta`, `nombre`, `password`, `email`, `cedula`, `direccion`, `telefono`, `fecha_nacimiento`, `image`, `estado`, `token`, `aceptacion`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'test', 'Developer Figo', '$2y$10$p3fumDgiyXxqM45i8m4vdeSoEE7AuapUY.c7VSLwyJ6QXWg4Yl7RS', 'test@gmail.com', '1003833447', 'Ibarra', '0969191290', '', '1591283092users-vector-icon-png_260862.jpg', 1, NULL, 1, NULL, '2020-06-03 00:33:13', '2020-06-06 03:14:25'),
(2, 2, 2, 'Ondi', 'Ondina Pascal Ri', '$2y$10$dZa/FSd2HWVxodoYzp8iQ.IXPa/FuRq3l/HEGs0VYju3zTvAjoRqK', 'ondi@gmail.com', '1003833447', 'Quito', '969191290', '1991-10-10', '1591145988user4.jpg', 1, NULL, 1, NULL, '2020-06-03 01:00:02', '2020-06-06 03:16:00'),
(3, 3, 3, 'daniel', 'Daniel Cuaspud', '$2y$10$uTdQzNN15gaUwpJNHfdmHuQaUYu34pKfCkRBEFwAZ1qP9rJD4ZDFi', 'dany@gmail.com', '1111111111', 'Ibarra', '961991290', '1997-12-03', '1591281387images (1).jpg', 1, NULL, 1, NULL, '2020-06-04 14:36:32', '2020-06-05 00:28:46'),
(4, 3, 2, 'marifer', 'Maritza Figueroa', '$2y$10$t8J9LiCTeh0lh4WImxA6Yem..GQv0INS4epH0pyt2/lG/rQuRN.t2', 'mary@gmail.com', '9599919', 'Ibarra', '96191290', '1998-12-12', '1591286943images.png', 1, NULL, 1, NULL, '2020-06-04 15:58:53', '2020-06-06 03:03:31'),
(10, 3, 4, 'Marcelo', 'Marcelo Manosalvas', '$2y$10$9a79jEIx/vuIkVWK5NbUpuRrAJDSoP/vUs4jxQ/kckW0Y.ExcY7rq', 'pepgge@gmail.com', '5435435', 'Quito', '324324324', '\\\"\"', NULL, 1, NULL, 1, NULL, '2020-06-04 18:10:04', '2020-06-06 03:04:00'),
(13, 4, 1, 'Jose1991', 'Jose Daniel', '$2y$10$YHDkVfznQDzntyZNXLZmyOEOSETgYRT1StQ.IsDvUJgt3Rc.HeKLK', NULL, NULL, NULL, '969191290', NULL, NULL, 1, '$2y$10$pmmomHnFZpOlAVmZu0n/ZOBOX3VSw2nvbReX9/oCqBXIhTC/a9vhq', 1, NULL, '2020-06-05 16:33:38', '2020-06-05 16:36:30'),
(14, 4, 1, 'Marifernanda', 'Maritza Figueria', '$2y$10$Sfk8HvmgG6Nx77pbngLj8uuKbcTJPNOvULi4I/CGtXmBa.SJfUUni', NULL, NULL, NULL, '969191290', NULL, NULL, 1, '$2y$10$8mDAm.tXMO8mf.QSSV3OjeG8KSd.yyGn9j30vtRU6owE/PKgmjMBe', 1, NULL, '2020-06-05 17:18:02', '2020-06-05 17:18:16'),
(15, 4, 1, 'pirulito', 'jghjghj', '$2y$10$aHBb7XBWFStNuC0AGWtgWOsnQIZaqJERfUgn28iqaV.X0rI92u7qW', NULL, NULL, NULL, '65765756', NULL, NULL, 1, NULL, 1, NULL, '2020-06-05 18:55:05', '2020-06-05 18:55:05'),
(17, 4, 1, 'pedro', 'Pedro Mendez', '$2y$10$.Ejr8TsXrQ4P4UrjueAGDO5urRH0openvcfBQC1pnDDNLlCJe3ZUi', NULL, NULL, NULL, '6546456', NULL, NULL, 1, '$2y$10$p5BN6LUeIec0MWmeLs5m1.RJshk/xkD8dmIBfzBzvGwCTCe4ZyBe6', 1, NULL, '2020-06-05 19:03:01', '2020-06-05 19:03:12'),
(18, 2, 4, 'JuanC', 'Juan Carlso Cartagena', '$2y$10$Cjx7gWFR0SrnCG6bBx9GWuPJ9/wyXJoZ3A8sij./1/AW5KPA9O7fm', 'juan@gmail.com', '1021561651651', 'Quito', '9691919290', '1985-10-10', NULL, 1, '$2y$10$ziPkfcQl.oWvnxnY.uLqIO5rnw0e6Ba4Nnh0Ev1xpESY6xpueRh5K', 0, NULL, '2020-06-05 19:06:00', '2020-06-06 03:16:09'),
(19, 4, 1, 'Lucia', 'Ana Lucia', '$2y$10$8WVczPxpb86IRlzm8rGiTOhqeLg0uhm0F73WLU.3lxCjTeQJk20Wm', NULL, NULL, NULL, '969191290', NULL, NULL, 1, '$2y$10$cy.hAepzVY0l8iF6/NtlQ.cur5bSE3ucMricilRpn04fuz0.eQz3O', 1, NULL, '2020-06-05 19:09:51', '2020-06-06 01:39:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cupos`
--
ALTER TABLE `cupos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cupos_establecimiento_id_foreign` (`establecimiento_id`),
  ADD KEY `cupos_paquete_id_foreign` (`paquete_id`);

--
-- Indexes for table `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `establecimientos_plan_id_foreign` (`plan_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `historiales`
--
ALTER TABLE `historiales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `historiales_qr_id_foreign` (`qr_id`),
  ADD KEY `historiales_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `noticias_establecimiento_id_foreign` (`establecimiento_id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paquetes`
--
ALTER TABLE `paquetes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paquetes_plan_id_foreign` (`plan_id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qrs`
--
ALTER TABLE `qrs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `qrs_codqr_unique` (`codqr`),
  ADD KEY `qrs_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_cuenta_unique` (`cuenta`),
  ADD KEY `users_cargo_id_foreign` (`cargo_id`),
  ADD KEY `users_establecimiento_id_foreign` (`establecimiento_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cupos`
--
ALTER TABLE `cupos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `establecimientos`
--
ALTER TABLE `establecimientos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `historiales`
--
ALTER TABLE `historiales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `paquetes`
--
ALTER TABLE `paquetes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `qrs`
--
ALTER TABLE `qrs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cupos`
--
ALTER TABLE `cupos`
  ADD CONSTRAINT `cupos_establecimiento_id_foreign` FOREIGN KEY (`establecimiento_id`) REFERENCES `establecimientos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cupos_paquete_id_foreign` FOREIGN KEY (`paquete_id`) REFERENCES `paquetes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD CONSTRAINT `establecimientos_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `historiales`
--
ALTER TABLE `historiales`
  ADD CONSTRAINT `historiales_qr_id_foreign` FOREIGN KEY (`qr_id`) REFERENCES `qrs` (`id`),
  ADD CONSTRAINT `historiales_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `noticias`
--
ALTER TABLE `noticias`
  ADD CONSTRAINT `noticias_establecimiento_id_foreign` FOREIGN KEY (`establecimiento_id`) REFERENCES `establecimientos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `paquetes`
--
ALTER TABLE `paquetes`
  ADD CONSTRAINT `paquetes_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `qrs`
--
ALTER TABLE `qrs`
  ADD CONSTRAINT `qrs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_cargo_id_foreign` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_establecimiento_id_foreign` FOREIGN KEY (`establecimiento_id`) REFERENCES `establecimientos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
