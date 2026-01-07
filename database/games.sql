CREATE TABLE games (
  game_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  photo_url TEXT,
  price DECIMAL(10,2),
  release_date DATE
);

INSERT INTO games (game_id, name, description, photo_url, price, release_date) VALUES
(1, 'The Witcher 3: Wild Hunt', 'An epic open world RPG adventure set in a world full of monsters.', 'witcher3.jpg', 299.99, '2015-05-19'),
(2, 'Cyberpunk 2077', 'An open world action RPG game set in the futuristic Night City.', 'cyberpunk.jpg', 499.00, '2020-12-10'),
(3, 'Red Dead Redemption 2', 'A captivating story set in the final days of the American Wild West.', 'rdr2.jpg', 599.50, '2018-10-26'),
(4, 'Elden Ring', 'A massive fantasy world filled with challenging enemies and exploration.', 'eldenring.jpg', 699.99, '2022-02-25'),
(5, 'God of War', 'Follow Kratos and his son on a dangerous journey through Norse realms.', 'godofwar.jpg', 329.00, '2018-04-20'),
(6, 'Hades', 'An award winning rogue like game where you try to escape the underworld.', 'hades.jpg', 120.00, '2020-09-17'),
(7, 'Stardew Valley', 'Build a peaceful farm life and socialize with townsfolk.', 'stardew.jpg', 24.00, '2016-02-26'),
(8, 'Portal 2', 'A legendary first person puzzle game featuring clever mechanics.', 'portal2.jpg', 18.50, '2011-04-18');
