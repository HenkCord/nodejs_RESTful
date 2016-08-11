-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 11 2016 г., 10:54
-- Версия сервера: 5.7.13
-- Версия PHP: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `db_node`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accessToken`
--

CREATE TABLE IF NOT EXISTS `accessToken` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `clientId` tinyint(3) unsigned NOT NULL,
  `token` char(100) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='токен (тип bearer), выдаваемый клиентским приложениям, ограничен по времени';

--
-- Дамп данных таблицы `accessToken`
--

INSERT INTO `accessToken` (`id`, `userId`, `clientId`, `token`, `created`) VALUES
(3, 1, 1, 's7P9vW9hpoQgZ3B73quSPMnoms6hRKj4CGbzwoSsHo8=', '2016-08-05 09:45:35');

-- --------------------------------------------------------

--
-- Структура таблицы `clients`
--

CREATE TABLE IF NOT EXISTS `clients` (
  `clientId` tinyint(3) unsigned NOT NULL,
  `name` char(50) NOT NULL,
  `clientSecret` char(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT=' клиент-приложение, которому выдается доступ от имени пользователя. Обладают именем и секретным кодом';

--
-- Дамп данных таблицы `clients`
--

INSERT INTO `clients` (`clientId`, `name`, `clientSecret`) VALUES
(1, 'WebClient Angular2', '123');

-- --------------------------------------------------------

--
-- Структура таблицы `refreshToken`
--

CREATE TABLE IF NOT EXISTS `refreshToken` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `clientId` tinyint(3) unsigned NOT NULL,
  `token` char(50) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='другой тип токена, позволяет запросить новый bearer-токен без повторного запроса пароля у пользователя';

--
-- Дамп данных таблицы `refreshToken`
--

INSERT INTO `refreshToken` (`id`, `userId`, `clientId`, `token`, `created`) VALUES
(3, 1, 1, 'MwvwOURXPzsVk1MPm0SIk1yvri6DM69l1yQXxUcxlo4=', '2016-08-05 09:45:35');

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `taskId` int(10) unsigned NOT NULL,
  `title` char(255) DEFAULT NULL,
  `content` text
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`taskId`, `title`, `content`) VALUES
(1, 'Задача 0', 'Одеться'),
(2, 'задача1', 'Пойти в магаз'),
(3, '''Привет''', '''содержимое'''),
(7, 'Привет от Артёма', 'содержимое новое'),
(11, 'Привет от Артёма', 'содержимое новое'),
(12, 'Привет от Артёма', 'содержимое новое');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(10) unsigned NOT NULL,
  `email` char(100) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `secondName` varchar(50) DEFAULT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `passwordSalt` char(50) DEFAULT NULL,
  `registeredDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата регистрации',
  `activityDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата последней активности в сети'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='таблица зарегистрированных пользователей';

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`userId`, `email`, `firstName`, `secondName`, `middleName`, `password`, `passwordSalt`, `registeredDate`, `activityDate`) VALUES
(1, 'leo240532@yandex.ru', 'Артём', 'Черняев', 'Алексеевич', '5959d51514ed272be34d12e5369c8e66291dd180', 'ZtzZuab/u4d7Dw08YQx0tEfbATm4DSqhEM+0YqU7BHk=', '2016-08-04 15:11:23', '2016-08-04 15:11:23'),
(2, 'leo240532@yandex.rud', 'Артём', NULL, NULL, '5959d51514ed272be34d12e5369c8e66291dd180', 'ZtzZuab/u4d7Dw08YQx0tEfbATm4DSqhEM+0YqU7BHk=', '2016-08-04 19:46:49', '2016-08-04 19:46:49');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `accessToken`
--
ALTER TABLE `accessToken`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`clientId`);

--
-- Индексы таблицы `refreshToken`
--
ALTER TABLE `refreshToken`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `accessToken`
--
ALTER TABLE `accessToken`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `clients`
--
ALTER TABLE `clients`
  MODIFY `clientId` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `refreshToken`
--
ALTER TABLE `refreshToken`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `taskId` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
