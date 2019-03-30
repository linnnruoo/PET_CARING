create table pettypes
(
  tid           serial                              not null,
  name			varchar(100)						not null,
  primary key (tid),
  unique (name)
);