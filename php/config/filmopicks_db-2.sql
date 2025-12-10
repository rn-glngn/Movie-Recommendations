-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2025 at 08:42 PM
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
-- Database: `filmopicks_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `genre_id` int(11) NOT NULL,
  `genre_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`genre_id`, `genre_name`) VALUES
(1, 'Action & Adventure'),
(2, 'Animation'),
(3, 'Comedy'),
(4, 'Crime'),
(5, 'Documentary'),
(6, 'Drama'),
(7, 'Family'),
(8, 'Fantasy'),
(9, 'Horror'),
(10, 'LGBTQ'),
(11, 'Mystery'),
(12, 'Romance'),
(13, 'Science Fiction'),
(14, 'Thriller');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `synopsis` text DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `duration` int(11) DEFAULT NULL COMMENT 'Duration in minutes',
  `type` enum('movie','series') DEFAULT 'movie',
  `poster_url` varchar(255) DEFAULT NULL,
  `background_url` varchar(255) DEFAULT NULL,
  `trailer_url` varchar(255) DEFAULT NULL,
  `language` varchar(50) DEFAULT 'English',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `title`, `description`, `synopsis`, `release_date`, `duration`, `type`, `poster_url`, `background_url`, `trailer_url`, `language`, `created_at`, `updated_at`) VALUES
(1, 'Joker', ' Arthur Fleck, a party clown and a failed stand-up comedian, leads an impoverished life with his ailing mother. However, when society shuns him and brands him as a freak, he decides to embrace the life of chaos in Gotham City.\r\n', 'In 1981, party clown and aspiring stand-up comedian Arthur Fleck (Joaquin Phoenix) a mentally ill, impoverished man disregarded by society, lives with his mother, Penny (Frances Conroy), in Gotham City. Gotham is rife with crime and unemployment. Social services have been franchised and impoverished. Even the nicest sections of the city are now looking like slums due to the breakdown of social services. Penny has been writing letters to Thomas Wayne (Brett Cullen), asking him as the city\'s richest man for a hand out. Penny expects an answer and an offer for help from Thomas, but the letter from Thomas never arrives. Arthur suffers from a neurological disorder that causes him to have random, uncontrollable laughing fits, requiring medication he depends on social services to obtain. Arthur is in a terminal state of depression and none of the medications are able to lift his spirits.\r\n', '2019-10-04', 148, 'movie', '../assets/images/joker.jpg', '../assets/images/joker.jpg', 'https://www.youtube.com/watch?v=YoHD9XEInc0', 'English', '2025-12-10 03:59:53', '2025-12-10 06:11:38'),
(2, 'Interstellar', 'A journey through space and time.', 'A team of explorers travel through a wormhole in space to ensure humanity’s survival.', '2014-11-07', 169, 'movie', '../assets/images/interstellar.jpg', 'uploads/backgrounds/interstellar_bg.jpg', 'https://www.youtube.com/watch?v=zSWdZVtXT7E', 'English', '2025-12-10 03:59:53', '2025-12-10 06:59:35'),
(3, 'The Dark Knight', 'Batman faces Joker in Gotham.', 'Batman sets out to stop the Joker, a criminal mastermind spreading chaos across Gotham.', '2008-07-18', 152, 'movie', '../assets/images/The_Dark_Knight_(2008_film).jpg', '../assets/images/The_Dark_Knight_(2008_film).jpg', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 'English', '2025-12-10 03:59:53', '2025-12-10 19:35:40'),
(4, 'Avengers: Endgame', 'Heroes unite to defeat Thanos.', 'The Avengers assemble once more to reverse the devastating effects caused by Thanos.', '2019-04-26', 181, 'movie', '../assets/images/endgame.jpg', '../assets/images/endgame.jpg', 'https://www.youtube.com/watch?v=TcMBFSGVi1c', 'English', '2025-12-10 03:59:53', '2025-12-10 19:20:03'),
(5, 'Avatar', 'Sci-fi fantasy on an alien world.', 'A paraplegic Marine dispatched to Pandora becomes torn between following orders and protecting the world.', '2009-12-18', 162, 'movie', '../assets/images/avatar.jpg', '../assets/images/avatar.jpg', 'https://www.youtube.com/watch?v=6ziBFh3V1aM', 'English', '2025-12-10 03:59:53', '2025-12-10 19:27:08'),
(6, 'Wall-E', 'A robot who is responsible for cleaning a waste-covered Earth meets another robot and falls in love with her. Together, they set out on a journey that will alter the fate of mankind.\r\n', 'In a distant future, Earth has been abandoned by humans after it became covered in trash and pollution. WALL·E, a small waste-collecting robot, is left behind to clean up the planet. For years, he works alone, developing human-like habits and a curious personality.\r\nOne day, a sleek robot named EVE arrives on Earth on a special mission to search for signs of plant life. WALL·E falls in love with her and shows her a small green plant he found. EVE then shuts down and is taken aboard a massive spaceship called the Axiom, where humans have been living in space in comfort for hundreds of years.\r\nDetermined to stay with EVE, WALL·E travels into space and discovers that humans have become overly dependent on technology. The tiny plant is revealed to be proof that Earth can support life again, but the ship’s autopilot tries to prevent the humans from returning.\r\nWith courage and teamwork, WALL·E and EVE help the humans realize their responsibility to Earth. In the end, they return home to rebuild the planet, and WALL·E’s selfless love and persistence inspire both humans and robots to change for the better.', '2008-07-18', 98, 'movie', '../assets/images/walle.jpg', '../assets/images/walle.jpg', 'https://www.youtube.com/watch?v=CZ1CATNbXg0&pp=ygULd2FsbCBlIHRyYWk%3D', 'English', '2025-12-10 07:19:03', '2025-12-10 19:27:46'),
(7, 'Spider-Man\r\n', 'After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.\r\n', 'Peter Parker is a shy and intelligent high school student who lives with his Aunt May and Uncle Ben in New York City. During a school field trip, he is bitten by a genetically modified spider, which gives him superhuman abilities including enhanced strength, speed, wall-crawling, and fast reflexes.\r\nAt first, Peter uses his powers selfishly to gain fame and money. However, his life changes dramatically when Uncle Ben is killed by a criminal Peter had earlier chosen not to stop. Realizing that his inaction helped cause the tragedy, Peter learns the powerful lesson that “with great power comes great responsibility.”\r\nPeter begins using his abilities to fight crime under the identity of Spider-Man. Meanwhile, scientist Norman Osborn becomes the Green Goblin after a dangerous experiment transforms him into a violent alter ego. As the Goblin threatens the city, Peter must balance his double life, protect his loved ones, and stop his enemy before more people are hurt.\r\nIn the end, Peter defeats the Green Goblin but at great personal cost. He chooses to put aside his personal happiness with Mary Jane to keep her safe and fully accepts his role as Spider-Man, New York City’s new hero.\r\n', '2002-05-03', 121, 'movie', '../assets/images/spiderman.jpg', '../assets/images/spiderman.jpg', 'https://www.youtube.com/watch?v=t06RUxPbp_c&pp=ygUUc3BpZGVyIG1hbiAxIHRyYWlsZXI%3D', 'English', '2025-12-10 07:24:22', '2025-12-10 19:28:18'),
(8, 'The Amazing Spider-Man\r\n', 'After Peter Parker is bitten by a genetically altered spider, he gains newfound, spider-like powers and ventures out to save the city from the machinations of a mysterious reptilian foe.', 'Peter Parker is a quiet and intelligent teenager who was abandoned by his parents as a child and raised by his Uncle Ben and Aunt May. Curious about his past, Peter investigates his father’s work and visits Oscorp, a science company connected to his parents’ research.\r\nDuring his visit, Peter is bitten by a genetically engineered spider and soon develops superhuman abilities such as enhanced strength, speed, and agility, along with the power to cling to walls. As he tests his new powers, Peter begins to develop a confident new identity.\r\nTragedy strikes when Uncle Ben is killed during a robbery. Filled with guilt, Peter decides to use his powers to fight crime, creating his own version of Spider-Man. He soon faces a dangerous enemy: Dr. Curt Connors, a scientist who transforms into the monstrous Lizard after a failed experiment to regenerate body parts.\r\nWith New York City in danger, Peter must stop the Lizard while also dealing with his growing feelings for Gwen Stacy and the mystery of his parents’ disappearance. By the end, Peter fully embraces his role as Spider-Man and understands the responsibility that comes with his powers.', '2012-07-03', 136, 'movie', '../assets/images/amazingspider.jpg', '../assets/images/amazingspider.jpg', 'https://www.youtube.com/watch?v=-tnxzJ0SSOw&pp=ygUgdGhlIGFtYXppbmcgc3BpZGVyIG1hbiAxIHRyYWlsZXI%3D', 'English', '2025-12-10 07:28:26', '2025-12-10 19:34:55'),
(9, 'Fall', 'When a high-rise climb goes wrong, best friends Becky and Hunter find themselves stuck at the top of a 2,000-foot TV tower.', 'Becky and Hunter are best friends who love extreme adventures. After a tragic climbing accident leaves Becky emotionally broken and fearful, Hunter convinces her to face her fears by climbing an abandoned 2,000-foot radio tower in the middle of the desert.\r\nWhat starts as an exciting challenge quickly turns into a nightmare when the ladder breaks after they reach the top, leaving them stranded with no way down. With little food, no water, and no cellphone signal, the two must rely on their intelligence and strength to survive.\r\nAs the heat worsens and danger increases, their friendship is tested by fear, secrets, and blame. The situation becomes more desperate as they look for ways to escape while fighting exhaustion, hunger, and the threat of death. The film shows not only their physical fight for survival but also Becky’s emotional struggle to move forward from her past tragedy.', '2022-08-12', 107, 'movie', '../assets/images/fall.jpg', '..assets/images/fall.jpg', 'https://www.youtube.com/watch?v=iSspRSGc4Dk&pp=ygUMZmFsbCB0cmFpbGVy', 'English', '2025-12-10 07:33:56', '2025-12-10 19:29:43'),
(10, 'Demon Slayer: Kimetsu no Yaiba- The Movie - Infinity Castle', 'The Demon Slayer Corps are drawn into the Infinity Castle, where Tanjiro and the Hashira face terrifying Upper Rank demons in a desperate fight as the final battle against Muzan Kibutsuji begins.', 'After the demon king Muzan Kibutsuji traps the members of the Demon Slayer Corps inside his shifting, nightmarish fortress known as the Infinity Castle, the Demon Slayers including Tanjiro Kamado and his allies are scattered under its ever changing halls. As they traverse the labyrinth, they must fight hordes of powerful demons and track down Muzan while battling demons of the Upper Ranks. Among intense confrontations, comrades fall and deadly secrets emerge, igniting a brutal final battle for the fate of humanity inside the castle’s haunting corridors.', '2025-07-18', 156, 'movie', '../assets/images/demonslayer.jpg', '../assets/images/demonslayer.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI&pp=ygUXaW5maW5pdHkgY2FzdGxlIHRyYWlsZXI%3D', 'English', '2025-12-10 07:37:20', '2025-12-10 19:30:21'),
(11, 'Superman', 'Superman must reconcile his alien Kryptonian heritage with his human upbringing as reporter Clark Kent. As the embodiment of truth, justice and the human way he soon finds himself in a world that views these as old-fashioned.', 'Clark Kent / Superman finds himself drawn into both international and domestic conflicts when he intervenes to stop the nation of Boravia from invading neighboring Jarhanpur. His actions spark controversy and scrutiny, which gives tech magnate Lex Luthor the opportunity to try and remove Superman as a threat. As public opinion turns and pressure grows, Superman must balance his Kryptonian heritage and his human upbringing while fighting for justice and protecting those he cares about. With help from reporter Lois Lane and his loyal super dog Krypto, he works to prove that hope, compassion, and heroism still matter even when the world doubts him.', '2025-07-25', 130, 'movie', '../assets/images/superman.jpg', '../assets/images/superman.jpg', 'https://www.youtube.com/watch?v=Ox8ZLF6cGM0&pp=ygUVc3VwZXJtYW4gMjAyNSB0cmFpbGVy', 'English', '2025-12-10 07:42:12', '2025-12-10 19:30:53'),
(12, 'Jujutsu Kaisen 0', 'The prequel to Jujutsu Kaisen (2020), where a high schooler gains control of an extremely powerful cursed spirit and gets enrolled in the Tokyo Prefectural Jujutsu High School by Jujutsu Sorcerers.', 'Yuuta Okkotsu is haunted. Ever since his childhood friend Rika died in a traffic accident, her ghost has stuck with him. But her spirit does not appear as the sweet girl Yuuta once knew. Instead, she manifests as a monstrous and powerful entity who fiercely protects him. Unable to control Rika\'s violent behavior, Yuuta is helpless to stop the bloodshed that follows from her brutal vengeance. As a result, when apprehended by \"Jujutsu\" sorcerers--the secret guardians of the world, trained to combat forces like Rika--Yuuta wishes to be completely isolated so that no one else can get hurt. Yet his apprehender, the master sorcerer Satoru Gojou, has different plans for him: he will join Jujutsu High School and learn to control Rika in order to help people. Now a first-year at this school, Yuuta starts to learn Jujutsu arts and combat malignant beings. Alongside his new classmates Maki Zenin, a Jujutsu weapons expert; Toge Inumaki, a spellcaster who uses his words as weapons; and Panda, a seemingly walking and talking panda bear, Yuuta begins to find his place in the world and, for once, to feel comfortable with his abilities. However, as his training progresses, Yuuta comes to learn that the dangers of the Jujutsu world go far beyond that of wicked spirits.', '2021-12-24', 105, 'movie', '../assets/images/jujutsukaisen.jpg', '../assets/images/jujutsukaisen.jpg', 'https://www.youtube.com/watch?v=UPRqnFnnrr8&pp=ygUYanVqdXRzdSBrYWlzZW4gMCB0cmFpbGVy', 'English', '2025-12-10 07:44:39', '2025-12-10 19:31:31'),
(13, 'Doctor Strange in the Multiverse of Madness', 'Doctor Strange teams up with a mysterious teenage girl who can travel across multiverses, to battle other-universe versions of himself which threaten to wipe out the multiverse. They seek help from the Scarlet Witch, Wong and others.', 'Doctor Stephen Strange’s quiet life is shattered when he meets America Chavez, a teenager with the rare ability to travel between different universes, who is being chased by a powerful and unknown enemy. As monsters from other realities begin attacking Earth, Strange seeks help from Wanda Maximoff, believing she is the only one strong enough to understand the growing multiverse threat, only to uncover that she herself is the villain responsible. Corrupted by the Darkhold, Wanda is determined to find a universe where her children exist, no matter how many worlds she destroys to get them back. Strange and America are forced to travel across terrifying and unstable realities, encountering dangerous enemies and alternate versions of Strange who show the dark paths he might one day follow. As reality begins to collapse, Strange must choose to trust America with her own powers, confront his deepest fears and regrets, and stop Wanda before her heartbreak destroys countless universes.', '2022-05-06', 126, 'movie', '../assets/images/doctorstrange.jpg', '../assets/images/doctorstrange.jpg', 'https://www.youtube.com/watch?v=aWzlQ2N6qqg&pp=ygUdbXVsdGl2ZXJzZSBvZiBtYWRuZXNzIHRyYWlsZXI%3D', 'English', '2025-12-10 07:47:11', '2025-12-10 19:32:01'),
(14, 'It', 'In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.', 'In the small town of Derry, a group of outcast kids known as the Losers Club band together after they discover that children have been mysteriously disappearing. They soon learn that the cause is an ancient shape-shifting entity that often appears as a terrifying clown called Pennywise, who feeds on fear and hunts children every 27 years. As the kids face their worst nightmares, they form strong friendships and promise to protect one another while trying to stop the creature. Through courage and teamwork, they confront Pennywise in an underground battle, hoping to end the cycle of terror and save their town from future horrors.', '2017-09-07', 135, 'movie', '../assets/images/it.jpg', '../assets/images/itback.jpg', 'https://www.youtube.com/watch?v=xKJmEC5ieOk&pp=ygUKaXQgdHJhaWxlcg%3D%3D', 'English', '2025-12-10 07:52:51', '2025-12-10 19:39:45'),
(15, 'Five Nights at Freddy\'s 2', 'Anyone can survive five nights. This time, there will be no second chances.', 'One year has passed since the supernatural nightmare at Freddy Fazbear\'s Pizza. The stories about what transpired there have been twisted into a campy local legend, inspiring the town\'s first ever Fazfest. Former security guard Mike (Josh Hutcherson) and police officer Vanessa (Elizabeth Lail) have kept the truth from Mike\'s 11-year-old sister, Abby (Piper Rubio), concerning the fate of her animatronic friends. But when Abby sneaks out to reconnect with Freddy, Bonnie, Chica, and Foxy, it will set into motion a terrifying series of events, revealing dark secrets about the true origin of Freddy\'s, and unleashing a long-forgotten horror hidden away for decades.', '2025-12-05', 104, 'movie', '../assets/images/fnaf.jpg', '../assets/images/fnafback.jpg', 'https://www.youtube.com/watch?v=NQypHE9_Fm4&pp=ygUZRml2ZSBOaWdodHMgYXQgRnJlZGR5J3MgMg%3D%3D', 'English', '2025-12-10 07:56:50', '2025-12-10 19:40:22'),
(16, 'Bugonias', 'Two conspiracy-obsessed young men kidnap the high-powered CEO of a major company, convinced that she is an alien intent on destroying planet Earth.', 'Teddy Gatz is a beekeeper and former factory/warehouse employee at a pharmaceutical megacorporation called Auxolith. . He believes that chemicals produced by Auxolith are responsible for Colony Collapse Disorder, decimating his bee hives. More deeply, he holds a personal grievance: years earlier, his mother, Sandy, was part of an experimental drug trial run by Auxolith that left her in a persistent vegetative state - mentally incapacitated. . Haunted by loss and engulfed by paranoia, Teddy becomes convinced that the root cause is far worse: he believes the company\'s CEO, Michelle Fuller (Emma Stone), isn\'t human - but an alien from the race of \"Andromedans,\" infiltrating powerful positions to manipulate and destroy humanity.', '2025-10-31', 119, 'movie', '../assets/images/bulgonias.jpg', '..assets/images/bugoniasback.jpg', 'https://www.youtube.com/watch?v=bd_5HcTujfc&pp=ygUPYnVnb25pYSB0cmFpbGVy', 'English', '2025-12-10 08:01:20', '2025-12-10 19:40:48');

-- --------------------------------------------------------

--
-- Table structure for table `movie_genres`
--

CREATE TABLE `movie_genres` (
  `movie_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie_people`
--

CREATE TABLE `movie_people` (
  `movie_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `character_name` varchar(100) DEFAULT NULL COMMENT 'Character name for actors',
  `role` varchar(50) NOT NULL COMMENT 'Director, Producer, etc.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie_requests`
--

CREATE TABLE `movie_requests` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `request_type` enum('add','edit','delete') NOT NULL,
  `movie_id` int(11) DEFAULT NULL COMMENT 'NULL for add requests',
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `request_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Store all request details' CHECK (json_valid(`request_data`)),
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `admin_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reviewed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie_services`
--

CREATE TABLE `movie_services` (
  `movie_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `person_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role_type` enum('actor','director','producer','writer') NOT NULL,
  `photo_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL CHECK (`rating` >= 0 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`) VALUES
(1, 'Amazon Prime Video'),
(2, 'Disney+'),
(3, 'HBO Max'),
(4, 'Hulu'),
(5, 'iQiyi'),
(6, 'Netflix'),
(7, 'Viki'),
(8, 'YouTube Movies');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin', 'admin@filmopicks.com', 'adminpassword', 'admin', '2025-12-09 07:54:21', '2025-12-09 07:54:21'),
(2, 'Test User', 'testuser', 'test@example.com', '$2y$10$S/uesKFpazTUwuSBFRnZ..Frq/ahHF.2t/kHqzXn.68QzJewjPvbu', 'user', '2025-12-09 19:35:36', '2025-12-09 19:35:36');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wishlist_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`),
  ADD UNIQUE KEY `genre_name` (`genre_name`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`),
  ADD KEY `idx_title` (`title`),
  ADD KEY `idx_type` (`type`);

--
-- Indexes for table `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD PRIMARY KEY (`movie_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `movie_people`
--
ALTER TABLE `movie_people`
  ADD PRIMARY KEY (`movie_id`,`person_id`,`role`),
  ADD KEY `person_id` (`person_id`);

--
-- Indexes for table `movie_requests`
--
ALTER TABLE `movie_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_user` (`user_id`);

--
-- Indexes for table `movie_services`
--
ALTER TABLE `movie_services`
  ADD PRIMARY KEY (`movie_id`,`service_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`person_id`),
  ADD KEY `idx_name` (`name`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `idx_movie` (`movie_id`),
  ADD KEY `idx_user` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`),
  ADD UNIQUE KEY `service_name` (`service_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_username` (`username`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`wishlist_id`),
  ADD UNIQUE KEY `unique_wishlist` (`user_id`,`movie_id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `idx_user` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `movie_requests`
--
ALTER TABLE `movie_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `wishlist_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD CONSTRAINT `movie_genres_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `movie_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`) ON DELETE CASCADE;

--
-- Constraints for table `movie_people`
--
ALTER TABLE `movie_people`
  ADD CONSTRAINT `movie_people_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `movie_people_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `people` (`person_id`) ON DELETE CASCADE;

--
-- Constraints for table `movie_requests`
--
ALTER TABLE `movie_requests`
  ADD CONSTRAINT `movie_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `movie_requests_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE SET NULL;

--
-- Constraints for table `movie_services`
--
ALTER TABLE `movie_services`
  ADD CONSTRAINT `movie_services_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `movie_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
