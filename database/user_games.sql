CREATE TABLE public.user_games (
  id BIGSERIAL PRIMARY KEY,
  purchase_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  game_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,

  CONSTRAINT fk_user_games_game
    FOREIGN KEY (game_id)
    REFERENCES public.games(id),

  CONSTRAINT fk_user_games_user
    FOREIGN KEY (user_id)
    REFERENCES public.users(id)
);
